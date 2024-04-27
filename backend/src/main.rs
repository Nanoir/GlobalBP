// main.rs

use axum::{serve::Serve, Router};
use std::net::SocketAddr;
use crate::router::router::init_user_router;
use crate::db::db::database_connection;
use crate::user::{user_repo::UserRepository, user_handler::UserHandler};

mod router;
mod db;
mod user;
mod bp;

#[tokio::main]
async fn main() {
    // Establish a connection to the database
    let db_pool = database_connection().await;

    // Create repository instances
    let user_repo = UserRepository::new(db_pool.clone());
    let user_handler = UserHandler::new(user_repo.clone());

    let bp_repo = BpRepository::new(db_pool.clone());

    // Create handler instances
    let bp_handler = BpHandler::new(bp_repo.clone());

    // Create an Axum router and mount the routes
    let app: Router = init_user_router(user_handler, bp_handler);

    // Start the Axum server
    Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}