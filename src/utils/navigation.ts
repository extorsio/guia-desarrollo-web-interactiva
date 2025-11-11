import { getCollection } from 'astro:content';

export interface NavigationItem {
  title: string;
  slug: string;
  description: string;
  section: string;
}

export interface NavigationSection {
  name: string;
  icon: string;
  items: NavigationItem[];
}

export async function buildNavigation(): Promise<NavigationSection[]> {
  const cssFiles = await getCollection('css');
  const jsFiles = await getCollection('javascript');

  const createNavItems = (files: any[], section: string): NavigationItem[] => {
    return files
      .map((file) => ({
        title: file.data.title || file.id,
        slug: file.data.slug || file.slug,
        description: file.data.description || '',
        section: section
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  };

  const cssItems = createNavItems(cssFiles, 'CSS');
  const jsItems = createNavItems(jsFiles, 'JavaScript');

  return [
    { name: 'CSS', icon: '🎨', items: cssItems },
    { name: 'JavaScript', icon: '⚡', items: jsItems }
  ];
}

export async function flattenNavigation(sections: NavigationSection[]): Promise<NavigationItem[]> {
  return sections.flatMap(section => section.items);
}
