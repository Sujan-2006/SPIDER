import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Builder from '../components/Builder';

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const [templateId, setTemplateId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const urlId = searchParams.get('template');
    if (urlId) {
      setTemplateId(urlId);
    } else {
      try {
        const stored = localStorage.getItem('selectedTemplate');
        if (stored) setTemplateId(stored);
      } catch (_) {}
    }
    setIsReady(true);
  }, [searchParams]);

  if (!isReady) return null;

  return (
    <div className="h-full w-full overflow-hidden bg-[#FAF9F7]">
      <Builder templateId={templateId} />
    </div>
  );
}
