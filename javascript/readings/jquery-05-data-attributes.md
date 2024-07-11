# jQuery Part V: Data Attributes

It is common to want to store data inside the DOM. To do this, you can
add your own data attribute to any element. Let me give you an
example:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul id="dogs"></ul>

<script>
  const DOGS = {
    101: {
      id: 101,
      name: "Sable",
      genus: "Husky Huskius"
    },

    234: {
      id: 234,
      name: "Blixa",
      genus: "Corgi Corgiorum"
    }
  };

  // Fill $dogsUl with list items; one per dog.
  const $dogsUl = $("ul#dogs");
  Object.keys(DOGS).forEach( id => {
    const dog = DOGS[id];

    const $dogLi = $("<li class='dog'></li>");
    $dogLi.text(dog.name + " -- " + dog.genus);

    // store the dog's id in a **data-* attribute**
    $dogLi.data("id", dog.id);

    $dogsUl.append($dogLi);
  });

  // Install click handlers on the li.dog elements.
  $("li.dog").on("click", event => {
    const $dogLi = $(event.currentTarget);

    // pull dog id out of the DOM to identify the dog.
    const dogId = $dogLi.data("id");
    const dog = DOGS[dogId];

    alert(dog.name + " loves you!");
  });
</script>
```

Here we are asking to listen for a `click` on each of the `li.dog`
elements; however, for all the elements, we install the same handler
function.

When we click on a `li.dog` element, how will the handler know which
dog we are talking about? For this purpose, we can set a **data
attribute** on the element; here we set an `id` data attribute on the
element. Now whenever we later encounter this element, we can write
`$dogLi.data("id")` to recover the previously saved `id` value.

Any kind of information can be stored as a data-attribute, under any
key you like. However, the most common case is to store a record `id`
which specifies the object that the element represents. This is what
we do in the example: the `id` data attribute stores a value which is
the key for the `Dog` the `$dogLi` is representing.

## `data-*` Attributes in the DOM

We saw how to use jQuery to set a data attribute on an element. This
can also be done in HTML by setting a `data-*` HTML attribute:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul id="dogs">
  <li data-dog='{ "id": 101, "name": "Sable", "genus": "Husky Huskius" }'>
    Sable -- Husky Huskius
  </li>

  <li data-dog='{ "id": 234, "name": "Blixa", "genus": "Corgi Corgiorum" }'>
    Blixa -- Corgi Corgiorum
  </li>
</ul>

<script>
  // Install click handlers on the li.dog elements.
  $("li").on("click", event => {
    const $dogLi = $(event.currentTarget);

    // pull dog attributes out of the DOM to identify the dog.
    const dog = $dogLi.data("dog");
    console.log(dog);

    alert(dog.name + " loves you!");
  });
</script>
```

Here, when we call `jQuery#data`, it will pull the initial data value
out of the DOM. This can be very helpful when Rails generates the
HTML, but JavaScript will later need to understand what record an
HTMLElement refers to.

Here we serialized the entire `Dog` object in the `data-dog`
attribute. It is more common to store a `data-id` with just the record
id, and have jQuery lookup the record by id.
