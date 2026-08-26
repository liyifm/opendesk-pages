-- heartbeat 增加 client_type（客户端类型）字段。
ALTER TABLE heartbeats ADD COLUMN client_type TEXT;