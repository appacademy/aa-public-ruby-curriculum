
// `Function.prototype.inherits` using surrogate trick

Function.prototype.inherits1 = function inherits1(BaseClass) {
  function Surrogate() {}
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

// `Function.prototype.inherits` using `Object.create`

Function.prototype.inherits2 = function inherits2(BaseClass) {
  this.prototype = Object.create(BaseClass.prototype);
  this.prototype.constructor = this;
};

function Dog(name) {
  this.name = name;
}

Dog.prototype.bark = function bark() {
  console.log(this.name + " barks!");
};

function Corgi(name) {
  Dog.call(this, name);
}

Corgi.inherits1(Dog);

Corgi.prototype.waddle = function waddle() {
  console.log(this.name + " waddles!");
};

const blixa = new Corgi("Blixa");
blixa.bark();
blixa.waddle();
