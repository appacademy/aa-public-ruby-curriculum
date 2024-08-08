# Redux And Rails API

<quiz>
  <question>
    <p>Which of the following can you **not** do in a Jbuilder template?</p>
    <answer>Access Rails helper methods</answer>
    <answer>Access view partials</answer>
    <answer correct>Use JavaScript code </answer>
    <answer>Automate generation of nested JSON objects</answer>
    <answer>Access instance variables from the controller</answer>
    <answer>Use Ruby code</answer>
    <explanation>Can't use JavaScript! Jbuilder runs in Rails land, which is a Ruby environment.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>Jbuilder produces which of the following?</p>
    <answer correct>JSON</answer>
    <answer>XML</answer>
    <answer>HTML</answer>
    <explanation>JavaScript Object Notation!</explanation>
  </question>
</quiz>

```ruby
  # @notes == [{body: "get groceries", author: "claire"}, ...]

  json.array! @notes do |note|
    json.body note.body
    json.author note.author
  end
```

<quiz>
  <question>
    <p>What does the above Jbuilder code return?</p>
    <answer>`{ "notes": ["get groceries", "claire"], ... }`</answer>
    <answer correct>`[{ "body": "get groceries", "author": "claire"}, ...]`</answer>
    <answer>`[["get groceries", "claire"], ...]`</answer>
    <answer>`{ "body": ["get groceries", ...], "author": ["claire", ...]}`</answer>
    <explanation>`json.array!` is going to create an empty array.  Each `note` will be then turned into a POJO and stored as an element in the returned array.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>Suppose you have an `authors` table with columns for `name` and `language`. You want to create JSON formatted like the following: `{"author": {"name": "JK Rowling", "language": "English"}, ... }`.
    Which of the above will correctly format your JSON?</p>
    <answer correct>I</answer>
    <answer>I & II</answer>
    <answer>II & III</answer>
    <answer>II & IV</answer>
    <answer>IV</answer>
    <explanation>Only option `I` will give you the format you want!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>What purpose does Jbuilder serve?</p>
    <answer>Converting JSON to plain old JavaScript objects and back again</answer>
    <answer correct>Allowing you to control which attributes and objects you want to build into JSON structures</answer>
    <answer>Parsing database results into instances of the corresponding Rails models</answer>
    <answer>Constructing and formatting the data object to be sent within an AJAX request</answer>
    <explanation>Jbuilder makes it easy for you to both select and structure the information you want to send in a JSON response!</explanation>
  </question>
</quiz>
