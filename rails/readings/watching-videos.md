# Watching Videos

The videos on Rails Views that you will watch tonight were created on Rails 4.
While the videos' information on views, forms, and partials is still accurate
and helpful, you may notice minor differences from Rails 7 in naming, terminal
commands, directory structure, built-in gems and technologies, or method
behavior. In particular, please note the following:

1. The videos use `bundle exec rake routes` on the terminal command line to view
   routes. In Rails 7, you accomplish this instead by running `rails routes` (or
   `rails routes --expanded`).
2. The videos use Atom for editing code files. Be aware that the shortcuts
   mentioned for Atom will not necessarily work in VSCode. For example, at 9:30
   in the Intro video, the video notes that, in Atom, `- <Tab>` is a shortcut
   for erb tags (`<% %>`) and `= <Tab>` for printing erb tags (`<%= %>`). These
   shortcuts will not work in VSCode. Instead, if you have the [`Erb-VSCode
   Snippets`] extension installed, then you can use `er <Tab>`, `pe <Tab>`, and
   `pc <Tab>` in VSCode to produce erb tags, printing erb tags, and commented
   erb tags, respectively.
3. At 39:14 in the Forms video, it suggests deactivating CSRF protection by
   commenting out a line in __app/controllers/application_controller__. Rails 7
   no longer includes this line in that file. Instead, you deactivate CSRF
   protection by adding the following line to __config/application.rb__:

   ```rb
   config.action_controller.default_protect_from_forgery = false
   ```

4. At 14:58 in the Partials video, the video calls
   `@book.update_attributes(book_params)` to update a book. In Rails 7, the
   appropriate method is simply `update`: `@book.update(book_params)`.
5. Rails 4 did not have the `--minimal` option available for creating new
   projects, so you will notice some extra directories in the project.
6. The __application.html.erb__ header (e.g., 14:50 in Intro video) looks a bit
   different in Rails 7.
7. Rails 4 uses WEBrick for its server; Rails 7 uses Puma.

[`Erb-VSCode Snippets`]: https://marketplace.visualstudio.com/items?itemName=ZneuRay.erb-vscode-snippets
