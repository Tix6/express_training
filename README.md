# Express training
  
## Instructions
Use just node, express and babel-node to run your server.  
Use `morgan` middleware to output requests.  
Use `body-parser` middleware.  

### First part
* Build an express server made of below services :  

1. `GET /ping`
returns json “{ “ping”: “pong” }”  

2. `GET /add/<X>/<Y>`
returns json { result: X+Y }  
If X or Y cannot be casted to numbers, returns 500  

3. Do the same with `GET /add/?op1=X&op2=Y`

4. The same with `GET /add/?ops=[X, Y]`

5. Again with `POST /add`
body should be { values: [a,b,c,d,...] }  
returns { result: sum(values) }  
returns 500 with error message { error: message }  

6. `GET /`
returns ‘./public/index.html’.  
See ‘express.static’ middleware.  

### Second part

* Craft a minimalist version of a todo lists server :
> Should returns 500 code in case of an error  

```
const todos = [];
// todo = { id, label }
```

1. `GET /api/todos`
returns [ ...todos ];  

2. `POST /api/todos`
```
body = { todo : { label1 } }
```
todos.push(todo); returns todo;  

3. `PUT /api/todos`
```
body = { id, label };
```
update existing todo returns todo.  

4. `DELETE /api/todos/id`
remove todo’s id from todos returns { id }  


Let’s code ....  
