// callback function with async function or method.

// regular function who have async method.
function fetchData(callback) {
  console.log("data fetching...");

  setTimeout(() => {
    callback("Data is Fetched!");
  }, 2000); // execute after 2 minutes.
}

// callback hell
// fetchData((data) => {
//   console.log(data);
//   fetchData((data) => {
//     console.log(data);
//     console.log("All Data Fetched");
//   });
// });

/*
What is a Promise? A promise is an object that represents the eventual completion (or failure) of an asynchronous operation.
*/

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise resolved!");
  }, 2000);
});

// promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

/*
Simplifies Promises: async/await allows you to write asynchronous code in a more readable way without chaining .then() and .catch().
*/

async function fetchDatas() {
  try {
    const result = await fetch("https://api.github.com/users/behan05");
    const data = await result.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

fetchDatas();
