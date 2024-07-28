# Anagrams

Your goal today is to write a method that determines if two given words are
anagrams. This means that the letters in one word can be rearranged to form the
other word. For example:

```ruby
anagram?("gizmo", "sally")    #=> false
anagram?("elvis", "lives")    #=> true
```

You may assume that there is no whitespace or punctuation in the given strings.

## Learning goals

By the end of this practice, you should be able to:

* Determine the time and space complexity of a method
* Recognize when and how time or space complexity can be improved
* Compare different methods and discuss how changing inputs affects each one's
overall runtime

## Phase I

Write a method `#first_anagram?` that will generate and store all the possible
anagrams of the first string. Check if the second string is one of these.

**Hints:**

* **For testing your method, start with small input strings; otherwise you might
  be waiting a while...**
* If you're having trouble generating the possible anagrams, look into
[this method][array-permutation-docs].

What is the time complexity of this solution? What happens if you increase the
size of the strings?

## Phase II

Write a method `#second_anagram?` that iterates over the first string. For each
letter in the first string, find the index of that letter in the second string
(hint: use `Array#find_index`) and delete at that index. The two strings are
anagrams if an index is found for every letter and the second string is empty at
the end of the iteration.

Try varying the length of the input strings. What are the differences between
`#first_anagram?` and `#second_anagram?`?

## Phase III

Write a method `#third_anagram?` that solves the problem by sorting both strings
alphabetically. The strings are then anagrams if and only if the sorted versions
are identical.

What is the time complexity of this solution? Is it better or worse than
`#second_anagram?`?

## Phase IV

Write one more method `#fourth_anagram?`. This time, use two hashes to store the
number of times each letter appears in both words. Compare the resulting hashes.

What is the time complexity?

**Bonus:** Do it with only one hash.

Discuss the time complexity of your solutions together, then **call over an
Instructor** to look at them.

[array-permutation-docs]: http://ruby-doc.org/core-2.2.3/Array.html#method-i-permutation