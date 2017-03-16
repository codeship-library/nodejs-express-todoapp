CREATE TABLE IF NOT EXISTS todos (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  completed boolean,
  position INTEGER
);
