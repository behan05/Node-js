// this is a greetin.js file

// function sayHello(name) {
//   return `Hello ${name}`;
// }

// function sayGoodBye(name) {
//   return `Good Bye ${name}`;
// }

// module.exports = {
//   sayHello,
//   sayGoodBye,
// };

// another way to exports
module.exports = {
  sayHello: (name) => {
    return `Hello ${name}`;
  },

  sayGoodBye: (name) => {
    return `Good Bye ${name}`;
  },
};
