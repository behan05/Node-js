"use strict";
const fs = require("fs").promises;
const { read } = require("fs");
const path = require("path");

async function createDirectory() {
  const currentDir = __dirname;
  try {
    await fs.mkdir(path.join(currentDir, "AutomaticallyreateFolder"));
  } catch (error) {
    console.error(error);
  }
}

// createDirectory();

async function readDirectorry() {
  const currentDir = __dirname;
  try {
    const files = await fs.readdir(currentDir);
    console.log("files in directory: ", files);
  } catch (error) {
    console.error(error);
  }
}

// readDirectorry();

async function deleteDirectorry() {
  try {
    await fs.rmdir(
      "C:\\Users\\behan\\Desktop\\Node-js\\0.4 Built-In Modules\\0.2 Directory System\\AutomaticallyreateFolder"
    );
    console.log("deleted successfully! ");
  } catch (error) {
    console.error(error);
  }
}
// deleteDirectorry();

// stat return all info about files like (create time, size, etc);
const holdArrowFunc = async () => {
  const currentPath = __dirname;

  try {
    const statData = await fs.stat(currentPath);
    console.log(statData.birthtime);
  } catch (error) {
    console.error(error);
  }
};

// holdArrowFunc();
