# Javascript DOM API Quiz


```html
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

  <ul class="joycean-corgis">
    <li>Leopold</li>
    <li>Stephen</li>
    <li>Molly</li>

    <aside>A man of genius makes no mistakes. His errors are volitional and are the portals of discovery.</aside>
  </ul>

  <script>
    $('ul.joycean-corgis').on('mouseover', event => {
      const $ul = $(event.currentTarget);
      if ($ul.find('li').is(event.target)) {
        const $newCorg = $('<li></li>').text('Buck Mulligan');
        $('ul.joycean-corgis').append($newCorg);
      };
    });
  </script>
```

When mousing over the `Leopold` `li` element, what are the `currentTarget` and `target`, respectively?
- [ ] `ul.joycean-corgis` and `<li>Leopold</li>`
- [ ] `<li>Leopold</li>` and `ul.joycean-corgis`
- [ ] `ul.joycean-corgis` and `ul.joycean-corgis`
- [ ] `<li>Leopold</li>` and `<li>Leopold</li>`
- [ ] There's only a `delegateTarget` and a `currentTarget`

<details><summary>Answer:</summary>

`ul.joycean-corgis` and `<li>Leopold</li>`</details>
<details><summary>Explanation:</summary>

`target` will be the element that triggered the event - in this case, the `<li>` element that was moused over. `currentTarget` is the element that the event listener is assigned to, which is the `ul.joycean-corgis`</details>



```html
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

  <ul class="joycean-corgis">
    <li>Leopold</li>
    <li>Stephen</li>
    <li>Molly</li>

    <aside>A man of genius makes no mistakes. His errors are volitional and are the portals of discovery.</aside>
  </ul>

  <script>
    $('ul.joycean-corgis').on('mouseover', event => {
      const $ul = $(event.currentTarget);
      if ($ul.find('li').is(event.target)) {
        const $newCorg = $('<li></li>').text('Buck Mulligan');
        $('ul.joycean-corgis').append($newCorg);
      };
    });
  </script>
```

The code is the same as in question 1. When mousing over `Leopold` `li` element, what element(s) generate(s) the event?
- [ ] `ul.joycean-corgis` and `<li>Leopold</li>`
- [ ] `<li>Leopold</li>`
- [ ] `ul.joycean-corgis`
- [ ] the `aside`
- [ ] No element generates the event.

<details><summary>Answer:</summary>

`<li>Leopold</li>`</details>
<details><summary>Explanation:</summary>

The `<li>` is the element that was moused over and is therefore the element that generates the event.</details>



```html
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

  <ul class="joycean-corgis">
    <li>Leopold</li>
    <li>Stephen</li>
    <li>Molly</li>

    <aside>A man of genius makes no mistakes. His errors are volitional and are the portals of discovery.</aside>
  </ul>

  <script>
    $('ul.joycean-corgis').on('mouseover', 'li', event => {
      const $newCorg = $('<li></li>').text('Buck Mulligan');
      $('ul.joycean-corgis').append($newCorg);
    });
  </script>
```

This code has a different `script`. What would be the `currentTarget`, `target`, and `delegateTarget`, respectively, when mousing over `Leopold` `li` element?
- [ ] `<li>Leopold</li>`, `<li>Leopold</li>`, `<li>Leopold</li>`
- [ ] `ul.joycean-corgis`, `<li>Leopold</li>`, `ul.joycean-corgis`
- [ ] `<li>Leopold</li>`, `<li>Leopold</li>`, `ul.joycean-corgis`
- [ ] `ul.joycean-corgis`, NONE, `ul.joycean-corgis`
- [ ] `ul.joycean-corgis`, `ul.joycean-corgis`, `ul.joycean-corgis`

<details><summary>Answer:</summary>

`<li>Leopold</li>`, `<li>Leopold</li>`, `ul.joycean-corgis`</details>
<details><summary>Explanation:</summary>

We are mousing over `<li>Leopold</li>` therefore that is the `target`.  The event listener is assigned to the `'li'` elements that are children to `ul.joycean-corgis`, therefor the `currentTarget` is the `'li'` that was moused over (`<li>Leopold</li>`).  The `delegateTarget` will be the element that the event listener was originally attached, `'ul.joycean-corgis'`.</details>



```html
<div class="knossos">
  Knossos
  <div class="labyrinth">
    Labyrinth
    <div class="minotaur">
      Minotaur
    </div>
    Labyrinth
  </div>
  Knossos
</div>

<script>
  const knossos = document.querySelector('.knossos');
  knossos.addEventListener('click', () => {
    alert('Escape!');
  });

  const labyrinth = document.querySelector('.labyrinth');
  labyrinth.addEventListener('click', () => {
    alert('Uh Oh');
  });

  const minotaur = document.querySelector('.minotaur');
  minotaur.addEventListener('click', () => {
    alert('Nom Nom');
  });
</script>
```

In what order would the alerts appear if you were to click on the text "Labyrinth"?
- [ ] 'Nom Nom', 'Uh Oh', 'Escape!'
- [ ] 'Escape!', 'Uh Oh', 'Nom Nom'
- [ ] 'Escape!', 'Uh Oh'
- [ ] 'Uh Oh', 'Escape!'
- [ ] No events are triggered

<details><summary>Answer:</summary>

'Uh Oh', 'Escape!'</details>
<details><summary>Explanation:</summary>

The event will start at the element that we clicked on and then bubble up.</details>



What's the data type of the return value of `window.history`?
- [ ] String
- [ ] Array
- [ ] Hash
- [ ] NaN
- [ ] Object

<details><summary>Answer:</summary>

Object</details>
<details><summary>Explanation:</summary>

Everything in JS is an object! `window.history` is an object with different properties like `length`.</details>