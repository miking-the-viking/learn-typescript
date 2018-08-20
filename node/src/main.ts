import { BinarySearchTree, Node } from "GenericLists/BinarySearchTree";

/**
 * Main Script for TypeScript Demo Node App
 */
const init = (): void => {
    console.log('Initializing main.ts');

    let bst = new BinarySearchTree<number>();

    bst.push(5);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(2);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(56);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(7);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(10);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(12);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(1);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(3);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    bst.push(4);
    console.log(bst.inOrderTraversal());
    console.log('----------');
    console.log(bst.pop());
    console.log(bst.inOrderTraversal());
    console.log('----------');
    console.log(bst.pop());
    console.log(bst.inOrderTraversal());
    console.log('----------');
    console.log(bst.pop());
    console.log(bst.inOrderTraversal());
    console.log('----------');
    console.log(bst.pop());
    console.log(bst.inOrderTraversal());
    console.log('----------');
    console.log(bst.pop());
    console.log(bst.inOrderTraversal());
    console.log('----------');
    

}

init();