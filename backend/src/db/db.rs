// src/db/db.rs

use sqlx::postgres::PgPool;
use anyhow::Result;

pub async fn init_db_pool() -> Result<(PgPool)> {
    dotenv::dotenv().ok();
    let db_pool = PgPool::connect("postgres::memory:").await?; // 这里用了内存中的 SQLite，实际情况需要根据你的数据库连接信息配置

    Ok(db_pool)
}