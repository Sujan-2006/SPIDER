import React, { useState, useEffect } from 'react';
import { X, Search, Globe, Image as ImageIcon, Sparkles } from 'lucide-react';
import { generateSEOMetadata } from '../services/aiService';

const SEOModal = ({ isOpen, onClose, pageName, seoData, pageText, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (seoData) {
      setTitle(seoData.title || '');
      setDescription(seoData.description || '');
      setOgImage(seoData.ogImage || '');
    }
  }, [seoData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ title, description, ogImage });
    onClose();
  };

  const handleMagicGenerate = async () => {
    if (!pageText || pageText.trim().length < 10) {
      alert("Not enough content on the page to generate SEO metadata. Please add more text blocks first.");
      return;
    }
    setIsGenerating(true);
    try {
      const metadata = await generateSEOMetadata(pageText);
      if (metadata) {
        if (metadata.title) setTitle(metadata.title);
        if (metadata.description) setDescription(metadata.description);
      }
    } catch (e) {
      alert("Error generating SEO metadata: " + e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" /> SEO Settings
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Editing SEO for page: <strong className="text-purple-600">{pageName || 'Home'}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleMagicGenerate}
              disabled={isGenerating}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles size={14} /> {isGenerating ? 'Generating...' : 'Magic Generate'}
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-5">
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Globe size={16} className="text-gray-400" /> Page Title
            </label>
            <p className="text-xs text-gray-500 mb-2">The title that appears in browser tabs and search engine results.</p>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50/50"
              placeholder="e.g. Acme Corp | Best Widgets"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Search size={16} className="text-gray-400" /> Meta Description
            </label>
            <p className="text-xs text-gray-500 mb-2">A short summary of this page used by search engines (max 160 characters).</p>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg h-24 focus:outline-none focus:border-purple-500 bg-gray-50/50"
              placeholder="Discover the best widgets at Acme Corp..."
              maxLength={160}
            />
            <div className="text-right text-[10px] text-gray-400 mt-1">
              {description.length} / 160
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <ImageIcon size={16} className="text-gray-400" /> Social Image (Open Graph)
            </label>
            <p className="text-xs text-gray-500 mb-2">Image URL displayed when this page is shared on social media (Twitter, LinkedIn).</p>
            <input 
              type="text" 
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-gray-50/50"
              placeholder="https://yourdomain.com/social-image.jpg"
            />
            {ogImage && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 h-32 bg-gray-100 flex items-center justify-center">
                <img src={ogImage} alt="Social Preview" className="max-w-full max-h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button onClick={onClose} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
};

export default SEOModal;
