CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price integer NOT NULL,
);