# Metaprogramming MetaCorgis

Today we'll use metaprogramming to refactor an unwieldy `CorgiSnacks` class.

## Phase 0: Tour the Code!

**Download and scan over the [skeleton][skeleton] briefly before continuing
below.**

[skeleton]:
  https://assets.aaonline.io/fullstack/sql/homeworks/meta_corgis/skeleton.zip?raw=true

### SnackBox Class

The `SnackBox` class represents our database.

The database has three boxes of corgi snacks, stored in the `SNACK_BOX_DATA`
constant. Each box has three corgi snacks - a bone, kibble, and a treat.

It also has methods defined to tell us the info and tastiness rating of a given
snack in whichever box we specify - e.g. `get_{snack}_info` and
`get_{snack}_tastiness`. So if we wanted to know the tastiness level of the bone
in box two, we would simply call `get_bone_tastiness(2)` on an instance of
`SnackBox`.

### CorgiSnacks Class

The `CorgiSnacks` class serves as an interface with our database.

`CorgiSnacks` must contain a reference to the database (an instance of
`SnackBox`) and its `box_id` within the database. We should be able to call
`bone`, `kibble`, or `treat` on any instance of `CorgiSnacks` and get back a
statement of the info and tastiness level of that snack.

### Test Drive

Do a quick test of the code to get more familiar with how it all fits together.

Check out the `SnackBox`'s instance methods to get snack info and tastiness
levels:

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> snack_box = SnackBox.new
pry(main)> snack_box.get_bone_info(1) # => "Phoenician rawhide"
pry(main)> snack_box.get_kibble_tastiness(3) # => 45
```

Then test out the `CorgiSnacks` class:

```ruby
pry(main)> snacks = CorgiSnacks.new(snack_box, 1)
pry(main)> snacks.bone # => "Bone: Phoenician rawhide: 20"
pry(main)> snacks.kibble # => "* Kibble: Delicately braised hamhocks: 33"
```

## Phase 1: Refactor with `#method_missing`

When we call any snack instance method on a snack_box, we get back a very
similar result:

- a star if the tastiness level has gone above 30,
- the snack type,
- the snack description,
- and the tastiness level.

It is repetitive and not modular to have all three methods defined on the
`CorgiSnacks` class when they follow the same pattern.

- Using a `method_missing` instance method, re-factor `CorgiSnacks` into the new
  `MetaCorgiSnacks` class to DRY things up!
- Hint: Within `#method_missing` use `#send` to call methods on your
  `@snack_box`. You can interpolate to get the method name, and then pass the
  method name to `#send`
- Review the metaprogramming reading if you need a reminder on
  how to use `#send`.

If you've got it working correctly, its behavior should be the same as before,
just a lot DRY-er!

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> snack_box = SnackBox.new
pry(main)> meta_snacks = MetaCorgiSnacks.new(snack_box, 1)
pry(main)> meta_snacks.bone # => "Bone: Phoenician rawhide: 20 "
pry(main)> meta_snacks.kibble # => "* Kibble: Delicately braised hamhocks: 33"
```

## Phase 2: Refactor with Dynamic Dispatch

Let's refactor the class to use dynamic dispatch instead of `method_missing`.

- **Comment out** the `MetaCorgiSnacks#method_missing` instance method from the
  previous phase.
- Write a new **class** method called `::define_snack` that uses
  `::define_method` to dynamically build each of the snack methods (`bone`,
  `kibble`, and `treat`) on the `CorgiSnacks` class.
- Once again, you'll want to use `#send` to call the right methods on the
  `@snack_box`. This will look basically like Phase 1.

Your class should function like this now:

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> MetaCorgiSnacks.define_snack("bone")
pry(main)> snack_box = SnackBox.new
pry(main)> meta_snacks = MetaCorgiSnacks.new(snack_box, 1)
pry(main)> meta_snacks.bone # => "Bone: Phoenician rawhide: 20 "
pry(main)> meta_snacks.kibble # => "NoMethodError: undefined method `kibble'...""
```

Almost there! Now we just need to automatically call `CorgiSnacks::define_snack`
for each snack upon initialization.

- How do we know what the different snacks are?
- One way to tell is to call `#methods` on our `@snack_box`.
- This will give us back an array of all the methods defined on that object.
- Then we can match the ones we care about using [grep][grep].
  - If we pass `grep` the argument `/^get_(.*)_info$/`, it will match any
    methods that are some variation of `get_{snack}_info` and "capture" the
    snack name - the `(.*)` tells it to capture any number of characters that
    come between `get_` and `_info`.
  - We can then use `$1` to get back the matching snack name that was captured.
  - So we can pass the block `{ MetaCorgiSnacks.define_snack $1 }` to our `grep`
    call, and it will call `::define_snack` with each snack name.

You should call something like this in the `initialize` method:

```ruby
snack_box.methods.grep(/^get_(.*)_info$/) { MetaCorgiSnacks.define_snack $1 }
```

This should work as before again, without having to call
`MetaCorgiSnacks.define_snack("bone")` first!

```ruby
pry(main)> load 'meta_corgis.rb'
pry(main)> snack_box = SnackBox.new
pry(main)> meta_snacks = MetaCorgiSnacks.new(snack_box, 1)
pry(main)> meta_snacks.bone # => "Bone: Phoenician rawhide: 20 "
pry(main)> meta_snacks.kibble # => "* Kibble: Delicately braised hamhocks: 33 "
pry(main)> meta_snacks.treat # => "Treat: Chewy dental sticks: 40 "
```

[grep]: http://ruby-doc.org/core-2.3.1/Enumerable.html#method-i-grep
