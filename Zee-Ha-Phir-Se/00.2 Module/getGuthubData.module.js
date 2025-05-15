
githubApi = async (url) => {
    try {
        const fetchData = await fetch(url);

        if (fetchData.ok) {
            const data = await fetchData.json();
            return data;
        } else {
            console.error(`Error: ${fetchData.status} ${fetchData.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

module.exports = {
    githubApi,
}