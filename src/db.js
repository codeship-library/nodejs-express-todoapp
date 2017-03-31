import pg from 'pg';

var conString = process.env.DATABASE_URL;

function query(qs) {
  return new Promise((resolve, reject) => (
    pg.connect(conString, (err, client, done) => {
      if (err) return reject(new Error(err));
      client.query(qs, (err, result) => {
        if (err) {
          done();
          return reject(new Error(err));
        }
        done();
        resolve(result.rows);
      });
    })
  ));
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function all(table) {
  return query(`SELECT * FROM ${table}`);
}

function clear(table) {
  return query(`DELETE FROM ${table}`);
}

function create(table, params) {
  const assigns = Object.keys(params);
  const values = Object.values(params).map((value) => normalizeValue(value));
  return query(`INSERT INTO ${table} (${assigns}) VALUES (${values}) RETURNING *`);
}

function getById(table, id) {
  return query(`SELECT * FROM ${table} WHERE id=${id}`);
}

function update(table, id, params) {
  if (params.id) delete params.id;
  const assigns = Object.keys(params);
  const values = assigns.map((key) => `${key}=${normalizeValue(params[key])}`).join(', '); // eslint-disable-line
  return query(`UPDATE ${table} SET ${values} WHERE id=${id} RETURNING *`);
}

function deleteById(table, id) {
  return query(`DELETE FROM ${table} WHERE id = ${id}`);
}

export default {all, clear, create, deleteById, getById, update};
