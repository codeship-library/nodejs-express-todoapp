'use strict';

exports.up = function(db, callback) {
  db.createTable('todos', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      title: { type: 'string', notNull: true},
      position: 'int',
      completed: 'boolean',
    },
    ifNotExists: true
  }, callback);
};

exports._meta = {
  'version': 1
};
