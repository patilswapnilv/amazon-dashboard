-- database/schema.sql

-- Table for storing user accounts
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT REFERENCES roles(id)
);

-- Table for storing Amazon seller accounts
CREATE TABLE amazon_accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    account_name VARCHAR(255) NOT NULL,
    region VARCHAR(50) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    token_expiration TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing performance metrics
CREATE TABLE performance_metrics (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES amazon_accounts(id),
    metric_name VARCHAR(50) NOT NULL,
    metric_value FLOAT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing user roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
