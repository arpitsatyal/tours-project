module.exports = (obj1, obj2) => {
    if(obj2.name) {
        obj1.name = obj2.name
    }
    if(obj2.email) {
        obj1.email = obj2.email
    }
    if(obj2.password) {
        obj1.password = obj2.password
    }
    return obj1
}