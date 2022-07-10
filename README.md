# BSvHashForArrayIntersection
This is a small Node.js application with a script benchmarking two different methods of verifying the intersections of two sets of numbers

This demonstrates that even though a hash table (a javascript object in this implementation) is supposed to be O(1) e ends up being slower than an array based approach using a Binary Search because there is a cost to building the map structure and the conceptual O(1) complexity for the map is not faster than the O(log(n)) complexity of the binary search for this specific problem if you're gonna have lots of collisions in building and accessing the map besides all the time spent allocating data for said map. Not to mention the fact that arrays may take better advantage of modern CPUs with large amount of cache (in system programing languages, at least).

This video shows a similar reasoning for the extreme of comparing a vector to a linked list in C++: https://www.youtube.com/watch?v=YQs6IC-vgmo

And this is the results I obtained running this on a Ryzen 9 5900X CPU (70MB of L2+L3 cache): https://imgur.com/gallery/FqinqLN

This test was for arrays of up to five million elements, larger arrays will eventually make the hash version faster, but it's not very realistic to imagine you will be having to deal with larger arrays in their entirety for most situations.

It was also added a solution that uses a set, a more idiomatic and way faster solution to the problem, as a way to demonstrate that neither the array nor the manually created hash map solutions are the most appropriated to this problem.

Results for 100 instances of 5 million elements (Node.js version 18.5.0, 32 GB of RAM): 

  Init arrays for hash: 2:39.619 (m:ss.mmm)

  Find intersections hash: 10:06.141 (m:ss.mmm)
  
  Init arrays for BS: 2:37.875 (m:ss.mmm)
  
  Find intersections BS: 3:03.814 (m:ss.mmm)
  
  Init arrays for set: 2:35.992 (m:ss.mmm)
  
  Find intersections set: 1:37.995 (m:ss.mmm)
