# RSpec Homework

For tonight's homework, you will be implementing some specs for the `Dessert`
class!

Here's what you need to do:

- Download the [project skeleton][rspec-homework]
- Review the __dessert.rb__ and __chef.rb__ files to see what functionality
  exists. Do not edit or add any code to these files.
- In the __dessert_spec.rb__ file, implement all of the pending specs (the `it`
  statements without blocks).
- Run your specs and see that they all pass!

Hints:

You should be using **mocks** for the `Chef` class - don't make actual instances
of the `Chef` class! You want to isolate and test the behavior of the `Dessert`
class on its own. If you get stuck, revisit the Test doubles reading in the
sidebar. The `chef` double has already been created for you, but you will need
to add to it!

**Note:** Technically, this is not Test Driven Development since the `Dessert`
class has already been provided for you. That's okay! The goal for tonight's
homework is to familiarize you with RSpec syntax and methods. Enjoy your
dessert!