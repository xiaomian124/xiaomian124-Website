import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  IP_SALT: string
}

const app = new Hono<{ Bindings: Bindings }>()

const ALLOWED_ORIGINS = [
  'https://xiaomian124.top',
  'https://www.xiaomian124.top',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:5173',
  'http://localhost:4173',
]

app.use('*', cors({
  origin: (origin) => {
    if (!origin) return '*'
    return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  },
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}))

// ============ 工具函数 ============
async function hashIP(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(ip + salt)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('')
}

function getClientIP(c: any): string {
  return c.req.header('CF-Connecting-IP') || 'unknown'
}

// ============ 敏感词过滤 ============

// 联系方式、链接
const SENSITIVE_PATTERNS: { name: string; re: RegExp }[] = [
  { name: 'QQ 号', re: /(?<!\d)\d{5,12}(?!\d)/ },
  { name: '手机号', re: /(?<!\d)1[3-9]\d{9}(?!\d)/ },
  { name: '邮箱', re: /[\w.-]+@[\w.-]+\.\w{2,}/ },
  { name: '微信/QQ 标识', re: /(wx|vx|qq|微信|企鹅)\s*[:：]?\s*[\w-]{4,}/i },
  { name: '网址', re: /https?:\/\/[^\s]+/ },
]

// 敏感词表
const BAD_WORDS: string[] = [
  '加群', '加微信', '代练', '代打', '出售', '收购', '外挂', '私服',
  '破解', '刷钻', '刷币', '辅助', '免费领', '点击领取', '操', '妈的', '你妈', '傻逼', '滚蛋', '去死', '垃圾', '混蛋', '王八蛋',
  '傻子', '蠢货', '废物', '变态', '贱人', '婊子', '妓女', '色狼', '色鬼', '色魔',
  '操你妈', '操你大爷', '操你全家', '去你妈的', '去你大爷的', '去你全家的',
  '草泥马', '草你妈', '草你大爷', '草你全家', '逼', '屄', '阴道', '阴户', '阴茎', '鸡巴', '肏', '操', '干你妈', '干你大爷', '干你全家',
  'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'cunt', 'nigger', 'fag', 'slut', 'whore',
  'porn', 'sex', 'xxx', 'adult', 'erotic', 'nude', 'naked', 'masturbate', 'orgasm', 'anal',
  'rape', 'molest', 'abuse', 'incest', 'pedophile', 'childporn', 'hentai',
  '大麻', '摇头丸', 'K粉', '海洛因', '毒品', 'A片', '看片', '.cc', 'vpn', 'wpn', '翻墙', '习近平', 'xjp'
  // more
]

function checkSensitive(content: string): string | null {
  for (const p of SENSITIVE_PATTERNS) {
    if (p.re.test(content)) return p.name
  }
  const lower = content.toLowerCase()
  for (const w of BAD_WORDS) {
    if (lower.includes(w.toLowerCase())) return w
  }
  return null
}

// ============ 限流 ============

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60_000

async function isRateLimited(db: D1Database, ipHash: string): Promise<boolean> {
  const since = Date.now() - RATE_LIMIT_WINDOW
  const row = await db.prepare(
    'SELECT COUNT(*) AS cnt FROM rate_limit WHERE ip_hash = ? AND created_at > ?'
  ).bind(ipHash, since).first<{ cnt: number }>()
  return (row?.cnt || 0) >= RATE_LIMIT_MAX
}

async function recordRequest(db: D1Database, ipHash: string) {
  const now = Date.now()
  await db.prepare('INSERT INTO rate_limit (ip_hash, created_at) VALUES (?, ?)')
    .bind(ipHash, now).run()
  // 清理 5 分钟前的旧记录
  await db.prepare('DELETE FROM rate_limit WHERE created_at < ?')
    .bind(now - 5 * 60_000).run()
}

// ============ 路由 ============

// 获取留言列表
app.get('/api/comments', async (c) => {
  const ipHash = await hashIP(getClientIP(c), c.env.IP_SALT)

  const { results } = await c.env.DB.prepare(`
    SELECT
      c.id, c.nickname, c.qq, c.content, c.reply_to, c.created_at,
      CASE WHEN c.ip_hash = ? THEN 1 ELSE 0 END AS is_mine,
      r.nickname AS reply_nickname,
      r.content AS reply_content,
      (SELECT COUNT(*) FROM votes WHERE comment_id = c.id AND vote = 1) AS upvotes,
      (SELECT COUNT(*) FROM votes WHERE comment_id = c.id AND vote = -1) AS downvotes,
      (SELECT vote FROM votes WHERE comment_id = c.id AND ip_hash = ?) AS my_vote
    FROM comments c
    LEFT JOIN comments r ON c.reply_to = r.id
    ORDER BY c.created_at DESC
    LIMIT 100
  `).bind(ipHash, ipHash).all()

  return c.json(results)
})

