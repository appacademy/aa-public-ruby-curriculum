## HTML Form Element

Forms in HTML allow for users/clients to interact with your application/website by inputting data. We create form elements using `<form></form>` tags and then fill the form with a selection of different types of control elements.

The following list references the HTML Forms Guide, excellent documentation written by the Mozilla Developer Network. Teaching and remembering every aspect of HTML would be both difficult and fairly unneccessary. Instead we should get used to being able to quickly search correct HTML syntax and practice reading online documentation.

The table contains links to references about the most popular HTML form elements, their most popular attributes and some of those attribute's most popular values. Read through the docs as well as the notes below and then use both to complete tonight's exercise.

Popular Elements | Popular Attributes | Popular Values
------------|----------------|--------------
[Form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) | [action](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action), [method](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) | Action takes a URI like "/example.com" and Method takes a HTTP request method of either "GET" or "POST."
[Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) | button, checkbox, color, date, email, hidden, number, password, radio, search, url
[Input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | [checked](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-checked), [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-name), [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder), [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#value) | These values depend on the attribute but are usually just "Text." Checked is either "true" or "false."
[Label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) | [for](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#for)| The for attribute takes text corresponding to the id attribute of the element being labeled.
[Select](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) | name, disabled | These values depend on the attribute but are usually just "Text." Disabled is either "true" or "false."
[Option](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) | value, selected, disabled | These values depend on the attribute but are usually just "Text." Disabled/Selected is either "true" or "false."
[Textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | maxlength, minlength, name, rows, cols, wrap, spellcheck | These values depend on the attribute but are usually just "Text" or numbers like "123."

## Notes

Some Notes on these popular HTML Elements:

- Input Elements are by far the most common and special element of a form because they can take on completely different functionalities depending on their attribute type.

- Labels can be written two ways, by wrapping the input element or by using the `for` attribute and applying a corresponding `id` attribute to the input.

- Submitting forms makes a default post request with parameters made up by the provided values for each name attribute.

- By giving each radio input element the same name attribute value, the radio buttons will only allow the user to select one per radio of that name per form.

- `Option` elements are defined inside a `select` element and the value attributes for each option display what will be inside the dropdown. 


