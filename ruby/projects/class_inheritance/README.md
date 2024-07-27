# Class Inheritance

This mini-project will apply the skills you learned in last night's inheritance
reading.

## Learning goals

By the end of this practice, you should

- Understand how a subclass inherits from a superclass
- Know how to override a parent class's method
- Know when and how to use `super`

## `Employee` and `Manager`

Write a class `Employee` that has attributes that return the employee's name,
title, salary, and boss.

Write another class, `Manager`, that extends `Employee`. `Manager` should have
an attribute that holds an array of all employees assigned to the manager. Note
that managers might report to higher level managers, of course.

Add a method, `bonus(multiplier)` to `Employee`. Non-manager employees should
get a bonus like this

```plaintext
bonus = (employee salary) * multiplier
```

Managers should get a bonus based on the total salary of all of their
subordinates, as well as the manager's subordinates' subordinates, and the
subordinates' subordinates' subordinates, etc.

```plaintext
bonus = (total salary of all sub-employees) * multiplier
```

## Testing

If you have a company structured like this:

| Name   | Salary      | Title      | Boss   |
| ------ | ----------- | ---------- | ------ |
| Ned    | $1,000,000  | Founder    | nil    |
| Darren | $78,000     | TA Manager | Ned    |
| Shawna | $12,000     | TA         | Darren |
| David  | $10,000     | TA         | Darren |

then you should have bonuses like this:

```ruby
ned.bonus(5) # => 500_000
darren.bonus(4) # => 88_000
david.bonus(3) # => 30_000
```