import { create } from 'zustand';
import axios from 'axios';

// Set base URL so production hits the Render backend, dev uses the Vite proxy
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

// Configure Axios to always send our HTTP-only cookies securely
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null, // null means the user is not logged in
    isLoading: true, // Used to show a loading spinner while we check the cookie

    // Manually set the user (used right after a successful login)
    setUser: (user) => set({ user }),

    // Logout function (clears the cookie on backend and clears state on frontend)
    logout: async () => {
        try {
            await axios.post('/api/auth/logout');
            set({ user: null });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },

    // Runs when the app first loads to check if the user has a valid cookie
    checkAuth: async () => {
        try {
            const res = await axios.get('/api/auth/me');
            set({ user: res.data, isLoading: false });
        } catch (error) {
            // If it fails (no cookie or expired), just set user to null
            set({ user: null, isLoading: false });
        }
    }
}));