# `O(n^2)` vs. `O(n*lg(n))` - A Practical Example

It should now be clear that for any moderately large inputs, algorithms that run
in `O(n*lg(n))` time will significantly outperform those that run in `O(n^2)`.

![time_complexity](https://assets.aaonline.io/fullstack/ruby/homeworks/sorting_demo/compareNlogNQuadratic.png)

While algorithm analysis usually seeks to stay agnostic of implementation
details, let's briefly take a look at what these Big O notations mean in
practice. As a demonstration, you will compare the runtimes of Merge Sort and
Bubble Sort for randomized array inputs of varying sizes.

You can download a __sorting_demo.rb__ script to run in your terminal as you
follow along with this reading. The demo will run 3 trials for each sorting
algorithm with randomized input of increasing size. It will then compute the
total and average time taken to sort the arrays. Note that your running times
may vary significantly from those listed here depending on your machine and the
result of the array randomizer, but they should grow at roughly the same rate.

To download the script, click on the `Download Project` button at the bottom of
this page. On the ensuing GitHub page, click the green `<> Code` button and
select `Download ZIP`. Move the downloaded __.zip__ file to your desired folder
and unzip. You can run the script simply by typing `./sorting_demo.rb` at the
terminal prompt in the folder with file.

Let's start with something small: press any key to run Merge Sort and
Bubble Sort for 5 elements. The results here are fairly uninteresting: the
running time for both is so small that any differences are negligible.

```sh
Press any key to benchmark sorts for 5 elements
               user       system     total       real
Tot. Merge:    0.000000   0.000000   0.000000 (  0.002130)
Tot. Bubble:   0.000000   0.000000   0.000000 (  0.000069)
Avg. Merge:    0.000000   0.000000   0.000000 (  0.000710)
Avg. Bubble:   0.000000   0.000000   0.000000 (  0.000023)
```

The story is similar when running this for the next batch, 50 elements.

```sh
Press any key to benchmark sorts for 50 elements
               user       system     total       real
Tot. Merge:    0.000000   0.000000   0.000000 (  0.001046)
Tot. Bubble:   0.000000   0.000000   0.000000 (  0.002036)
Avg. Merge:    0.000000   0.000000   0.000000 (  0.000349)
Avg. Bubble:   0.000000   0.000000   0.000000 (  0.000679)
```

Now let's move on to 500 elements.

```sh
Press any key to run sorts for 500 elements:
               user       system     total       real
Tot. Merge:    0.010000   0.000000   0.010000 (  0.008129)
Tot. Bubble:   0.080000   0.000000   0.080000 (  0.080440)
Avg. Merge:    0.003333   0.000000   0.003333 (  0.002710)
Avg. Bubble:   0.026667   0.000000   0.026667 (  0.026813)
```

You're beginning to see some separation here between the performance of the two.
In practice, though, this doesn't mean much. Both are still taking well under a
second to run, at least on the machine used for these specs. What about 5000
elements?

```sh
Press any key to run sorts for 5000 elements:
               user       system     total       real
Tot. Merge:    0.070000   0.000000   0.070000 (  0.073389)
Tot. Bubble:   8.040000   0.020000   8.060000 (  8.082406)
Avg. Merge:    0.023333   0.000000   0.023333 (  0.024463)
Avg. Bubble:   2.680000   0.006667   2.686667 (  2.694135)
```

At 5000, the times start to properly diverge on this machine. Bubble Sort no
longer feels instantaneous. If you were writing an application where the user
needed to wait for the results of the sort to continue, this would start
significantly affecting their experience.

Can you give a rough estimate of how long Bubble Sort and Merge Sort will take
for 50,000 elements? What factors would go into whether your estimate would be
high or low? Picking different algorithms to solve a problem can lead to
significant differences in application performance at scale.

```sh
Press any key to run sorts for 50000 elements:
               user       system     total       real
Tot. Merge:    1.010000   0.010000   1.020000 (  1.030560)
Tot. Bubble: 986.350000   5.460000 991.810000 (1004.896369)
Avg. Merge:    0.336667   0.003333   0.340000 (  0.343520)
Avg. Bubble: 328.783333   1.820000 330.603333 (334.965456)
```

You can see that Merge Sort still runs in a reasonable amount of time with
50,000 elements. This becomes less true for Bubble Sort as the number of
elements increase.

When Bubble Sort has finished running, go ahead and play around with the input
size a bit more. You can specify the default base (as well as the number of runs
for averaging) by modifying `SortingDemo::run_performance_tests`. Approximately
how long do you estimate it will take to run this for 100,000 elements?