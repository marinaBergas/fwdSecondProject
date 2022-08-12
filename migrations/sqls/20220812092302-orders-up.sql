CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    orderNum integer,
    user_id bigint REFERENCES users(id),
    details VARCHAR(100),
);