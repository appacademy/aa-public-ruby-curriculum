# Test-Driven Development

A common development process is to write the application code and then later
develop some test coverage on important parts of that code. *Test-driven
development* reverses that process and dictates that tests--not application
code--should be written first; application code should only be written to pass
already written specs.

**Define functionality and write the specs first, then implement.**

## Motivations for TDD

* Code written is guaranteed to be testable because you are writing
the code specifically to pass a test
* Developers avoid writing lots of extra functionality that is not
included in the specs because they engage in the spec-writing
process first (enforces YAGNI - "you ain't gonna need it")
* Ensure you have excellent test coverage because no application code
is written without already written tests
* Tight development workflow (red, green, refactor) makes for happy,
productive developers
* Encourages a focus on modularity because the developer is forced
to think about the application in small, testable chunks
* Encourages a focus on a module's/class's public interface (i.e.,
on how the module will be used rather than on how it's implemented)

## Red, Green, Refactor

**Red, Green, Refactor** describes the proper TDD workflow.

1. **Red**: Write the tests and watch them fail (go red). It's
important to ensure the tests initially fail so that you don't have
false positives.
2. **Green**: Write the (minimum amount of) code to make the tests
pass (go green).
3. **Refactor**: Refactor the code you just wrote. Your job is not
over when the tests pass; you got it working, now make it clean.

Generally, TDD developers keep their Red, Green, Refactor loop pretty
tight. They'll write a few related tests, then implement the
functionality, then refactor, then repeat. You keep the units small.


## Further Resources:
* [Wikipedia article on TDD][wiki-tdd]
* [HN thread on TDD in the context of startups][hn-tdd-startups]

[wiki-tdd]: http://en.wikipedia.org/wiki/Test-driven_development
[hn-tdd-startups]: http://news.ycombinator.com/item?id=2240595
