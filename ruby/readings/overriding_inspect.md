# Inspecting Complex Objects

When we start dealing with complex objects, and in particular objects that hold
recursive references to other objects, the information provided to us by
`inspect` (what you see when you use `p` instead of `puts`) can quickly become
overwhelming and unreadable. To see an example of this, take a look at the
output for a failed spec on the PolyTreeNode class:

```
1) PolyTreeNode#parent= does not add the same node twice
     Failure/Error: expect(node1.children).to eq([node2, node3])

       expected: [#<PolyTreeNode:0x007f8092bbc0f0 @parent=#<PolyTreeNode:0x007f8092bbc078 @parent=nil, @children=[#<PolyTreeNode:0x007f8092bbc0f0 ...>, #<PolyTreeNode:0x007f8092bc7f90 @parent=#<PolyTreeNode:0x007f8092bbc078 ...>, @children=[], @value="child2">, #<PolyTreeNode:0x007f8092bc7f90 @parent=#<PolyTreeNode:0x007f8092bbc078 ...>, @children=[], @value="child2">], @value="root">, @children=[], @value="child1">, #<PolyTreeNode:0x007f8092bc7f90 @parent=#<PolyTreeNode:0x007f8092bbc078 @parent=nil, @children=[#<PolyTreeNode:0x007f8092bbc0f0 @parent=#<PolyTreeNode:0x007f8092bbc078 ...>, @children=[], @value="child1">, #<PolyTreeNode:0x007f8092bc7f90 ...>, #<PolyTreeNode:0x007f8092bc7f90 ...>], @value="root">, @children=[], @value="child2">]
            got: [#<PolyTreeNode:0x007f8092bbc0f0 @parent=#<PolyTreeNode:0x007f8092bbc078 @parent=nil, @children=[...], @value="root">, @children=[], @value="child1">, #<PolyTreeNode:0x007f8092bc7f90 @parent=#<PolyTreeNode:0x007f8092bbc078 @parent=nil, @children=[...], @value="root">, @children=[], @value="child2">, #<PolyTreeNode:0x007f8092bc7f90 @parent=#<PolyTreeNode:0x007f8092bbc078 @parent=nil, @children=[...], @value="root">, @children=[], @value="child2">]
```

We may have a good guess, but it's tough to verify the problem based on the
`expected:` / `got:` difference. Which nodes are supposed to be in the children
array, and which are actually there?

One way we can simplify this process is by specifying what information we want
to see when we inspect an object. In this case, we may only be interested in 
what a `Node`'s value is. We can do this by overriding the default `inspect` 
instance method for our class (this is inherited from `Object`).

```
class PolyTreeNode
  # ...
  # ...
  def inspect
    @value.inspect
  end
end
```

The `rspec` output now looks like this: 

```
1) PolyTreeNode#parent= does not add the same node twice
   Failure/Error: expect(node1.children).to eq([node2, node3])

     expected: ["child1", "child2"]
          got: ["child1", "child2", "child2"]
```

Much better!

We can output more complex information as well, for example:

```
class PolyTreeNode
  # ...
  # ...
  def inspect
    { 'value' => @value, 'parent_value' => @parent.value }.inspect
  end
end
```

This causes the `rspec` output to display as below.

```
1) PolyTreeNode#parent= does not add the same node twice
     Failure/Error: expect(node1.children).to eq([node2, node3])

       expected: [{"value"=>"child1", "parent_value"=>"root"}, {"value"=>"child2", "parent_value"=>"root"}]
            got: [{"value"=>"child1", "parent_value"=>"root"}, {"value"=>"child2", "parent_value"=>"root"}, {"value"=>"child2", "parent_value"=>"root"}]
```

Overriding `inspect` isn't always necessary, and you won't do it in every case. 
However it's an excellent option if you're having trouble reading `rspec` output
or finding needed data in your objects when debugging.
