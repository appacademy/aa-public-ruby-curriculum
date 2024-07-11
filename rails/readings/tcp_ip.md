# TCP/IP

The Transmission Control Protocol (TCP) and Internet Protocol (IP), commonly called TCP/IP because they are used in conjunction so often, allow computers to pass data to each other.

## History

From the 1950s through the 1970s, various military, governmental, and nongovernmental organizations were interested in developing a large-scale, distributed, survivable communications network. The key philosophies that came out of their research were:
+ decentralizing the network (making sure mutliple paths exist between any two points), 
+ dividing messages into message blocks (which became packets)
+ delivering those messages using the "store and forward" method (an intermediate recipient receives a message, stores and verifies it, and then forwards it towards the end recipient)

IP was originally described in a 1974 paper by the electrical engineers Vint Cerf and Bob Kahn.

# IP

IP is made up of a set of rules for sending information from one computer to another. To that end, it handles both assigning addresses and routing information from a source to a target. This routing process can cross network boundaries - in fact, the description of this process as an inter-network process is what gave the internet its name!

The main functions that the IP standardizes are:
+ finding the next-hop host and sending the packet to that host
+ capturing incoming packets and passing the payloads to the transport layer
+ providing error detection & diagnostics

IP is commonly described as providing "unreliable service" and "best effort delivery." These descriptors are meant to recognize the difficulties involved in sending messages over networks that cannot guarantee quality of service. Therefore, any given packet might get corrupted, lost, or a stream of packets might arrive in the wrong order.

## IP Addresses

An IP address is an identifier assigned to a computer that is connected to a TCP/IP network. There have been two major versions of IP addresses: IPv4, with 32-bit addresses that are usually represented as four numbers separated by dots (e.g., 172.16.254.1); and IPv6, with 128-bit addresses, usually represented as four-character codes separated by colons (e.g., 2001:0DB8:AC10:FE01). The 32 bits in IPv4 addresses allowed up to 2^32 (4,294,967,296) unique IP addresses to be assigned, and while this was once thought to be sufficient, registries had to switch over to IPv6 (which allows up to 2^128 or 340,282,366,921,000,000,000,000,000,000,000,000,000 unique IP addresses) to continue issuing new IP addresses.

## Packets

The term "packet" refers to a formatted unit of data that contains, along with its payload, control information: data for delivering the payload. This control information, stored in the header of the packet, typically includes the source & destination addresses.

Packets are examples of datagrams ("datagram" being a combination of "data" and "telegram"), whose defining characteristic is having enough information to make it from its source to its target without the two computers having previously communicated.

# TCP

TCP is a higher-level protocol running on top of IP. It provides applications with information delivered by IP, but provides additional work by ensuring that the information is reliable, ordered, and error-checked. The protocol maintains reliability despite the essential unreliability of the network by continually sending acknowledgements to the source of the information as it receives packets. As a sender of information, it knows that if it does not receive an acknowledgement that a piece of information has been received then it should send that information again. 

TCP is also responsible for both breaking large pieces of information into packets (to be sent via IP) and reassembling groups of individual packets into information that can be used by applications.

## Handshaking

The protocol also handles "handshaking" between computers. One computer running TCP (Computer A), in order to send another computer running TCP (Computer B) some information, will initiate a handshake process. This process consists of three steps: a "synchronize" message sent from A to B, a "synchronize-acknowledgment" message sent back from B to A, and an "acknowledgment" message sent back from A to B. Once this handshake has happened, the two computers can send information to each other using TCP.

## Ports

TCP uses port numbers to identify application end points on a computer. For example, if you run `rails server` and Rails tells you that your app is now live on `localhost:3000`, that tells you both the IP address of the live site (`localhost`) and the port on which to connect with the site (`3000`). When interacting with other computers, some well-known ports include: 80, for HTTP; 20, for FTP; 22, for SSH; 25, for SMTP; 443, for HTTP over SSL.

# Application Layer

The term "application layer" refers to the abstraction of a set of protocols and interfaces used by computers in a communications network - most generally, it describes applications that interact with TCP. This can include applications that implement protocols including:
+ Telnet
+ FTP
+ SMTP
+ DNS
+ HTTP
+ SSH

This term is most helpful in differentiating the responsibilities of an application (e.g., a browser that implements HTTP), the underlying transport layer (using TCP), and the internet layer (using IP).
