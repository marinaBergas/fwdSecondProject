/#scripts for build 
for migration up-> npm run  migrate-up
for migration down-> npm run  migrate-down 
for build-> npm run build;
test npm run newTest ; 
for nodemon-> npm run start;
//port numper 3001
"host": "127.0.0.1",
//address app work on 
http://0.0.0.0:3001/

-hint variables is in gitignore 
//Environment variables.

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
PORT=3001
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
ENV=dev
BCRYPT_PASSWORD=store
SALT_ROUNDS=10
TOKEN_SECRET=123456

//create database
CREATE DATABASE store
