// main.rs

use axum::{serve::Serve, Router};
use std::net::SocketAddr;
use crate::router::router::init_user_router;
use crate::db::db::init_db_pool;
use crate::user::{user_repo::UserRepository, user_service::UserService, user_handler::UserHandler};

mod router;
mod db;
mod user;

#[tokio::main]
async fn main() {
    // 初始化数据库连接池
    let db_pool = init_db_pool().await.unwrap();

    // 创建用户仓库，并传入数据库连接池
    let user_repo = UserRepository::new(db_pool);

    // 创建用户服务，并传入用户仓库
    let user_service = UserService::new(user_repo);

    // 创建用户处理程序，并传入用户服务
    let user_handler = UserHandler::new(user_service);

    // 初始化用户路由，并传入用户处理程序
    let user_router = init_user_router(user_handler);

    // 启动服务器
    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    let app = Router::new().nest("/api", user_router);
    Serve::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
