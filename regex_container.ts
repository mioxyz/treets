import './array_extensions';
import { Clonable } from './tree'; 

export class RegexContainer implements Clonable {

   public leafSymbol:string;

   clone():RegexContainer {
      return new RegexContainer(
         this.type
       , this.leafSymbol
      );
   }

   constructor(
      public type:RegexContainer.Type = RegexContainer.Type.Root
    , leafSymbol:string|null = null
   ) {
      if(type == RegexContainer.Type.Root) this.leafSymbol = '√';
      else if(leafSymbol == null) this.leafSymbol = RegexContainer.convertTypeToChar(this.type);
      else this.leafSymbol = leafSymbol;
   }

   public toString():string {
      return `{leafSymbol: »${this.leafSymbol}«, type: »${RegexContainer.getRegexContainerString(this.type)}«}`;
   }

   public pickRandomLeafSymbol() {
      this.leafSymbol = RegexContainer.randomLeafSymbol();
   }


   static randomLeafSymbol() {
      return RegexContainer.alphabet[Math.floor((RegexContainer.alphabet.length-1) * Math.random())];
   }
  
   static getRegexContainerString(type:RegexContainer.Type):string {
      return {
           0: "Root"    ,
           1: "Asterisk",
           2: "Dot"     ,
           3: "Bracket" ,
         255: "Const"   ,
      }[type];
   }

   static convertTypeToChar(type:RegexContainer.Type):string {
      switch(type) {
         case RegexContainer.Type.Root: return 'R';
         case RegexContainer.Type.Asterisk: return '*';
         case RegexContainer.Type.Dot: return '.';
         case RegexContainer.Type.Bracket: return '☤';
         case RegexContainer.Type.Const: return this.randomLeafSymbol();
      }
      return "ö";
   }

   
   static getRandomTerminalType() {
      return RegexContainer.TerminalTypes[Math.floor(Math.random()*3)];
   }
   static getRandomNonRootType() {
      return RegexContainer.NonRootTypes[Math.floor(Math.random()*4)];
   }

   /**
    * any container without any leaves, ergo not bracket and not root.
    */
   isTerminal() {
      return undefined != RegexContainer.TerminalTypes.find( type => this.type == type );
   }
}

export namespace RegexContainer
{
   export enum Type {
      Root     = 0,
      Asterisk = 1,
      Dot      = 2,
      Bracket  = 3,
      Const    = 255,
   }

   export const NonRootTypes = [
      Type.Asterisk ,
      Type.Dot      ,
      Type.Const    ,
      Type.Bracket  ,
   ]

   export const TerminalTypes = [
      Type.Asterisk ,
      Type.Dot      ,
      Type.Const    ,
   ];

   export const alphabet:Array<string> = Array.from(Array(26)).map((e, i) => [i+97, i+65]).flat().map((x) => String.fromCharCode(x));

}
