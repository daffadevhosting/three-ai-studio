(() => {
    const translations = {
        en: {
            email: 'Email',
            password: 'Password',
            signIn: 'Sign In',
            signUpPrompt: "Don't have an account? Sign up",
            fullName: 'Full Name',
            createAccount: 'Create Account',
            signInPrompt: 'Already have an account? Sign in',
            files: 'Files',
            save: 'Save',
            editor: 'Editor',
            preview: 'Preview',
            codePlaceholder: '// Your Three.js code here...',
            fixWithAI: 'Fix with AI',
            aiAssistant: 'AI Assistant',
            promptPlaceholder: 'e.g., Create a rotating cube...',
            menu: 'Menu',
            viewProfile: 'View Profile',
            workspace: 'Workspace',
            myWorkspace: 'My Workspace',
            projects: 'Projects',
            templates: 'Templates',
            tools: 'Tools',
            optimizer: 'Optimizer',
            analytics: 'Analytics',
            generationsToday: 'Generations Today',
            logout: 'Logout',
            newFile: 'New File'
        },
        id: {
            email: 'Email',
            password: 'Kata sandi',
            signIn: 'Masuk',
            signUpPrompt: 'Belum punya akun? Daftar',
            fullName: 'Nama lengkap',
            createAccount: 'Buat akun',
            signInPrompt: 'Sudah punya akun? Masuk',
            files: 'Berkas',
            save: 'Simpan',
            editor: 'Editor',
            preview: 'Pratinjau',
            codePlaceholder: '// Tulis kode Three.js di sini...',
            fixWithAI: 'Perbaiki dengan AI',
            aiAssistant: 'Asisten AI',
            promptPlaceholder: 'Contoh: Buat kubus yang berputar...',
            menu: 'Menu',
            viewProfile: 'Lihat profil',
            workspace: 'Ruang kerja',
            myWorkspace: 'Ruang kerja saya',
            projects: 'Proyek',
            templates: 'Templat',
            tools: 'Alat',
            optimizer: 'Pengoptimal',
            analytics: 'Analitik',
            generationsToday: 'Generasi hari ini',
            logout: 'Keluar',
            newFile: 'Berkas baru'
        }
    };

    const languageToggles = document.querySelectorAll('.language-toggle');
    if (!languageToggles.length) return;

    const applyLanguage = (language) => {
        const selectedLanguage = translations[language] ? language : 'en';
        document.documentElement.lang = selectedLanguage;
        document.documentElement.dataset.locale = selectedLanguage;
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const translation = translations[selectedLanguage][element.dataset.i18n];
            if (translation) element.textContent = translation;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const translation = translations[selectedLanguage][element.dataset.i18nPlaceholder];
            if (translation) element.placeholder = translation;
        });
        languageToggles.forEach((toggle) => {
            toggle.textContent = selectedLanguage === 'en' ? 'ID' : 'EN';
            toggle.setAttribute('aria-label', selectedLanguage === 'en' ? 'Ganti bahasa ke Bahasa Indonesia' : 'Switch language to English');
        });
        localStorage.setItem('threeAI_locale', selectedLanguage);
    };

    languageToggles.forEach((toggle) => toggle.addEventListener('click', () => {
        applyLanguage(document.documentElement.dataset.locale === 'en' ? 'id' : 'en');
    }));
    applyLanguage(localStorage.getItem('threeAI_locale') || 'en');
})();
