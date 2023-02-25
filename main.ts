#!/usr/bin/env bun
import chalk from 'chalk';
import { Tree } from "./tree";
import { RegexContainer } from './regex_container';

const makeRandomRegexTree = function():Tree<RegexContainer> {
   const root = new Tree<RegexContainer>(RegexContainer);
   root.content = new RegexContainer();

   // add a bunch of crap
   for(let k = 0; k < 10; ++k) {
      const leaf = root.addLeaf(RegexContainer.getRandomNonRootType());
      switch(leaf.content!.type) {
         case RegexContainer.Type.Bracket:
            for(let j = 1+Math.floor(4*Math.random()); j > 0; --j) {
               const leafConst = leaf.addLeaf(RegexContainer.Type.Const);
               leafConst.content!.pickRandomLeafSymbol();
            }
            break;
         case RegexContainer.Type.Const:
            leaf.content!.pickRandomLeafSymbol();
            break;
      }
   }

   //append brackets
   for(let k = 0; k < 2; ++k) {
      let bracket = root.addLeaf(
         RegexContainer.Type.Bracket,
         RegexContainer.convertTypeToChar(RegexContainer.Type.Bracket)
      );
      bracket.addLeaf(RegexContainer.Type.Const, (k == 0) ? 'X' : 'Y');
      bracket.addLeaf(RegexContainer.Type.Const, (k == 0) ? 'x' : 'y');
   }

   return root;
}

const removeDuplicateAsterisk = function(root:Tree<RegexContainer>):void {
   let previous:Tree<RegexContainer>|null = null;
   for(let k = 0; k < root.leaves.length; ++k) {
      if(root.leaves[k].content!.type == RegexContainer.Type.Asterisk) {
         if(previous?.content!.type == RegexContainer.Type.Asterisk) {
            previous.delete();
            previous = null;
         }
      }
      previous = root.leaves[k];
   }
}

const consumeAsterisk = function(root:Tree<RegexContainer>):void {
   let previous:Tree<RegexContainer>|null = null;
   for(let k = 0; k < root.leaves.length; ++k) {
      if(root.leaves[k] == undefined) console.log(root.leaves);

      //console.log(root.leaves.map( x => (x.content) ? x.content!.leafSymbol : "ü"));
      if(root.leaves[k].content!.type == RegexContainer.Type.Asterisk) {
         if(null != previous) {
            for(let j = 0; j < 1; ++j) {
               root.adopt(previous.clone(), k);
               ++k;//not sure about that
            }
         }
         root.leaves[k].delete();
         previous = null;
         k--;
      }
      previous = root.leaves[k];
   }
}

const consumeBracket = function(root:Tree<RegexContainer>):void {
   for(let k = 0; k < root.leaves.length; ++k) {
      const maybeBracket = root.leaves[k];
      if(RegexContainer.Type.Bracket == maybeBracket.content!.type) {
         if (maybeBracket.leaves.length != 0) {
            let dump = maybeBracket.leaves.random();
            let clone = dump.clone();
            clone.insertInto(root, k);
            //k--;
         }
         maybeBracket.delete();
      }
   }
}

const printRegexContainerTree = function(root:Tree<RegexContainer>):void {
   let line:string = "";
   root.leaves.forEach( (leaf:Tree<RegexContainer>) => {
      if(leaf.content!.isTerminal()) {
         line += leaf.content!.leafSymbol;
      }else if(RegexContainer.Type.Bracket == leaf.content!.type) {
         line += "[" + leaf.leaves.map( constLeaf => constLeaf.content!.leafSymbol ).join("") + "]";
      }
   })
   console.log(line);
}


const root = makeRandomRegexTree();
   printRegexContainerTree(root);
removeDuplicateAsterisk(root);
   printRegexContainerTree(root);

let line = '';
root.leaves.forEach( leaf => line += (leaf.root == null) ? "1" : "0" );
//console.log(line);
   


consumeAsterisk(root);
   printRegexContainerTree(root);

line = '';
root.leaves.forEach( leaf => line += (leaf.root == null) ? "1" : "0" );
//console.log(line);

consumeBracket(root);
   printRegexContainerTree(root);
