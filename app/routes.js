const Todo = require('./models/todo'); // Import Todo model

function getTodos(req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.status(200).send(err);
        } else {
            res.json(todos); // return all todos in JSON format
        }
    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if (err) {
                res.status(200).send(err);
            } else {
                res.json(todos);
            }
        });
    });

    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) {
                res.status(200).send(err);
            } else {
                // respond with the new todo
                res.json(todo);
            }
        });
    });

    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err) {
                res.status(200).send(err);
            } else {
                // respond with the remaining todos
                Todo.find(function (err, todos) {
                    if (err) {
                        res.status(200).send(err);
                    } else {
                        res.json(todos);
                    }
                });
            }
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: './public' }); // load the single view file (angular will handle the page changes on the front-end)
    });
};
