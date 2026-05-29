import { create } from 'zustand';
import axios from 'axios';

export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    
    // Fetch all products from the Express backend
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await axios.get('/api/products');
            set({ products: res.data, isLoading: false });
        } catch (error) {
            console.error("Error fetching products:", error);
            set({ isLoading: false });
        }
    }
}));