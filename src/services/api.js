// api.js
const api = {
    async login(user) {
        const response = await fetch('/login', { // Обращаемся к URL без указания хоста
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }
        const responseData = await response.json();
        return responseData.data.user_token;
    },
    async register(user) {
        const response = await fetch('/signup', { // Обращаемся к URL без указания хоста
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }
        const responseData = await response.json();
        return responseData.data.user_token;
    }
}

export default api;
