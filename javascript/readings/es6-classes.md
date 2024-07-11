# Classes

Review the reading on Object-Oriented Javascript. ES2015 provides an
alternative syntax for creating object-constructor functions. ES2015 lets us
create classes with a more intuitive and Ruby-like syntax. Consider this
example:

```javascript
class Bicycle {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  action() {
    return "rolls along";
  }

  ride() {
    console.log(
      `The ${this.color} ${this.model}  
      goes "whoosh" and ${this.action()}!`
    );
  }

  static parade() {
    Bicycle.funBicycles.forEach(bike => bike.ride());
  }
}

const cruiser = new Bicycle("Schwinn", "turquoise");
const salsaFargo = new Bicycle("Salsa Fargo", "burnt orange");
const flyingMerkel = new Bicycle("Flying Merkel", "green");
const bianchiVolpe = new Bicycle("Bianchi Volpe", "slate blue");

Bicycle.funBicycles = [cruiser, salsaFargo, flyingMerkel, bianchiVolpe];

Bicycle.parade();

// The turquoise Schwinn goes "whoosh" and rolls along!
// The burnt orange Salsa Fargo goes "whoosh" and rolls along!
// The green Flying Merkel goes "whoosh" and rolls along!
// The slate blue Bianci Volpe goes "whoosh" and rolls along!
```

`prototype` methods (instance methods) are written right within the class
object, as is the special `constructor` function that initializes a new object.

`static` methods can also be defined within the class object; they mimic class
methods by being called **without** instantiating the class.

:bike::bike::bike:

## Classes are just sugar

Although ES6 classes may look pretty different from ES5, they are ultimately
just syntactic sugar for the same prototype-based inheritance model we already
know.
