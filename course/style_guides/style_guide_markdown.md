# App Academy Markdown Style Guide

## Write clearly.

0. Use short, declarative sentences.
0. Avoid socratic questions. Ex. 'Can you think of why this is bad?'
0. Use capitalization and punctuation correctly, even on bullet points.
0. Avoid first-person perspective.

## Use but don't abuse `snippets`.

### Use snippets when referring to code.

For example, `while`, `BenchStore`, and `this` are code items that you might want to use in a sentence.

### Don't use grammatically weird snippets.

Bad: `setState` on your `params`.

Good: Call `setState` to update your `params`.

### Don't 'interpolate' snippets.

Ex. `snippet`s looks weird.

## Use relative links and link tags.

```
//good
Become a [l337 h4x0r][hacking-for-newbs].

[hacking-for-newbs][../readings/hacking-for-newbs.md]

//bad
Become a [l337 h4x0r](http:/github.com/appacademy/curriculum/blob/master/ruby/readings/hacking-for-newbs.md).
```

## Add line breaks after each sentence 

This improves readability of text and git diffs by by keeping each sentence to its own line. 
That way, if a sentence is modified its diff shows on the current line. 
If sentence order is changed, the diff is also very clear.
If text is reflowed (line breaks are added when lines exceed 80 characters), merely changing a word can create diffs throughout an entire paragraph, making the actual addition/deletion very hard to identify.

This means if you are writing a sentence and have a really long line, just keep on writing. 
If you don't like the look of it in your editor of choice, turn on `Soft Wrap` at 80 characters.

If you think that you have written a huge, ungainly block of text and _really_ want to add a line break, it probably means that you should add a paragraph break instead.

### How to set up an 80 char ruler.

**Sublime**:
```
Sublime Text > Preferences > Settings - User
// Preferences.sublime-settings
	"rulers": [80],
	"word_wrap": true
```

**Atom**:
```
Atom > Preferences > Settings
	Preferred Line Length: 80
	Soft Wrap At Preferred Line Length: Checked
```

A few textual examples (these will all render the same):
```
// bad
This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph. This is a long paragraph.

// also bad
This is a long paragraph. This is a long paragraph. This is a long paragraph.
This is a long paragraph. This is a long paragraph. This is a long paragraph.
This is a long paragraph. This is a long paragraph. This is a long paragraph.
This is a long paragraph. This is a long paragraph. This is a long paragraph.
This is a long paragraph. This is a long paragraph. This is a long paragraph.
This is a long paragraph. This is a long paragraph. This is a long paragraph.

// good
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
```
#### Good
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 
This is a long paragraph. 

## Use Headers in Order.

```
# Page Title
## Section
### Sub-section
#### Sub-sub-section
```

## Don't use HTML markup.

Markdown already does markup. [See Google's style guide.][google-markdown]

## Use a Markdown Preview.

In VS Code:

ctrl + shift + v to preview markdown.

In Atom:

ctrl + shift + m to preview markdown.

In Sublime:
```bash
# to install
ctrl + shift + p to open Package Control
search for `Package Control: Install Package`
search for `Markdown Preview`

# to use
ctrl + shift + m to preview the current pane
ctrl + shift + p to open Package Control
search `Markdown Preview: Preview in Browser`
select `Github`
```
[google-markdown]: https://github.com/google/styleguide/blob/gh-pages/docguide/style.md #strongly-prefer-markdown-to-html
