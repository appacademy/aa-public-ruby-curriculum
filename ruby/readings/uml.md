# Unified Modeling Language

Unified Modeling Language (UML) is a visual way of describing the relationships between different objects in a system. UML can describe classes (e.g., the structure of an object-oriented software program) or behavior (e.g., diagramming a set of concurrent processes). We will be using UML to model the class structure of our chess game.

In UML, classes can be related to each other in several different ways, including `parent-child` and `association` (a "has a" relationship). `Piece`  is the parent of `Pawn`, for example, while `Game` is associated with `Board` because `Game` has a (i.e. `requires`) `Board`.

A class is usually drawn in UML with three components: a name, a set of attributes (instance variables), and a set of methods. The attributes and methods are marked as being public (+), private(-), or protected (#), and class methods are underlined.

## Example

Take a look at this [diagram][chess-diagram] for our chess implementation.

[chess-diagram]: https://assets.aaonline.io/fullstack/ruby/assets/Chess_Diagram.png
