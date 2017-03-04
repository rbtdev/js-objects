function createObject (template) {
    var obj = {};
    Object.keys(template).forEach(function (key, value) {
        var getter = template[key].get?template[key].get.bind(obj):undefined;
        var setter = template[key].set?template[key].set.bind(obj):undefined;
        if (getter || setter) {
            if (template[key].public) {
                Object.defineProperty(obj, "_" + key, {
                    enumerable: false,
                    configurable: false,
                    value: template[key].value,
                    writable: true,
                })
            }
            Object.defineProperty(obj, key, {
                enumerable: template[key].public,
                configurable: false,
                get: getter,
                set: setter,
            })                
        } else {
            Object.defineProperty(obj, key, {
                value: template[key].value,
                writable: !template[key].static,
                enumerable: template[key].public,
                configurable: false,
            })
        }
    })
    return obj
}

module.exports = createObject;