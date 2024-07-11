## Filepicker

Filepicker is an alternative way to upload files.
It's souped up in a few ways:

* Users can drag files into a box instead of navigating around
and pressing "choose file".
* Filepicker handles S3 storage for you so you don't have to
manually change the development and production config files.
* Pretty good documentation.

E.g.:

![Filepicker](http://i.imgur.com/ZcPSDhA.png)

# Installation and usage

See [here][filepicker].

[filepicker]: https://github.com/Ink/filepicker-rails

# API Key

You need to make sure you set your Filepicker API key before any JS tries
to use it. You can use ERB to print the key onto the page in a script tag that
will register it with the Filepicker JS:

```html
<script>
  filepicker.setKey("<%= ENV['FILEPICKER_API_KEY'] %>");
</script>
```

**NOTE**: You should use Figaro to set the FILEPICKER_API_KEY.

# Using Filepicker with Backbone

When the document is loaded, Filepicker will search for any `input` tags with
`type="filepicker"` and jQuerify them into Filepicker widgets. This is
convenient for Rails apps; however, any such widgets contained in a Backbone
view will break once the view is re-rendered. For this reason, it is probably
best to skip the Filepicker input type entirely and handle things through the
Backbone view's `events` hash and the `filepicker.pick` method
([docs][pick_docs]). `pick` takes a callback function that will be invoked after
the user has uploaded the file, and it will receive as an argument a 'blob'
([docs][blob_docs]) that contains info about the uploaded file. The blob has a
`.url` property that contains the URL of the uploaded file.  Here's an example
of using `filepicker.pick()` to save a Backbone model:

```javascript
events: {
  "click .file-upload": "upload"
},

upload: function () {
  filepicker.pick(function(blob) {
    var newImage = new MyApp.Models.Image({
      filepicker_url: blob.url
    });
    newImage.save({}, {
      success: function () {
        alert('Image saved!');
      }
    })
  });
}
```

[pick_docs]: https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick
[blob_docs]: https://www.filepicker.com/documentation/file_ingestion/javascript_api/blob

#Additional resources:
0. https://github.com/Ink/filepicker-rails
0. https://www.inkfilepicker.com/
0. http://vimeo.com/groups/appacademy/videos/85222034
0. http://vimeo.com/groups/appacademy/videos/85222033
