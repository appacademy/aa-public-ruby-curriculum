# LRU Cache Quiz

```ruby
  class Fixnum
    def my_hashing_function
      self * rand(10_000_000)
    end
  end
```

#### Is the above function a hashing function?</p>
- [ ] Yes
- [ ] No

<details><summary>Answer:</summary>

No</details>
<details><summary>Explanation:</summary>

A hashing function must be **deterministic**: the same input should always produce the same output, which won't happen if the output relies on a randomly generated number!</details>

#### In a linked list, what is the time complexity for accessing the nth element?</p>
- [ ] $O(1)$
- [ ] $O(log n)$
- [ ] $O(n)$
- [ ] $O(n log n)$
- [ ] $O(n^2)$

<details><summary>Answer:</summary>

$O(n)$</details>
<details><summary>Explanation:</summary>

Unlike with an array or hash--which allow access to the nth element by index and key, respectively--accessing the nth element in a linked list requires following links from the first element to each successive element until reaching the nth one, an $O(n)$ operation.</details>

```ruby
  {4,78,12,56,44,78,15}
```
#### Is the above a set?</p>
- [ ] Yes
- [ ] No
<details><summary>Answer:</summary>

No</details>
<details><summary>Explanation:</summary>

A set is a data type that stores *unique* items.</details>

#### An array is an example of which of the following? (Select all that apply.)</p>
- [ ] Abstract Data Type
- [ ] Algorithm
- [ ] Data Structure
- [ ] Transfer Function
<details><summary>Answer:</summary>

Data Structure</details>
<details><summary>Explanation:</summary>

An array is an example of a data structure! :)</details>