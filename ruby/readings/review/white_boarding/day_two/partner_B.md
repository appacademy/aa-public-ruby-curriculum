## Partner B: WhiteBoarding

## Concepts

1. **What is an object?**

**Answer:** An instance of a class. It's also the root class in ruby (Object).
Classes themselves descend from the Object root class.

2. **Explain this ruby idiom: `a ||= b`**

**Answer:** If the `a` is false then `a = b`. If the `a` side is true then `a`
isn't reassigned.

3. **What is unit testing? What is the primary technique when writing a test?**

**Answer:** Unit testing, simply put, is testing methods -- the smallest unit in
object-oriented programming. The primary way to achieve this is to assert that
the **actual** result of the method matches an **expected** result.

```rb
RSpec.describe Calculator do
  it "add method adds numbers" do
    calc = Calculator.new
    expect(calc.add(3, 4)).to eq(7)
  end
end
```

### OOP – Parking Lot

### Prompt

Design a parking lot using object-oriented principles.

(Don't spend too much time fleshing out actual methods. Aim to give a holistic
view of which methods exist on each of the classes.)

#### Solution

This question is very open-ended. The interviewee should ask questions to
specify what the design expectations are.

Ensure that the interviewee aims to satisfy the following:

- Each parking lot can have many floors.
- Each parking lot allows for various kinds of vehicles to park. Assume these
  are motorcycle, car, and bus. Each of these has a different size.
- There are multiple parking spot sizes. Assume those sizes are compact and
  regular.
- The rules for parking a vehicle in a spot are something like this:
  - Motorcycles can take any parking spot, whether regular or compact. (They
    require, say, four feet of parking space.)
  - Cars can take any regular spot. (They require, say, an eight foot wide
    spot.)
  - Buses require, say, forty feet of parking space, so they will have to take
    multiple spaces.

Obviously, there are many other possible questions about the structure, but the
interviewee can assume that anything beyond these specifics are left to their
discretion.

What follows below would be a skeleton for a valid approach:

```ruby
class Vehicle
  attr_reader :spots_needed, :size

  def initialize(license_plate)
    @parking_spots = []
    @license_plate = license_plate
  end

  def park_in_spot(spot)
    # ...
  end

  def clear_spots
    # ...
  end

  def can_fit_in_spot(spot)
    # ...
  end
end

class Bus < Vehicle
  def initialize
    super
    @spots_needed = 5
    @size = :large
  end

  def can_fit_in_spot(spot)
    # Checks if spot is :large
  end
end

class Car < Vehicle
  def initialize
    super
    @spots_needed = 1
    @size = :compact
  end

  def can_fit_in_spot(spot)
    # Check if spot is :compact or :large
  end
end

class Motorcycle < Vehicle
  def initialize
    super
    @spots_needed = 1
    @size = :compact
  end
end

class ParkingLot
  def initialize
    @levels = # generate_levels
  end

  def park_vehicle(vehicle)
    # Park the vehicle in a spot or multiple spots. Return false if failed.
  end
end

class Level
  def initialize(floor, num_spots)
    @spots = # generate spots
    @available_spots = num_spots
    @floor = floor
  end

  def park_vehicle(vehicle)
    # Find a place to park vehicle or return false.
  end

  def park_starting_at(spot_num, vehicle)
    # Park a vehicle starting at spot number and continue until vehicle.spots_needed.
  end

  def find_available_spots(vehicle)
    # Find a spot to park the vehicle. Return index of spot or -1.
  end

  def spot_freed
    @available_spots += 1
  end
end

class ParkingSpot
  attr_reader :row, :spot_num

  def initialize(size, level, row, spot_num)
    @vehicle = nil
    @spot_size = size
    @level = level
    @row = row
    @spot_num = spot_num
  end

  def is_free?
    !@vehicle
  end

  def can_fit_vehicle?(vehicle)
    # Check it will fit.
  end

  def park(vehicle)
    # Park in spot
  end

  def unpark
    # Remove vehicle from spot and notify level that a new spot is available.
  end
end
```

## Implement DFS

For this problem assume there is a Node class. The node class will take in a
value as part of its initialization.

Write a method `dfs` that does a depth-first search starting at a root node. It
takes in a proc as an argument. Assume nodes have a value, and a `attr_reader`
on that value. Assume there are working `parent`/`child`-related methods for
Node.

Example usage:

```ruby
n1 = Node.new(1) #making a node with a value of 1

n1.dfs { |node| node.value == 1 } #=> n1 (found a node with value == 1)
```

### Solution

```rb
class Node

  # -- Assume nodes have a value, and a attr_reader on value
  # -- Also, assume there are working parent/child-related methods for Node
  def dfs(&prc)
    raise "Must give a proc" if prc.nil?

    return self if prc.call(self)

    self.children.each do |node|
      result = node.dfs(&prc)
      return result if result
    end

    nil
  end
end
```
