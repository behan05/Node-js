// Global object is similer to the window object but it has different properties and methods.

global.console.log("Hello Node.js");

function returnPath() {
  //   __dirname and __filename are not part of any objects. They are special variables injected directly into the module. scope by Node.js
  const dirName = __dirname;
  const fileName = __filename;

  return {
    dirName,
    fileName,
  };
}

const result = returnPath();
// console.log(result.dirName);
// console.log(result.fileName);

function currentTime() {
  const time = new Date();
  return time.toLocaleTimeString();
}

// Asynchronous.
const runtime = () => {
  const stopTime = setInterval(() => {
    const time = currentTime();
    console.log(time);
  }, 1000);

  setTimeout(() => {
    clearInterval(stopTime);
    console.log("Stop Running time".toUpperCase());
  }, 5000);
};

runtime();

// require, module, exports

console.log(process.env);
// console.log(process.argv);
