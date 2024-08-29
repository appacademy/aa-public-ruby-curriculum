# Big-O Quiz

<quiz>
  <question>
    <p>Which of the following represents an ordering of strictly increasing time complexity?</p>
    <answer>`O(n log n)` < `O(log n)` < `O(n)` < `O(n^2)` < `O(n!)` < `O(2^n)`</answer>
    <answer correct>`O(1)` < `O(log n)` < `O(n)` < `O(n log n)` < `O(n^2)` < `O(2^n)` < `O(n!)`</answer>
    <answer>`O(n^3)` < `O(n^2)` < `O(2^n)` < `O(n log n)` < `O(n)` < `O(log n)` < `O(1)`</answer>
    <answer>`O(n)` < `O(2n)` < `O(3n)` < `O(n + 1)` < `O(n + 2)` < `O(n + 3)`</answer>
    <answer>`O(1)` < `O(log n)` < `O(n)` < `O(n^2)` < `O(n!)` < `O(2^n)` < `O(n^n)`</answer>
    <explanation>Remember `O(1)`, or constant time, is the slowest growing in terms of time complexity and  `O(n!)`, or factorial time, is the fastest growing.</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>What is the asymptotic representation of the following time complexity: `O(2n^3 + .5n^2 + 1000n)`</p>
    <answer>`O(2n^3)`</answer>
    <answer>`O(n^3 + n^2 + n)`</answer>
    <answer>`O(1000n)`</answer>
    <answer correct>`O(n^3)`</answer>
    <answer>`O(2n^3 + .5n^2 + 1000n)`</answer>
    <answer>`O(.5n^2)`</answer>
    <explanation>Ignoring the constants, we get `n^3 + n^2 + n`.  `n^3` will dominate the other terms and therefore is the asymptotic representation.</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>Which of the following time complexities is linearithmic?</p>
    <answer>`O(n^2)`</answer>
    <answer>`O(n!)`</answer>
    <answer>`O(2^n)`</answer>
    <answer correct>`O(n log n)`</answer>
    <answer>`O(n)`</answer>
    <explanation>Remember linearithmic, or loglinear, time is `O(n log n)`. This is also the time complexity for `merge sort`, which is one of the fastest comparison sorts. </explanation>
  </question>
</quiz>


```ruby
  def max_squared_value(arr)
    max = nil

    arr.each do |num1|
      is_max = true

      arr.each do |num2|
        is_max = false if num2 ** 2 > num1 ** 2
      end

      max = num1 if is_max
    end

    max
  end
```

<quiz>
  <question>
    <p>What is the time complexity of the above function?</p>
    <answer>`O(n log n)`</answer>
    <answer correct>`O(n^2)`</answer>
    <answer>`O(n)`</answer>
    <answer>`O(n!)`</answer>
    <answer>`O(1)`</answer>
    <explanation>We are iterating over the input array of `n` elements. For each of those `n` elements, we do work that involves another iteration over the entire input array. In other words, for each of the `n` elements, we do `n` amount of work, which gives us `O(n^2)`.</explanation>
  </question>
</quiz>



<quiz>
  <question>
    <p>What is the time complexity of ruby's `Array#permutation` method? **Note:** you do not need to look at the Ruby source code to answer this question.  Remember that Big-O notation is concerned with how runtime grows relative to the size of the input!</p>
    <answer>`O(n*log(n))`</answer>
    <answer>`O(n^2)`</answer>
    <answer>`O(n)`</answer>
    <answer correct>`O(n!)`</answer>
    <answer>`O(1)`</answer>
    <explanation>Whenever you have a problem where you are creating permutations, you are dealing with `factorial` time complexity. E.g., if you call the `Array#permutation` method of an array with the length of 3, then 3! permutations would be returned (6 permutations total). Increasing the length to 4 would then return 24 total permutations, or 4!.</explanation>
  </question>
</quiz>