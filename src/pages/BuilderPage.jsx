import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import Builder from '../components/Builder';

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const { projectId } = useParams();
  
  const templateId = searchParams.get('template') || localStorage.getItem('selectedTemplate');

  return (
    <div className="h-full w-full overflow-hidden bg-[#FAF9F7]">
      {/* Provide a unique key so Builder fully remounts if project changes */}
      <Builder key={projectId || 'new'} projectId={projectId} templateId={templateId} />
    </div>

  );
}
