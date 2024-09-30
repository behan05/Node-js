// Start with fs module for file system.

// import fs module.
const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");

/* 
const fileUrl = __filename;

// Check if the file name is 'script.js'
if (path.basename(fileUrl) === "script.js") {
  // Replace 'script.js' with 'text.txt' and read the file
  const newFileUrl = fileUrl.replace("script.js", "text.txt");

  fs.readFile(newFileUrl, "utf8", (err, data) => {
    if (err) {
      console.log("There was an error reading the file: ", err);
    } else {
      console.log(data);
    }
  });
} else {
  console.log("This script isn't named 'script.js'.");
}
*/
async function readFileData() {
  const currentpath = __filename;
  if (path.basename(currentpath) === "script.js") {
    const newFileUrl = currentpath.replace("script.js", "text.txt");

    try {
      const promiseData = await fs.readFile(newFileUrl, "utf8");
      console.log(promiseData);
    } catch (error) {
      console.log(error);
    }
  }
}

// readFileData();

// readfile synchronously.

const filePath = __filename;
const para = `
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, perferendis blanditiis ex sint accusamus ut. Voluptatum cupiditate quibusdam eum consequuntur vitae et maiores! Minus consequatur ipsam adipisci neque fugiat ab!
        Repellendus eos veritatis eaque, laboriosam dolorem quas doloremque perspiciatis voluptatum deserunt deleniti nobis sunt veniam, sed magnam odit. Ipsam reiciendis ea nobis modi earum. Mollitia assumenda autem eos voluptatibus debitis.
`;
// if (path.basename(filePath) === "script.js") {
//   const newPath = filePath.replace("script.js", "text.txt");
//   try {
//     const data = fs.writeFile(newPath, para);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function readWrite() {
  const currentpath = __filename;
  if (path.basename(currentpath) === "script.js") {
    const newPath = currentpath.replace("script.js", "text.txt");
    try {
      const data = await fs.readFile(newPath, "utf8");

      if (path.basename(newPath) === "text.txt") {
        const writePath = newPath.replace("text.txt", "write.txt");

        try {
          await fs.writeFile(writePath, data);
          console.log("All file written!");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

readWrite();

// Append can prevent previous data

async function appendData(url) {
  const currentPath = __filename;
  if (path.basename(currentPath) === "script.js") {
    const newPath = currentPath.replace("script.js", "text.txt");

    try {
      const response = await axios.get(url);
      const extractedData = response.data;
      console.log(extractedData);

      await fs.appendFile(newPath, JSON.stringify(extractedData));
      console.log("Successfully Appended!");
    } catch (error) {
      console.log(error);
    }
  }
}

const url = "https://api.github.com/users/behan05";
appendData(url);

async function deleteData() {
  const currentPath = __filename;
  if (path.basename(currentPath) === "script.js") {
    const newPath = currentPath.replace("script.js", "text.txt");

    try {
      await fs.unlink(newPath);
      console.log("File is deleted Successfully", error);
    } catch (error) {
      console.log("File dose not exist!", error);
    }
  } else {
    console.log("script file is not exist!");
  }
}

deleteData();
