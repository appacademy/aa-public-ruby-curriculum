# Debugging Cheatsheet

If you're banging your head against the wall, some tips:

1. Find the top line that looks familiar.  Put a debugger on that line.  Print out everything that shows up on the line.
2. Google it
3. If there are lines of code that are really long, break them down into parts.
4. Trace back: "What method calls `check_valid_move?`?  Where does `cats` get assigned?  Let's put a debugger there."  Keep working "backwards" towards the source.
5. Comment out lines of code until the error changes.
6. Go back to when you had it working and see what changed.
7. Reference the [learn how to debug][learn-to-debug] blog post.

[learn-to-debug]: https://asherkingabramson.com/blog/productivity/learn-to-debug
