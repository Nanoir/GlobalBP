use sqlx::{PgPool, query, query_as};
use anyhow::Result;
use chrono::NaiveDate;

pub struct BpRepository {
    db_pool: PgPool,
}

pub struct Game {
    pub id: i32,
    pub player_id: i32,
    pub hero: String,
    pub date: NaiveDate,
    pub number: i32,
}

impl BpRepository {
    pub fn new(db_pool: PgPool) -> Self {
        Self { db_pool }
    }

    pub async fn save_game(&self, player_id: i32, hero: &str, date: NaiveDate, number: i32) -> Result<()> {
        query!(
            r#"
            INSERT INTO game (player_id, hero, date, number) VALUES ($1, $2, $3, $4)
            "#,
            player_id,
            hero,
            date,
            number
        )
            .execute(&self.db_pool)
            .await?;

        Ok(())
    }
}
