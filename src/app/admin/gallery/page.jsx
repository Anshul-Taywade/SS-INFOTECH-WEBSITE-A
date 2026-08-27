'use client';

import { useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { useAdminTheme } from '@/context/AdminThemeContext';
import { 
  Image as ImageIcon, Plus, Edit, Trash2, Eye, Sparkles, 
  Search, CheckCircle2, Calendar, MapPin, X, Upload 
} from 'lucide-react';
import { REAL_COMPANY_GALLERY_ITEMS } from '@/components/galleryData';

export default function GalleryManagerPage() {
  const { isDarkMode } = useAdminTheme();
  const [items, setItems] = useState(REAL_COMPANY_GALLERY_ITEMS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // New Image Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Office Environment',
    location: 'SS Infotech Headquarters',
    date: '2024',
    caption: '',
    imgSrc: ''
  });

  const categories = ['All', 'Cultural & Celebrations', 'Company Events', 'Training & Workshops', 'Office Environment', 'Team Activities'];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this gallery image?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imgSrc) return alert('Please fill in title and image URL/path!');
    
    const newItem = {
      id: `real-${Date.now()}`,
      ...formData,
      aspect: 'aspect-video',
      isReal: true
    };
    
    setItems([newItem, ...items]);
    setIsAddModalOpen(false);
    setFormData({ title: '', category: 'Office Environment', location: 'SS Infotech Headquarters', date: '2024', caption: '', imgSrc: '' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems(items.map(item => item.id === editingItem.id ? editingItem : item));
    setEditingItem(null);
  };

  return (
    <div className="flex-1 flex flex-col font-outfit">
      <AdminHeader title="Gallery Media Manager" />

      <main className="p-6 md:p-10 space-y-6 max-w-7xl w-full mx-auto">
        
        {/* Header Control Panel */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border shadow-md transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            <h1 className={`text-xl font-black flex items-center gap-2 font-outfit ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span>Official SS Infotech Media</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 uppercase font-mono">
                {items.length} Active Real Images
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-jakarta">Manage corporate photos, captions, categories and media paths.</p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs uppercase tracking-wider font-jakarta transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add New Real Photo</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-jakarta">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-white text-slate-700 hover:text-purple-700 border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-purple-500 border ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            />
          </div>

        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className={`group rounded-3xl overflow-hidden border shadow-md flex flex-col transition-all hover:shadow-xl ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Image Preview Container */}
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md flex items-center gap-1 font-jakarta uppercase">
                  <Sparkles size={11} className="text-amber-300" />
                  <span>Real SS Infotech Photo</span>
                </span>

                <img 
                  src={item.imgSrc} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedImage(item)}
                    className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    title="View Full Preview"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => setEditingItem(item)}
                    className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Card Meta Details */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5 font-outfit">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 font-jakarta uppercase">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className={`text-sm font-extrabold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{item.caption}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-jakarta">
                  <span className="flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300">
                    <MapPin size={12} className="text-purple-600 dark:text-purple-400" />
                    <span className="truncate">{item.location}</span>
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{item.id}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Lightbox Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className={`relative max-w-3xl w-full rounded-3xl p-6 space-y-4 border ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <X size={20} />
            </button>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img src={selectedImage.imgSrc} alt={selectedImage.title} className="max-h-full object-contain" />
            </div>
            <div className="space-y-1 font-outfit">
              <h3 className="text-lg font-black">{selectedImage.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-outfit">
          <div className={`relative max-w-lg w-full rounded-3xl p-6 space-y-5 border ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-black flex items-center gap-2">
                <Upload size={18} className="text-purple-600 dark:text-purple-400" />
                <span>Add Real SS Infotech Photo</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 font-jakarta text-xs">
              <div>
                <label className="block font-bold mb-1">Image Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SS Infotech Live Project Sprint"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Office Environment">Office Environment</option>
                    <option value="Training & Workshops">Training & Workshops</option>
                    <option value="Team Activities">Team Activities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Year / Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image File Path or Data URL</label>
                <input
                  type="text"
                  required
                  placeholder="/images/gallery/ss-infotech-photo.jpg"
                  value={formData.imgSrc}
                  onChange={(e) => setFormData({...formData, imgSrc: e.target.value})}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Caption / Description</label>
                <textarea
                  rows={3}
                  value={formData.caption}
                  onChange={(e) => setFormData({...formData, caption: e.target.value})}
                  className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold">
                  Save Gallery Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
