create table department (
    id int primary key auto_increment,
    name varchar (30)
);

create table role (
    id int primary key auto_increment,
    title varchar (30),
    salary decimal,
    deparment_id int references department (id)
);

create table employee (
    id int primary key auto_increment,
    first_name varchar(30),
    last_name varchar (30),
    role_id int references role (id),
    manager_id int references employee (id)
);
