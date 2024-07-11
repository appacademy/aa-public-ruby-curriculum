# MongoDB

The 'M' in MERN stands for MongoDB.

MongoDB is a document-based NoSQL database that is scalable and flexible. This
reading will help you understand what this sentence means by looking at its
various parts.

## Learning Goals

- Understand what MongoDB is and what benefits it offers
- Identify the differences between SQL and NoSQL databases

### Document-based

MongoDB stores data using a document data structure. _Documents_ are JSON-like
objects with key-value pairs. Documents with similar data are stored within
_collections_. To compare it to a relational database, a document is similar
to a row while a collection is similar to a table.

Let's take a look at an example of a `user` document.

```js
{
  _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
  username: "i_love_walking",
  email: "walker@walkingisgreat.com",
  password_digest: "Ke&63h1z$mK9jd37n",
  age: 28,
  address: {
      city: "Generic City Name",
      street: "Somewhere Lane",
      zipcode: 1
  },
  posts: [
      ObjectId("4a1h3m42a5b9d4i9dc405l721"),
      ObjectId("b9x2m45a5b7h7e3ml403a091"),
      ObjectId("1k3b5f87x5s6c7i2mp814g524")
  ]
}
```

You may have noticed that the above document stores several different data
types. This is one of the benefits of using this document data-structure: a
document can contain arrays and even sub-documents. (The sub-document in this
example is the value of the address key.)

#### Embedding

Storing sub-documents within a document is know as _embedding_. Embedding
related information provides better read performance, as well as the ability to
retrieve related data with a single database query. Additionally, embedded data
models make it possible to update related data in a single operation.

You should use an embedded data model when you are trying to model the
following:
  
- One-to-One relationships
- Small One-to-Many relationships

An **important** thing to keep in mind is that MongoDB documents have a size
limit of 16 megabytes. This essentially means that there is a limit to how much
you can embed within a document. A good rule of thumb is if you are expecting to
embed 50 or more sub-documents within a document then you should break those
sub-documents out into their own collection. You can then utilize
_referencing_ to model their relationships.

#### Referencing

You may have also noticed in the example `user` document, there are several
ObjectIds stored within the `posts` array. These ObjectIds hold a reference to a
document in a separate collection. This pattern is known as _referencing_.

Referencing will seem very familiar after working with a relational database.
However, the benefits of embedding are lost when you use referencing. Despite
this, here are a few situations where you might need to use referencing:

- Many-to-Many relationships
- Modeling large hierarchical data sets
- Large One-to-Many relationships

### NoSQL

NoSQL databases are non-relational databases. One of the best ways to understand
them is to compare them to relational databases. This section will break down a
few of the differences.

First, the most basic way that SQL and NoSQL databases differ is in how they
store data. SQL databases store data in tables where each row may represent an
object. NoSQL databases can store data in several different ways other than
tables. These include:

- Documents
- Graphs
- Key-value pairs
- Wide-column stores

As mentioned in the previous section, MongoDB stores data using a document data
structure.

Second, SQL databases require a strict, predefined schema before you are able to
start adding data to it. NoSQL databases have a dynamic schema, meaning you
don't need to have the schema completely defined before adding data to the
database.

Third, SQL databases follow ACID properties while NoSQL databases tend to follow
Brewer's CAP theorem. These acronyms are summarized below, but you are
encouraged to read up on them further.

ACID:

- Atomicity
  - All components of a transaction are treated as a single action.
- Consistency
  - All transactions must follow the defined rules of the database, such as
    constraints.
- Isolation
  - Concurrently executed transactions result in the same database state as if
    they were sequentially executed.
- Durability
  - Once a transaction is committed, it will persist and cannot be undone by
    something like a system failure.

CAP theorem:

- Consistency
  - All duplicates of the same data will be the same value across a distributed
    system.
- Availability
  - All nodes within a system can process operations and respond to queries.
- Partition tolerance
  - The system continues to operate despite any unplanned network connectivity
    loss between nodes.

Given these three components, the CAP theorem states that, in the case of a
network partition/failure, one must choose between consistency and availability.
MongoDB chooses to keep consistency over availability by not accepting writes to
a system until it believes it can safely do so.

Finally, SQL databases are centralized databases, while NoSQL databases are
distributed databases. A centralized database is one that is stored in a single
location. A distributed database is a collection of multiple, logically
interrelated databases.

### Scalable

As mentioned above, NoSQL databases are distributed databases. This makes them
able to be scaled horizontally by just adding more machines to your pool of
resources.

In contrast, centralized databases are vertically scalable. You would have to
add more power (CPU, RAM) to the single machine that holds the database.

Relatively speaking, it is much cheaper and accessible to add additional
machines to a pool than it is to upgrade one machine.

### Flexible

MongoDB's flexibility comes primarily from its utilization of dynamic schemas as
well as the document data structure.

A dynamic schema allows you to start with a basic schema that can be updated
easily. This has been important to more modern apps and companies because it
aids their teams in building a base app quickly and adapting it as needed.

Recall that the document data structure is JSON-like. It is accordingly able to
store a variety of different data types. More importantly, your backend code can
interface with it directly: you no longer need to use an ORM such as Active
Record to map data from a database to an object that you can easily interface
with. This speeds up the development process as you have one less thing to worry
about.
