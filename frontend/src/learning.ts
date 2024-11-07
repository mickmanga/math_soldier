


const getUser = async (userId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);

        // Check if the response is successful (status code in the 2xx range)
        if (!response.ok) {
            // The request was made, but the server responded with a status code that falls outside the 2xx range
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON from the response
        const user = await response.json();

        // Log the user or return it
        console.log(user);

        return user;  // Return user for further use if needed
    } catch (error) {
        // Handle any errors that occur during fetch or parsing
        console.error("Failed to fetch the user:", error);
    }
};

const getChapters = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/chapters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch chapters');
        }
        
        const chapters = await response.json();
        console.log('Chapters:', chapters); // Replace with your handling logic
    } catch (error) {
        console.error('Error:', error);
    }
}


window.onload = () => {
    getChapters();
}