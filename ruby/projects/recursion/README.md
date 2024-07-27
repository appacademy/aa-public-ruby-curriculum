# Recursion Homework

For tonight's exercises, you are going to write several recursive functions.
Here's how you should approach each problem:

  1. Read the problem statement to make sure you fully understand the problem.
  2. Identify the base case(s).
  3. Determine the inductive step.
  4. Write the function.
  5. Run the provided test cases to verify you have a working solution.

As you learn recursion, it is important that you break down each problem into
these steps.  Doing so will help you devise solutions and avoid stack overflow
errors.  

If you encounter strange bugs or errors, use `byebug`!  

## Exercise 1 - `sum_to`

Write a function `sum_to(n)` that uses recursion to calculate the sum from 1 to
n (inclusive of n).  

```ruby
  # Test Cases
  sum_to(5)  # => returns 15
  sum_to(1)  # => returns 1
  sum_to(9)  # => returns 45
  sum_to(-8)  # => returns nil
```

## Exercise 2 - `add_numbers`

Write a function `add_numbers(nums_array)` that takes in an array of Integers
and returns the sum of those numbers.  Write this method recursively.  

```ruby
  # Test Cases
  add_numbers([1,2,3,4]) # => returns 10
  add_numbers([3]) # => returns 3
  add_numbers([-80,34,7]) # => returns -39
  add_numbers([]) # => returns nil
```

## Exercise 3 - Gamma Function

Let's write a method that will solve Gamma Function recursively.  The Gamma
Function is defined as `Γ(n) = (n-1)!`.  

```ruby
  # Test Cases
  gamma_fnc(0)  # => returns nil
  gamma_fnc(1)  # => returns 1
  gamma_fnc(4)  # => returns 6
  gamma_fnc(8)  # => returns 5040
```

## Exercise 4 - Ice Cream Shop

Write a function `ice_cream_shop(flavors, favorite)` that takes in an array of
ice cream flavors available at the ice cream shop and the user's favorite ice
cream flavor. Recursively find out whether or not the shop offers their favorite
flavor.

```ruby
  # Test Cases
  ice_cream_shop(['vanilla', 'strawberry'], 'blue moon')  # => returns false
  ice_cream_shop(['pistachio', 'green tea', 'chocolate', 'mint chip'], 'green tea')  # => returns true
  ice_cream_shop(['cookies n cream', 'blue moon', 'superman', 'honey lavender', 'sea salt caramel'], 'pistachio')  # => returns false
  ice_cream_shop(['moose tracks'], 'moose tracks')  # => returns true
  ice_cream_shop([], 'honey lavender')  # => returns false
```

## Exercise 5 - Reverse

Write a function `reverse(string)` that takes in a string and returns it
reversed.

```ruby
  # Test Cases
  reverse("house") # => "esuoh"
  reverse("dog") # => "god"
  reverse("atom") # => "mota"
  reverse("q") # => "q"
  reverse("id") # => "di"
  reverse("") # => ""
```