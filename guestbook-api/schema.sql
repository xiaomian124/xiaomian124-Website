DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS rate_limit;

CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nickname TEXT NOT NULL,
  qq TEXT,
  content TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  reply_to INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
  comment_id INTEGER NOT NULL,
  ip_hash TEXT NOT NULL,
  vote INTEGER NOT NULL,
  PRIMARY KEY (comment_id, ip_hash)
);

CREATE TABLE rate_limit (
  ip_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX idx_rate_limit ON rate_limit (ip_hash, created_at);
CREATE INDEX idx_comments_created ON comments (created_at DESC);