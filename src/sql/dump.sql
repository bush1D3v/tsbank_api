create table
  users (
    id serial primary key,
    name text not null,
    email text not null unique,
    password text not null,
    balance float default 0
  );

create table
  transactions (
    id serial primary key,
    description text,
    value integer not null,
    date date default current_date,
    user_id integer references users (id),
    type text not null
  );
