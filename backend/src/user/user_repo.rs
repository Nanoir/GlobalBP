// user_repo.rs

use crate::user::user::User;
use anyhow::Result;
use sqlx::{query, query_as, PgPool};

pub struct UserRepository {
    db_pool: PgPool,
}

impl UserRepository {
    pub fn new(db_pool: PgPool) -> Self {
        UserRepository {
            db_pool: db_pool.clone(),
        }
    }

    pub async fn get_user_by_username(&self, username: &str) -> Result<User> {
        let user = query_as!(
            User,
            r#"
            SELECT id, username, password
            FROM player
            WHERE username = $1
            "#,
            username
        )
            .fetch_one(&self.db_pool)
            .await?;
        Ok(user)
    }

    pub async fn create_user(&self, username: &str, password: &str) -> Result<()> {
        query!(
        r#"
        INSERT INTO player (username, password)
        VALUES ($1, $2)
        "#,
        username,
        password
    )
            .execute(&self.db_pool)
            .await?;
        Ok(())
    }

}
