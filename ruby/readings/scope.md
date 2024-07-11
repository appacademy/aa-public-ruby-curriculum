# Scope
​ [Scope][wiki-scope] is the **context** in which a variable name is valid and
can be used.​

[wiki-scope]: http://en.wikipedia.org/wiki/Scope_(computer_science)

There are several types of variables in Ruby, including local, instance, and
class variables, all of which you've seen at this point. You are declaring a
**local variable** anytime you write something like this: ​
```ruby
some_var = 'some value'
```
​ The other types of variables mentioned have a special symbol at the beginning
denoting them as such: ​
* **Instance variables** begin with `@`
* **Class variables** begin with `@@`

This reading is going to focus on local variables - we'll discuss instance and
class variables more later, when we delve deeper into OOP. ​ Let's start with
the basics - we can't use a variable before it is defined: ​
```ruby
def pow(base, exponent)
  i = 0
​
  while i < exponent
    result = result * base  # Error: result is being used before it has been defined.
​
    i += 1
  end
​
  result
end
```
​
## Block Scoping

When we open up a block, variables _declared_ within the block will not be
accessible once we exit the block. However, if we have declared a variable
before we enter the block, we will have access to that variable inside the
block. In fact, any changes made to that variable within the block will persist
once we've exited the block. Let's see a few examples: ​
```ruby
3.times do
  x = 4
end
​
puts x # Error - undefined local variable `x`
```

Because `x` is defined inside the block (we might call this the _inner scope_),
we do not have access to it once we exit the block (in the _outer_ or _top-level
scope_). ​
```ruby
x = 2
​
3.times do
  x += 2
end
​
puts x # outputs 8 (2 + 3*2)
```

This code works because we declare `x` before we enter the block. Within the
block we modify `x`, and these changes persist after we have exited block, so
when we `puts x` we see its modified value of 8.

The rule here is as follows: **Local variables declared in outer scopes are
available, and may be modified, in all inner scopes. Local variables declared in
inner scopes are not available in outer scopes.** ​
### If/While statements

Keep in mind that `if`/`while` statements are different than blocks in Ruby, and
these rules do not apply. Even though our code inside `if`/`while` statements is
nested, this code is still treated as part of the outer scope. For example, we
can do something like this: ​
```ruby
if true
  i = 2
end
​
puts i # outputs 2
```

Or this: ​
```ruby
while true
  i = 2
  break
end
​
puts i # outputs 2
```

Both of these code snippets will run without error even though it appears that
`i` is being defined in an inner scope and accessed in an outer scope. Don't let
the nesting fool you - the context does not change within these code sinppets!
 
## Scope gates

We've discussed blocks and `if`/`while` statement, but what happens when we
define a new method or class? The rules change - whenever we define a method,
class, or module (you'll learn about those in the near future), we open up what
is commonly referred to as a **scope gate**. What this means is that we lose
access to all local variables previously defined and enter a brand new
**context**. Let's see some examples: ​
```ruby
x = 2
​
def display_x
  puts x
end
​
display_x # Error - undefined local variable `x`
```

Even though `x` is defined before we define the method and in what we might
consider an "outer scope", the method definition opens up a new scope gate and
we lose access to all previously defined local variables. We only have access to
local variables declared within the method and the parameters of the method. To
make the above work we would need to refactor it to take in a parameter: ​
```ruby
x = 2
​
def display_x(x)
  puts x
end
​
display_x(x) # outputs 2
```

The above code is able to run without any problems. Note that while we name the
method parameter the same as the variable we pass to the method, they are
distinct variables that live in separate scopes. To be more clear, here is that
same example with a clearer differentiation of the variables: ​
```ruby
my_var = 2
​
def display_thing(method_var)
  puts method_var
end
​
display_thing(my_var) # outputs 2
```
​
## Methods calling other methods

**Methods != Local Variables** 

Based on what we've discussed so far, you may be wondering how we can call
methods within other methods, given that every method opens up its own scope
gate. The answer is that methods behave differently than local variables.
Methods defined in the top level scope are accessible within other methods also
defined in the top level scope. The short of it is that these methods actually
get defined on an object called `main` and you are able to call them for the
same reason you can call instance methods from other instance methods in a
class. At this stage, don't worry too much about _how_ exactly this is happening
- just understand that this is the behavior you can expect. ​
```ruby
def fourth_power(i)
  square(i) * square(i)
end
​
def square(i)
  i * i
end
​
fourth_power(2) # outputs 16 (2^4)
```

The above code is able to run without error. It's also worth noting that
`square` is used in `fourth_power` despite being defined below it. Since we
don't _call_ `fourth_power` until the very last line, we have access to both
methods. ​
## Global variables

***NOTE:*** This last bit about global variables is not essential.

While you shouldn't typically create global variables, you can do so with the
`$` prefix. Once a global variable has been declared, it is available in every
scope in your program. Unless you absolutely have to (and you probably don't)
you should avoid creating global variables as they are dangerous, and often
unnecessary. ​
## Additional Reading

We've covered some of the core principles of scope in Ruby. For a deeper dive on
scope check out [this resource][scope-resource].

[scope-resource]: https://www.sitepoint.com/understanding-scope-in-ruby/