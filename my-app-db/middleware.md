## Intro - Express
Express serves as a routing and Middleware framework for handling the different routing of the webpage and it works between the request and response cycle.

### 1. Middleware gets executed after the server receives the request and before the controller actions send the response. 
### 2. Middleware has and access to the request object, responses object, and next, it can process the request before the server sends a response.
### 3. An Express-based application is a series of middleware function calls.

### 4. Middleware is a request handler that allows you to intercept and manipulate requests and responses before they reach route handlers

### 5. It is a flexible tool that helps in adding functionalities like logging, authentication, error handling, and more to Express applications. 

## Middleware - Arguments

### 1. Middleware functions take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle, i.e., two objects and one function.

### 2. Middleware functions execute some code that can have side effects on the app and usually add information to the request or response objects.

### 3. They are also capable of ending the cycle by sending a response when some condition is satisfied. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().


## Differnet Types Middlewares
### 1. Built-in middleware: Provided by Express (e.g., express.static, express.json, etc.).
### 2. Third-party middleware: Developed by external packages (e.g., body-parser, morgan, etc.).
### Application-level middleware: Bound to the entire application using app.use() or app.METHOD() and executes for all routes.
### Router-level middleware: Associated with specific routes using router.use() or router.METHOD() and executes for routes defined within that router.


## Advantages of using Middleware
### => Middleware can process request objects multiple times before the server works for that request.
### => Middleware can be used to add logging and authentication(jwt) functionality.
### => Middleware improves client-side rendering performance.
### => Middleware is used for setting some specific HTTP headers.
### => Middleware helps with Optimization and better performance.