// src/db/db.rs

use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;

pub async fn database_connection() -> PgPool {
    PgPoolOptions::new()
        .max_connections(5)
        .connect("postgres://:123456@localhost/bp").await?
        .expect("Failed to connect to database.")
}
