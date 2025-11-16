// frontend/auth.js

class Auth {
    constructor(apiBase) {
        this.apiBase = apiBase;
        this.token = localStorage.getItem('threeAI_token') || null;
        this.user = JSON.parse(localStorage.getItem('threeAI_user')) || null;
    }

    isAuthenticated() {
        return !!this.token;
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user;
    }

    async login(email, password) {
        if (!email || !password) {
            return { success: false, message: 'Please enter both email and password.' };
        }

        try {
            const response = await fetch(`${this.apiBase}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('threeAI_token', data.token);
                localStorage.setItem('threeAI_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, message: data.error || 'Login failed' };
            }
        } catch (error) {
            return { success: false, message: 'Login error: ' + error.message };
        }
    }

    async register(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, message: 'Please enter your name, email, and password.' };
        }
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters long.' };
        }

        try {
            const response = await fetch(`${this.apiBase}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });
            const data = await response.json();
            if (response.ok) {
                return { success: true, message: 'Registration successful! Please login.' };
            } else {
                if (data.error === 'User with this email already exists') {
                    return { success: false, message: 'Registration failed: This email is already registered. Please try logging in or use a different email.' };
                }
                return { success: false, message: data.error || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, message: 'Registration error: ' + error.message };
        }
    }

    logout() {
        localStorage.removeItem('threeAI_token');
        localStorage.removeItem('threeAI_user');
        this.token = null;
        this.user = null;
        window.location.href = 'index.html';
    }

    redirectIfUnauthenticated() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
        }
    }
}
