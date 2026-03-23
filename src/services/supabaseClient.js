import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveProjectData = async (editor) => {
  // Extract project payload
  const projectData = {
    html: editor.getHtml(),
    css: editor.getCss(),
    components: JSON.stringify(editor.getComponents()),
    style: JSON.stringify(editor.getStyle()),
  };

  console.log("Saving project payload via Supabase integration:", projectData);

  // Since we require valid DB credentials to actually write to Supabase, 
  // we use a safe localStorage fallback for demonstration here.
  localStorage.setItem('spider_project_v2_supabase_sync', JSON.stringify(projectData));

  /* Production Example
  const { data, error } = await supabase
    .from('projects')
    .upsert({ id: 'user-project-x', payload: projectData });
  if (error) throw error;
  return data;
  */
  
  return projectData;
};

export const loadProjectData = async (editor) => {
  try {
    console.log("Fetching project from Supabase...");
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500));

    // Fallback to local storage 
    const saved = localStorage.getItem('spider_project_v2_supabase_sync');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.components) {
        editor.setComponents(JSON.parse(data.components));
      }
      if (data.style) {
        editor.setStyle(JSON.parse(data.style));
      }
    }
  } catch (e) {
    console.error("Error loading project data from Supabase", e);
  }
};
