import { createContext, useContext, useState, ReactNode } from "react";

export type InventoryItem = {
  id: string;
  team: string;
  item: string;
  size: string;
  gender: string;
  cost: number;
  image?: string;
  stock: number;
  category: string;
};

type InventoryContextType = {
  inventory: InventoryItem[];
  addItems: (items: InventoryItem[]) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  uploadImage: (id: string, imageUrl: string) => void;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Initial Colorado Rockies retail inventory
const initialInventory: InventoryItem[] = [
  {
    id: "1",
    team: "Colorado Rockies",
    item: "Nike White Home Limited Jersey",
    size: "L",
    gender: "Male",
    cost: 174.99,
    stock: 38,
    category: "Jersey",
  },
  {
    id: "2",
    team: "Colorado Rockies",
    item: "Nike Purple Alternate Limited Jersey",
    size: "XL",
    gender: "Unisex",
    cost: 174.99,
    stock: 32,
    category: "Jersey",
  },
  {
    id: "3",
    team: "Colorado Rockies",
    item: "Charlie Blackmon White Home Replica Jersey",
    size: "M",
    gender: "Male",
    cost: 134.99,
    stock: 24,
    category: "Jersey",
  },
  {
    id: "4",
    team: "Colorado Rockies",
    item: "New Era Black/Purple On-Field 59FIFTY Cap",
    size: "7 1/4",
    gender: "Unisex",
    cost: 45.99,
    stock: 86,
    category: "Hat",
  },
  {
    id: "5",
    team: "Colorado Rockies",
    item: "New Era Light Blue 2025 City Connect 59FIFTY Cap",
    size: "7 3/8",
    gender: "Unisex",
    cost: 47.99,
    stock: 52,
    category: "Hat",
  },
  {
    id: "6",
    team: "Colorado Rockies",
    item: "Nike Purple Club Fleece Hoodie",
    size: "XL",
    gender: "Unisex",
    cost: 79.99,
    stock: 47,
    category: "Outerwear",
  },
  {
    id: "7",
    team: "Colorado Rockies",
    item: "Women's Nike White Rockies T-Shirt",
    size: "M",
    gender: "Female",
    cost: 34.99,
    stock: 64,
    category: "Apparel",
  },
  {
    id: "8",
    team: "Colorado Rockies",
    item: "Youth Nike White Home Replica Jersey",
    size: "Youth L",
    gender: "Youth",
    cost: 99.99,
    stock: 29,
    category: "Jersey",
  },
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  const addItems = (items: InventoryItem[]) => {
    setInventory((prev) => [...prev, ...items]);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const uploadImage = (id: string, imageUrl: string) => {
    updateItem(id, { image: imageUrl });
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, addItems, updateItem, deleteItem, uploadImage }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
