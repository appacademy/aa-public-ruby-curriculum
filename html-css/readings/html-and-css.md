# CSS and Sass hits

**TODO**: this chapter is a work in progress.

## CSS

* class/id
* margin/padding
* positioning
    * **TODO**: not sure if this is important
    * static is the default
    * fixed
        * given top/bottom, left/right, will be fixed to that location
          from top left of browser window.
        * In particular, if you scroll, the element won't move.
    * relative
        * given top/bottom, left/right, will be moved relative to the
          location it would normally be placed at.
    * absolute
        * like fixed, but relative to first fixed/relative positioned
          element.
* display
    * block
    * inline
    * inline-block
* float
    * doesn't contribute to height of div
    * clear-fix?
    * bourbon gem?
* the "clock" (up right down left)
* height/width
    * much more common to specify width
* percent vs px
    * esp. relative to parent

## Questions they have

* Wrapping with jagged edge
    * float:left a ul of images, but then one is to high and the next
      row gets caught
* hard to center vertically

## Sass
## References

* http://www.quirksmode.org/css/display.html
