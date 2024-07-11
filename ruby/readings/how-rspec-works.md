# How RSpec Works

```ruby
def method_missing(method_name)
  if method_name.to_s.start_with?("be_")
    predicate_name = method_name[(3..-1)]
    BeMatcher.new(predicate_name)
  else
    super
  end
end

class BeMatcher
  def initialize(predicate_name)
    @predicate_name = predicate_name
  end

  def verify(object)
    unless object.send(@predicate_name + "?")
      raise "Assertion failed, mortal!"
    end
  end
end

class EqualMatcher
  def initialize(value)
    @value = value
  end

  def ==(other)
    unless @value == other
      raise "These aren't equal, dope!"
    end
  end
end

class Object
  def should(matcher = nil)
    if matcher.nil?
      EqualMatcher.new(self)
    else
      matcher.verify(self)
    end
  end
end
```
