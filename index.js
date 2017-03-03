var People = require('./people');
var Person = People.Person;

var group1 = new People();
var p1 = new group1.Person("Rob Thuleen1"); 
var p2 = new group1.Person(); p2.fullName = "Rob Thuleen2";
var p3 = new group1.Person(); p3.fullName = "Rob Thuleen3";
var p4 = new group1.Person(); p4.fullName = "Rob Thuleen4";
var p5 = new group1.Person(); p5.fullName = "Rob Thuleen5";


var group2 = new People();

for (var i=0; i< 100; i++) {
    var p = new group2.Person("FIRST_" + i + " " + "LAST_" + i);
    console.log("P_" + i + ": " + JSON.stringify(p.toObj()));
}

console.log("Person 1: " + p1.toString())
console.log("Get group list: " + JSON.stringify(group1.all));

console.log("Person 1 (stringify): " + JSON.stringify(p1))
console.log("Person 1 (obj): " + JSON.stringify(p1.toObj()))

// Try set a private property manually on the person object (only the "newProp" should show up);
p1.firstName = "JOE";
p1.newProp = "NEW";

console.log("Person 1 (joe): " + JSON.stringify(p1));
console.log("Person 1 (joe): " + JSON.stringify(p1.toObj()));
console.log("Group 1: " + JSON.stringify(group1.all))
console.log("Group 2: " + JSON.stringify(group2.all))

group1.raw[0].fullName = "Joe Smith";
console.log(JSON.stringify(group1.raw[0].toObj()));

