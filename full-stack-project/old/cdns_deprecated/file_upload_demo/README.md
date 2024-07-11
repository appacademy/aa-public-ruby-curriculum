# React File Upload Demo
This demo shows how to upload images using React, Paperclip, and AWS S3.

## Demo

#### 🚨 **NB:** Important Changes! 🚨
- The `paperclip` gem currently does not support the newest version of the `aws-sdk` gem. Add this line to your gemfile to specify a lower version: `gem 'aws-sdk', '< 3.0'`.
- The AWS S3 user interface has changed, please follow this [official demo][aws-bucket-demo] to create a bucket.
  - In a Principal element found in the policy below, the user name is case sensitive. More information about adding [principal-users] to a policy. More information finding your [aws account id][aws-account-id].
- You will need to create a policy for each bucket. You can use the following (make sure to use _your_ bucket name!):

```json
//Sample Policy
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

#### Videos
- [Part One (paperclip, aws)](https://vimeo.com/169111348)
- [Part Two (uploading files via a form)](https://vimeo.com/169111248)

[aws-bucket-demo]: http://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html

[principal-users]:
https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html

[aws-account-id]:
https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html#FindingYourAWSId

## Key Files
- [application.rb](https://github.com/appacademy/curriculum/tree/master/full-stack-project/resources/cdns/file_upload_demo/config/application.rb)
- [tweet.rb](https://github.com/appacademy/curriculum/tree/master/full-stack-project/resources/cdns/file_upload_demo/app/models/tweet.rb)
- [_tweet.json.jbuilder](https://github.com/appacademy/curriculum/tree/master/full-stack-project/resources/cdns/file_upload_demo/app/views/api/tweets/_tweet.json.jbuilder)
- [TweetApi.js](https://github.com/appacademy/curriculum/tree/master/full-stack-project/resources/cdns/file_upload_demo/frontend/utils/TweetApi.js)
- [TweetForm.jsx](https://github.com/appacademy/curriculum/tree/master/full-stack-project/resources/cdns/file_upload_demo/frontend/components/TweetForm.jsx)

## Useful Docs
- [Paperclip](https://github.com/thoughtbot/paperclip#paperclip)
- [Figaro](https://github.com/laserlemon/figaro#why-does-figaro-exist)
- [AWS](http://aws.amazon.com/)
- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

### Setting up AWS

- The first thing we need to set up is our buckets. This is where amazon will actually store our files. Click on 'S3' and then 'Create Bucket'. We should make a separate bucket for development and production. I would use something like `app-name-dev`, and `app-name-pro`. Set the region to the one closest to you.
- Now we have space set aside on AWS, but we don't have permission to access it. We need to create a user, and a policy for them to access your buckets. Go back to the main page and click 'Identity and Access Management' then click 'Users' on the left. We'll make a new user, named whatever you like.
- You'll be directed to a page with your brand new security credentials, DOWNLOAD AND SAVE THEM NOW, you will not have access to them again. If you do lose them, just delete the user and make a new one.
- The keys you just saved give you access to your AWS server space, **don't give push them to GitHub, or put them anywhere public!**
- Now we need to set up the security policy for our new user. This is how they will be allowed to connect. Click 'Attach existing policies directly' and then 'Create Policy'. You can use this sensible default and not worry too much about what it's doing for you (borrrrriing). Remember to switch out bucket-name for your bucket.

```json
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
        "arn:aws:s3:::BUCKET-NAME-DEV",
        "arn:aws:s3:::BUCKET-NAME-DEV/*",
        "arn:aws:s3:::BUCKET-NAME-PRO",
        "arn:aws:s3:::BUCKET-NAME-PRO/*"
      ]
    }
  ]
}
```
- That's pretty much it for AWS. Now we have to convince paperclip to use it!

### Setting up Paperclip

- ImageMagick is a dependency of paperclip. It is installed on the a/A machines but you will need to install it at home. `brew install imagemagick`
- Add the gem with `gem "paperclip", '~> 5.0.0'`. The video references the beta because it was the only version compatible with the latest version of AWS at the time it was filmed, but you should not need the beta anymore.
- We need to create a migration to add the attached file columns. We'll add them to posts for the demo. `rails generate paperclip post image`
- We also need to add code to the model to tell it how to handle attached files. Check the [Paperclip docs](https://github.com/thoughtbot/paperclip#paperclip) for more info!

```ruby
class Post < ActiveRecord::Base
  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
