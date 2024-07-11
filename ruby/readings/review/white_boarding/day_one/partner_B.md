## Partner A: White Boarding

## Sorts

### Binary Search

Write a method that binary searches an array for a target and returns its
index if found. Assume a sorted array.

NB: YOU MUST WRITE THIS RECURSIVELY (searching half of the array every time).
We will not give you points if you visit every element in the array every time
you search.

For example, given the array [1, 2, 3, 4], you should NOT be checking
1 first, then 2, then 3, then 4.

### Solution

```rb
def binary_search(arr, target)
  return nil if arr.empty?

  midpoint = arr.length / 2
  case target <=> arr[midpoint]
  when -1
    binary_search(arr[0...midpoint], target)
  when 0
    midpoint
  when 1
    subproblem_answer = binary_search(arr[(midpoint + 1)..-1], target)
    (subproblem_answer.nil?) ? nil : (midpoint + 1) + subproblem_answer
  end
end
```

## Monkey Patching

### my_each

Write a method that calls a passed block for each element of the array

### Solution

```rb
class Array
  def my_each(&blk)
    i = 0
    while i < length
      blk.call(self[i])
      i += 1
    end
    self
  end
```

### dups

Write an array method that returns a hash where the keys are any element
that appears in the array more than once, and the values are sorted arrays
of indices for those elements.

### Solution

```rb
class Array
  def dups
    positions = Hash.new { |h, k| h[k] = [] }

    each_with_index do |item, index|
      positions[item] << index
    end

    positions.select { |key, val| val.count > 1 }
  end
end
```

## Recursion

### Factorials

Write a method that recursively finds the first `n` factorial numbers
and returns them. N! is the product of the numbers 1 to N.
Be aware that the first factorial number is 0!, which is defined
to equal 1. The 2nd factorial is 1!, the 3rd factorial is 2!, etc.

### Solution

```rb
def factorials_rec(num)
  if num == 1
    [1]
  else
    facs = factorials_rec(num - 1)
    facs << facs.last * (num - 1)
    facs
  end
end
```

### Digital Root

Write a method, `digital_root(num)`. It should Sum the digits of a positive
integer. If it is greater than 10, sum the digits of the resulting number.
Keep repeating until there is only one digit in the result, called the
"digital root". **Do not use string conversion within your method.**

You may wish to use a helper function, `digital_root_step(num)` which performs one step of the process.

### Solution

```rb
def digital_root(num)
  while num > 10
    num = digital_root_step(num)
  end

  num
end

def digital_root_step(num)
  root = 0
  while num > 0
    root += (num % 10)

    num /= 10
  end

  root
end
```

## Regular Methods

### Largest Prime Factor

Write a method that returns the largest prime factor of a number. We recommend writing a `is_prime?` helper method.

### Solution

```rb
def prime?(num)
  (2...num).none? { |factor| num % factor == 0 }
end

def largest_prime_factor(num)
  num.downto(2) do |factor|
    if (num % factor).zero?
      return factor if prime?(factor)
    end
  end

  nil
end
```

### Jumble Sort

Jumble sort takes a string and an alphabet. It returns a copy of the string
with the letters re-ordered according to their positions in the alphabet. If
no alphabet is passed in, it defaults to normal alphabetical order (a-z).

Example:

```rb
jumble_sort("hello") => "ehllo"
jumble_sort("hello", ['o', 'l', 'h', 'e']) => 'ollhe'
```

### Solution

```rb
def jumble_sort(str, alphabet = nil)
  alphabet ||= ('a'..'z').to_a

  sorted = false
  until sorted
    sorted = true

    str.length.times do |i|
      break if i == (str.length - 1)
      if alphabet.index(str[i]) > alphabet.index(str[i + 1])
        str[i], str[i + 1] = str[i + 1], str[i]
        sorted = false
      end
    end
  end

  str
end

# Alternately:
#
# def jumble_sort(str, alphabet = nil)
#   alphabet ||= ('a'..'z').to_a
#
#   sorted_chars = str.chars.sort do |chr1, chr2|
#     alphabet.index(chr1) <=> alphabet.index(chr2)
#   end
#
#   sorted_chars.join
# end
```
