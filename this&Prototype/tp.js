/* Value of this determined by callsite where function is invoked */

// Default binding: 
// Bind to global object in non strict mode
// this is undefined in strict mode
function foo(){
	console.log(this.a);
}
var a = 10;
foo(); // 10 in browser, in node.js each file is module, so global.a = 10

// Implicit binding
// Bind to owning object
function foo(){
	console.log(this.a);
}

var obj = {
	a: 10,
	foo: foo
};

obj.foo();

// Explicit binding
// Bind to provided object

function foo(){
	console.log(this.a);
}

var obj = {a: 10};
foo.call(obj);	// 10
foo.apply(obj);	// 10

// Hard binding
// Bind to same object always

function foo(){
	console.log(this.a);
}
var obj = {a: 10};
foo = foo.bind(obj);

foo(); // 10

// new Binding
// Bind to newly created object
/*
	Create a brand new object
	link obj.__proto__ to Foo.prototype
	bind this to that object
	return this as default behaviour
*/
function Foo(a){
	this.a = a;
}
var obj = new Foo(5);
console.log(obj.a); // 5
//------------------------------------------//

// Precedence of above rules
/*
	new
	explicit: call, apply, bind unless this set to null
	implicit
	default
*/

//--------------------------------------------//

// Arrow functions hijacking this

function foo(){
	return (a) => {
		console.log(this.a);
	};
}

var obj = {a: 10};
var obj2 = {a: 20};
var bar = foo.call(obj);
bar.call(obj2); // 10 not 20
//--------------------------------------------//

// Object and prototype

var obj = {};
Object.defineProperty(obj, 'a', {
	value: 10,
	writable: true,
	configurable: false,
	enumerable: true
});
console.log(obj.a); // 10
obj.a = 20;
console.log(obj.a); // 20

// Getters and Setters

var obj = {
	get a(){
		return this._a_;
	},

	set a(val){
		this._a_ = val;
	}
}

// Primitives are copied by value
// Compund values are copied by reference

// Compound types with scalar underlying primitives are copied
// by reference but cannot be changed to a different value

function foo(x){
	x++; // Unboxed
}

var a = new Number(5);
foo(a); // pass by reference
console.log(a); // 5 not 6
// This happens as the primitive is unboxed when used in an expression