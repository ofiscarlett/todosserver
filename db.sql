drop database if exists todo;

create database todo;

use todo;

create table task(
    id int primary key auto_increment,
    description varchar(255) not null,
    -- done boolean not null default false
);

insert into task (description) values ('My test task');
insert into task (description) values ('My second test task');