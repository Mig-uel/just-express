# Just Express (with a bunch on Node and HTTP)

## Before Express

1. **HTTP**

- What is HTTP? TCP/UDP?
- How does it work?

2. Node.js

- Vanilla Web Server

### How the Internet Works - TCP/UDP

As a user of the internet you connect to things like websites, video games, and other services. Sometimes this is referred as connecting to the cloud. The cloud does not actually exist. It is a whole bunch of computers connected to each other. These computers are called servers.

What is actually getting passed around are called packets. Packets are small bits of data that are sent from one computer to another. Data is getting passed back and forth between your computer and the server.

As a server, we ingest these packets and send back a response.

There a five basic layers of the packet:

1. Application Layer
2. Transport Layer
3. Network Layer
4. Data Link Layer
5. Physical Layer

**Physical Layer**: The physical layer is the actual physical connection between the two computers. This could be a wire, a fiber optic cable, or even a satellite connection.

**Data Link Layer**: The data link layer is responsible for taking the packets and converting them into a format that can be sent over the physical layer. This is where the MAC address comes into play. This could be your wifi card or your ethernet card. This is where the packets are converted into electrical signals.

**Network Layer**: The network layer is responsible for routing the packets to the correct destination. This is where the IP address comes into play. This is where the packets are sent to the correct destination.

**Transport Layer**: The transport layer is responsible for taking the packets and converting them into a format that can be sent over the network layer. This is where the TCP/UDP protocol comes into play. This is where the packets are sent to the correct port. The network layer and transport layer go together very closely. They form Internet Protocol Suite (TCP/IP).

**Application Layer**: The application layer is responsible for taking the packets and converting them into a format that can be read by the application. This is where the HTTP protocol comes into play. This is where the packets are sent to the correct application. This is where we as developers come into play. We are responsible for building the application that will take the packets and convert them into something that the user can understand.

HTTP is a protocol that is built on top of TCP. It is a way for us to send packets back and forth between the client and the server. It is a way for us to send data back and forth between the client and the server.

The transport layer creates 2^16 ports. These ports are used to send data back and forth between the client and the server. The client sends a request to the server on a specific port. The server sends a response back to the client on a specific port.

Ports are like doors. A request is sent to a specific door. The server sends a response back to the same door.

An application will issue a network request and originate from a specific port. That request will get handed off to the transport layer. The transport layer will take that request and wrap it up in a segment. Inside of the segment will be metadata with the destination port and the source port. It will then hand it off to the network layer.

There are two different types of transport layer protocols: TCP and UDP.

**UDP (User Datagram Protocol)** is a lightweight protocol that is 8 bytes for the header. It is a connectionless protocol. Even if the other computer does not want to hear from you, you can still send data to it and don't have to wait for a connection.
UDP will send data no matter what. What happens if there is packet loss? UDP does not care. It will just keep sending data. What if the packets arrive out of order? UDP does not care. It will just keep sending data.
It is used for things like video games, where you need to send a lot of data very quickly. It is not reliable. It is like sending a letter in the mail. You don't know if it will get there. You just send it and hope for the best.
UDP is consistent and fast but not reliable.

**TCP (Transmission Control Protocol)** is a connection based protocol, it is a three way handshake. Before transmitting any data, you have to establish a connection. The client says "Hey, I want to talk to you." The server says yes or no. If the server says yes, the data starts to flow. If the server says no, the connection is closed.
TCP is reliable because you know that the connection is going to be established. TCP has delivery acknowledgement, meaning every time the data comes through the server, the server will send back a message saying "I got the data." If the server does not get the data, it will ask for it again.
TCP also retransmits data and will put the data back in order. If the data arrives out of order, TCP will put it back in order.
TCP is used for things like websites, where you need to make sure that the data is getting there.
TCP also has congestion control. If the server is getting too much data, it will slow down the data. If the server is not getting enough data, it will speed up the data.
It is reliable but slower than UDP.

