# XOR (Exclusive OR)

## Definition

Like AND and OR, XOR (short for 'exclusive OR') is a [logical operator][log-op].

- AND means 'Both A and B'.
- OR means 'Either A or B or both'.
- XOR means 'Either A or B, but not both'.

The 'but not both' clause is what differentiates XOR from OR. In ruby, XOR is
written as `^`.

Let's look at a few examples of using XOR:

```rb
true ^ false # true
false ^ true # true

false ^ false # false
true ^ true # false

# Compare the last example against using OR
true || true # true
```

## Bitwise XOR with numbers

When you XOR two numbers, Ruby converts them to binary and evaluates each of
their corresponding digits (i.e., bits) using XOR, where `1` is `true` and `0`
is `false`. Ruby then converts the binary result back into an integer.

For example,

```ruby
a = 2
b = 6
c = a ^ b # 4
```

Let's examine what ruby is doing under the hood.

```rb
# Converts the integers to binary
a.to_s(2) # "10"
b.to_s(2) # "110"

# Bitwise operation
# a = 010
# b = 110
# xor ---
# c = 100

# Converts the result back into an integer
"100".to_i(2) # 4

# Thus,
c == 4 # true
```

In Ruby, `Integer#to_s(2)` converts a number to binary and `String#to_i(2)`
converts a binary string to a number!

## Using XOR to hash

Recall the properties of a good hashing function:

- **Deterministic**: Its output is directly determined by the input data, so the
  same input will always produce the same output.
- **Unidirectional**: Its input cannot be determined from its output.
- **Uniform**: Its possible return values are evenly distributed.
- **Highly Sensitive**: It returns very different values for similar inputs.

Bitwise XOR is often used in hashing functions because it promotes high
determinism and uniformity. It is not highly sensitive, however, so it may need
to be offset with other methods if the hashing function needs to have a more
unpredictable 'spread' of hashed values.

What separates XOR from other bitwise operators is uniformity: given any two
inputs, only XOR returns `1` and `0` with equal probability (see truth table
below). This allows it to produce more uniformly distributed values,
distinguishing it as a desirable hashing method.

## Truth Table for Bitwise Operations

|  a  |  b  | AND | OR  | XOR |
| :-: | :-: | :-: | :-: | :-: |
|  0  |  0  |  0  |  0  |  0  |
|  1  |  0  |  0  |  1  |  1  |
|  0  |  1  |  0  |  1  |  1  |
|  1  |  1  |  1  |  1  |  0  |

[truth-tables]: http://lampiweb.com/help/freebasic/TblTruth.html
[log-op]: https://en.wikipedia.org/wiki/Logical_connective
