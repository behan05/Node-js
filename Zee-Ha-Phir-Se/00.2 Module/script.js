
const math = require('./math.module');
const { githubApi } = require('./getGuthubData.module');

githubApi('https://api.github.com/users/behan05').then((data) => {
    console.log(data.bio);
    console.log(data.name);
    console.log(data.avatar_url);
}).catch((error) => {
    console.log(error);
})



console.log(math.addTwoNum(2, 2)());
console.log(math.sub(2, 2)());