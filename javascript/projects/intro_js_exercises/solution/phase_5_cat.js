function Cat (name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function () {
  return `${this.owner} loves ${this.name}. :3`;
};

const cat1 = new Cat('Markov', 'Ned');
const cat2 = new Cat('Breakfast', 'Devon');

console.log(cat1.cuteStatement());
console.log(cat2.cuteStatement());

Cat.prototype.cuteStatement = function () {
  return `Everyone loves ${this.name}!`;
};

console.log(cat1.cuteStatement());
console.log(cat2.cuteStatement());

Cat.prototype.meow = function () {
  return 'meow';
};

console.log(cat1.meow());

cat1.meow = function () {
  return 'purr';
};

console.log(cat1.meow());
console.log(cat2.meow());
