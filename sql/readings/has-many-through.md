# Associations II: `has_many :through`

## The problem

You've defined two kinds of associations: `belongs_to` associates a record
holding a foreign key to the record the key points to, while `has_many`
associates a record with one or more entities that hold a foreign key pointing
to it.

What about indirect relations? For instance, consider the following example:

```ruby
class Physician < ApplicationRecord
  has_many(
    :appointments,
    class_name: 'Appointment',
    foreign_key: :physician_id,
    primary_key: :id
  )
end

class Appointment < ApplicationRecord
  belongs_to(
    :physician,
    class_name: 'Physician',
    foreign_key: :physician_id,
    primary_key: :id
  )

  belongs_to(
    :patient,
    class_name: 'Patient',
    foreign_key: :patient_id,
    primary_key: :id
  )
end

class Patient < ApplicationRecord
  has_many(
    :appointments
    class_name: 'Appointment',
    foreign_key: :patient_id,
    primary_key: :id
  )
end
```

Here both a `Physician` and a `Patient` may have many appointments. What if you
want to get all the `Patient`s who have an `Appointment` with a given
`Physician`? One way to do this is to get the `Appointment`s for the
`Physician`, then loop through these to get the `Patient` objects:

```ruby
patients = physician.appointments.map do |appointment|
  appointment.patient
end
```

Holy multiple lines of code, Batman! More importantly, note that each call of
`appointment.patient` will fire another DB query; if a `Physician` has 100s of
`Appointment`s, this will fire 100s of DB queries. Running 100s of queries will
really, really slow down your app.

This is called an `N+1` query: you do one query for the first fetch of
`appointments`, and then `N` queries for `patient`, one for each of `N`
appointments. As a `Physician` gains more `Appointment`s, this will become 
slower and slower.

There has to be a better way.

## The solution: `has_many :through`

You can use a new kind of association, `has_many :through`, that connects two
existing associations. **Important note**: a **`has_many :through` association
has nothing to do with traditional `has_many`**.

```ruby
class Physician < ApplicationRecord
  has_many(
    :appointments,
    class_name: 'Appointment',
    foreign_key: :physician_id,
    primary_key: :id
  )

  has_many :patients, through: :appointments, source: :patient
end

class Appointment < ApplicationRecord
  belongs_to(
    :physician,
    class_name: 'Physician',
    foreign_key: :physician_id,
    primary_key: :id
  )

  belongs_to(
    :patient,
    class_name: 'Patient',
    foreign_key: :patient_id,
    primary_key: :id
  )
end

class Patient < ApplicationRecord
  has_many(
    :appointments
    class_name: 'Appointment',
    foreign_key: :patient_id,
    primary_key: :id
  )

  has_many :physicians, through: :appointments, source: :physician
end
```

A `has_many :through` association associates records *through* other tables. The
most typical case is the one presented here: where two models are related in a
many-to-many way through an intermediary **join table**. In this case,
`Physician` and `Patient` are associated through an intermediary `appointments`
table.

Let's pull apart the `has_many :through` association. Take the example:

```ruby
has_many :patients, through: :appointments, source: :patient
```

The critical thing is to note that `:through` and `:source` name **other
associations**. `has_many :through` links existing associations. First define
these underlying associations and then you can stitch them up using `has_many
:through`.

A `has many :through` association can be thought of as a two step process. Step
one is to travel through the `:through` association on the model; in this case,
`Physician#appointments`. Note that it is necessary to have defined an
`appointments` association on `Physician`.

The next step is to continue on from the `Appointment` to `Patient`. It does
this by using the `:source` association name; the second step is to follow the
`Appointment#patient` association. Again, this association must be defined.

It is worth stressing this point: **a `has_many :through` association simply
names two existing associations and links them up**. First the `:through`
association is traversed, then the `:source` association.

You **must not** specify low-level details like `:class_name`, `:foreign_key`,
and `:primary_key`; they are not relevant. `has_many :through` works at the
level of associations, not tables.

`:source` is an unfortunate, unclear name. You can think of it as "step two" in
your mind.

## The SQL and the damage done

Okay, how does `has_many :through` work? What SQL does it generate? As a
refresher, consider `Physician#appointments` and `Appointment#patient`:

```ruby
physician.appointments
# SELECT
#   appointments.*
# FROM
#   appointments
# WHERE
#   appointments.physician_id = ?

appointment.patient
# SELECT
#  patients.*
# FROM
#  patients
# WHERE
#  patients.id = ?
```

Through a process that should seem magical to you right now, `has_many :through`
will combine the two associations into a single query using a `JOIN`:

```ruby
physician.patients
# SELECT
#  patients.*
# FROM
#  appointments
# JOIN
#  patients ON appointments.patient_id = patients.id
# WHERE
#  appointments.physician_id = ?
```

Notice that you need a join here: you want to return patient information, but
you also need appointment information to see if the patient is scheduled with
the doctor.

Note, too, that you need all the underlying information of the constituent
associations: you need `class_name`/`foreign_key`/`primary_key` from each of the
associations you are building the `has_many :through` from. You do not, however,
need any additional information beyond this. That's why you don't need to
specify these attributes with the `has_many :through`. It uses the attributes of
the underlying associations which were already specified when those associations
were defined.

### More degrees of separation

In the examples above, the `:through` was a `has_many` association and the
`:source` was a `belongs_to` association.

`has_many :through` doesn't care about the kind of associations though. You
could go `:through` a `belongs_to` to a `:source` of `has_many`. Or you could
combine two `has_many` associations.

You can even link objects that are further separated by using a `has_many
:through` association as the `:through` or `:source` (or both!). This will
necessitate more `JOIN`s, but it will still be a single query.

The point is that `has_many :through` does not care about the kind of underlying
associations. It is smart and knows how to build a query from any pair of
constituent associations.
