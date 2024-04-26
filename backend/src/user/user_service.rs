// user_service.rs

use crate::user::user_repo::UserRepository;
use anyhow::Result;
use crate::user::user::User;

pub struct UserService {
    user_repo: UserRepository,
}

impl UserService {
    pub fn new(user_repo: UserRepository) -> Self {
        UserService { user_repo }
    }

    pub async fn get_user_by_username(&self, username: &str) -> Result<User> {
        self.user_repo.get_user_by_username(username).await
    }

    pub async fn create_user(&self, username: &str, password_hash: &str) -> Result<()> {
        self.user_repo.create_user(username, password_hash).await
    }
}
