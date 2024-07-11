# Active Storage Attachment / React File Upload Demo

This demo shows how to upload images using React, Active Storage, and AWS S3.

## Demo

#### Bite Sized Videos

- [(Setting up ActiveStorage)](https://vimeo.com/351475079)
- [(Setting up S3)](https://vimeo.com/351474880)
- [(Handling keys and credentials)](https://vimeo.com/351474983)
- [(Uploading a photo)](https://vimeo.com/278727030)
- [(Displaying S3 images in React)](https://vimeo.com/278727054)
- [(Reading files in React forms)](https://vimeo.com/278727067)
- [(Sending files to Rails via React)](https://vimeo.com/278727091)
- [(Image preview)](https://vimeo.com/278727103)
- [(Validations for attachments)](https://vimeo.com/278727131)

Here is the source
[code](https://assets.aaonline.io/fullstack/full-stack-project/additional_resources/ActiveStorageDemo.zip).

## Key Files

- `post.rb`
- `api/posts/index.json.jbuilder`
- `Form.jsx`
- `storage.yml`
- `development.rb`
- `production.rb`
- `credentials.yml.enc`

## Useful Docs

- [ActiveStorage README](https://github.com/rails/rails/blob/master/activestorage/README.md)
- [ActiveStorage Guide](http://guides.rubyonrails.org/active_storage_overview.html)
- [AWS](http://aws.amazon.com/)
- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

### A Note on S3 Pricing

In order to use the S3 cloud storage service, you need to
[create an AWS account](https://portal.aws.amazon.com/billing/signup#/start).
You will be asked for a credit card, but you will not be charged right away.
However, it has happened that students were charged because they exceeded the
data limits of the [free tier](https://aws.amazon.com/free/). Take a minute to
read up on [the pricing for S3](https://aws.amazon.com/s3/pricing/). There are
two ways in which students have accidentally exceeded the data limits:

1. Their seed file contained too many images or videos and they seeded their
   database too many times.
1. They had an index page with lots of `video` tags that loaded a lot of large
   video files on every refresh.

If you're worried about exceeding the data limits for the free tier, make sure
to regularly monitor your usage.

### Setting up AWS

- The first thing we need to set up is our buckets. This is where amazon will
  actually store our files. Click on 'S3' and then 'Create Bucket'. We should
  make a separate bucket for development and production. I would use something
  like `app-name-dev` and `app-name-pro`. Set the region to the one closest to
  you (that's N. Virginia if you're in New York).
- Now we have space set aside on AWS, but we don't have permission to access it.
  We need to create a user, and a policy for them to access your buckets. Go
  back to the main page and click 'Identity and Access Management' then click
  'Users' on the left. We'll make a new user, named whatever you like.
- You'll be directed to a page with your brand new security credentials,
  DOWNLOAD AND SAVE THEM NOW, you will not have access to them again. If you do
  lose them, just delete the user and make a new one.
- The keys you just saved give you access to your AWS server space, **don't push
  them to GitHub, or put them anywhere public!**
- Now we need to set up the security policy for our new user. This is how they
  will be allowed to connect. Click 'Attach existing policies directly' and then
  'Create Policy'. You can use this sensible default and not worry too much
  about what it's doing for you (borrrrriing). Remember to switch out
  bucket-name for your bucket.

### User Policy

```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1420751757000",
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::{BUCKET-NAME-DEV}",
        "arn:aws:s3:::{BUCKET-NAME-DEV}/*",
        "arn:aws:s3:::{BUCKET-NAME-PRO}",
        "arn:aws:s3:::{BUCKET-NAME-PRO}/*"
      ]
    }
  ]
}
```

- Don't forget we also need a policy for each of your buckets that allows the
  user you just created to access it.
- Navigate back to the S3 page and click on each of your buckets to access the
  respective bucket page.
- Once you are on a bucket page, click on the top tab named 'Permissions' and
  then click on 'Bucket Policy'. From there you can edit the bucket policy. Use
  this template and remember to fill out the user information with the new user
  we just created.

### Bucket Policy

```js
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1420751757000",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::{YOUR-AWS-ACCOUNT-ID}:user/{YOUR-USER-NAME}"
            },
            "Action": "s3:*",
            "Resource": [
              "arn:aws:s3:::{YOUR-BUCKET-NAME}",
              "arn:aws:s3:::{YOUR-BUCKET-NAME}/*"
            ]
        }
    ]
}
```

- That's pretty much it for AWS. Now we have to convince Active Storage to use
  it!

### Setting up Active Storage

- First add `gem "aws-sdk-s3"` to your Gemfile and bundle install.

- Run `bundle exec rails active_storage:install` to create the migrations for
  the attachments and blobs tables. You don't have to worry about what columns
  are in these tables!

- Run `bundle exec rails db:migrate` to run the migrations.

- Add the attachment association to your desired model

```ruby
class Post < ApplicationRecord
  has_one_attached :photo
end
```

- Great, next we need to set up Active Storage to save to AWS.
- Run `bundle exec rails credentials:edit` (You should make sure you default
  editor is set to VS Code if you're not comfortable with vim. Add this line
  `export EDITOR="code --wait"` to your ~/.bashrc if it isn't there already).
- Once the editor opens with your unencrypted credentials file, you should add
  your keys to look something like this.

```yml
aws:
  access_key_id: "XXXX"
  secret_access_key: "XXXX"
  region: "us-east-1"
  dev:
    bucket: "BUCKET-NAME-DEV"
  prod:
    bucket: "BUCKET-NAME-PROD"

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: XXXXXX
```

Double check your `s3_region` [here][aws-regions] (scroll down to **API
Gateways**).

[aws-regions]: http://docs.aws.amazon.com/general/latest/gr/rande.html

- Next we have to add our services to our `storage.yml`.

```yml
amazon_dev:
  service: S3
  access_key_id: <%= Rails.application.credentials.aws[:access_key_id] %>
  secret_access_key:
    <%= Rails.application.credentials.aws[:secret_access_key] %>
  region: <%= Rails.application.credentials.aws[:region] %>
  bucket: <%= Rails.application.credentials.aws[:dev][:bucket] %>

amazon_prod:
  service: S3
  access_key_id: <%= Rails.application.credentials.aws[:access_key_id] %>
  secret_access_key:
    <%= Rails.application.credentials.aws[:secret_access_key] %>
  region: <%= Rails.application.credentials.aws[:region] %>
  bucket: <%= Rails.application.credentials.aws[:prod][:bucket] %>
```

- Finally, we add our services to both `development.rb` and `production.rb`

```ruby
# config/environments/development.rb
config.active_storage.service = :amazon_dev
```

```ruby
# config/environments/production.rb
config.active_storage.service = :amazon_prod
```

- We did it! You should be able to attach files through the console, test it
  out.

```ruby
post = Post.first
file = File.open('app/assets/images/sennacy.jpg')
post.photo.attach(io: file, filename: 'sennacy.jpg')
post.photo.attached? # => true
```

### Before Going On: Configure Heroku with your Rails Master Key

Before continuing on we'll take a moment to do an **absolutely essential** step
to ensure Active Storage works with Heroku. Heroku will only be able to
unencrypt your `credentials.yml.enc` if we add our master key (which can be
found in `config/master.key`). However, the master key is gitignored for good
reason. **Do not check this file in to git.** We can use the heroku command line
to secretly add the key to our heroku config.

```
$ heroku config:set RAILS_MASTER_KEY=<your-master-key-here>
```

If you do not do this Active Storage won't work on Heroku and will cause a ton
of unhelpful errors. **Make sure you do this**.

### Image Preview

- Okay so what if we don't want our users to upload files via rails console? We
  need to be able to attach files from a form. Lets add something to our post
  form.
- To preview the file, we need to extract a url for it. On change of the file
  input component we instantiate a new
  [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
  object. set a success function for when it loads Then we ask it to read the
  file with
  [`FileReader#readAsDataURL(file)`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader.readAsDataURL)

```javascript
const reader = new FileReader();
const file = e.currentTarget.files[0];
reader.onloadend = () =>
  this.setState({ imageUrl: reader.result, imageFile: file });

if (file) {
  reader.readAsDataURL(file);
} else {
  this.setState({ imageUrl: "", imageFile: null });
}
```

- Once it's loaded we can preview the image using the imageUrl we saved in
  state. Awesome!

### Image Uploading

- We still haven't sent the file to the server to be saved. To upload the file
  we will instantiate a new
  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
  We then use the
  [append](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)
  method to add key/values to send to the server. One of the key/value pairs
  will be the binary file we grab from `this.state.file`. Be mindful to have
  your keys match whatever your Rails controller is expecting in the params. In
  our case this is `post[photo]`.

```javascript
handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('post[title]', this.state.title);
  if (this.state.photoFile) {

    formData.append('post[photo]', this.state.photoFile);
  }
  $.ajax({
    url: '/api/posts',
    method: 'POST',
    data: formData,
    contentType: false,
    processData: false
  });
}
```

In the options for the `$.ajax` request we need to set `processData` and
`contentType` both to `false`. This is to prevent default jQuery behavior from
trying to convert our FormData object and sending up the wrong header. See more
in this [SO post](http://stackoverflow.com/a/8244082).

### Seeding files with ActiveStorage

Suppose we're trying to seed a demo user that `has_one_attached :avatar`. If
we're seeding from our local machine, we could use `File.open` to get the `File`
object, but this won't work in production. Instead, we can use the `open-uri`
gem to create a `File` object from a file url on the internet:

```rb
# seeds.rb

require 'open-uri'

demo_user = User.create(username: "Andy", email: "andy@email.com", password: "password")

file = open('https://<your_bucket>.<your_region>.amazonaws.com/<optional_folder_name>/<some_file>.jpg')

demo_user.avatar.attach(io: file, filename: 'some_file.jpg')
```

Technically, we could use any url to create our `File` object. However, if we
use someone else's url, we depend on their server to provide it every time we
run our seed file. If they take that file down or change its url at any point,
we won't be able to access it anymore.

Instead, we can just host the files ourselves. Since we've already set up S3, we
can create a new dedicated bucket for holding seed data.

Create a new bucket, named something like `app-name-seeds`. Once you're on your
bucket's main page, click on the blue `Upload` button in the top left. Add/drag
whatever files you want to upload into the first screen, then click through all
of the menu prompts. Once your files upload, you should be able to see them in
your bucket.

By default, any files you upload manually like this will retain their original
filenames. This means their url will usually be something like:
`https://s3.amazonaws.com/app-name-seeds/original_filename.jpg`. If you paste
this url into a new browser window, however, you'll probably get a
strange-looking 503 Access Denied error. This is because AWS will make all of
your assets private by default. To get around this, we can temporarily create a
new bucket policy that allows for public read access to our bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:getObject",
      "Resource": [
        "arn:aws:s3:::{YOUR-BUCKET-NAME}",
        "arn:aws:s3:::{YOUR-BUCKET-NAME}/*"
      ]
    }
  ]
}
```

If you try to access the url in the browser window now, you should be able to
see your file. This means that `open-uri` will be able to access it, too. You
can create a `File` object now in your seed file by `open`ing the url. You can
then `attach` that file to a model instance:

```rb
# seeds.rb

# don't forget to do this!
require 'open-uri'

# create a user
user = User.create(email: "andy@hotmail.com", password: "password")

# create a File from the url
file = open('<your_file_url>')

# attach to user
user.avatar.attach(io: file, filename: 'this_users_avatar.jpg')

```

Note: AWS will recommend against making any part of your bucket public because
it will be publicly readable by anyone. This is probably not something you need
to worry about too much, but for added security you can remove the above bucket
policy once your seeding is complete and only re-add it when you need to seed
again.

Another Note: This new bucket is only ever being used by `open-uri` to create a
`File`. Rails and ActiveStorage don't need to know it exists - don't worry about
changing any configuration files.

One Last Note: At the time of this writing, the AWS free tier gives you 5GB
storage, 20000 GET requests, 2000 PUT requests, and 15 GB of data transfer out
each month for one year. Every time you run your seed file, you're potentially
making a lot of put requests, which can quickly put you over your limit and
start costing you money. This is especially true if you're working with large
files like videos. If you know you're going to be running your seed file
frequently, we recommend that you limit the size of your seed file in
development (include just enough to demonstrate your MVP appropriately), and
save larger seedings for production.

### Handling multiple files

#### Model

Specify that the model `has_many_attached :your_attachment_type`:

```rb
  # app/models/post.rb
  has_many_attached :photos
```

#### Controller

Update strong params to accept the array of files as a param:

```rb
  # app/controllers/api/posts_controller.rb
  def post_params
    params.require(:post).permit(:title, photos: [])
  end
```

#### Jbuilder View

In your jbuilder file, map over each attached file to their URLs:

```rb
# app/views/api/post/show.json.jbuilder
json.photoUrls @post.photos.map { |file| url_for(file) }
```

#### File Input

Add the `multiple` attribute to a file input to allow multiple attachments:

```js
// MyFormComponent#render
<input
  type="file"
  onChange={e => this.setState({ photos: e.target.files })}
  multiple
/>
```

#### Appending to formData Object

Append each file to the same key in the formData object, one at a time:

```js
// MyFormComponent#formSubmissionHandler
const { name, photos } = this.state;
const formData = new FormData();

formData.append("post[name]", name);

for (let i = 0; i < photos.length; i++) {
  formData.append("post[photos][]", photos[i]);
}

this.props.myThunkActionCreator(formData);
```

### Avoiding N+1 Queries

Awesome, now we have our form going through with multiple photos being saved by
utilizing `has_many_attached :photos`. The only problem is what happens when you
try to fetch a post with has a ton of photos?

```ruby
ActiveStorage::Attachment Load (0.7ms)  SELECT "active_storage_attachments".* FROM "active_storage_attachments" WHERE "active_storage_attachments"."record_id" = $1 AND "active_storage_attachments"."record_type" = $2 AND "active_storage_attachments"."name" = $3  [["record_id", 74], ["record_type", "Post"], ["name", "photos"]]
ActiveStorage::Blob Load (0.4ms)  SELECT  "active_storage_blobs".* FROM "active_storage_blobs" WHERE "active_storage_blobs"."id" = $1 LIMIT $2  [["id", 154], ["LIMIT", 1]]
# etc etc etc...
```

That's no good! Active Storage is hitting the database for every photo this post
has (hence the `N+1`). An easy way around this is to use the scope
`with_attached_photos`.

```ruby
  def show
    @post = Post.with_attached_photos.find(params[:id])
  end
```

Under the hood, `with_attached_photos` simply uses includes("photo_attachment":
:blob), where name is whatever you defined with `has_many_attached :photo` in
your model. This will cut down on your `N+1` queries and make your website that
much more efficient!
