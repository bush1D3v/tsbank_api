CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    name VARCHAR(75) NOT NULL,
    email VARCHAR(75) NOT NULL UNIQUE,
    phone VARCHAR(11) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    balance FLOAT DEFAULT 0
  );

CREATE TABLE
  transactions (
    id SERIAL PRIMARY KEY,
    description VARCHAR(25) NOT NULL,
    value FLOAT NOT NULL,
    date TIMESTAMP DEFAULT current_timestamp,
    user_id INTEGER REFERENCES users (id) NOT NULL,
    type VARCHAR(6) NOT NULL
  );

CREATE TABLE
  credit_cards (
    id SERIAL PRIMARY KEY,
    card_number VARCHAR(16) NOT NULL,
    cardholder_name VARCHAR(75) NOT NULL,
    expiration_date VARCHAR(5) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    user_id INT REFERENCES users (id) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    balance FLOAT DEFAULT 0,
    password VARCHAR(6) NOT NULL
  );

CREATE TABLE
  debit_cards (
    id SERIAL PRIMARY KEY,
    card_number VARCHAR(16) NOT NULL,
    cardholder_name VARCHAR(75) NOT NULL,
    expiration_date VARCHAR(5) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    user_id INT REFERENCES users (id) NOT NULL unique,
    created_at TIMESTAMP DEFAULT current_timestamp,
    password VARCHAR(6) NOT NULL
  );
