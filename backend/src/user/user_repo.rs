use sqlx::{PgPool, query};
use anyhow::Result;

pub struct UserRepository {
    db_pool: PgPool,
}
#[derive(Debug)]
pub struct User {
    pub username: String,
    pub password: String,
}
impl UserRepository {
    pub fn new(db_pool: PgPool) -> Self {
        Self { db_pool }
    }

    pub async fn create_new_user(&self, username: &str, password: &str) -> Result<()> {
        query!(
            r#"
            INSERT INTO player (username, password) VALUES ($1, $2)
            "#,
            username,
            password,
        )
            .execute(&self.db_pool)
            .await?;

        Ok(())
    }

    pub async fn get_user_by_username(&self, username: &str, password: &str) -> Result<bool> {
        let result = query!(
            r#"
            SELECT EXISTS(SELECT 1 FROM player WHERE username = $1 AND password = $2)
            "#,
            username,
            password
        )
            .fetch_one(&self.db_pool)
            .await?;

        Ok(result.exists.unwrap_or(false))
    }
}
