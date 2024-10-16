// Define the structure of the login request
interface LoginResponse {
    token: string;
    message: string;
}

// Function to handle form submission
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const errorMessage = document.getElementById('errorMessage') as HTMLDivElement;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        // Send the login data to the backend
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        });

        const data: LoginResponse = await response.json();

        if (response.ok) {
            // Store the token (assuming JWT here)
            localStorage.setItem('token', data.token);
            window.location.href = 'http://localhost:3001/challenge?mode=hard';  // Redirect to dashboard
        } else {
            errorMessage.textContent = data.message;
        }
    } catch (err) {
        errorMessage.textContent = 'Error logging in. Please try again later.';
    }
});
