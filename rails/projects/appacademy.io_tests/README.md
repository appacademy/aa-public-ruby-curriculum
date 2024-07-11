# Bonus project: Appacademy.io Tests

## Phase 1: Setup

Make a directory and name it `integration-tests` or something similar.

Init an [rspec](http://rspec.info/) project in it.

Create a Gemfile.

Setup [capybara](https://github.com/jnicklas/capybara).  We will NOT be using
rails.  Make sure you include the "Using Capybara with RSpec" section.

Figure out how Capybara knows what URL to hit while it's running integration
tests.  Change that URL to point at http://www.appacademy.io/.

Test that you're actually hitting the right URL: write a sample test that
navigates to http://www.appacademy.io/ and run the test using RSpec.

## Phase 2: Writing tests

As you write tests, break them to make sure they fail and are actually testing
what you expect.

Write the following tests:

* The word "Apply" should appear inside a link on the homepage (careful, it
  looks like a button!).

* Go through the whole application flow with fake data and make sure it
  succeeds.  Make sure you can run the test multiple times.  Use an email
  address that includes the current time to make sure you don't duplicate
  emails.

* Go through the whole application flow and give an incorrect (or duplicate
  email).  Make sure the right error messages pop up.

* Poke around the site and see what other sorts of things you'd want to test.

## Phase 3: Refactor

Make sure your code is modular.  Break each page in the application flow into
its own class.  E.g., `Homepage`, `LoginPage`, `CourseCyclePage`, etc.
