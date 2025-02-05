
const nodeGlobalObject = {
    globalObject: `in Node.js, the global object called global just like window object call window in js and global provides access to built-in modules, function, and variable (props of global obj) that are available throughtout your application.`,

    CommonPropertiesOfGlobal: ["global.console", "global.process", "global.setTimeout()", "global.setInterval()", "global.Buffer", "global.require()", "global.__dirname", "global.filename",]
}

// nodeGlobalObject.CommonPropertiesOfGlobal.forEach((e) => {
//     console.log(e);
// })

// console.log(process.availableMemory());
// console.log(process.cpuUsage());
// console.log(process.env.path);

console.log(__filename);
console.log(__dirname);
console.log(global.Buffer);
const tl = setInterval(() => {
    const d = Date()
    console.log(d);
    clearInterval(tl);
}, 1000)