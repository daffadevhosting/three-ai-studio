// frontend/common.js

async function loadUserProfile(apiBase, token) {
    try {
        const response = await fetch(`${apiBase}/api/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to load user profile');
            return null;
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        return null;
    }
}
