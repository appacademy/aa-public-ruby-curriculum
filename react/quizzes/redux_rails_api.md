# Redux And Rails API

Which of the following can you **not** do in a Jbuilder template?
- [ ] Access Rails helper methods
- [ ] Access view partials
- [ ] Use JavaScript code 
- [ ] Automate generation of nested JSON objects
- [ ] Access instance variables from the controller
- [ ] Use Ruby code

<details><summary>Answer:</summary>

Use JavaScript code</details>
<details><summary>Explanation:</summary>

Can't use JavaScript! Jbuilder runs in Rails land, which is a Ruby environment.</details>

Jbuilder produces which of the following?
- [ ] JSON
- [ ] XML
- [ ] HTML

<details><summary>Answer:</summary>

JSON</details>
<details><summary>Explanation:</summary>

JavaScript Object Notation!</details>

```ruby
  # @notes == [{body: "get groceries", author: "claire"}, ...]

  json.array! @notes do |note|
    json.body note.body
    json.author note.author
  end
```

What does the above Jbuilder code return?
- [ ] `{ "notes": ["get groceries", "claire"], ... }`
- [ ] `[{ "body": "get groceries", "author": "claire"}, ...]`
- [ ] `[["get groceries", "claire"], ...]`
- [ ] `{ "body": ["get groceries", ...], "author": ["claire", ...]}`

<details><summary>Answer:</summary>

`[{ "body": "get groceries", "author": "claire"}, ...]`</details>
<details><summary>Explanation:</summary>

`json.array!` is going to create an empty array.  Each `note` will be then turned into a POJO and stored as an element in the returned array.</details>

```ruby
  # I.
  json.author @author, :name, :language

  # II.
  json.author do
    :name, :language
  end

  # III.
  json.author do
    json.name
    json.language
  end

  # IV.
  json.author do
    @author :name, :bibliography
  end
```

Suppose you have an `authors` table with columns for `name` and `language`. You want to create JSON formatted like the following: `{"author": {"name": "JK Rowling", "language": "English"}, ... }`.
    Which of the above will correctly format your JSON?
- [ ] I
- [ ] I & II
- [ ] II & III
- [ ] II & IV
- [ ] IV

<details><summary>Answer:</summary>

I</details>
<details><summary>Explanation:</summary>

Only option `I` will give you the format you want!</details>

What purpose does Jbuilder serve?
- [ ] Converting JSON to plain old JavaScript objects and back again
- [ ] Allowing you to control which attributes and objects you want to build into JSON structures
- [ ] Parsing database results into instances of the corresponding Rails models
- [ ] Constructing and formatting the data object to be sent within an AJAX request

<details><summary>Answer:</summary>

Allowing you to control which attributes and objects you want to build into JSON structures</details>
<details><summary>Explanation:</summary>

Jbuilder makes it easy for you to both select and structure the information you want to send in a JSON response!</details>