TCP vs UDP

- TCP is connection based, UDP is connectionless
- TCP is reliable, UDP is not
- TCP is slower, UDP is faster
- TCP is used for websites, UDP is used for video games

### What is an HTTP Request and How Does it Work?

HTTP protocol lives in the application layer. It is built on top of the TCP protocol. HTTP doesn't just pass HTML anymore. It can pass images, videos, and other types of data.

HTTP is based on TCP which is part of the transport layer. Even though TCP/IP are used to help the computers find each other, if the request is initiated in HTTP, the computers both need to know how to speak HTTP.

HTTP as a protocol is incredible efficient. TCP remains connected until all the data has been sent. HTTP does not have to stay open and only stays connected if required. Once the request arrives, the machines will disconnect from each other. As soon as the responder is ready, the HTTP connection will re-established across TCP and will send the response.

HTTP is stateless which means there is no dialogue. The machines only know about each other for as long as the connection is open. As soon as the connection closes, everything is forgotten. If they need to talk again, they have to start completely over again.

HTTP messages are usually all text. The start line is the first line of the message. It tells the server what to do. The headers are key value pairs that give the server more information about the request. The body is the actual data that is being sent.

An HTTP message is made up of three parts:

1. Start Line

- Request Line

  - Method
  - Path
  - Protocol Version

- Response Line
  -HTTP Version
  - Status Code

2. Headers: specifies the request or describes the body included in the message, basically metadata about the message

- Key-Value Pairs
  - Content-Type (MIME Type)
  - Content-Length

Theres always a blank line between the headers and the body to indicate the end of the headers.

3. Body: the actual data that is being sent (HTML, JSON, etc.)

## Express 101

Express is a Node.js module that is used for building web applications. It is a flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

Node.js is the language. Google Chrome's V8 JavaScript Engine is the runtime. Express is the framework.

Node.js is written in C and reads or runs JavaScript. It is a runtime that allows you to run JavaScript on the server.

## Brief Recap

- Networking - HTTP, TCP/UDP

  - TCP and IP work together to send packets back and forth between the client and the server
  - TCP is connection based, UDP is connectionless
  - TCP is stateless
  - HTTP is a protocol that is built on top of TCP
  - HTTP messages are made up of three parts: start line, headers, and body
  - Request Line: Method, Path, Protocol Version (GET /index.html HTTP/1.1)
  - Response Line: HTTP Version, Status Code (HTTP/1.1 200 OK)
  - Headers: Key-Value Pairs (Content-Type: text/html)\
  - Blank Line: between headers and body
  - Body: the actual data that is being sent (HTML, JSON, etc.)

- Node Server

  - Node.js is a runtime that allows you to run JavaScript on the server
  - Used the `http` module to create a server
  - Wrote our headers and body in the response object
  - Manually closed the connection
  - Used the `listen` method to listen on a specific port
  - The transport layer creates 2^16 ports that are used to send data back and forth between the client and the server
  - The client sends a request to the server on a specific port
  - The server sends a response back to the client on a specific port

- Express

  - Express is a Node.js module that is used for building web applications
  - Express is a flexible Node.js web application framework that provides a robust set of features for web and mobile applications
  - Express is middleware that sits between the client and the server
  - Build our own router that routes requests to the correct handler
  - Each route has a handler that sends back a response
  - Handlers take in a request and response object
  - Used the `listen` method to listen on a specific port
  - Served static files using the `express.static` method

- Express Middleware

  - Middleware is a function that has access to the request object, the response object, and the next middleware function in the application's request-response cycle
  - Middleware can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware function in the stack
  - Middleware can be application level, router level, error handling, or built-in
  - Middleware can be used to log requests, authenticate users, parse the body of the request, and more
  - Middleware can be used to serve static files, parse the body of the request, and more
  - We use the `app.use` method to use middleware
  - We use the `next` method to pass control to the next middleware function
  - We used the `express.json` method to parse the body of the request when the `Content-Type` is `application/json`
  - We used the `express.urlencoded` method to parse the body of the request when the `Content-Type` is `application/x-www-form-urlencoded`
  - We used the `Helmet` middleware to secure our application by setting various HTTP headers

