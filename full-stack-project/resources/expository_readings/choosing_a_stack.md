# Choosing a Stack

## What does "stack" mean?

An app's "stack" refers to the set of systems that the app uses to run. For many apps, this list of systems can grow very long, and a full accounting of any  large app's stack could easily list ten or more systems. A company's choice of stack can determine many things about their development. At a most basic layer, a choice of a certain operating system for a stack will determine what kind of servers they will buy, and how they will configure them. Similarly, a choice of one database management system versus another could mean a very different way of structuring and handling the company's data, and choosing one language over another will determine whom the company will hire and what web frameworks can be used to speed development.

In general, the server side of the stack is where a company has the most freedom to decide what stack to use, while on the frontend, some parts of a stack can be mandatory. If you want to create an interactive web app, you will need to have JavaScript running in the browser; the same principle can apply to making native iOS (you will need Objective-C or SWIFT) or Android (Java) applications.

## How to choose a stack

In general, the most important thing that a stack can do for a company is help them develop quickly. The faster they can create an MVP and start getting feedback on it, the better. To that end, the major considerations when choosing a stack are as follows:

### Tool ecosystem

The term "tool ecosystem" refers to the set of tools that are available in a given programming language or operating system. In many cases, tools exist that can provide major pieces of functionality to an app. These tools may have varying levels of documentation and support, or may limit the viable options elsewhere in the stack (e.g., a tool might require an RDBMS and might not work with a NoSQL database).

Considerations regarding tool ecosystems include:
+ What open-source tools can you use to speed up development?
+ How well-supported (well-documented, up-to-date, &c.) are those tools?
+ What requirements do those tools have (programming language, database management system, &c.)?

### Finding employees / contributors

An app needs to be built and maintained by developers. If a company chooses a stack that uses unpopular or arcane technologies, it can be very difficult to find people to work on their product; conversely, a choice of a very popular language or framework can make it easy to find qualified developers.

For solo developers, these considerations are just as important. Picking a stack that uses technologies that you are unfamiliar with means that you can't be as productive because you need to spend time learning.

Considerations regarding finding contributors include:
+ How familiar are you with each piece of the stack you are choosing? 
+ How many developers work with the language / framework / database management system / operating system / frontend web framework that you are considering?
+ What choices can you make to ensure that it will be as easy as possible to find experienced, enthusiastic developers?

### Scalability

Considerations regarding scalability include:
+ How does a given stack handle scaling?
+ Are there any foreseeable bottlenecks or known logistical problems with that stack once it starts getting to a certain scale?

This concern is often discussed, and becomes very important once the app has become successful, but is much less important than the previous two considerations in most circumstances.

## Some common stacks

Shorthand descriptions of software stacks are generally described as being composed of the following pieces, in the following order:
+ Operating System
+ Web Server
+ Database Management System
+ Programming Language
+ Server-side Web Framework (optional)
+ Frontend Web Framework (optional)

Note that the above order can change if the components of the stack don't fit neatly into the above categories, or if the acronym would be better if their order were rearranged.

Stacks that are common enough to have acronyms (or backronyms) include:
+ LAMP
  + Linux (operating system)
  + Apache (web server)
  + MySql (database management system)
  + PHP (programming language)
+ MEAN
  + MongoDB (database management system)
  + Express.js (app controller layer written in JavaScript)
  + Angular.js (web app presentation written in JavaScript)
  + Node.js (web server written in JavaScript)
+ LYME
  + Linux
  + Yaws (web server - written in Erlang)
  + Mnesia (database management system - written in Erlang)
  + Erlang (programming language)
+ LEAP
  + Linux
  + Eucalyptus (open-source alternative to AWS Elastic Compute Cloud)
  + AppScale (open-source alternative to Google App Engine)
  + Python (programming language)
+ XAMPP
  + X (operating system)
  + Apache
  + MySQL
  + PHP
  + Perl (programming language)
+ BCHS
  + BSD (operating system)
  + C (programming language)
  + httpd (web server)
  + SQLite (database management system)

There are also some slight variations on popular stacks that get their own acronyms, including:
+ LAPP
  + Linux
  + Apache
  + Postgres (database management system)
  + PHP
+ MERN
  + MongoDB
  + Express.js
  + React.js (web app presentation)
  + Node.js

**Note:** Breakdowns of popular companies' stacks are visible at sites like [stackshare](https://stackshare.io/) and [siftery's analysis of YC companies](https://siftery.com/groups/y-combinator-portfolio?activetab=products_used).