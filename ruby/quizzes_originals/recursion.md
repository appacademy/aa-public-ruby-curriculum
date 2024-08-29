# Recursion Quiz

```ruby
  def func(arg1, arg2)
    temp = arg1 * arg2
    return_val = (temp ** 2) + (arg1 % 6 + 1) / (7 + arg2 + arg1)
  end
```

<quiz>
  <question multiple>
    <p>What is wrong with the above function?</p>
    <answer>Indentation is wrong</answer>
    <answer correct>Variable names are not descriptive</answer>
    <answer correct>Code needs to be broken out over more lines</answer>
    <answer>This code cannot be improved</answer>
    <explanation>`arg1` and `arg2` don't give us any idea about what the numbers should be representing that will be passed in. Additionally, the math for `return_val` is not intuitive and should be broken up.</explanation>
  </question>
</quiz>


<quiz>
  <question multiple>
    <p>Suppose we have a function called `args_matey` which expects 3 arguments: a string, an array, and a hash. Select each of the following that correctly passes these arguments:</p>
    <answer correct>`args_matey('argument 1', [1,2,3,4], hash: 'is', last: 'argument')`</answer>
    <answer correct>`args_matey('argument 1', [1,2,3,4], { hash: 'is', last: 'argument' })`</answer>
    <explanation>As long as the hash is the last argument given in the method invocation, ruby will assume that the key value pairs are part of the expected hash. So, we don't have to include the curly braces in this scenario.</explanation>
  </question>
</quiz>


```ruby
  def add_odds(n)
    return n if n == 1

    if n.even?
      add_odds(n-1)
    else
      n + add_odds(n-1)
    end
  end
```

<quiz>
  <question multiple>
    <p>Consider the above function that calculates the sum of all odd integers from 1 to n (inclusive). For which of the following test cases will the above function throw a stack overflow error?</p>
    <answer>`add_odds(9)`</answer>
    <answer correct>`add_odds(50000)`</answer>
    <answer>`add_odds(123)`</answer>
    <answer correct>`add_odds(-8)`</answer>
    <answer>`add_odds(1)`</answer>
    <explanation>The average computer setup will give us around 9000 stack frames before throwing a stack overflow error. With an input of 50000, our method would try to create 50000 stacks and would get cut off before it gets there. with an input of -8, our function will continue to make recursive calls and add stack frames indefinitely because we will never hit our base case which checks that `n` is equal to 1. `n` will never be equal to 1.</explanation>
  </question>
</quiz>


```ruby
  class Array
    def upcase
      self.map { |string| string.upcase }
    end
  end
```

<quiz>
  <question>
    <p>Consider the above function, which is defined for a 1-D array of strings. This function is:</p>
    <answer>Recursive</answer>
    <answer correct>Iterative</answer>
    <explanation>Each element in our array is an instance of a String. When we invoke `string.upcase` we are invoking the upcase method that is written on the String class. The `upcase` method above is written on the Array class. Therefore, we are not calling the same method inside of the `map` iteration.</explanation>
  </question>
</quiz>


```ruby
  def powers_sum(n)
    return n if n == 1

    (n * n) * powers_sum(n-1)
  end
```

<quiz>
  <question>
    <p>Consider the above function. How many stack frames are produced from calling `powers_sum(n)`? (assume n > 0)</p>
    <answer correct>`n`</answer>
    <answer>`n+1`</answer>
    <answer>`2n`</answer>
    <answer>`n^2`</answer>
    <answer>`cannot be determined`</answer>
    <explanation>For each recursive call, we open up one additional stack frame because we invoke `powers_sum` once for each call. We decrease our number, `n`, by 1 for each call. Therefore there will be `n` stack frames.</explanation>
  </question>
</quiz>
