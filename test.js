#!/usr/bin/env bun

const alphabet = Array.from(Array(26)).map((e, i) => [i+65+26+6, i+65]).flat().map((x) => String.fromCharCode(x));
console.log(alphabet);
