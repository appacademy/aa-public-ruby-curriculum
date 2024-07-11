# Associations III: `has_one` And HABTM

## The `has_one` association

`has_one` is a `has_many` association where at most one associated record will
exist. As a convenience, instead of returning an empty or one-element array,
`has_one` will return the associated object (or `nil`, if the associated object
doesn't exist).

`has_one` is not very common, because it implies that there is a one-to-one
association between two records in the database. In that case, it would be more
typical for those two tables to be merged.

One exception is if one of the tables contains many "wide" columns with a lot of
data that is not likely to be used often. In that case, you may wish to extract
some of the "wide" columns into a table that is related 1-to-1.

## The `has_one :through` association

The `has_one :through` association acts the same as a `has_many :through`. It
signifies that only one record (at most) will be returned, however, so Active
Record knows not to put the record in an array. This is exactly analogous to
what you saw with the traditional `has_one` vs. `has_many`. Because it wouldn't
make sense to use a `has_one :through` which traverses a `has_many` association,
`has_one :through` is only used to connect `belongs_to` and `has_one`
associations.

## The `has_and_belongs_to_many` (HABTM) association

Active Record has a way of defining a many-to-many association without requiring
a model for the intervening join table. This is the `has_and_belongs_to_many`
association. It is a shortcut to writing `has_many :through` associations. All
it does is save you a little more boilerplate.

App Academy does not recommend this approach because join tables often contain
useful information. For instance, an `appointments` table could also include the
start and end time of the appointment. In that case, you'll want an
`Appointment` model class anyway. Your readings will accordingly not spend any
more time discussing HABTM associations, but feel free to look it up yourself if
you want to know more.
