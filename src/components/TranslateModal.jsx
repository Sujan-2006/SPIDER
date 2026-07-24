import React, { useState } from 'react';
import { X, Languages, Sparkles } from 'lucide-react';
import { translateTextBulk } from '../services/aiService';

const TranslateModal = ({ isOpen, onClose, editor }) => {
  const [targetLang, setTargetLang] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);

  if (!isOpen) return null;

  const handleTranslate = async () => {
    if (!editor) return;
    setIsTranslating(true);

    try {
      // Find all text components
      const wrapper = editor.DomComponents.getWrapper();
      const textComponents = wrapper.findType('text');
      
      if (textComponents.length === 0) {
        alert("No text elements found to translate.");
        setIsTranslating(false);
        return;
      }

      // Extract text
      const textArray = textComponents.map(comp => comp.components().models[0]?.get('content') || comp.get('content') || '');
      
      // Filter out empty strings but keep track of indices to map back correctly
      const validIndices = [];
      const textsToTranslate = [];
      
      textArray.forEach((text, idx) => {
        if (text && text.trim().length > 0) {
          validIndices.push(idx);
          textsToTranslate.push(text);
        }
      });

      if (textsToTranslate.length === 0) {
        alert("No visible text found to translate.");
        setIsTranslating(false);
        return;
      }

      // Bulk translate
      const translatedTexts = await translateTextBulk(textsToTranslate, targetLang);

      if (translatedTexts && translatedTexts.length === textsToTranslate.length) {
        // Map back
        validIndices.forEach((originalIdx, i) => {
          const comp = textComponents[originalIdx];
          // GrapesJS text components often have a textnode child
          const child = comp.components().models[0];
          if (child && child.is('textnode')) {
            child.set('content', translatedTexts[i]);
          } else {
            comp.set('content', translatedTexts[i]);
          }
        });
        alert(`Successfully translated page to ${targetLang}!`);
        onClose();
      } else {
        throw new Error("Translation mismatch. The AI returned an incorrect number of strings.");
      }

    } catch (e) {
      alert("Translation failed: " + e.message);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Languages className="w-5 h-5 text-indigo-600" /> Translate Page
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-600">
            Instantly translate all text on the current page into another language using Nvidia AI.
          </p>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Target Language</label>
            <select 
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-50/50"
            >
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Chinese (Simplified)">Chinese (Simplified)</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleTranslate}
          disabled={isTranslating}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> {isTranslating ? 'Translating...' : `Translate to ${targetLang}`}
        </button>
      </div>
    </div>
  );
};

export default TranslateModal;
