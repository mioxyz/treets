declare global {
   interface Array<T> {
      /**
       * moves element in array from `fromIndex` to `toIndex` in place.
       */
      move(fromIndex:number, toIndex:number): void;

      /**
       * get random element from array. Assumes there are elements in the array.
       */
      random(): T;

      insert(element:T, index:number):void;

     /**
      * removes the first element in array which is atommically equal to the parameter element.
      */
      remove(element:T):void;
      removeAtIndex(index:number):void;
   }
}

if(!Array.prototype.random)
   Array.prototype.random = function<T>(this: T[]) {
      if(this.length == 0) throw new Error("can't get random element from empty array.");
      return this[Math.floor(Math.random()*this.length)];
   }


if(!Array.prototype.removeAtIndex)
   Array.prototype.removeAtIndex = function<T>(this: T[], index:number) {
      this.splice(index, 1);
   }


if(!Array.prototype.remove)
   Array.prototype.remove = function<T>(this: T[], element:T) {
      for(var index = 0; index < this.length; ++index) {
         if(this[index] === element) {
            this.splice(index, 1);
            break;
         }
      }
   }

if(!Array.prototype.insert)
   Array.prototype.insert = function<T>(this: T[], element:T, index:number): void {
      this.splice(index, 0, element);
   }

if(!Array.prototype.random)
   Array.prototype.random = function<T>(this: T[]): T {
      let n = Math.floor(Math.random()*this.length);
      return this[n];
   }

if (!Array.prototype.move)
   Array.prototype.move = function<T>(this: T[], fromIndex: number, toIndex: number): void {
      if (fromIndex === toIndex) return;

      this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);

      // this.splice(fromIndex, 1);
      // this.splice(toIndex < fromIndex ? toIndex : toIndex - 1, 0, this[fromIndex]);
   };

export {};
