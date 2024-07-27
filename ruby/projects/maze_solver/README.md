# Maze Solver

In this exercise, you want to write a program that will find a route between two
points in a maze.

Here's an example [maze][maze1]. It has an 'S' for the start point and an 'E'
for an endpoint.

You should write a program that will read in the maze, try to explore a path
through it to the end, and then print out a completed path [like
so][maze1-soln]. If there is no such path, it should inform the user.

Make your program run as a command line script, taking in the name of a maze
file on the command line.

Your path through the maze should not be self-intersecting, of course.

When you have found a first solution, write a version which will be
sure to find the *shortest path* through the maze.

[maze1]: https://assets.aaonline.io/fullstack/ruby/projects/maze_solver/maze1.txt
[maze1-soln]: https://assets.aaonline.io/fullstack/ruby/projects/maze_solver/maze1_solution.txt

## Resources

**N.B.:** Try taking a naive approach first. Once you've got something working
read on...

* [Reading Files][read-file]
* Simple-ish explanation of A* algorithm for computer [pathfinding][a-star]
  (start at "Starting the Search" heading)
* More in-depth discussion of different [pathfinding][stanford] algorithms
  (also ultimately focusing on A*)
* [Wikipedia][wikipedia]: maze shortest path

[stanford]: http://theory.stanford.edu/~amitp/GameProgramming/AStarComparison.html
[read-file]: https://stackoverflow.com/a/24224062
[a-star]: http://archive.gamedev.net/archive/reference/articles/article2003.html
[wikipedia]: http://en.wikipedia.org/wiki/Maze_solving_algorithm#Shortest_path_algorithm