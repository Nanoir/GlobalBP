// router.rs
// src/router.rs

use axum::{
    routing::post,
    Router,
};
use crate::user::user_handler::UserHandler;

pub fn init_user_router(user_handler: UserHandler) -> Router {
    Router::new()
        .route("/signup", post(UserHandler::signup))
        .route("/login", post(UserHandler::login))
}