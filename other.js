// ASI
function foo(){
	return // ; inserted here
	{
		a: 10
	}
}

console.log(foo().a); // Type error
//---------------------------------------//

// Objects passed by reference
function ref(obj){
	obj.a = 20;
}

var obj = {a: 10};
ref(obj);
console.log(obj.a); // 20

function ref(obj){
	obj[0] = 20;
}

var obj = [0, 1, 2];
ref(obj);
console.log(obj[0]); // 20