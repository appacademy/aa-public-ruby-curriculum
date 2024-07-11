# Automating Automated Testing with Guard

So running `rails` every 45 seconds doesn't seem very automated.
Thankfully, Guard exists. Guard is a library that watches files
for modifications and allows us to specify tasks to run when certain
files are modified.

Guard works with RSpec quite nicely and their integration makes our
tests truly automated.

Check out the [guard-rspec gem][guard-rspec] that takes care of
all this for you.

[guard-rspec]: https://github.com/guard/guard-rspec

You can use the Guardfile on the guard-rspec README in your own
projects.
