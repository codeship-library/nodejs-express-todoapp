import request from 'supertest';
import app from '../server';

const todo = {title: 'blah'};

describe('Todo-Backend API', () => {
  describe( 'the pre-requisites', () => {
    it( 'the api root responds to a GET (i.e. the server is up and accessible, CORS headers are set up)', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .end((err) => {
        expect(err).toBeNull();
        done();
      });
    });
    it( 'the api root responds to a POST with the todo which was posted to it', (done) => {
      request(app)
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('title', 'blah');
        done();
      });
    });
    it( 'the api root responds successfully to a DELETE', (done) => {
      request(app)
      .delete('/todos')
      .expect(204)
      .end((err) => {
        expect(err).toBeNull();
        done();
      });
    });
    it( 'after a DELETE the api root responds to a GET with a JSON representation of an empty array', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual([]);
        done();
      });
    });
  });

  describe( 'storing new todos by posting to the root url', () => {

    beforeEach((done) => {
      request(app)
      .delete('/todos')
      .end((err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it('adds a new todo to the list of todos at the root url', (done) => {
      request(app)
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('title', 'blah');
        done();
      });
    });
    it('sets up a new todo as initially not completed', (done) => {
      request(app)
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('completed', false);
        done();
      });
    });
    it('each new todo has a url, and you can navigate to it', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toHaveProperty('url');
        expect(typeof res.body.url).toEqual('string');
        currentTodo = res.body;
        client
        .get(`/todos/${currentTodo.id}`)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.id).toEqual(currentTodo.id);
          done();
        });
      });
    });
  });

  describe( 'working with an existing todo', () => {
    it('can change the todos title by PATCHing to the todos url', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        currentTodo = res.body;
        client
        .patch(`/todos/${currentTodo.id}`)
        .send({'title': 'different title now'})
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.title).toEqual('different title now');
          done();
        });
      });
    });
    it('can change the todos completedness by PATCHing to the todos url', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.completed).toEqual(false);
        currentTodo = res.body;
        client
        .patch(`/todos/${currentTodo.id}`)
        .send({'completed': true})
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.completed).toEqual(true);
          done();
        });
      });
    });
    it('changes to a todo are persisted and show up when re-fetching the todo', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        currentTodo = res.body;
        client
        .patch(`/todos/${currentTodo.id}`)
        .send({'title': 'new title', 'completed': true})
        .end((err) => {
          expect(err).toBeNull();
          client
          .get(`/todos/${currentTodo.id}`)
          .end((err,res) => {
            expect(err).toBeNull();
            expect(res.body.completed).toEqual(true);
            expect(res.body.title).toEqual('new title');
            done();
          });
        });
      });
    });
    it('can delete a todo making a DELETE request to the todos url', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        currentTodo = res.body;
        client
        .delete(`/todos/${currentTodo.id}`)
        .expect(204)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
      });
    });
  });

  describe('tracking todo order', () => {
    it('can PATCH a todo to change its order and it remembers changes', (done) => {
      let currentTodo;
      const client = request(app);
      client
      .post('/todos')
      .send(todo)
      .expect(201)
      .end((err, res) => {
        expect(err).toBeNull();
        currentTodo = res.body;
        client
        .patch(`/todos/${currentTodo.id}`)
        .send({'order': 123})
        .end((err) => {
          expect(err).toBeNull();
          client
          .get(`/todos/${currentTodo.id}`)
          .end((err,res) => {
            expect(err).toBeNull();
            expect(res.body.order).toEqual(123);
            done();
          });
        });
      });
    });
  });
});
