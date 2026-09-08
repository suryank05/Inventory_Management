CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL
);

CREATE TABLE inventory_item (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    quantity INT NOT NULL,
    price DECIMAL(19, 2) NOT NULL,
    created_at DATETIME(6),
    updated_at DATETIME(6)
);

CREATE TABLE deleted_inventory_item (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    original_id BIGINT,
    item_name VARCHAR(255),
    description VARCHAR(255),
    quantity INT,
    price DECIMAL(19, 2),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    deleted_at DATETIME(6) NOT NULL
);

CREATE TABLE refresh_token (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(128) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    expiry_date DATETIME(6) NOT NULL,
    revoked BOOLEAN NOT NULL,
    CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users (id)
);
