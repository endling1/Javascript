// Scope: Set of rules used to lookup variables by their identifier name.
// JS has lexical scoping

// Compiler -> Scope  Engine -> Scope

// Nested scope
function foo(a){
	console.log(a + b);
}

var b = 2;

foo(2); // 4
//------------------------//

// Cheating lexical scope
// eval
function foo(str, a){
	eval(str);
	console.log(a, b); // 1 20
}
var b = 10;

foo('var b = 20', 1);
// eval(..)	 when used in a	strict-mode	program	operates in its own	lexical	scope

// with
var obj = {
	a: 10
};

with(obj){
	a = 30;
	b = 20;
}

console.log(obj.a);
console.log(obj.b);
console.log(b);// b created in global scope
/* with creates a new scope from the object passed to it,
 when lhs ref for b occurs, it defaults to go fish and creation
 in global scope*/
//----------------------------------------------------------------//

// Block scoping
// Try/catch block
try {
	throw new Error();
} catch(a){
	var a = 10;
}
console.log(a); // reference error

// let keyword
{
	let a = 10;
}
console.log(a); // reference error

// Polyfill for let
{
	try {
		throw undefined;
	} catch(a){
		a = 10;
	}
}
console.log(a); // reference error

// const
{
	const a = 10;
}
console.log(a); // reference error
//--------------------------------------------//

// Hoisting
/* Theoretical concept to explain the two phases of the JS engine when
evaluating JS code */

// Functions hoisted before variables
var foo;

console.log(typeof foo); // function

function foo(){

};

// Multiple variable declerations ignored
// Multiple function declarations override
foo(); // 2

function foo(){
	console.log(1);
}

function foo(){
	console.log(2);
}
/*--------------------------------------------
-----------------------------------------------*/

/* Closure: When a function remembers its lexical scope even when
it is executed from outside its scope */
function foo(){
	var a = 10;

	return function bar(){
		console.log(a);
	}
}

var baz = foo();
baz(); // 10

// Classic problem, print 0, 1, 2, 3, 4
// IIFE
for(var i = 0; i < 5; i++){
	setTimeout((function(i){
		return function(){
			console.log(i);
		}
	}(i)), i * 1000);
}

// let is declared not just once for the loop but for each iteration
for(let i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	}, i * 1000);
}
//-------------------------------------------------------------//

// ES6
/* File treated as module, import imports specific apis from module,
module imports an entire module, export exports apis 
Not supported in node.js yet */
import hello from "foo";

hello();
//--------------------------------------------------------------//

/* Lexical this behaviour obtained using arrow function */

var obj = {
	a: 10,
	foo: function(){
		setTimeout(function(){
			console.log(this.a); // undefined
		}, 1000);
	}
}

var obj = {
	a: 10,
	foo: function(){
		setTimeout(function(){
			console.log(this.a); // 10
		}.bind(this), 1000);
	}
}

/* => hijacks this of enclosing scope without any regard to the 
rules of this binding */
var obj = {
	a: 10,
	foo: function(){
		setTimeout(() => {
			console.log(this.a); // 10
		}, 1000);
	}
}

obj.foo();
