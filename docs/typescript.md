# TypeScript Features

TypeScript helps enhance the development and debugging experience by introducing static types to the JavaScript environment. This enhances JavaScript with the real benefits of OOP concepts such as: interfaces, classes, generics, and more!

## Interfaces, Classes, Abstract and Generics

Interfaces and Abstract classes enhance the OOP experience by allowing deeper abstract concepts to be applied to a codebase; providing enforcable contracts for custom data types and their implementations throughout a system and its tests.

I'll start in the abstract: envisioning a list class that can do 3 things (functions): `push`, `pop`, and `peek`.

	An `abstract class` is a `class` definition that *cannot be instantiated*. It must be implemented and extended by using the `extends` keyword in another `class` definition.
	Likewise an `abstract function` just lays out the framework for a function, it is not implemented and must be implemented; potentially by the `class` implementing the containing `abstract class`.

I then created the `abstract class GenericList<T>` which defines an `abstract class` that has two abstract functions `push(x: T)` and `pop()`; and one implemented function `peek()`. The implemented function can be called as-is in and class that extends the `GenericList`.

	_I'm actually going to squash two steps that I went through here in my development. At first I decided that the List Data Types to implement using the `GenericList` would be a `Queue` and a `Stack`, both easily implemented with arrays. So my first attempt only had this `abstract class GenericList` which also defined a property called `items` which was a `T[]`. This became too restrictive when I decided that I'd extend this into a Binary Search Tree for shits and giggles (thus needing a different data property than an array). So for this tutorial we'll go another level deeper with `abstract class`. I removed any defined property apart from based functionality from `GenericList`._

So we know what a `GenericList` can **DO**, but what does it **HAVE**? Well, _abstract classes can extend abstract classes_. For the initial List Data Types we'll implement; `Queue` and `Stack`, we can benefit from an `Array<T>`. So lets extend the `GenericList<T>` with `GenericArrayList<T>`, that does two things: defines a property on the `GenericArrayList<T>` called `items` that is an array of type `T`, and update the `peek()` abstract definition to be a little more explicit for an _array-based_ List Data Type.

Now we can implement the `GenericArrayList<T>`!

The `Stack<T>` List Data Type acts like a stack of plates, the order for pushing/popping is First-In-Last-Out. So the `pop()` and `push()` functions are implemented to achieve this in the `GenericArrayList`'s `items` array.
The `Queue<T>` List Data Type acts like a queue of people, the order for pushing/popping is First-In-First-Out. So the `pop()` and `push()` functions are implemented to achieve this in the `GenericArrayList`'s `items` array.

For the daring: you can try to implement a Binary Search Tree as a `GenericList<T>`.  To do so I extended the `GenericList<T>` with `GenericTreeList<T>`, similarly to how `GenericArrayList` was made: to setup the property containing the list values and to make the generic `peek()` message more specific to the implemented abstract class.

	A Binary Search Tree is defined by 1 value: the root node. Each node has a distinctly unique and sortable value, a nullable `left` (less than) node pointer and a nullable `right` (greater than) node pointer. A node's `left` pointer has any node that has a value that is less than this node; likewise a node's `right` pointer has any node that has a value that is greater than the node.

Obviously a `BinarySearchTree<T>` needs `Node<T>`, so to account for the potential of going crazy with different tree types lets also make a `GenericNode<T>` in the `GenericTreeList<T>` file. A `Node<T>` in a `BinarySearchTree<T>` has a `value<T>`, a nullable `left<Node<T>>` and a nullable `right<Node<T>>`.

`push(value: T)` pushes a value according to BST logic (without sorting... this initial stab is a recursive non-self-sorting algorithm).

- If there is no root
	- the root is a new node with the value being pushed. Return 1.
- Else
	- Recursively attempt to push the node into the tree starting at the root node.
	- Return the new node count.

`inOrderTraversal` was also implemented as a way to return all the elements as a sorted array.

`pop()` was implemented with a toggle function `togglePopOrder` and a new exported enum `POP_ORDER`, allowing for `LOWEST_TO_HIGHEST` or `HIGHEST_TO_LOWEST`, toggling the execution of the `pop()` function to either pop from the top, or pop from the bottom. Using the following algorithm:

- If there is no root, return undefined.
- Using a recursive function checking a node and passing its parent node for reference, determine if that is the node to be removed from the Binary Search Tree.

`search()` was also implemented. It will search for a given value in the Binary Search Tree and return the path to the sought value as an array from the value to the root.

Some rough tests have been implemented demonstrating the accuracy of each of the different implementations of a `GenericList<T>`. Also an Abstract Generic Queue Test was designed and implemented: allowing for testing both the QueueTree and Queue implementations of GenericList.
