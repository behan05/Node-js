// importing another module to get a function to call.
const Person = require("./greeting.module");
// const fetchData = require("./greeting.module");

// fetchData("https:api.github.com/users/behan05");

const user = new Person("https:api.github.com/users/behan05");

setTimeout(() => {
    console.log(user.name);
    console.log(user.bio);
}, 1000);
