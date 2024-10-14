const form = document.getElementById('data-form');
const fetchButton = document.getElementById('fetch-data');
const updateButton = document.getElementById('update-data-btn');
const deleteButton = document.getElementById('delete-data-btn');
const dataContainer = document.getElementById('data-container');

// Function to fetch data from the server
const fetchData = async () => {
    const response = await fetch('http://localhost:3000/api/items/');
    const data = await response.json();
    displayData(data);
};

// Function to display data
const displayData = (data) => {
    dataContainer.innerHTML = ''; // Clear previous data
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `ID: ${item.id}, Data: ${item.data}`;
        dataContainer.appendChild(div);
    });
};

// Handle form submission for POST request
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const newData = document.getElementById('new-data').value; // Get the input value

    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: newData }), // Send the new data as JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }

        const result = await response.json(); // Parse the JSON response
        console.log('Success:', result); // Log the result (optional)

        form.reset(); // Reset the form
        fetchData(); // Refresh the data display
    } catch (error) {
        console.error('Error:', error); // Log any errors
    }
});


// Handle update data
updateButton.addEventListener('click', async () => {
    const id = document.getElementById('update-id').value;
    const newData = document.getElementById('update-data').value;

    await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newData }),
    });

    fetchData(); // Refresh the data display
});

// Handle delete data
deleteButton.addEventListener('click', async () => {
    const id = document.getElementById('delete-id').value;

    await fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'DELETE',
    });

    fetchData(); // Refresh the data display
});

// Fetch data on page load
fetchButton.addEventListener('click', fetchData);
