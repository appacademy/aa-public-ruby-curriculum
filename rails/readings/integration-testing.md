# Integration Testing

_Integration tests_ do exactly what their name suggests. They test the
**integration** of different components. _Unit tests_ ensure that each
individual **unit** of the application works independently, but no amount of
unit testing can guarantee that all the parts of your application work
**together**. This is why you need integration tests.

Integration tests typically test end-to-end app flows. An example would be
testing an endpoint that goes through your application to grab info from the
database and then display it on a page. In order for this test to work, your
route, controller, model, database, and view all have to work correctly and talk
to each other.

## Integration testing strategies

In a sense, when you write an integration test, you are also testing the
**units** (controller, view, model) that are involved in that test, so you could
skip the unit tests for these constituent parts. Many companies do this, but
there are some pitfalls:

Integration tests have traditionally been quite slow, so if you try to write one
for every edge case, they can bring your test suite to a crawl. Then no one
will run the tests, which defeats the whole purpose.

Integration tests can also be very brittle because they have many dependencies.
Imagine how frustrating it would be to have to change 30 integration tests just
because you made a simple change in the UI or modified an interface somewhere
deep in the stack. Often, these tweaks don't get caught, and the tests just rot
and become useless.

For these reasons, the testing approach that you will follow in this module is
to write a large number of unit tests that serve as the foundation for a small
number of partial integration tests, which underpin an even smaller number of
end-to-end integration tests.

Be aware, however, that as integration tests get faster, testing strategies are
shifting more heavily towards integration tests. As you will see in the
Request Tests reading, RSpec and Rails have deprecated their isolated
controller tests in favor of request integration tests. Similarly, React and
Redux--technologies you will learn in a few weeks--have now both officially
shifted to recommending an integration-based approach to testing.

Integration tests are also getting less brittle as testers move toward testing
**what** an application does and away from testing **how** it does it. In other
words, testing strategies today encourage testing behavior/results rather than
implementation details. If a user enters `4 + 3` on your calculator app and then
clicks `=`, e.g., it is important to make sure that the app reports the correct
answer of `7`, not that the app calls the `add` method to calculate that answer.
Tests that focus on results rather than implementation require less maintenance.
They also make it easier to refactor your code with the confidence that your
tests will catch any breaking changes and not fail any code that actually works.
