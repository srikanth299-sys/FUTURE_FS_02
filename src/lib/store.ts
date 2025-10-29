import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      set({
        items: items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter(item => item.id !== id) });
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
    } else {
      set({
        items: get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      });
    }
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