```

- Great, lastly we need to set up paperclip to save to AWS. Before we do this we need somewhere safe to store our secret access keys. Enter figaro!
- Add `gem 'figaro'` and then run `bundle exec figaro install`
- Figaro has created a new application.yml file and added it to your gitignore. All your secret app keys can be stored in this file, and we will reference them using syntax like `ENV["secret_key"]` throughout our app.
- Be careful to save this file to your email or dropbox, because it will not be pushed to github.
- Double check that `application.yml` is gitignored. **People will scrape GitHub for S3 keys and exploit your account if they can.**
- Now we can add our secret keys. It should look something like this.

```ruby

# config/application.yml
development:
  s3_bucket: "BUCKET-NAME-DEV"

production:
  s3_bucket: "BUCKET-NAME-PRO"

s3_region:  "us-east-1"
s3_access_key_id: "XXXX"
s3_secret_access_key: "XXXX"
```

Double check that your `s3_region` [here][aws-regions] (scroll down to **API Gateways**).

[aws-regions]: http://docs.aws.amazon.com/general/latest/gr/rande.html

- Now that we have a safe way to access our secret keys, we need to update our application.rb file to configure paperclip to use s3. Let's add one more gem for this. `gem 'aws-sdk', '< 3.0'`

```ruby
# config/application.rb

config.paperclip_defaults = {
  :storage => :s3,
  :s3_credentials => {
    :bucket => ENV["s3_bucket"],
    :access_key_id => ENV["s3_access_key_id"],
    :secret_access_key => ENV["s3_secret_access_key"],
    :s3_region => ENV["s3_region"],
    :s3_host_name => "s3.#{ENV["s3_region"]}.amazonaws.com"
  }
}
```
- We did it! You should be able to attach files through the console, test it out.

```ruby
post = Post.first
file = File.open('app/assets/images/sennacy.jpg')
post.image = file
post.save!
post.image.url #=> "http://s3.amazonaws.com/YOUR-BUCKET-NAME/something/images/000/000/607/sennacy.jpg?1459267299"
```

### Image Preview
- Okay so what if we don't want our users to upload files via rails console? We need to be able to attach files from a form. Lets add something to our post form.
- To preview the file, we need to extract a url for it. On change of the file input component we instantiate a new [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) object. set a success function for when it loads
Then we ask it to read the file with [`FileReader#readAsDataURL(file)`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader.readAsDataURL)

```javascript
const reader = new FileReader();
const file = e.currentTarget.files[0];
reader.onloadend = () =>
  this.setState({ imageUrl: reader.result, imageFile: file});

if (file) {
  reader.readAsDataURL(file);
} else {
  this.setState({ imageUrl: "", imageFile: null });
}
```
- Once it's loaded we can preview the image using the imageUrl we saved in state. Awesome!

### Image Uploading
- We still haven't sent the file to the server to be saved. To upload the file we will instantiate a new
[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.
We then use the [append](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)
method to add key/values to send to the server. One of the key/value pairs will be the binary
file we grab from `this.state.file`. Be mindful to have your keys match whatever your Rails
controller is expecting in the params. In our case this is `post[image]`.

```javascript
const file = this.state.imageFile;

const formData = new FormData();
formData.append("post[title]", title);
// our backend can't handle a null image, so why even
if (file) formData.append("post[image]", file);

ApiUtil.createPost(formData, this.resetForm);
```

 We will use
`ApiUtil.createPost()` to make the AJAX request and create an action on success. In the
options for the `$.ajax` request we need to set `processData` and `contentType` both to
`false`. This is to prevent default jQuery behaviour from trying to convert our FormData
object and sending up the wrong header. See more in this [SO post](http://stackoverflow.com/a/8244082).

```javascript
createPost: function(formData) {
  $.ajax({
    url: '/api/posts',
    type: 'POST',
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData,
    success: function(post) {
      PostActions.receivePost(post);
    }
  })
}
```

### Image Missing and Jbuilder
- Once our images are saving successfully the last step is to display them when they are retrieved from the database. We can use the `post.image.url` method in our jbuilder template and then use that value as the src to an image tag. But we also need to remember to use the `asset_path` helper to make sure our path is set correctly. You'll probably end up with something like this.
`json.image_url asset_path(post.image.url(:original))`. This will catch your default image url as well if it's in assets/images.

### Configuring for production
- Last step, heroku won't have our application.yml (it's in our gitignore!) So we need to send up the keys. You can use this convenient figaro commend.
```
$ figaro heroku:set -e production
```
- Congrats! You did it!
