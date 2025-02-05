
async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return greeting(data);
    } else {
        console.error("fetch data :: github :: error", "server not responding");
    }
}

function greeting(userData) {
    console.log(`Hey ${userData.name}, your bio is pretty good ${userData.bio} users!`);
}


class Person {

    name;
    bio;

    constructor(url) {
        this.fetchedUrl(url)
    }

    async fetchedUrl(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const userInfo = await response.json();

                if (userInfo) {
                    this.name = userInfo.name;
                    this.bio = userInfo.bio;
                };

            } else {
                console.error("feted data :: github api :: server error")
            }
        } catch (error) {
            console.error("feted data :: github api :: please enter valid url", error.message);
        }
    }
}

module.exports = Person;
