export const schema = {
  title: {
    type: String,
    required: true,
    errors: {
      type: 'Title must be a string.',
      required: 'Title is required.'
    }
  },
  completed: {
    type: Boolean,
    required: false,
    default: false
  },
  order: {
    type: Number,
    required: false
  }
};

function cleanUpTodoObject(todo, baseUrl) {
  if (todo.hasOwnProperty('position')) {
    todo.order = todo.position;
    delete todo.position;
  }

  for (var [key, value] of Object.entries(todo)) {
    if (value === null || value === undefined) delete todo[key];
  }

  todo.url = `${baseUrl}/todos/${todo.id}`;

  return todo;
}

export default function transformResponse(result) {
  if (result.todos) {
    result = result.todos.map((obj) => cleanUpTodoObject(obj, result.baseUrl));
  }

  if (result.todo) {
    result = cleanUpTodoObject(result.todo, result.baseUrl);
  }

  return result;
}
