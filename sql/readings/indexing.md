# Indexing

Suppose you have a simple query:

```sql
SELECT *
FROM users
WHERE name = 'Mike'
```

Now think back to the Big-O discussion from last week and consider the time
complexity for this query. If you have a table of 100 rows, it's going to have
to check every one of those rows for the name `'Mike'`. This is referred to as a
"table scan" and is `O(n)` time complexity. Now imagine that you actually have
ten million users, and that you're making that query 100 times/sec. Your
database is going to crash, your website will go down in flames, and your boss
will fire your sorry, non-optimizing behind.

This is why it's important to index columns that are heavily used for lookups in
queries. When you index a column, it creates a sorted data structure with
pointers to the actual table. Since it's sorted, lookups can use binary search,
which as you recall runs in `O(log n)` time. Log base 2 of 10 million is about
23, so as you can imagine, this improves database performance (and your career
prospects) **dramatically**.

Remember, though, before you go all index happy, that indexes do have a cost.
They make writes (`INSERT`s, `DELETE`s, and `UPDATE`s) a little more taxing
because the index must be updated. Furthermore, optimizations made outside of
the bottleneck are no optimizations at all. So it's important to index the
**right** things, or you might as well have indexed **nothing**.

On that note, **foreign keys** are pretty much always a good choice for indexing
because they're frequently used in both `WHERE` clauses and `JOIN` conditions,
both of which can be incredibly taxing when not indexed.

## Indexing a Foreign Key

Now consider a practical example.

```ruby
class User < ApplicationRecord
  has_many :conversations, foreign_key: :user_id
end

class Conversation < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
end   
```

Given a `Conversation`, you can quickly look up a `User` because `users.id` is
the _primary key_, and the primary key is indexed by definition. But what about
`User#conversations`?

`#conversations` is matching on the foreign key column `conversations.user_id`.
Only primary keys come indexed out of the box, so the generated query (`SELECT *
FROM conversations WHERE user_id = ?`) will require a full table scan. With a
lot of conversations, this could prove perilous for your career.

The solution is to add an index on the desired column. To do this, simply add
`index: true` to the column declaration in an as-yet-unmigrated ActiveRecord
migration:

```rb
class CreateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.bigint :user_id, null: false, index: true

      t.timestamps
    end
  end
end
```

(Remember that you never want to modify a migration after it has run, unless, of
course, it has been rolled back.)

Indexing can be useful for more than just speeding up your queries. If you want
to ensure that a column contains only unique values, you can provide the
`unique` option to an index (database-level `unique` constraints **require** an
index):

```rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
```

To add an index to a column that is already in your table, use the
[`add_index`][add-index-docs] method:

```ruby
class MakeUsernamesUnique < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :username, unique: true
  end
end
```

You can even ensure the uniqueness of **combinations** of values by passing an
array of column names instead of a single column name:

```rb
class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.bigint :user_id, null: false
      t.string :title, null: false
      t.index [:user_id, :title], unique: true

      t.timestamps
    end
  end
end
```

(This alternative syntax of declaring a column of type `index` works for single
column indexes as well.)

This multi-column index ensures that there can be no more than one entry in the
`conversations` table with the same `user_id` and `title` - useful if you want
to allow multiple conversations to have the same title, but not for the same
user.

**Note**: When you set up a composite index on two columns, **order matters**:

1. As part of building the composite index, Rails effectively builds an index
   for the first column, so you don't need a separate index on that column.

2. Your database will only use the index for queries that access columns in the
   index's specified order. For instance, in the example above, the index will
   provide faster queries for `user_id` and, given a `user_id`, `title`, but it
   will not speed up queries for just `title`. In other words, if your app often
   needs to find the titles associated with a given user, `user_id` should come
   first in the composite index. If, in contrast, it often needs to find the
   users associated with a given title, `title` should come first. If both
   scenarios are likely (as can occur, e.g., with a join table), add a composite
   index for each order.

   (As a subsequent reading will show, optimizations in PostgreSQL eliminate
   this need for additional composite indexes differentiated only by the order
   of columns.)

Now go forth and harness the power of indexing!

[add-index-docs]: https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index
