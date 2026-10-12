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

function setUserAvatar(image, avatarUrl) {
    if (!image) return;

    const source = typeof avatarUrl === 'string' ? avatarUrl.trim() : '';
    if (!source || source === 'null' || source === 'undefined') {
        image.removeAttribute('src');
        image.hidden = true;
        return;
    }

    image.onerror = () => {
        image.hidden = true;
    };
    image.hidden = false;
    image.src = source;
}

window.setUserAvatar = setUserAvatar;
