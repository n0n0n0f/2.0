const BASE_URL = 'http://your-api-base-url.com'; // Замените на базовый URL вашего API

const api = {
    async login(user) {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
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
        } catch (error) {
            throw new Error('Ошибка входа');
        }
    },

    async register(user) {
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
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
        } catch (error) {
            throw new Error('Ошибка регистрации');
        }
    },

    async placeOrder(cartItems) {
        try {
            const response = await fetch(`${BASE_URL}/placeOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify(cartItems)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }

            const responseData = await response.json();
            return responseData.data.order;
        } catch (error) {
            throw new Error('Ошибка при размещении заказа');
        }
    }
};

export default api;
