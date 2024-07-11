# Recursion

## Recursive methods

A **recursive** method is one that calls itself. Each time the method calls
itself, it tries to solve a smaller **subproblem**. Think of this as breaking a
large problem into smaller problems. Each of these may be divided again into
still smaller subproblems.

The subproblems keep getting smaller and smaller, until they are small enough to
solve trivially and directly. These small subproblems are called **base cases**.
All recursive methods should eventually reach a base case, lest they just loop
forever.

The factorial operation is one example of a problem that can be solved
recursively. Recall that five factorial is:

    5! = 5 * 4 * 3 * 2 * 1
    n! = n * (n - 1) * (n - 2) * ... * 1

We can also define factorial *recursively*:

    # this is math, not Ruby code.
    0! = 1
    n! = n * (n - 1)!

The first equation is the base case: `0!` is, trivially, `1`. For any `n > 1`,
we can use the second equation to break the problem into a smaller one.

Let's implement this recursive definition:

```ruby
def factorial(n)
  if n == 0 # the base case
    1
  else # the recursive case
    n * factorial(n - 1)
  end
end
```

Let's walk through how this method is evaluated for `factorial(3)`

```ruby
factorial(3)
=> 3 * factorial(2)
=> 3 * 2 * factorial(1)
=> 3 * 2 * 1 * factorial(0)
=> 3 * 2 * 1 * 1
=> 6
```

## Mathematical induction

Recursion allows us to solve larger problems by breaking them up into similar,
smaller sub-problems that we can solve. Solving a problem using the solution(s)
to these smaller sub-problems uses an important concept called *mathematical
induction*, or simply *induction*.

Generally used in mathematical proofs, mathematical induction tells us that if
we can solve for a base case and we can solve for the general (or nth) case,
then we have solved for all the cases.

Here's an example: I know that if I can count from `1` to `2`, by incrementing
`1` by `1` (`1` being the base case), I can count to `n+1` by (a) starting at
`n` and (b) then counting one more, `n+1`. Since I know how to count to `2` from
`1` (just say "one"; the base case), I know that I can count to `n` or any other
number, no matter how large.

The key to applying induction to solve problems is to (a) identify how you can
grow a smaller solution into a bigger solution, and (b) identify base cases
which will be the "foundation" of your tower of recursion.

## Recursion vs iteration

Recursive methods can always be written *iteratively*: using loops and no
recursion. Let's try our hand at the factorial method:

```ruby
def factorial(n)
  result = 1
  (1..n).each do |i|
    result *= i
  end

  result
end
```

While any recursive method can always be written iteratively, the iterative form
can sometimes be significantly more complicated. When choosing whether to solve
a problem recursively or iteratively, you should think about which solution is
more natural to your own mind.

## Recursion and Infinite Loops

Recursive calls must always make progress toward a base case. For instance, this
is no good:

```ruby
def fibonacci(n)
  case n
  when 1
    [1]
  when 2
    [1, 1]
  else
    # uh-oh. calls the same method!
    fibonacci(n)
  end
end
```

This recursion will never terminate for `n > 2`; it will just call itself again
and again. An infinite chain of recursive calls won't just spin forever like a
normal loop:

```ruby
[2] pry(main)> fibonacci(1)
=> [1]
[3] pry(main)> fibonacci(2)
=> [1, 1]
[4] pry(main)> fibonacci(3)
SystemStackError: stack level too deep
        from: /Users/ruggeri/.rvm/gems/ruby-1.9.3-p194/gems/pry-0.9.10/lib/pry/pry_instance.rb:275
```

Each nested method call you make adds to the **stack** of open method calls;
each time a method ends, the stack size decreases by one. The elements of the
stack are called **stack frames**, and they contain the local variables used by
that method.

If you get caught in a recursive loop, the stack will grow infinitely until the
system runs out of memory. This is because our methods depend on some method
closing to close themselves (i.e., the base case) in the Fibonacci example.
Running out of memory like this is called a **stack overflow**, and Ruby will
tell you that the stack level got too deep.

## Strategies for Programming Recursively

It helps to have a general strategy with which to tackle recursive problems.

**Map out a recursive decomposition**: Think about how the problem breaks down
recursively. That is, how will you reduce the problem size towards the base
case.  It's sometimes helpful to even sketch it out.

**Identify the base case(s)**: The base case will be the case when the stack
stops growing - that is, when the chain of deferred operations will begin to
evaluate. What will your method return in the most trivial of cases? Your
recursive decomposition should always be moving towards that trivial case.

**Think one level up from the base case**: What will happen when you call your
recursive method with a value that will require a single recursive call - that
is, with a value one away from the base case. How will you have to manipulate
that value in order to return the right thing? Ensure your manipulation
generalizes.

**Ensure that your return values from any case (base case or otherwise) are
always of the same type**. If you need an array as the final return value then
the intermediate return values must also be arrays. Why? Because each of those
intermediate values are returning from the same method!

**Get a stack trace**. Ruby won't normally print a stack trace for stack
overflow errors, because this might print several thousand lines to the screen.
If you're having a hard time debugging a stack overflow, you can paste the
following code snippet at the top of your file. The snippet will intentionally
crash your program before the stack overflow occurs, allowing you to read the
stack trace.

```rb
MAX_STACK_SIZE = 200
tracer = proc do |event|
  if event == 'call' && caller_locations.length > MAX_STACK_SIZE
    fail "Probable Stack Overflow"
  end
end
set_trace_func(tracer)
```