// 提交新留言
app.post('/api/comments', async (c) => {
  const ipHash = await hashIP(getClientIP(c), c.env.IP_SALT)

  if (await isRateLimited(c.env.DB, ipHash)) {
    return c.json({ error: '发言太快，请稍后再试（每分钟最多 5 条）' }, 429)
  }

  const { nickname, qq, content, reply_to } = await c.req.json()

  if (!nickname || !content) {
    return c.json({ error: '昵称和内容不能为空' }, 400)
  }
  if (nickname.length > 20) {
    return c.json({ error: '昵称不能超过 20 个字' }, 400)
  }
  if (content.length > 500) {
    return c.json({ error: '留言内容不能超过 500 字' }, 400)
  }
  if (qq && !/^\d{5,12}$/.test(qq)) {
    return c.json({ error: 'QQ 号必须是 5-12 位数字' }, 400)
  }

  const sensitive = checkSensitive(content)
  if (sensitive) {
    return c.json({ error: '你不能提交带有敏感词的留言！' }, 400)
  }

  // 校验引用
  let replyToId: number | null = null
  if (reply_to) {
    const parent = await c.env.DB.prepare('SELECT id FROM comments WHERE id = ?')
      .bind(reply_to).first()
    if (parent) replyToId = reply_to
  }

  const result = await c.env.DB.prepare(
    'INSERT INTO comments (nickname, qq, content, ip_hash, reply_to) VALUES (?, ?, ?, ?, ?) RETURNING *'
  ).bind(nickname, qq || null, content, ipHash, replyToId).first()

  await recordRequest(c.env.DB, ipHash)

  return c.json(result, 201)
})

// 删除自己的留言
app.delete('/api/comments/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (!id) return c.json({ error: '无效的 ID' }, 400)

  const ipHash = await hashIP(getClientIP(c), c.env.IP_SALT)

  const comment = await c.env.DB.prepare(
    'SELECT id, ip_hash FROM comments WHERE id = ?'
  ).bind(id).first<{ id: number; ip_hash: string }>()

  if (!comment) return c.json({ error: '留言不存在' }, 404)
  if (comment.ip_hash !== ipHash) {
    return c.json({ error: '只能删除自己的留言' }, 403)
  }

  await c.env.DB.prepare('DELETE FROM votes WHERE comment_id = ?').bind(id).run()
  await c.env.DB.prepare('UPDATE comments SET reply_to = NULL WHERE reply_to = ?').bind(id).run()
  await c.env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(id).run()

  return c.json({ ok: true })
})

// 投票（赞成/反对）
app.post('/api/comments/:id/vote', async (c) => {
  const id = Number(c.req.param('id'))
  if (!id) return c.json({ error: '无效的 ID' }, 400)

  const ipHash = await hashIP(getClientIP(c), c.env.IP_SALT)
  const { vote } = await c.req.json()

  if (vote !== 1 && vote !== -1) {
    return c.json({ error: '无效的投票值' }, 400)
  }

  const comment = await c.env.DB.prepare('SELECT id FROM comments WHERE id = ?')
    .bind(id).first()
  if (!comment) return c.json({ error: '留言不存在' }, 404)

  const existing = await c.env.DB.prepare(
    'SELECT vote FROM votes WHERE comment_id = ? AND ip_hash = ?'
  ).bind(id, ipHash).first<{ vote: number }>()

  if (existing && existing.vote === vote) {
    // 同票取消
    await c.env.DB.prepare('DELETE FROM votes WHERE comment_id = ? AND ip_hash = ?')
      .bind(id, ipHash).run()
  } else {
    await c.env.DB.prepare(`
      INSERT INTO votes (comment_id, ip_hash, vote) VALUES (?, ?, ?)
      ON CONFLICT(comment_id, ip_hash) DO UPDATE SET vote = excluded.vote
    `).bind(id, ipHash, vote).run()
  }

  const stats = await c.env.DB.prepare(`
    SELECT
      (SELECT COUNT(*) FROM votes WHERE comment_id = ? AND vote = 1) AS upvotes,
      (SELECT COUNT(*) FROM votes WHERE comment_id = ? AND vote = -1) AS downvotes,
      (SELECT vote FROM votes WHERE comment_id = ? AND ip_hash = ?) AS my_vote
  `).bind(id, id, id, ipHash).first()

  return c.json(stats)
})

export default app