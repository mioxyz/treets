import './array_extensions';

export interface Clonable {
   clone(): any;
}

export class Tree<T extends Clonable> {
   leaves:Array<Tree<T>> = new Array<Tree<T>>();
   content:T|null;

   constructor(private ContentClass:{new(...args:any[]):T;}, public root:Tree<T>|null = null) {
      this.addLeaf = function(...args):Tree<T> {
         const leaf = new Tree<T>(ContentClass, this);
         leaf.content = new ContentClass(...args);
         // leaf.root = this;
         this.leaves.push(leaf);
         return leaf;
      }
   }

   /**
    * adds a leaf to this Tree.
    */
   addLeaf(...args:any[]):Tree<T> { throw new Error("addLeaf::virtual"); }

   /**
    * makes a deep copy of a tree and returns it. The caller is responsible
    * for inserting the tree to wherever they want, the root of the tree
    * is not set.
    */
   clone():Tree<T> {
      const clone = new Tree<T>(this.ContentClass);
      clone.content = this.content!.clone();
      this.leaves.forEach( leaf => clone.adopt(leaf.clone()) );
      return clone;
   }

   /**
    * 
    */
   adopt(leaf:Tree<T>, index:number|null = null):void {
      if(null == index) {
         this.leaves.push(leaf);
      } else {
         this.leaves.insert(leaf, index);
      }
      leaf.root = this;
   }

   insertInto(root:Tree<T>, index:number|null = null):void {
      if(null == index) {
         root.leaves.push(this);
      } else {
         root.adopt(this, index);
      }
      this.root = root;
   }

   /**
    * delete a tree and all of its leaves
    */
   delete() {
      this.root?.leaves.remove(this);
      this.leaves.forEach( leaf => leaf.delete() );
   }

   moveLeaf() {

   }

   isRoot() { return this.root == null }


   toString():string {
      return `
         is_root_null: »${this.root == null}«,
         leaves_count: »${this.leaves.length}«
      `;
   }

}
