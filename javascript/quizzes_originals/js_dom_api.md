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

<quiz>
  <question>
    <p>When mousing over the `Leopold` `li` element, what are the `currentTarget` and `target`, respectively?</p>
    <answer correct>`ul.joycean-corgis` and `<li>Leopold</li>`</answer>
    <answer>`<li>Leopold</li>` and `ul.joycean-corgis`</answer>
    <answer>`ul.joycean-corgis` and `ul.joycean-corgis`</answer>
    <answer>`<li>Leopold</li>` and `<li>Leopold</li>`</answer>
    <answer>There's only a `delegateTarget` and a `currentTarget`</answer>
    <explanation>`target` will be the element that triggered the event - in this case, the `<li>` element that was moused over. `currentTarget` is the element that the event listener is assigned to, which is the `ul.joycean-corgis`</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>The code is the same as in question 1. When mousing over `Leopold` `li` element, what element(s) generate(s) the event?</p>
    <answer>`ul.joycean-corgis` and `<li>Leopold</li>`</answer>
    <answer correct>`<li>Leopold</li>`</answer>
    <answer>`ul.joycean-corgis`</answer>
    <answer>the `aside`</answer>
    <answer>No element generates the event.</answer>
    <explanation>The `<li>` is the element that was moused over and is therefore the element that generates the event.</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>This code has a different `script`. What would be the `currentTarget`, `target`, and `delegateTarget`, respectively, when mousing over `Leopold` `li` element?</p>
    <answer>`<li>Leopold</li>`, `<li>Leopold</li>`, `<li>Leopold</li>`</answer>
    <answer>`ul.joycean-corgis`, `<li>Leopold</li>`, `ul.joycean-corgis`</answer>
    <answer correct>`<li>Leopold</li>`, `<li>Leopold</li>`, `ul.joycean-corgis`</answer>
    <answer>`ul.joycean-corgis`, NONE, `ul.joycean-corgis`</answer>
    <answer>`ul.joycean-corgis`, `ul.joycean-corgis`, `ul.joycean-corgis`</answer>
    <explanation>We are mousing over `<li>Leopold</li>` therefore that is the `target`.  The event listener is assigned to the `'li'` elements that are children to `ul.joycean-corgis`, therefor the `currentTarget` is the `'li'` that was moused over (`<li>Leopold</li>`).  The `delegateTarget` will be the element that the event listener was originally attached, `'ul.joycean-corgis'`.</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>In what order would the alerts appear if you were to click on the text "Labyrinth"?</p>
    <answer>'Nom Nom', 'Uh Oh', 'Escape!'</answer>
    <answer>'Escape!', 'Uh Oh', 'Nom Nom'</answer>
    <answer>'Escape!', 'Uh Oh'</answer>
    <answer correct>'Uh Oh', 'Escape!'</answer>
    <answer>No events are triggered</answer>
    <explanation>The event will start at the element that we clicked on and then bubble up.</explanation>
  </question>
</quiz>



<quiz>
  <question>
    <p>What's the data type of the return value of `window.history`?</p>
    <answer>String</answer>
    <answer>Array</answer>
    <answer>Hash</answer>
    <answer>NaN</answer>
    <answer correct>Object</answer>
    <explanation>Everything in JS is an object! `window.history` is an object with different properties like `length`.</explanation>
  </question>
</quiz>