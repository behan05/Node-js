// axios use to fetch data in node js.

const axios = require("axios");

// axios
//   .get("https://api.github.com/users/behan05")
//   .then((response) => {
//     console.log(response.headers);
//   })
//   .catch((err) => console.log(err.message));

async function getData(requestUrl) {
  try {
    const result = await axios.get(requestUrl);
    if (result.status >= 200 && result.status < 300) {
      const data = await result.data;
      console.log(data);
    }
  } catch (error) {
    console.error(error.message);
  }
}
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
// getData(apiUrl);

async function postRequest(url) {
  try {
    const postObj = {
      title: "New Post",
      body: "This is the body of the new post",
      userId: 1,
    };
    const requestToPost = await axios.post(url, postObj);

    if (requestToPost.status >= 200 && requestToPost.status < 300) {
      console.log("New Post is Successfully done!");

      if (requestToPost) {
        console.log(requestToPost.data);
      }
    }
  } catch (error) {
    throw error;
  }
}
postRequest(apiUrl);

async function updateApiData(url) {
  const fullUrl = url;
  console.log(fullUrl);

  try {
    const makeApiUpdateRequest = await axios.put(url, {
      title: "update post",
      body: "this is the updated post",
    });

    if (
      makeApiUpdateRequest.status >= 200 &&
      makeApiUpdateRequest.status < 300
    ) {
      getData(url);
    } else {
      console.error(
        "Failed to update post. Status code: ",
        makeApiUpdateRequest.status
      );
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Error response from server:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("there is some network issue " + error.message);
    }
  }
}

updateApiData("https://jsonplaceholder.typicode.com/posts/1");

setTimeout(() => {
  axios
    .delete("https://jsonplaceholder.typicode.com/posts/1")
    .then((res) => {
      console.log("post deleted! ", res);
    })
    .catch((err) => {
      if (err.response) {
        console.log("error from server ", err.response.status);
      } else if (err.request) {
        console.log("error sending by server ", err.request.status);
      } else {
        console.log("there is somthing wrong ", err, err.message);
      }
    });
}, 2000);
