# Big-O Quiz
Which of the following represents an ordering of strictly increasing time complexity?
- [ ] $O(n log n) < O(log n) < O(n) < O(n^2) < O(n!) < O(2^n)$
- [ ] $O(1)$ < $O(log n)$ < $O(n)$ < $O(n log n)$ < $O(n^2)$ < $O(2^n)$ < $O(n!)$
- [ ] $O(n^3)$ < $O(n^2)$ < $O(2^n)$ < $O(n log n)$ < $O(n)$ < $O(log n)$ < $O(1)$
- [ ] $O(n)$ < $O(2n)$ < $O(3n)$ < $O(n + 1)$ < $O(n + 2)$ < $O(n + 3)$
- [ ] $O(1)$ < $O(log n)$ < $O(n)$ < $O(n^2)$ < $O(n!)$ < $O(2^n)$ < $O(n^n)$

<details><summary>Answer:</summary>$O(1)$ < $O(log n)$ < $O(n)$ < $O(n log n)$ < $O(n^2)$ < $O(2^n)$ < $O(n!)$</details>
<details><summary>Explanation:</summary>
Remember $O(1)$, or constant time, is the slowest growing in terms of time complexity and  $O(n!)$, or factorial time, is the fastest growing.</details>

#### What is the asymptotic representation of the following time complexity: $O(2n^3 + .5n^2 + 1000n)$
- [ ] $O(2n^3)$
- [ ] $O(n^3 + n^2 + n)$
- [ ] $O(1000n)$
- [ ] $O(n^3)$
- [ ] $O(2n^3 + .5n^2 + 1000n)$
- [ ] $O(.5n^2)$

<details><summary>Answer:</summary>$O(n^3)$</details>
<details><summary>Explanation:</summary>Ignoring the constants, we get $n^3 + n^2 + n$.  $n^3$ will dominate the other terms and therefore is the asymptotic representation.</details>

#### Which of the following time complexities is linearithmic?
- [ ] $O(n^2)$
- [ ] $O(n!)$
- [ ] $O(2^n)$
- [ ] $O(n log n)$
- [ ] $O(n)$

<details><summary>Answer:</summary>$O(n log n)$</details>
<details><summary>Explanation:</summary>Remember linearithmic, or loglinear, time is $O(n log n)$. This is also the time complexity for $merge sort$, which is one of the fastest comparison sorts. </details>

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
#### What is the time complexity of the above function?
- [ ] $O(n log n)$
- [ ] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(n!)$
- [ ] $O(1)$

<details><summary>Answer:</summary>$O(n^2)$</details>
<details><summary>Explanation:</summary>We are iterating over the input array of $n$ elements. For each of those $n$ elements, we do work that involves another iteration over the entire input array. In other words, for each of the $n$ elements, we do $n$ amount of work, which gives us $O(n^2)$.</details>

#### What is the time complexity of ruby's `Array#permutation` method? **Note:** you do not need to look at the Ruby source code to answer this question.  Remember that Big-O notation is concerned with how runtime grows relative to the size of the input!</p>
- [ ] $O(n*log(n))$
- [ ] $O(n^2)$
- [ ] $O(n)$
- [ ] $O(n!)$
- [ ] $O(1)$

<details><summary>Answer:</summary>$O(n!)$</details>
<details><summary>Explanation:</summary>

Whenever you have a problem where you are creating permutations, you are dealing with $factorial$ time complexity. E.g., if you call the `Array#permutation` method of an array with the length of 3, then 3! permutations would be returned (6 permutations total). Increasing the length to 4 would then return 24 total permutations, or 4!.</details>