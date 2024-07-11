# Self Joins

## What is a self join?

A self join is exactly what it sounds like: an instance of a table joining with
itself. The way you should visualize a self join for a given table is by
imagining a join performed between two identical copies of that table.

Let's take a look at a classic self-join example. This returns each employee's
first and last name along with their manager's.

#### Employee Table

| id             | first_name     | last_name      | manager_id     |
| :------------- | :------------- | :------------- | :------------- |
| 1              | Kush           | Patel          | NULL           |
| 2              | Jeff           | Fiddler        | 1              |
| 3              | Quinn          | Leong          | 2              |
| 4              | Shamayel       | Daoud          | 2              |
| 5              | Robert         | Koeze          | 4              |
| 6              | Munyo          | Frey           | 3              |
| 7              | Kelly          | Chung          | 4              |

```sql
SELECT
  team_member.first_name, team_member.last_name,
   manager.first_name, manager.last_name
FROM
  employee AS team_member
JOIN
  employee AS manager ON manager.id = team_member.manager_id
```

| team_member.first_name | team_member.last_name | manager.first_name | manager.last_name |
| :--------------------- | :-------------------- | :----------------- | :---------------- |
| Jeff                   | Fiddler               | Kush               | Patel             |
| Quinn                  | Leong                 | Jeff               | Fiddler           |
| Shamayel               | Daoud                 | Jeff               | Fiddler           |
| Robert                 | Koeze                 | Shamayel           | Daoud             |
| Munyo                  | Frey                  | Quinn              | Leong             |
| Kelly                  | Chung                 | Shamayel           | Daoud             |

In all the examples you've covered thus far, JOINs were performed on two
different tables (presumably with two different names), which made it easy to
reference a specific column in a table. Since we only deal with one table in a
self join, we have to use **aliases**.

An alias is essentially a nickname for a table (or, in some cases, a column).
This is necessary because the query processor needs to make a distinction
between the duplicates of the same table to JOIN them. Note that the keyword
**AS** is not necessary to alias tables or columns. The above SQL query could be
rewritten:

```sql
SELECT
  team_member.first_name, team_member.last_name,
   manager.first_name, manager.last_name
FROM
  employee team_member
JOIN
  employee manager ON manager.id = team_member.manager_id
```
