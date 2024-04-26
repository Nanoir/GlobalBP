// user_handler.rs

use crate::user::user_service::UserService;
use anyhow::Result;
use crate::user::user::User;

pub struct UserHandler {
    user_service: UserService,
}

impl UserHandler {
    pub fn new(user_service: UserService) -> Self {
        UserHandler { user_service }
    }

    pub async fn login(&self, username: &str) -> Result<User> {
        self.user_service.get_user_by_username(username).await
    }

    pub async fn signup(&self, username: &str, password: &str) -> Result<()> {
        self.user_service.create_user(username, password).await
    }
}
