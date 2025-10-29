show databases;
use dev;
show tables;
select * from customers order by id asc;

alter table customers
add column password_hash varchar(255) not null default'1';

alter table customers
add column password_salt varchar(255) not null default'1';

