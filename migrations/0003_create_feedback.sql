-- 用户反馈主表。type 仅允许 feature / bug；time/ip_hash 由服务端记录（与 heartbeat 一致，IP 加盐哈希）。
CREATE TABLE IF NOT EXISTS feedback (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  type    TEXT NOT NULL CHECK (type IN ('feature', 'bug')),
  content TEXT NOT NULL,
  time    TEXT NOT NULL,
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_feedback_time ON feedback(time);

-- 反馈附件。文件以 BLOB 存 D1（单附件受 API 层 1MB 限制），后续可迁移至 R2 对象存储。
CREATE TABLE IF NOT EXISTS feedback_attachments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  feedback_id  INTEGER NOT NULL REFERENCES feedback(id) ON DELETE CASCADE,
  filename     TEXT,
  content_type TEXT,
  size         INTEGER,
  data         BLOB
);

CREATE INDEX IF NOT EXISTS idx_feedback_attachments_feedback ON feedback_attachments(feedback_id);