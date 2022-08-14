#for table users
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100),
password_digest VARCHAR
email Varchar
);
//API endpoints

1- GET /users.
http://localhost:3001/users

get with query params id(specific user);
app.get("/users/:id",show);
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

http://localhost:3001/users/32

//////
GET/users login//auth
http://localhost:3001/users/32/auth
token eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

2-edit(PUT/USERS)
app.put("/users/:id",updateUser);
http://localhost:3001/users/32
with body{
username :string,
password_digest :string
email:string
}

3-create(POST/users)
app.post("/users", create);
http://localhost:3001/users

with body{
username VARCHAR(100),
password_digest VARCHAR
}

4-Delete(DELETE /users)
app.delete("/users/:id",deleteUser);
http://localhost:3001/users/6

5-auth user(POST/users/auth)
app.post("/users/auth", verifyAuthToken, authenticate);
with body{
username VARCHAR(100),
password_digest VARCHAR
}
need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0
//////////////////////////////////////////////////////////////////////////////////////
#for table products
CREATE TABLE products (
id SERIAL PRIMARY KEY,
sku VARCHAR(100) NOT NULL,
description TEXT NOT NULL,
price integer NOT NULL
);
1- GET /product.
app.get("/product", index);
http://localhost:3001/product
app.get("/product/:id", show);
http://localhost:3001/product/2

2-edit(PUT/product)
app.put("/product/:id", updateProduct);
http://localhost:3001/product/2
with body{
sku :string,
description :string,
price :number
}

3-create(POST/product)
app.post("/product", create);
http://localhost:3001/product
with body{
sku :string,
description :string,
price :number
}

4-Delete(DELETE /product)
app.delete("/product/:id", deleteProduct);
http://localhost:3001/product/2

//////////////////////////////////////////////////////////////////////////////////////
#for table orders
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
status VARCHAR(100),
orderNum integer,
user_id bigint REFERENCES users(id),
details VARCHAR(100)
);

-hint all need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

1- GET /order.
app.get("/order",verifyAuthToken, index);
http://localhost:3001/order
app.get("/order/:id",verifyAuthToken, show);
http://localhost:3001/order/:id

2-edit(PUT/order)
app.put("/order/:id",verifyAuthToken,updateOrder);
http://localhost:3001/order/:id
with body{
status :string,
orderNum :number,
user_id :6,
details:string
}
hint need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

3-create(POST/order)
app.post("/order",verifyAuthToken, create);
http://localhost:3001/order/1

with body{
status :string,
orderNum :number,
user_id :6,
details:string
}
hint need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

4-Delete(DELETE /order)
app.delete("/order/:id",verifyAuthToken, deleteOrder);
http://localhost:3001/order/1
////////////////////////////////////////////
for table products order
CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
quantity integer,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)
);
hint need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0

1-create(POST/addProduct)
app.post("/addProduct",verifyAuthToken, orderProduct);
http://localhost:3001/addProduct

-hint need user token in headers as bearer auth to change
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMiwidXNlcm5hbWUiOiJtYXJpbmEiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkMHpack4yZGE0L1lxcTZyd2RxdDNVT0cwWXVEMUtqaVdtTVIzWmR6TGRhS2dMelN0clJoaUMiLCJlbWFpbCI6Im1hcmluYS5zYWJlckBnbWFpbC5jb20ifSwiaWF0IjoxNjYwNTAyNzA5fQ.F47UV0s9uNbdncSfxC3jhtyFpoYMOO-jwbit1LEjuF0
