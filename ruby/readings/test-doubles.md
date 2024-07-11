# Test Doubles

When you write unit tests, you want each of your specs to test just one thing.
This can be a little complicated when you write classes that interact with other
classes. For example, imagine

```ruby
class Order
  def initialize(customer)
    @customer = customer
  end

  def send_confirmation_email
    email(
      to: @customer.email_address,
      subject: "Order Confirmation",
      body: self.summary
    )
  end
end
```

Here an `Order` object needs a `Customer` object; the associated `Customer`
object is used, for instance, when you try to call `#send_confirmation_email`.
In particular, if you want to test `#send_confirmation_email`, it looks like
you'll have to supply `Order` a `Customer` object.

```ruby
RSpec.describe Order do
  subject(:order) do
    customer = Customer.new(
      :first_name => "Ned",
      :last_name => "Ruggeri",
      :email_address => "ned@appacademy.io"
    )
    Order.new(customer)
  end

  it "sends email successfully" do
    expect do
      subject.send_confirmation_email
    end.not_to raise_exception
  end
end
```

This is troublesome because a spec for `#send_confirmation_email` should only
test the `#send_confirmation_email` method, not `Customer#email_address`. But
the way this spec is written, if there's a problem with
`Customer#email_address`, a spec for `Order#send_confirmation_email` will also
break, even though it should have nothing to do with `Customer#email_address`.
This will clutter up your log of spec failures.

Another problem is if `Order` and `Customer` both have methods that interact
with the other. If you write the `Customer` specs and methods first, then you'll
need a functioning `Order` object first for your `Customer` to interact with.
But you're supposed to TDD `Order`; you'll need to have written specs for
`Order`, but this requires a `Customer`...

Finally, it can be a pain to construct a `Customer` object; you had to specify a
bunch of irrelevant fields here. Other objects can be even harder to construct,
which means you can end up wasting a lot of time building an actual `Customer`
when an object that merely "looks like" a `Customer` would have sufficed.

You want to write your tests in isolation of other classes: their bugs or
whether they've even been implemented yet. The answer to this is to use
_doubles_.

## Test doubles

A test double (also called a _mock_) is a fake object that you can use to create
the desired isolation. A double takes the place of external interacting objects,
such as `Customer`. You could write the example above like so:

```ruby
#IMPLEMENTATION
class Order
    def initialize(customer, product)
        @customer = customer
        @product = product
    end

    def send_confirmation_email
      email(
        to: @customer.email_address,
        subject: "Order Confirmation",
        body: self.summary
      )
    end

    def charge_customer
        @customer.debit_account(@product.cost)
    end
end

#RSPEC FILE
RSpec.describe Order do
  let(:customer) { double("customer") }
  subject(:order) { Order.new(customer) }

  it "sends email successfully" do
    allow(customer).to receive(:email_address).and_return("ned@appacademy.io")

    expect do
      order.send_confirmation_email
    end.to_not raise_exception
  end
end
```

You create the double simply by calling the `double` method (you can give it a
name for logging purposes). This creates an instance of `RSpec::Mocks::Mock`.
The double is a blank slate, waiting for you to add behaviors to it.

A method **stub** stands in for a method. `Order` needs `customer`'s
`email_address` method, so you can create a stub to provide it. You do this by
calling `allow(double).to receive(:method)`, passing a symbol with the name of
the method that you want to stub. The `and_return` method takes as its parameter
the return value that the stubbed method will return when called.

The `customer` double simulates the `Customer#email_address` method without
actually using any of the `Customer` code. This totally isolates the test from
the `Customer` class; it doesn't use `Customer` at all. You don't even need to
have the `Customer` class defined.

The `customer` object is not a real `Customer`; it's an instance of `Mock`. But
that won't bother the `Order#send_confirmation_email` method. As long as the
object that you pass responds to an `email_address` message, everything will be
fine.

There's also a one-line version of creating a double and specifying
stub methods.

```ruby
let(:customer) { double("customer", :email_address => "ned@appacademy.io") }
```

## Method Expectations

If the tested object is supposed to call methods on other objects as
part of its functionality, you should test that the proper methods are
called. To do this, you use method expectations. Here's an example:

```ruby
RSpec.describe Order
  let(:customer) { double('customer') }
  let(:product) { double('product', :cost => 5.99) }
  subject(:order) { Order.new(customer, product) }

  it "subtracts item cost from customer account" do
    expect(customer).to receive(:debit_account).with(5.99)
    order.charge_customer
  end
end
```

Here you want to test that when you call `charge_customer` on an `Order` object,
it tells the `customer` to subtract the item price from the customer's account.
You also specify that you should check that you have passed `#debit_account` the
correct price of the product.

Notice that you set the message expectation before you actually kick off
the `#charge_customer` method. Expectations need to be set up in
advance.

## Integration tests

Mocks let you write unit tests that isolate the functionality of a single class
from other classes. This lets you live up to the philosophy of unit tests: in
each spec, test one thing only.

Unit tests specify how an object should interact with other
objects. For instance, our `Order#charge_customer` test made sure that
the order sends a `debit_account` message to its customer.

What if the `Customer` class doesn't have a `#debit_account` method? Perhaps
instead the method is called `Customer#subtract_funds`. Then in real life, with
a real `Customer` object, our `Order#charge_customer` method will crash when it
tries to call `#debit_account`. What spec is supposed to catch this error?

The problem here is a mismatch in the interface expected by `Customer` and the
interface provided by `Order`. This kind of error won't be caught by a unit
test, because the purpose of unit tests is to test classes in isolation.

You need a higher level of testing intended to verify that `Order` and
`Customer` are on the same page: that `Order` tries to call the right method on
`Customer`, which does the thing that `Order` expects.

This kind of test is called an _integration test._ In integration tests, you use
real objects instead of mocks so that you can verify that all the classes
interact correctly. A thorough test suite will have both unit and integration
tests. The unit tests are very specific and are meant to isolate logical
problems within a class; the integration tests are larger in scope and are
intended to check that objects interact properly.

## Resources

The double facilities are provided in the submodule of RSpec called
`rspec-mocks`. You can check out their [GitHub repo][rspec-mocks-github], which
has a useful README.

[rspec-mocks-github]: https://github.com/rspec/rspec-mocks
