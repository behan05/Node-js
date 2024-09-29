// this is index.js file

// here node js find this module in tha current directory.
const greetings = require("./greeting");

function callMe() {
  const hello = greetings.sayHello("Behan");
  console.log(hello);
  const bye = greetings.sayGoodBye("Behan");
  console.log(bye);
}
// callMe();

// here node js try to find this module in the node js module package, or install packages.
const http = require("http");
