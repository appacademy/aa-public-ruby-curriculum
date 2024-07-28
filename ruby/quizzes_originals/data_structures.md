# Data Structures Quiz

<quiz>
  <question>
    <p>LIFO (last-in-first-out) describes the behavior of which of the following?</p>
    <answer>Queue</answer>
    <answer>Set</answer>
    <answer correct>Stack</answer>
    <answer>Map</answer>
    <explanation>When you stack things on top of each other, you have to remove the item off the top first. We can remove the item at the bottom until all of the other items on top of it have been removed.  So the first thing that goes in is actually the last thing that comes out.</explanation>
  </question>
</quiz>


```ruby
        N
        / \
      N   N
      / \   
    N   N
    /
  N
```

<quiz>
  <question>
    <p>Is the above graph a binary tree?</p>
    <answer>No</answer>
    <answer correct>Yes</answer>
    <explanation>A binary tree is a graph with the constrant that a node can have at most two children.</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>BFS (breadth first search) uses which of the following ADTs?</p>
    <answer correct>Queue</answer>
    <answer>Set</answer>
    <answer>Stack</answer>
    <answer>Map</answer>
    <explanation>As we are looking at each node, we want to add their children to our list of nodes to look at.  A queue allows us to utilize FIFO (first in first out) so that the order in which the nodes are added to our list is the order in which they will be dealt with.</explanation>
  </question>
</quiz>


```ruby
        1   
        / \
      2   5
      /   / \
    3   6   9
    /   / \
  4   7   8
```

<quiz>
  <question>
    <p>If we used DFS to try and find the node with value 6 in the graph above, what is a possible ordering of nodes that would be visited?</p>
    <answer>1-2-5-3-6</answer>
    <answer correct>1-2-3-4-5-6</answer>
    <answer>4-3-2-1-7-8-6</answer>
    <answer>8-7-4-9-6</answer>
    <explanation>For DFS, we will look at a node, and then look at it's first child, and then that nodes first child and so on until we hit a leaf node or find the node we are searching for.  When we hit a leaf node, we will begin popping off the stack of recursive calls (going back up the tree a level at a time) and looking at the next child for that node. Once we find the node we are looking for, we start popping off the stack of recursive calls returning the node we found that has the value we are looking for.</explanation>
  </question>
</quiz>


```ruby
        D   
        / \
      A   E
      / \   \
    I   C   G
    / \     /
  H   F   B
```

<quiz>
  <question>
    <p>Which node in the above graph is the root?</p>
    <answer>`A`</answer>
    <answer>`B`</answer>
    <answer correct>`D`</answer>
    <answer>`F`</answer>
    <answer>`H`</answer>
    <answer>`I`</answer>
    <explanation>The root node refers to the top most node that has no parent node.</explanation>
  </question>
</quiz>
