create table department (
    id int primary key,
    name varchar (30)

);

create table role (
    id int primary key,
    title varchar (30),
    salary decimal,
    deparment_id int references department (id)
);

create table employee (
    id int primary key,
    first_name varchar(30),
    last_name varchar (30),
    role_id int references role (id),
    manager_id int references employee (id)
);
