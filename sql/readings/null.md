## NULL and Ternary Logic in SQL

SQL uses **ternary logic**. This means that a conditional statement can evaluate
to `TRUE`, `FALSE`, or `NULL` (unknown). Whaaaa? :open_mouth: And somehow `NULL`
is still 'falsy'? Unfortunately, this won't be the only time you run into logic
that defies intuition. *Stay tuned for Javascript quirks.*

Asking if a `NULL` value `= NULL` will always produce `FALSE`. This is because
`NULL` was derived to represent an unknown value. How can we know if two
unknowns are the same? We can't. Given that this sort of comparison doesn't
yield any useful information, always use `IS NULL` or `IS NOT NULL` in place of
the traditional (`=` or `!=` / `<>`) comparisons.
