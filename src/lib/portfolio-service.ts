import type { Locale, ProjectItemTranslation } from '../data/locales/types';
import { getDictionary } from '../data/locales';
import { supabase, isSupabaseConfigured, PROJECTS_TABLE, type PortfolioProjectRecord } from './supabase';

/**
 * Fetch project items for a given locale during SSG build time.
 * If Supabase is configured and reachable, uses live data.
 * Falls back gracefully to local static dictionary if Supabase is unreachable or unconfigured.
 */
export async function getProjectsForLocale(locale: Locale): Promise<ProjectItemTranslation[]> {
  const localFallback = getDictionary(locale).projects;

  if (!isSupabaseConfigured) {
    return localFallback;
  }

  try {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn('[portfolio-service] Warning: Supabase query returned error, falling back to local seed data:', error.message);
      }
      return localFallback;
    }

function cleanYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|live\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : trimmed;
}

function isUrlOrIdShorts(urlOrId?: string): boolean {
  if (!urlOrId) return false;
  return /(?:youtube\.com\/shorts\/|\/shorts\/)/i.test(urlOrId);
}

    const projects: ProjectItemTranslation[] = (data as PortfolioProjectRecord[]).map((row) => {
      const isProjectVertical = row.is_vertical === true ||
        row.videos?.[0]?.is_vertical === true ||
        isUrlOrIdShorts(row.youtube_id) ||
        (row.id === 'project-1792097113305' || row.id === 'project-1792097690040');

      return {
        id: row.id,
        title: locale === 'id' ? (row.title_id || row.title_en) : (row.title_en || row.title_id),
        client: locale === 'id' ? (row.client_id || row.client_en) : (row.client_en || row.client_id),
        category: row.category,
        categoryLabel: locale === 'id'
          ? (row.category_label_id || (row.category === 'ai' ? 'AI Video' : row.category === 'commercial' ? 'Commercial Video' : row.category === 'motion' ? 'Motion Graphics' : 'Video Editing'))
          : (row.category_label_en || (row.category === 'ai' ? 'AI Video' : row.category === 'commercial' ? 'Commercial Video' : row.category === 'motion' ? 'Motion Graphics' : 'Video Editing')),
        duration: row.duration,
        description: locale === 'id' ? (row.description_id || row.description_en) : (row.description_en || row.description_id),
        fullDescription: locale === 'id' ? (row.full_description_id || row.full_description_en) : (row.full_description_en || row.full_description_id),
        youtubeId: cleanYouTubeId(row.youtube_id),
        isVertical: isProjectVertical,
        videos: Array.isArray(row.videos) && row.videos.length > 0
          ? row.videos.map((v) => ({
              title: v.title || 'Video',
              youtubeId: cleanYouTubeId(v.youtube_id || (v as any).youtubeId || ''),
              isVertical: v.is_vertical === true || isUrlOrIdShorts(v.youtube_id || '') || isProjectVertical,
            }))
          : undefined,
        thumbnail: row.thumbnail_url,
        role: locale === 'id' ? (row.role_id || row.role_en) : (row.role_en || row.role_id),
        tools: Array.isArray(row.tools) ? row.tools : [],
      };
    });

    return projects;
  } catch (err: any) {
    console.warn('[portfolio-service] Exception while fetching from Supabase, using local fallback:', err?.message);
    return localFallback;
  }
}
