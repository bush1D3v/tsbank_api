create table
  users (
    id serial primary key,
    name text not null,
    email text not null unique,
    password text not null
  );

create table
  categories (id serial primary key, description text);

create table
  transactions (
    id serial primary key,
    description text,
    value integer not null,
    date date default current_date,
    category_id integer references categories (id),
    user_id integer references users (id),
    type text not null
  );

insert into
  categories (description)
values
  ('Food'),
  ('Subscriptions and Services'),
  ('House'),
  ('Market'),
  ('Personal Cares'),
  ('Education'),
  ('Family'),
  ('Entertainment'),
  ('Pets'),
  ('Gifts'),
  ('Clothing'),
  ('Health'),
  ('Transport'),
  ('Salary'),
  ('Sales'),
  ('Other Recipes'),
  ('Other Expenses');
