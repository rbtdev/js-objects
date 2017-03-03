//
// Local closure to return a Person constructor which will
// have a reference to the People object that created it
//
function _Person (parent) {
    // Keep a reference to the People object that we belong to
    var _parent = parent;

    // Return the constructor for the Person class
    return function Person (name) {

        // Private properties
        var _firstName = "";
        var _lastName = "";

        // Deinfe gettters and setters for *private* properties

        // this.fullName
        Object.defineProperty(this, 'fullName', {
            get: function () {
                return _firstName + " " + _lastName;
            },
            
            set: function (name) {
                if (name && name.split) {
                    var names = name.split(' ');
                    _firstName = names[0] || '';
                    _lastName = names[1] || '';
                }
            }
        });

        // this.firstName
        Object.defineProperty(this, 'firstName', {
            get: function () {
                return _firstName;
            }
        });

        // this.lastName
        Object.defineProperty(this, 'lastName', {
            get: function () {
                return  _lastName;
            }
        })

        // Convert to a regular JS Object
        this.toObj = function () {
            var obj = {
                fullName: this.fullName,
                lastName: this.lastName,
                fistName: this.firstName
            }
            return obj
        };

        // Set fullName 'property' (which actually uses the setter to set 
        //  private '_firstName' and '_lastName')
        this.fullName = name;

        // Add us to our parent's collection
        _parent.add(this);
    }
}

//
// Constructor for the People collection class
//
function People () {
    // Private collection array
    var _people  = [];

    // Public property - constructor for a Person with 'this' as the parent
    this.Person = _Person(this);

    // Getter and setter for the 'all' collection property
    // Returns an array with the collection with public properties
    Object.defineProperty(this, 'all', {
        get: function () {
            var list = _people.map(function (person) {
                return (person.toObj())
            })
            return list
        },
        set: function (value) {
            // do nothing for now but could allow this
        }
    });

    // Getter and setter for the 'raw' collection property
    // Returns an array with the collection with private properties
    Object.defineProperty(this, 'raw', {
        get: function () {
            return _people;
        },
        set: function (value) {
            // do nothing for now but could allow this
        }
    })

    // Public method to add a person to the collection
    //  Used by the person class to add itself to our collection
    this.add = function (person) {
        _people.push(person);
    }
}

// Export the People class 
module.exports = People;
