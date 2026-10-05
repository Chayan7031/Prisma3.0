export interface MagazineArticle {
  id: string;
  title: string;
  category: string;
  page: number;
  author: string;
  authorRole: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  gradient: string;
}

export interface GalleryPageItem {
  pageNumber: number;
  title: string;
  category: 'Cover' | 'Editorial' | 'Technical' | 'Creative' | 'Events' | 'Back';
  imageUrl: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  badge?: string;
}

export interface TeamCategory {
  categoryTitle: string;
  description: string;
  members: TeamMember[];
}

export interface CuratedTheme {
  id: string;
  number: string;
  chapter?: string;
  title: string;
  subtitle: string;
  subtitleMeaning?: string;
  description: string;
  themeType: 'ai' | 'blockchain' | 'cybersecurity' | 'agriculture' | 'robotics' | 'gaming';
  pageRange?: string;
  pageTarget: number;
}

export type MagazineIndexItem = CuratedTheme;

