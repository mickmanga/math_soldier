


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
        const courseContainer = document.getElementById("course_container_b")!;

        const response = await fetch('http://localhost:3000/api/chapters/677e814577322467895fd23e', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch chapters');
        }
        
        const knowledgeData = await response.json() as Array<any>;
        console.log('data:', knowledgeData); // Replace with your handling logic

        knowledgeData.forEach(
            data => {
                console.log(data);
                courseContainer.innerHTML = courseContainer?.innerHTML + data.data;
            }
        )
    
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("keydown", 
    (event) => {
        if(event.key === "g"){
            document.getElementById("interface_container")!.style.opacity = "1";
        }

    }
)

window.onload = () => {
    getChapters();
}