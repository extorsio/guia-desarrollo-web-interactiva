import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

interface NavigationItem {
  title: string;
  slug: string;
  description: string;
  section: string;
}

interface Section {
  name: string;
  icon: string;
  items: NavigationItem[];
}

export const GET: APIRoute = async () => {
  try {
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const sections: Section[] = [];
    
    // Define sections
    const sectionDefs = [
      { name: 'CSS', icon: '🎨', folder: 'css' },
      { name: 'JavaScript', icon: '⚡', folder: 'javascript' }
    ];
    
    for (const sectionDef of sectionDefs) {
      const sectionDir = path.join(contentDir, sectionDef.folder);
      
      if (!fs.existsSync(sectionDir)) {
        continue;
      }
      
      const files = fs.readdirSync(sectionDir).filter(f => f.endsWith('.mdx'));
      
      const items: NavigationItem[] = files.map((file) => {
        const filePath = path.join(sectionDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Parse frontmatter manually
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        const frontmatterText = frontmatterMatch ? frontmatterMatch[1] : '';
        
        // Extract title, slug, and description from frontmatter with better regex
        const titleMatch = frontmatterText.match(/title:\s*["']([^"']+)["']/);
        const slugMatch = frontmatterText.match(/slug:\s*["']([^"']+)["']/);
        const descriptionMatch = frontmatterText.match(/description:\s*["']([^"']+)["']/);
        
        const slug = slugMatch ? slugMatch[1] : file.replace('.mdx', '');
        const title = titleMatch ? titleMatch[1] : slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
        const description = descriptionMatch ? descriptionMatch[1] : '';
        
        return { title, slug, description, section: sectionDef.name };
      });
      
      // Sort items by title
      items.sort((a, b) => a.title.localeCompare(b.title));
      
      sections.push({
        name: sectionDef.name,
        icon: sectionDef.icon,
        items
      });
    }

    return new Response(JSON.stringify(sections), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error loading navigation:', error);
    return new Response(JSON.stringify({ error: 'Failed to load navigation' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