- Request Object

  - The request object is an instance of `http.IncomingMessage`
  - The request object contains information about the request
  - The request object contains the request method, the request URL, the request headers, the request body, and more
  - The request object is passed to the request handler as the first argument
  - We used the `req.ip` method to get the IP address of the client
  - We used the `req.path` method to get the path of the request
  - We used the `req.body` method to get the body of the request

- Response Object

  - The response object is an instance of `http.ServerResponse`
  - The response object contains information about the response
  - The response object contains the response headers, the response body, and more
  - The response object is passed to the request handler as the second argument
  - We used the `res.send` method to send a response back to the client
  - We used the `res.sendFile` method to send a file back to the client
  - We used the `res.locals` method to pass data from one middleware function to another
  - We used the `res.json` method to send a JSON response back to the client
  - We used the `res.status` method to set the status code of the response

## Choose Your Weapon: API vs. Server Side Rendering

### The Server

- **OS**: Windows, Mac, Linux, Unix, etc.
- **Server**: Apache, Nginx, IIS, Node, WebSphere, TomCat, etc.
- **Database**: MySQL, PostgreSQL, MongoDB, etc.
- **Programming Layer**: PHP, Ruby, Python, Java, .NET, Node, etc.
- **Frontend**: HTML, CSS, JavaScript, etc.

These pieces make up the server. The server is responsible for serving up the website. It is responsible for taking the request and sending back the response.

What can come back is HTML, CSS, JavaScript, images, videos, etc. The server processes the request and sends back the response.

The programming language and the database work together to create the website. It is given to the server and the server sends it back to the client.

With Express, we will use `res.render` to render a view. We will use a templating engine like EJS to render the view. This is server side rendering.

### The API

Instead of sending back HTML, we can send back JSON. We can send back data. We can send back an object. We can send back an array. We can send back a string. We can send back anything.

The client can take this data and do whatever it wants with it. It can render it on the page. It can save it to a database. It can send it to another server. It can do whatever it wants with it.

We are still responsible for processing the request and sending back the response. We are just sending back data instead of HTML.

With Express, we will use `res.json` to send back JSON.

### Server Side Rendering vs. API

- **Server Side Rendering**

  - The server processes the request and sends back the response
  - The server sends back HTML, CSS, JavaScript, images, videos, etc.
  - The server is responsible for creating the website
  - The server is responsible for rendering the view
  - The server is responsible for sending back the response
  - Can make use of session management, cookies, and more

- **API**

  - The server processes the request and sends back the response
  - The server sends back data
  - The client can take this data and do whatever it wants with it
  - The server is responsible for sending back the response

## View Engine

A view engine allows us to render views. It allows us to render HTML, CSS, JavaScript, and more. It allows us to render dynamic content. It allows us to render data.

## Brief Recap (Part 2)

`express.Router()`: A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

`app.param()`: Bind callback functions to parameters. Parameter middleware is executed when a parameter is present in a route path.

`app.set()`: Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.

`req.cookies`: An object that contains cookies sent by the request.

`req.query`: An object containing a property for each query string parameter in the route. If there is no query string, it is an empty object.

`res.cookie()`: Sets a cookie with the name, value, and options.

`res.clearCookie()`: Clears the cookie specified by name.

`res.render()`: Renders a view and sends the rendered HTML string to the client.

`res.redirect()`: Redirects the request to a specified URL.

`router.all()`: This method is just like the standard router.METHOD() methods, except it matches all HTTP methods (verbs).

`router.route()`: Returns an instance of a single route, which you can then use to handle HTTP verbs with optional middleware.

`res.headersSent`: Boolean property that indicates if the headers have been sent to the client.

`res.locals`: An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request/response cycle (if any).
