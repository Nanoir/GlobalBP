// user.rs

use crate::user::user_repo::UserRepository;
use anyhow::Result;

pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}

pub struct UserService {
    user_repo: UserRepository,
}

pub struct UserHandler {
    user_service: UserService,
}

