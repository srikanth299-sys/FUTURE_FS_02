import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  date: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
}

interface AuthStore {
  user: User | null;
  orders: Order[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

// Mock users for demo
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          return false; // User already exists
        }

        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
        };
        mockUsers.push(newUser);

        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isLoggedIn: true });
        return true;
      },

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        set(state => ({ orders: [...state.orders, newOrder] }));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        orders: state.orders,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
