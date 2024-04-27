use axum::{Json, response::IntoResponse};
use crate::user::user_repo::{User, UserRepository};
use http::{Response, StatusCode};
use anyhow::Result;

pub struct UserHandler {
    user_repo: UserRepository,
}

impl UserHandler {
    pub fn new(user_repo: UserRepository) -> Self {
        Self { user_repo }
    }

    pub async fn signup(&self, user: Json<User>) -> impl IntoResponse {
        let user = user.into_inner();

        match self.user_repo.register_user(&user.username, &user.password).await {
            Ok(()) => Response::new(StatusCode::CREATED),
            Err(err) => {
                eprintln!("Error registering user: {:?}", err);
                Response::new(StatusCode::INTERNAL_SERVER_ERROR)
            }
        }
    }

    pub async fn login(&self, user: Json<User>) -> impl IntoResponse {
        let user = user.into_inner();

        match self.user_repo.login_user(&user.username, &user.password).await {
            Ok(true) => Response::new(StatusCode::OK),
            Ok(false) => Response::new(StatusCode::UNAUTHORIZED),
            Err(err) => {
                eprintln!("Error logging in user: {:?}", err);
                Response::new(StatusCode::INTERNAL_SERVER_ERROR)
            }
        }
    }
}
