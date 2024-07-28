# GraphNodes And BFS

First, construct a `GraphNode` class. Creating a node should give you access to
its value and the nodes to which it connects. (In the case of a bidirectional
graph, this will be all of its neighbors.) For any given node, you should be
able to add a neighboring node.

```rb
class GraphNode

end
```

Remember this graph from the readings?

![graph](https://s3-us-west-1.amazonaws.com/appacademy-open-assets/data_structures_algorithms/graphs/images/graph.png)

You can now build it using your new GraphNode class.

```ruby
a = GraphNode.new('a')
b = GraphNode.new('b')
c = GraphNode.new('c')
d = GraphNode.new('d')
e = GraphNode.new('e')
f = GraphNode.new('f')
a.neighbors = [b, c, e]
c.neighbors = [b, d]
e.neighbors = [a]
f.neighbors = [e]
```

Let's write a breadth-first search! Make sure to keep track not just of the
queue but also of all the nodes you've visited so far. If you find the
`target_value`, return the node with that value. If no node is found with the
`target_value`, return `nil`.

```ruby
def bfs(starting_node, target_value)

end
```

Now that you have a node class that can search in any direction, you have to be
careful about the way you search graphs. Before, in a unidirectional tree, you
could safely remove a node from consideration once you had checked its value;
there was no way a parent node could be linked back to itself by a child node.
Now, though, anything goes: your graph could link back on itself and catch you
in a loop if you're not careful!

You should be able to return the `GraphNode` with the value of "b" by running:

```ruby
bfs(a, "b")
```

Good job!

Now try running:

```ruby
  bfs(a, "f")
```

Did you get caught in an infinite loop? Look at the graph visualization and see
why. There is no way `Node A` can access `Node F` with the way this graph is
constructed. Think about how you could utilize a [Set][set] in order to keep
track of the nodes you've visited. You only want your `bfs` method to continue
as long as it is encountering new nodes. Try running `bfs(a, "f")` again until
the method returns `nil`.

For fun you can now try creating and traversing some new graphs of your own!

[set]: https://ruby-doc.org/stdlib-2.6.1/libdoc/set/rdoc/Set.html