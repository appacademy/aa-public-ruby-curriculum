# SQL

## A Brief History

SQL, short for Structured Query Language, was created in the early 1970s at IBM
to manipulate and retrieve data in their database management system. In the
late 1970s, Relation Software, Inc. (now Oracle Corporation) built on the SQL
concepts from IBM to develop their own SQL-based relational database management
system (RDBMS). In 1979, they introduced the first commercially-available
implementation of SQL, Oracle V2.

Today, Oracle remains one of the key players in SQL products, but there are
many different databases and implementations of SQL. Most of them don't follow
all of the SQL standards and are therefore inconsistent with one another. As a
result, it is rarely possible to port SQL code from one database to another
without modification. In particular, there is great variation in how different
implementations handle date and time syntax, `NULL`s, string concatenation, and
comparison case sensitivity. One notable exception is PostgreSQL, which strives
to comply with all of the SQL standards.

## SQL versus NoSQL

Non-relational databases have existed since the 1960s. They declined in
popularity with the advent of SQL from the early 1980s up to 2010, at which
time their approach to data storage and retrieval went through a resurgence. It
was at this time that the moniker "NoSQL" came about. NoSQL implementations
like MongoDB have been relatively popular since the 2000s.

There is quite a debate about whether SQL or NoSQL is better. Speaking
generally, there is no definitive answer: each is better suited to different
purposes, so the choice of database system should depend on the project. At the
most basic level, SQL and NoSQL differ in how they store data; operations like
inserting, retrieving, and updating data accordingly happen very differently.

SQL stores data in tables. NoSQL stores data in forms other than tables. These
other forms can be graphs, key-value pairs, or one of many other options, but
most commonly they are documents. Documents are very similar to JSON objects
with field-value pairs. For example, our NoSQL database might store a user like
this:

```
{
  username: "mongoDB4ever",
  email: "alexa@gmail.com",
  password_digest: "Ke&63h1z$mK9jd37n"
}
```

So instead of rows, NoSQL has documents. These documents can be stored in
collections, which are similar to SQL's tables in that they hold and organize
related entries in the database. Beyond that, however, they are quite different.
Unlike tables, collections do not have a schema. They are not restricted to
particular columns/fields. They do not require specific data types, like
strings, integers, or dates. They are much more flexible. This means that the
design does not have to be specified upfront.

It also means that joins are not possible in NoSQL. We have no guarantee of
specific columns to use for key-matching (i.e., foreign key and primary key)
like we do in SQL, and even if we did give every document the same field, there
is no function built in to link them. As a result, NoSQL is often implemented so
that a single document holds any related information. Our user document in NoSQL
might look like this, then:

```
{
  username: "mongoDB4ever",
  email: "alexa@gmail.com",
  password_digest: "Ke&63h1z$mK9jd37n",
  featured_photo: {
    url: "https://imgur.com/FRK6meX",
    caption: "best pizza ever"
  }
}
```

In SQL, we would probably have stored this photo in a separate photos table and
simply had the user store the photo's `id` to reference the photos table. This
technique of not storing duplicate information but instead storing a reference
to it is known as **normalization**. NoSQL typically uses **denormalization**.

Denormalization is useful for speed in that a single simple query can retrieve
all of the information we need. For this reason, NoSQL is often cited as being
faster than SQL. However, this duplication of information means that any time we
want to change some data, we need to update the same thing in multiple places,
which is slower.

SQL also has the option of using transactions. We can ensure that an update to
two different tables happens successfully, or roll back all of the changes if
one of the tables fails to update. NoSQL has ways to mimic transactions, but
they must be done manually.

Check out this [article][sql-no-sql] if you're interested in learning about
these differences in greater depth.

[sql-no-sql]: https://www.sitepoint.com/sql-vs-nosql-differences/

## Flavors of SQL / NoSQL

There are many different databases available. Many of the popular ones today use
SQL and are relational. A few (MongoDB, Redis) are not. Database implementations
vary (sometimes widely) in the following attributes:

**Licensing & Pricing**: Open source, free, paid, subscription, etc.

**Limits**: Maximum database size, table size, row size, etc.

**DB Capabilities**: Types of joins, storage of multimedia objects, etc.

**Supported Data Types**: `DATETIME` versus separate `DATE` and `TIME`, number
and string options, etc.

**Access Control Features**: Different rules and processes available for
maintaining security

**Ease of Setup**: How much configuration is necessary

### Specific SQL/NoSQL Implementations

NB: Some companies may use multiple implementations of SQL or NoSQL or both. The
best implementation for the job will depend on the type of tool or application
they are building and what their priorities for it are. For example, a company
might use MySQL for an internal messaging tool but use Redis for their main
customer-facing application.

#### PostgreSQL

Known for: being open-source, most standard-compliant, easy set up.

Used by: Instagram, Netflix, Uber, Postmates, Reddit, Spotify, 500px

#### SQLite

Known for: very easy setup, no separate server process, being lightweight and
portable

Used by: Rumble, Empatica, Spire, Initia

#### MySQL

Known for: being open-source, wide usage, cross-platform support, ease of use

Used by: Twitter, Dropbox, Vine, 9GAG, Pinterest, Tumblr, Github

#### Oracle

Known for: reliability, enterprise scale

Used by: LinkedIn, Netflix, Ebay, HealthExpense, iFactor

#### MongoDB

Known for: Document-oriented storage (NoSQL), being open source, high
performance, ease of use, flexibility, easy maintenance

Used by: Hootsuite, Uber, Foursquare,

#### Redis

Known for: Performance, advanced key-value cache storage (NoSQL), easy
deployment, being open source, speed

Used by: Twitter, Instagram, 9GAG, Vine, Hootsuite, AirBnb, Uber, Medium

## Terminology

**SQL** - Structured Query Language
- E.g. "There are many types of joins in SQL."

**RDBMS** - Relational Database Management System
- E.g. "Oracle is a popular RDBMS because of its enterprise scale."

**Query** - An operation that retrieves data from one or more tables; describes
desired data, leaving the database management system to plan, optimize, and
carry out the operations necessary to produce the results
- E.g. "Our query should retrieve all of the users and their photos."

**Three-Valued (Ternary) Logic** - A many-valued logic system with three truth
values: True, False, and Unknown (null)
- E.g. "SQL's use of ternary logic means that we must explicitly check for NULL."

**Transaction** - A unit of work performed against a database that is treated
in a coherent and reliable way; all of the work within a transaction must
succeed, or it is rolled back entirely, i.e. "all or nothing"
- E.g. "Because these operations are in a transaction, we can trust that
  our data will be consistent across both tables."

**Normalization** - An approach to database storage that practices storing
references to information that lives in a different location rather than
duplicating it and storing it in multiple places; antonym: denormalization
- E.g. "SQL implementations are typically normalized and therefore avoid
  repetition of the same data in multiple tables."
