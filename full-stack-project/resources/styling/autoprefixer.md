# Autoprefixer

Many of the best features of CSS, including flexbox, transitions, and some SASS
features, aren't yet standardized.

Browsers implement these features under experimental ['vendor prefixes'][vendor-prefix]
. Because browsers use different vendor prefixes, cross-browser-compatible CSS can 
quickly become bloated with vendor-prefixes that are a pain to write by hand.

[Autoprefixer][autoprefixer] is a `Gem` that streamlines the process of writing 
browser-compatible CSS by automatically prefixing your CSS. This lets you write: 

```css
.navbar {
  display: flex
}
```

to get:

```css
.navbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

in your compiled CSS.

[autoprefixer]: https://github.com/ai/autoprefixer-rails
[vendor-prefix]: https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix
