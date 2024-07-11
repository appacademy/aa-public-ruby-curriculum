# Uploading files with Paperclip & S3

## Sign up for AWS S3

If you want your users to upload files to your application, you are
going to need a place to store these files. As Heroku server instances
can be added and deleted on the fly, these instances themselves do not
offer persistent storage. Amazon AWS S3 is one of the major cloud
storage services which offers us a place to reliably store data.

To get started, [sign up](http://aws.amazon.com/s3/) for an Amazon AWS
account.

Go to S3 in your
[AWS Console](https://console.aws.amazon.com/console/home).

Click on "Create Bucket" and give this new bucket a name. You may want
to create two separate buckets. One for development, and one for
production.

While signed into Amazon AWS, you also want to retrieve your `AWS
Access Key ID` and your `AWS Secret Access Key`. You can find them on
the site under [Security
Credentials](https://console.aws.amazon.com/iam/home?#security_credential)

## Setting up Paperclip & S3

To be able to identify and resize images, Paperclip requires
ImageMagick to be installed.

To check whether you have ImageMagick already install run `which
convert`. If this gives you a path, you're golden.

To install ImageMagick using Homebrew use the following command.

    brew install imagemagick

If that doesn't work and you don't feel like spending considerable
time figuring out why, [try the installer from here](http://cactuslab.com/imagemagick/).
I found it to be a much less painful process.

Next, add the Paperclip and AWS-SDK gems to your Gemfile.

    gem 'paperclip'
    gem 'aws-sdk'

Bundle install your gems.

Now we want to configure our Paperclip settings.

In your `application.rb` environment config file,
add the following code, adding your bucket and security
credentials. You may want to use different buckets for production and
development.

### WARNING: the `:s3_credentials` hash below requires your secret API keys provided by AWS.
### If you do not use Figaro or some other method to *KEEP YOUR SECRET KEYS OFF GITHUB* your
### AWS account can be used by *HACKERS*. Remember how you used your credit card to sign up?

```ruby
config.paperclip_defaults = {
  storage: :s3,
  s3_protocol: 'http',
  url: 's3_domain_url',
  path: 'images/:class/:id.:style.:extension',
  s3_host_name: 'YOUR_HOST_HERE',
  s3_credentials: {
    bucket: ENV['AWS_BUCKET'], #these values safely stored in application.yml thanks to figaro!
    access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
  }
}
```

`YOUR_BUCKET_NAME`, etc should be filled in with the values we obtained above
be *absolutely sure* to use [figaro](https://github.com/appacademy/lightning-talks/blob/master/w8d1/figaro.md)
to keep your _secret sauce_ off of GitHub or someone will HaXoR you, big time. Remember
how it asked you for your credit card when you signed up for AWS? Just sayin....

To find your `:s3_host_name`, manually upload a sample file to your bucket.
Then, find the file in your S3 Management Console and click "properties".

Your region should be the first part of the "Link" (e.g. s3-us-west-1.amazonaws.com).

## Add a Paperclip to your model

Say we have a Pirate model and we want each Pirate instance to have a
beard_photo file attached to it.

We want to add the Paperclip functionality to the
model. Paperclip gives us the `has_attached_file` method to configure
this.
```ruby
    class Pirate < ActiveRecord::Base
      has_attached_file :beard_photo, styles: {
        big: "600x600>",
        small: "50x50#"
      }
      validates_attachment_content_type(
        :beard_photo,
        content_type: /\Aimage\/.*\Z/
      )
    end
```
You can specify multiple styles for your images, specifying different
sizes in the format `(width)x(height)(resize method)`. The `>` scales
the image proportionally to fit within the specified size. The `#`
scales the image to fill up the whole specified size and then crops
the part that sticks out.

If you're not storing images, but other file types, you can omit the
specifying of styles.

Though we use S3 to store our actual image files in the cloud, we need
to add extra columns to our database table to remember where the image
was stored, as well as some meta data Paperclip requires.

So let's add a migration. You can generate this migration running
`rails g paperclip pirate beard_photo` or you can write this by
hand. You should end up with the following.
```ruby
    class AddAttachmentBeardPhotoToPirates < ActiveRecord::Migration
      def change
        change_table :pirates do |t|
          t.attachment :beard_photo
        end
      end
    end
```
Run `rails db:migrate` and you're good to go!

## Upload and display images in your views

In your forms add `<%= f.file_field :beard_photo %>` to create a file
upload field (assuming you're using the Rails `form_for` helper). Your
`<form>` tag needs to have the `enctype="multipart/form-data"`
attribute set in order to submit binary files. Rails' `form_for`
helper will be smart enough to add this for you when a file field is
present.

You can access the image file url using `@pirate.beard_photo.url`. You
can give the `.url` method a symbol corresponding to the styles you
set up in your model, like: `@pirate.beard_photo.url(:small)`.

To display your image, use the image tag helper.

    <%= image_tag @pirate.beard_photo.url(:big) %>


## Backbone.js Gotchas
When submitting a form using the `enctype="multipart/form-data"` attribute,
the file will be encoded to the correct format. If you are manually submitting
an $.ajax request via backbone or otherwise you will need to ensure the file
is correctly encoded. Use javascript `FileReader` object to properly encode
your file.

Here is how the FileReader is used to `readAsDataURL` the file.

```html
<!doctype html>
<html>
<script>
function handleFiles(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // you need to send e.target.result in your $.ajax request
    console.log(this.result);
  }
  reader.readAsDataURL(file);
}
</script>
<body>
FileReader that works!
<input type="file" multiple onchange="handleFiles(this.files)">
</body>
</html>
```

We can translate that example into this for a backbone view:

```html
<!-- in template -->
<input type="file" class="my-photo-upload">
```
```javascript
// in view
events: {
  'change .my-photo-upload': 'handleFile',
},
handleFile: function (event) {
  var file = event.currentTarget.files[0];
  var view = this;
  var reader = new FileReader();
  reader.onload = function(e) {
    // note that this isn't saving
    view.model.set('my_photo', this.result);
  }
  reader.readAsDataURL(file);
}
```
**NB**: wrap parameters might not pickup your paperclip column automatically
so you might have to manually call wrap_parameters from your controller to
force the photo column into the nested parameters. ex:

```ruby
# if your params look like this (notice my-photo is not nested?):
# { my-photo: 'some long string of photo data',
#   description: 'my desc',
#   vacation: {
#     description: 'my desc'
#   }
# }
class Api::VacationsController
  # adding this will force my-photo to be nested:
  wrap_parameters :vacation, include: [:my_photo, :description]]

  private
  def vacation_params
    params.require(:vacation).permit(:my_photo, :description)
  end
end
```

## Resources

1. https://github.com/thoughtbot/paperclip
2. http://aws.amazon.com/s3/
3. https://devcenter.heroku.com/articles/paperclip-s3
4. http://railscasts.com/episodes/134-paperclip
5. https://github.com/appacademy/PaperclipDemo
