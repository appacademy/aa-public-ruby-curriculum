# Rails Forms

```html
<input type='hidden' name='cat[tag_ids][]' value=''>
```

<quiz>
  <question>
  <p>What is the purpose of the above line of code?</p>
    <answer>To set the 'tag_ids' to all available tags, the default value.</answer>
    <answer>To prevent any 'tag_ids' from being displayed on the page.</answer>
    <answer correct>To ensure 'tag_ids' is set to an empty array even if nothing was selected.</answer>
    <explanation>To ensure that 'tag_ids' sends an empty array even if no selection was made, you can set the `name` to `cat[tag_ids][]`. </explanation>
  </question>
</quiz>

```ruby
# Consider the following code:

# cats_controller.rb
def index
  if params[:tag]
    @cats = Tag.find_by(name: params[:tag]).cats
  else
    @cats = Cat.all
  end

  render :index
end
```

<quiz>
  <question>
  <p>What will a GET request to `/cats?cat_name=Markov` result in?</p>
    <answer correct>A list of all the cats.</answer>
    <answer>Only the cats named 'Markov'.</answer>
    <answer>An error.</answer>
    <explanation>Since there is no `tag` parameter being passed in, the above request will produce a list of all the cats.</explanation>
  </question>
</quiz>

```ruby
# Consider the following code:

# cats_controller.rb
def index
  if params[:tag]
    @cats = Tag.find_by(name: params[:tag]).cats
  else
    @cats = Cat.all
  end

  render :index
end
```

<quiz>
  <question>
  <p>What will a GET request to `/cats?tag=athletic` result in?</p>
    <answer>A list of all the cats.</answer>
    <answer correct>A list of all the cats tagged 'athletic'.</answer>
    <answer> An empty list, no cats.</answer>
    <answer> An error.</answer>
    <explanation>This request has a `tag` parameter, so it will produce a list of all the cats tagged 'athletic'.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
  <p>How are concerns different from regular modules? (Select all that apply.)</p>
    <answer correct>They can run code in the class scope at the time they are included.</answer>
    <answer correct>They have their own dedicated folders in the default Rails folder hierarchy.</answer>
    <answer correct>They include the line 'extend ActiveSupport::Concern'</answer>
    <explanation>All of the above!</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>What extra key-value pair must be added to a 'belongs_to' association to enable polymorphic associative behavior?</p>
    <answer correct>`polymorphic: true`</answer>
    <answer>`polymorphic_key: :id`</answer>
    <answer>`as: :polymorphic`</answer>
    <answer>`as: :pictureable`</answer>
    <explanation>It's as simple as marking the association `polymorphic: true`.</explanation>
  </question>
</quiz>
