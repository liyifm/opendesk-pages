-- OpenDesk 设备心跳表（历史全量）。
-- os/device_type/device_id 由客户端上报；time/ip_hash 由服务端记录（收到时间戳，IP 加盐哈希后存储）。
-- 每次心跳插入一行，查询“某设备最新状态”时按 device_id 取 MAX(time) 分组。
CREATE TABLE IF NOT EXISTS heartbeats (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  os          TEXT,
  device_type TEXT,
  device_id   TEXT,
  time        TEXT NOT NULL,
  ip_hash     TEXT
);

CREATE INDEX IF NOT EXISTS idx_heartbeats_time ON heartbeats(time);
CREATE INDEX IF NOT EXISTS idx_heartbeats_device_id_time ON heartbeats(device_id, time);