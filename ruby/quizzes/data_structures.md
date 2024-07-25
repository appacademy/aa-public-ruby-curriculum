# Data Structures Quiz

#### LIFO (last-in-first-out) describes the behavior of which of the following?
- [ ] Queue
- [ ] Set
- [ ] Stack
- [ ] Map

<details><summary>Answer:</summary>Stack</details>
<details><summary>Explanation:</summary>When you stack things on top of each other, you have to remove the item off the top first. We can remove the item at the bottom until all of the other items on top of it have been removed.  So the first thing that goes in is actually the last thing that comes out.</details>

```ruby
        N
        / \
      N   N
      / \   
    N   N
    /
  N
```

#### Is the above graph a binary tree?
- [ ] No
- [ ] Yes

<details><summary>Answer:</summary>Yes</details>
<details><summary>Explanation:</summary>A binary tree is a graph with the constrant that a node can have at most two children.</details>

#### BFS (breadth first search) uses which of the following ADTs?
- [ ] Queue
- [ ] Set
- [ ] Stack
- [ ] Map

<details><summary>Answer:</summary>Queue</details>
<details><summary>Explanation:</summary>As we are looking at each node, we want to add their children to our list of nodes to look at.  A queue allows us to utilize FIFO (first in first out) so that the order in which the nodes are added to our list is the order in which they will be dealt with.</details>

```ruby
        1   
        / \
      2   5
      /   / \
    3   6   9
    /   / \
  4   7   8
```

#### If we used DFS to try and find the node with value 6 in the graph above, what is a possible ordering of nodes that would be visited?
- [ ] 1-2-5-3-6
- [ ] 1-2-3-4-5-6
- [ ] 4-3-2-1-7-8-6
- [ ] 8-7-4-9-6

<details><summary>Answer:</summary>1-2-3-4-5-6</details>
<details><summary>Explanation:</summary>For DFS, we will look at a node, and then look at it's first child, and then that nodes first child and so on until we hit a leaf node or find the node we are searching for.  When we hit a leaf node, we will begin popping off the stack of recursive calls (going back up the tree a level at a time) and looking at the next child for that node. Once we find the node we are looking for, we start popping off the stack of recursive calls returning the node we found that has the value we are looking for.</details>

```ruby
        D   
        / \
      A   E
      / \   \
    I   C   G
    / \     /
  H   F   B
```

#### Which node in the above graph is the root?
- [ ] `A`
- [ ] `B`
- [ ] `D`
- [ ] `F`
- [ ] `H`
- [ ] `I`

<details><summary>Answer:</summary>`D`</details>
<details><summary>Explanation:</summary>The root node refers to the top most node that has no parent node.</details>
