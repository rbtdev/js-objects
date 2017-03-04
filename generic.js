var createObject = require('./create-obj.js');
var moment = require('moment');

var template = {
    firstName: { public: true },
    lastName: { public: true },
    birthday: { public: true },

    // Private 'static' properties
    hairColor: {public: true, value: "brown"},
    eyeColor: {public: true, value: "green", static: true},
    test: {
        public: true,
        value: "initial test",
        get: function () {
            return this._test;
        },
        set: function (value) {
            this._test = value;
        }
    },

    // Private propeties with getters/setters
    fullName: {
        public: false,
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        set: function (value) {
            if (value && value.split) {
                var names = value.split(' ');
                this.firstName = names[0];
                this.lastName = names[1];
            }
        }
    },
    age: {
        public: false,
        get: function () {
            var years = this.birthday?moment().diff(this.birthday, 'years'):"unknown";
            return years;
        }
    }
}

var obj = createObject (template);

// set first and last name... fullName is computed from these
obj.firstName = "Rob";
obj.lastName = "Thuleen"; 

// set birthday, age is computed from this relative to 'now'
obj.birthday = new Date(1963, 07, 05);

console.log("Initial Obj: " + JSON.stringify(obj))
console.log("Obj.fullName: " + obj.fullName); 
obj.fullName = "Joe Smith";
console.log("Obj.fullName: " + obj.fullName); 
obj.test = "test_real";
console.log("Test Real: " + JSON.stringify(obj))
// Setting hairColor (declared with a 'value' in template, can be changed
obj.hairColor = "red"; // wont change hairColor

// Setting eyeColor (declared with a "static value" in template, cannot be changed)
obj.eyeColor = "blue"; // will change
console.log("After changes: " + JSON.stringify(obj))


console.log("Age: " + obj.age);

obj.age = 10;
console.log("Age: " + obj.age);