# Testing

TDD (Test Driven Development) is a hot buzzword right now, and employers love to see that you know how to write good tests, so adding test coverage to your app is a great way to make it more attractive to recruiters.
Writing solid tests is also a good programing practice to develop, and if you get in the habit now it will serve you well later in your career.

## Backend Testing

You can test your Rails models and controllers using RSpec.
As with most other things, Rails sets up most of the file structure for you.
We went over RSpec on w2d3 and Rails testing on w5d1.
Feel free to refer back to the relevant readings.

NOTE: Don't worry about reviewing the Capybara readings.
You shouldn't be using any HTML views on your full-stack project anyway.

* RSpec
  * RSpec syntax
  * `subject` and `let`
  * Order of methods
  * Mocking and doubles
* Rails testing
  * Integration tests
  * RSpec and Rails setup
  * Testing models
  * The FactoryBot and Faker gems
  * Testing controllers

## Frontend Testing

Your frontend is written in JavaScript using React and Redux, so you'll need to use a JavaScript testing library.
We recommend the Jest library, which was created at Facebook.
To make your UI testing easier, you can use the Enzyme library, which was created by Airbnb specifically for testing React.
Finally, the Redux cycle is a very common source of errors.
You can use Jest to test your Redux state, and you can also add a plugin to the Redux developer tools that allows you to export tests in real-time as you inspect your Redux state.

* React testing
  * [Jest docs][jest]
  * [Enzyme docs][enzyme]
* Redux testing
  * [Redux testing docs][redux-testing-docs]
  * [Exporting tests from the dev tools][gentest]

[jest]: https://facebook.github.io/jest/
[enzyme]: http://airbnb.io/enzyme/
[redux-testing-docs]: http://redux.js.org/docs/recipes/WritingTests.html
[gentest]: https://github.com/conorhastings/redux-test-recorder
