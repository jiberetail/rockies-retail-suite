import { Package, Download, Upload, Search, Filter, Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Check, Box, DollarSign, Boxes, TrendingUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getTeamLogo } from '@/app/utils/teamLogos';
import { useState, useRef } from "react";
import { useInventory } from "@/app/contexts/InventoryContext";
import { PodiumManager } from "@/app/components/PodiumManager";

export function SettingsPage() {
  const { inventory, addItems, updateItem, deleteItem, uploadImage } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    team: "Colorado Rockies",
    item: "",
    size: "",
    gender: "Unisex",
    cost: 0,
    stock: 0,
    category: "Other",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImageFor, setUploadingImageFor] = useState<string | null>(null);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(inventory.map((item) => item.category)))];

  // Filter inventory
  const filteredInventory = inventory
    .filter((item) => {
      const matchesSearch =
        item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.size.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.team.localeCompare(b.team));

  // Handle Excel file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        const newItems = jsonData.map((row, index) => {
          // Handle different possible column names (case-insensitive)
          const getFieldValue = (fieldNames: string[]) => {
            for (const name of fieldNames) {
              if (row[name] !== undefined) return row[name];
            }
            return "";
          };

          const team = getFieldValue(["Team", "team", "TEAM"]) || "";
          const item = getFieldValue(["Item", "item", "ITEM"]) || "";
          const size = getFieldValue(["Size", "size", "SIZE"]) || "";
          const gender = getFieldValue(["Gender", "gender", "GENDER"]) || "";
          const costValue = getFieldValue(["Cost", "cost", "COST", "Price", "price", "PRICE"]);
          const stockValue = getFieldValue(["Stock", "stock", "STOCK", "Quantity", "quantity", "QUANTITY", "Qty", "qty", "QTY", "Count", "count", "COUNT"]);
          const categoryValue = getFieldValue(["Category", "category", "CATEGORY"]);

          return {
            id: `import-${Date.now()}-${index}`,
            team,
            item,
            size,
            gender,
            cost: parseFloat(costValue) || 0,
            stock: parseInt(stockValue) || 0,
            category: categoryValue || categorizeItem(item),
          };
        });

        addItems(newItems);
        
        // Show summary of import
        const totalStock = newItems.reduce((sum, item) => sum + item.stock, 0);
        alert(
          `Successfully imported ${newItems.length} items!\n\n` +
          `Total Stock: ${totalStock}\n` +
          `Sample: ${newItems[0]?.item || "N/A"} - Stock: ${newItems[0]?.stock || 0}`
        );
      } catch (error) {
        alert(
          "Error reading file. Please make sure it's a valid Excel file.\n\n" +
          "Required columns (any case):\n" +
          "• Team\n" +
          "• Item\n" +
          "• Size\n" +
          "• Gender\n" +
          "• Cost (or Price)\n" +
          "• Stock (or Quantity/Qty/Count)\n" +
          "• Category (optional)"
        );
      }
    };
    reader.readAsArrayBuffer(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-categorize items
  const categorizeItem = (itemName: string): string => {
    const name = itemName.toLowerCase();
    if (name.includes("jersey")) return "Jersey";
    if (name.includes("cap") || name.includes("hat")) return "Hat";
    if (name.includes("hoodie") || name.includes("jacket")) return "Outerwear";
    if (name.includes("t-shirt") || name.includes("shirt")) return "Apparel";
    return "Other";
  };

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      uploadImage(itemId, imageUrl);
      setUploadingImageFor(null);
    };
    reader.readAsDataURL(file);
    
    // Reset input so the same file can be selected again
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Start editing
  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  // Save edit
  const saveEdit = () => {
    if (editingId && editForm) {
      updateItem(editingId, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  // Add new item
  const addNewItem = () => {
    const newItem = {
      id: `new-${Date.now()}`,
      ...newItemForm,
    };
    addItems([newItem]);
    setIsAddingNew(false);
    setNewItemForm({
      team: "Colorado Rockies",
      item: "",
      size: "",
      gender: "Unisex",
      cost: 0,
      stock: 0,
      category: "Other",
    });
  };

  // Export to Excel
  const handleExport = () => {
    const exportData = inventory.map((item) => ({
      Team: item.team,
      Item: item.item,
      Size: item.size,
      Gender: item.gender,
      Cost: item.cost,
      Stock: item.stock,
      Category: item.category,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, `Colorado_Rockies_Inventory_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-[900px]">
        {/* Add New Item Modal */}
        {isAddingNew && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-2xl max-w-2xl w-full p-6" style={{ borderRadius: '6px' }}>
              <h2 className="text-xl font-black text-[#333333] mb-5 flex items-center gap-2">
                <Plus size={24} className="text-[#BC0022]" />
                Add New Inventory Item
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Team</label>
                  <input
                    type="text"
                    value={newItemForm.team}
                    onChange={(e) => setNewItemForm({ ...newItemForm, team: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-medium transition-colors"
                    style={{ borderRadius: '6px' }}
                    placeholder="e.g., Colorado Rockies"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Item Name</label>
                  <input
                    type="text"
                    value={newItemForm.item}
                    onChange={(e) => setNewItemForm({ ...newItemForm, item: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-medium transition-colors"
                    style={{ borderRadius: '6px' }}
                    placeholder="e.g., Home Jersey"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-bold bg-white transition-colors"
                    style={{ borderRadius: '6px' }}
                  >
                    <option>Jersey</option>
                    <option>Hat</option>
                    <option>Outerwear</option>
                    <option>Apparel</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Size</label>
                  <input
                    type="text"
                    value={newItemForm.size}
                    onChange={(e) => setNewItemForm({ ...newItemForm, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-medium transition-colors"
                    style={{ borderRadius: '6px' }}
                    placeholder="e.g., L, XL"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Gender</label>
                  <select
                    value={newItemForm.gender}
                    onChange={(e) => setNewItemForm({ ...newItemForm, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-bold bg-white transition-colors"
                    style={{ borderRadius: '6px' }}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Unisex</option>
                    <option>Youth</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItemForm.cost}
                    onChange={(e) => setNewItemForm({ ...newItemForm, cost: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#BC0022] focus:ring-1 focus:ring-[#BC0022] font-medium transition-colors"
                    style={{ borderRadius: '6px' }}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={addNewItem}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-[#BC0022] text-white hover:bg-[#9a001c] transition-colors font-bold shadow-sm"
                  style={{ borderRadius: '6px' }}
                >
                  <Check size={18} />
                  Add Item
                </button>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setNewItemForm({
                      team: "Colorado Rockies",
                      item: "",
                      size: "",
                      gender: "Unisex",
                      cost: 0,
                      stock: 0,
                      category: "Other",
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-500 text-white hover:bg-gray-600 transition-colors font-bold shadow-sm"
                  style={{ borderRadius: '6px' }}
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="pt-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#333333]">Inventory Management</h1>
              <p className="text-sm text-[#333333] mt-1.5 font-medium">
                Colorado Rockies Retail • {inventory.length} Total Items
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px] shadow-sm">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 transition-colors font-bold text-sm text-[#333333] rounded-lg"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
              <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px] shadow-sm">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 transition-colors font-bold text-sm text-[#333333] rounded-lg"
                >
                  <Upload size={16} />
                  Upload
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px] shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" size={18} />
                  <input
                    type="text"
                    placeholder="Search by team, item, or size..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white focus:outline-none font-medium text-sm rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px] shadow-sm">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 focus:outline-none font-bold bg-white min-w-[160px] text-sm rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="py-5">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] shadow-sm">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Box size={16} className="text-[#333333]" strokeWidth={2.5} />
                  <p className="text-xs font-bold text-[#333333] uppercase tracking-wide">Total Categories</p>
                </div>
                <p className="text-2xl font-black text-[#333333]">{filteredInventory.length}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] shadow-sm">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={16} className="text-[#333333]" strokeWidth={2.5} />
                  <p className="text-xs font-bold text-[#333333] uppercase tracking-wide">Total Value</p>
                </div>
                <p className="text-2xl font-black text-[#333333]">
                  ${filteredInventory.reduce((sum, item) => sum + item.cost * item.stock, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] shadow-sm">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Boxes size={16} className="text-[#333333]" strokeWidth={2.5} />
                  <p className="text-xs font-bold text-[#333333] uppercase tracking-wide">Items in Stock</p>
                </div>
                <p className="text-2xl font-black text-[#333333]">
                  {filteredInventory.reduce((sum, item) => sum + item.stock, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] shadow-sm">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-[#333333]" strokeWidth={2.5} />
                  <p className="text-xs font-bold text-[#333333] uppercase tracking-wide">Avg Item Cost</p>
                </div>
                <p className="text-2xl font-black text-[#333333]">
                  ${filteredInventory.length > 0 ? (filteredInventory.reduce((sum, item) => sum + item.cost, 0) / filteredInventory.length).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="pb-8">
          <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] shadow-sm">
            <div className="bg-white rounded-xl">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-[#333333]">Inventory Items</h2>
                <p className="text-sm text-gray-500 mt-1">All merchandise in stock</p>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {filteredInventory.map((item, index) => {
                    const isEditing = editingId === item.id;
                    const logo = getTeamLogo(item.team);
                    
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {/* Product Image - Separate from Logo */}
                        <div 
                          className="relative group flex-shrink-0 w-12 h-12 bg-white border-2 border-dashed border-gray-300 hover:border-[#BC0022] flex items-center justify-center rounded-lg cursor-pointer transition-colors"
                          onDoubleClick={() => {
                            setUploadingImageFor(item.id);
                            setTimeout(() => {
                              if (imageInputRef.current) {
                                imageInputRef.current.click();
                              }
                            }, 0);
                          }}
                        >
                          {item.image ? (
                            <>
                              <img
                                src={item.image}
                                alt={item.item}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                <Upload size={16} className="text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <ImageIcon size={16} className="text-gray-400 mx-auto" />
                              <p className="text-[8px] text-gray-400 mt-0.5">Double Click</p>
                            </div>
                          )}
                        </div>

                        {/* Team Logo */}
                        <div className="flex-shrink-0">
                          {logo ? (
                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1">
                              <img src={logo} alt={item.team} className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center rounded-lg">
                              <ImageIcon size={20} className="text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Team & Item */}
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editForm.team}
                                onChange={(e) => setEditForm({ ...editForm, team: e.target.value })}
                                className="w-full px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                                placeholder="Team"
                              />
                              <input
                                type="text"
                                value={editForm.item}
                                onChange={(e) => setEditForm({ ...editForm, item: e.target.value })}
                                className="w-full px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                                placeholder="Item"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="font-bold text-sm text-[#333333] truncate">{item.team}</div>
                              <div className="text-xs text-gray-600 truncate">{item.item}</div>
                            </>
                          )}
                        </div>

                        {/* Category */}
                        <div className="text-center">
                          {isEditing ? (
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                            >
                              <option>Jersey</option>
                              <option>Hat</option>
                              <option>Outerwear</option>
                              <option>Apparel</option>
                              <option>Other</option>
                            </select>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#041e42] text-white">
                              {item.category}
                            </span>
                          )}
                        </div>

                        {/* Size & Gender */}
                        <div className="text-right min-w-[80px]">
                          {isEditing ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editForm.size}
                                onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                                className="w-full px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                                placeholder="Size"
                              />
                              <select
                                value={editForm.gender}
                                onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                                className="w-full px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Unisex</option>
                                <option>Youth</option>
                              </select>
                            </div>
                          ) : (
                            <>
                              <div className="font-bold text-[#333333] text-sm">{item.size}</div>
                              <div className="text-xs text-gray-500">{item.gender}</div>
                            </>
                          )}
                        </div>

                        {/* Cost & Stock */}
                        <div className="text-right min-w-[80px]">
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.01"
                              value={editForm.cost}
                              onChange={(e) => setEditForm({ ...editForm, cost: parseFloat(e.target.value) })}
                              className="w-full px-2 py-1 border border-[#BC0022] font-semibold text-sm rounded"
                              placeholder="Cost"
                            />
                          ) : (
                            <>
                              <div className="font-black text-[#BF0D3E] text-lg">${item.cost.toFixed(2)}</div>
                              <div className="text-xs text-gray-500">Stock: {item.stock}</div>
                            </>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          {isEditing ? (
                            <>
                              <button
                                onClick={saveEdit}
                                className="p-2 bg-green-500 text-white hover:bg-green-600 transition-colors rounded-lg"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-2 bg-gray-500 text-white hover:bg-gray-600 transition-colors rounded-lg"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(item)}
                                className="p-2 bg-[#041e42] text-white hover:bg-[#0a2f5f] transition-colors rounded-lg"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${item.item} (${item.team})?`)) {
                                    deleteItem(item.id);
                                  }
                                }}
                                className="p-2 bg-[#BC0022] text-white hover:bg-[#9a001c] transition-colors rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredInventory.length === 0 && (
                  <div className="py-12 text-center">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-bold text-gray-600">No items found</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search or filter
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Podium Management Section */}
        <PodiumManager />
      </div>
      
      {/* Hidden file input for image uploads */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (uploadingImageFor) {
            handleImageUpload(e, uploadingImageFor);
          }
        }}
        className="hidden"
      />
    </main>
  );
}
