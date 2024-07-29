# LRU Cache Quiz

```ruby
  class Fixnum
    def my_hashing_function
      self * rand(10_000_000)
    end
  end
```

<quiz>
  <question>
    <p>Is the above function a hashing function?</p>
    <answer>Yes</answer>
    <answer correct>No</answer>
    <explanation>A hashing function must be **deterministic**: the same input should always produce the same output, which won't happen if the output relies on a randomly generated number!</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>In a linked list, what is the time complexity for accessing the nth element?</p>
    <answer>`O(1)`</answer>
    <answer>`O(log n)`</answer>
    <answer correct>`O(n)`</answer>
    <answer>`O(n log n)`</answer>
    <answer>`O(n^2)`</answer>
    <explanation>Unlike with an array or hash--which allow access to the nth element by index and key, respectively--accessing the nth element in a linked list requires following links from the first element to each successive element until reaching the nth one, an `O(n)` operation.</explanation>
  </question>
</quiz>

```ruby
  {4,78,12,56,44,78,15}
```

<quiz>
  <question>
    <p>Is the above a set?</p>
    <answer>Yes</answer>
    <answer correct>No</answer>
    <explanation>A set is a data type that stores *unique* items.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
    <p>An array is an example of which of the following? (Select all that apply.)</p>
    <answer>Abstract Data Type</answer>
    <answer>Algorithm</answer>
    <answer correct>Data Structure</answer>
    <answer>Transfer Function</answer>
    <explanation>An array is an example of a data structure! :)</explanation>
  </question>
</quiz>
