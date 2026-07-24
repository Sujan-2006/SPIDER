import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_PROJECTS_KEY = 'spider_local_projects';
const LOCAL_STORAGE_VERSIONS_KEY = 'spider_local_versions';

/**
 * Gets all projects for current user.
 */
export async function getProjects() {
  if (isSupabaseConfigured) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('updated_at', { ascending: false });

        if (!error && data) return data;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, loading local projects:', e);
    }
  }

  // Fallback to LocalStorage
  const localData = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
  return localData ? JSON.parse(localData) : [];
}

/**
 * Gets a single project by ID.
 */
export async function getProjectById(id) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase fetch single project failed:', e);
    }
  }

  const projects = await getProjects();
  return projects.find((p) => p.id === id) || null;
}

/**
 * Saves or updates a project (Database + LocalStorage fallback).
 */
export async function saveProject({ id, name, data, publishedUrl = null }) {
  const projectId = id || uuidv4();
  const timestamp = new Date().toISOString();

  let savedRemotely = false;

  if (isSupabaseConfigured) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const payload = {
          id: projectId,
          user_id: session.user.id,
          name: name || 'Untitled Project',
          data,
          updated_at: timestamp,
        };
        if (publishedUrl) payload.published_url = publishedUrl;

        const { error } = await supabase.from('projects').upsert(payload);
        if (!error) savedRemotely = true;
      }
    } catch (e) {
      console.warn('Supabase save error, writing to LocalStorage fallback:', e);
    }
  }

  // Always sync to LocalStorage to support offline queue
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  const updatedProject = {
    id: projectId,
    name: name || 'Untitled Project',
    data,
    published_url: publishedUrl || (index >= 0 ? projects[index].published_url : null),
    updated_at: timestamp,
    synced: savedRemotely,
  };

  if (index >= 0) {
    projects[index] = updatedProject;
  } else {
    projects.unshift(updatedProject);
  }

  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  return updatedProject;
}

/**
 * Deletes a project by ID.
 */
export async function deleteProject(id) {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete error:', e);
    }
  }

  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(filtered));
}

/**
 * Saves a version snapshot for rollback functionality.
 */
export async function createProjectVersion(projectId, snapshotData, versionName = 'Snapshot') {
  const versionId = uuidv4();
  const timestamp = new Date().toISOString();

  if (isSupabaseConfigured) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('project_versions').insert({
          id: versionId,
          project_id: projectId,
          user_id: session.user.id,
          snapshot_data: snapshotData,
          version_name: versionName,
          created_at: timestamp,
        });
      }
    } catch (e) {
      console.warn('Supabase version save error:', e);
    }
  }

  // LocalStorage version backup
  const allVersions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VERSIONS_KEY) || '[]');
  const newVersion = {
    id: versionId,
    project_id: projectId,
    snapshot_data: snapshotData,
    version_name: versionName,
    created_at: timestamp,
  };
  allVersions.unshift(newVersion);
  localStorage.setItem(LOCAL_STORAGE_VERSIONS_KEY, JSON.stringify(allVersions));
  return newVersion;
}

/**
 * Fetches version history for a project.
 */
export async function getProjectVersions(projectId) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('project_versions')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase versions fetch error:', e);
    }
  }

  const allVersions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VERSIONS_KEY) || '[]');
  return allVersions.filter((v) => v.project_id === projectId);
}
