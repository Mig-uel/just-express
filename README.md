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
