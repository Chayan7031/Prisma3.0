import { MagazineArticle, GalleryPageItem, TeamCategory } from './types';
import { pages as contentPages, pageList as contentPageList } from '@/content/content';

export const ARTICLES_DATA: MagazineArticle[] = [
  {
    id: 'ubiquitous-tech',
    title: 'How Technology is Becoming Ubiquitous in 2026',
    category: 'Theme Feature',
    page: 10,
    author: 'Editorial Technical Desk',
    authorRole: 'KGEC CSE Research Group',
    excerpt:
      'From ambient computing fabric to autonomous neural agents, computing has transcended screens. An exploration into how continuous ambient intelligence reshapes modern human existence.',
    readTime: '6 min read',
    tags: ['Ubiquitous Computing', 'Ambient AI', 'Future Systems'],
    gradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
  },
  {
    id: 'hod-foreword',
    title: 'From the Desk of the Head of the Department',
    category: 'Department Vision',
    page: 3,
    author: 'Head of Department',
    authorRole: 'CSE • Kalyani Govt. Engineering College',
    excerpt:
      'Reflecting on fifty semesters of computational excellence, departmental research milestones, and nurturing the next generation of visionary computer scientists and engineers.',
    readTime: '4 min read',
    tags: ['Leadership', 'Academic Vision', 'Department Legacy'],
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
  },
  {
    id: 'student-innovations',
    title: 'Student Innovations & Architectural Paradigms',
    category: 'Student Research',
    page: 12,
    author: 'Student Innovation Cohort',
    authorRole: 'Class of 2026 & 2027',
    excerpt:
      'A deep dive into distributed systems, real-time edge processing, generative interfaces, and high-performance open-source projects crafted right here in KGEC laboratories.',
    readTime: '7 min read',
    tags: ['Edge AI', 'Distributed Systems', 'Open Source'],
    gradient: 'from-teal-500/10 via-emerald-500/5 to-transparent',
  },
  {
    id: 'literary-canvas',
    title: 'Creative Expressions, Verse & Philosophical Horizons',
    category: 'Literary & Arts',
    page: 14,
    author: 'Literary & Fine Arts Wing',
    authorRole: 'Students & Faculty',
    excerpt:
      'When logic meets lyricism. Original poetry, personal essays, digital photography, and reflections from students balancing compiler bugs and human emotions.',
    readTime: '5 min read',
    tags: ['Creative Writing', 'Poetry', 'Visual Canvas'],
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
  },
];

export const GALLERY_PAGES: GalleryPageItem[] = [
  {
    pageNumber: 1,
    title: 'Front Cover & Title Theme',
    category: 'Cover',
    imageUrl: contentPages.cover || (contentPages as any).Page1,
    description: 'The 2026 Flagship Edition visual identity featuring the duality of human culture and cybernetic evolution.',
  },
  {
    pageNumber: 2,
    title: 'President & Editorial Board',
    category: 'Editorial',
    imageUrl: (contentPages as any).Page2,
    description: 'Institutional leaders and editorial advisors introducing PRISMA 3.0.',
  },
  {
    pageNumber: 3,
    title: 'From the Desk of HOD',
    category: 'Editorial',
    imageUrl: (contentPages as any).Page3,
    description: 'Message from the Head of the Department on academic excellence and computing horizons.',
  },
  {
    pageNumber: 4,
    title: 'Faculty & Department Insights',
    category: 'Editorial',
    imageUrl: (contentPages as any).Page4,
    description: 'Faculty perspectives, research contributions, and scholastic breakthroughs.',
  },
  {
    pageNumber: 6,
    title: 'Magazine Committee & Curators',
    category: 'Editorial',
    imageUrl: (contentPages as any).Page6,
    description: 'The dedicated student committee that researched, designed, and curated the publication.',
  },
  {
    pageNumber: 10,
    title: 'Ubiquitous Computing & AI',
    category: 'Technical',
    imageUrl: (contentPages as any).Page10,
    description: 'Lead research article analyzing pervasive computing, smart environments, and autonomous models.',
  },
  {
    pageNumber: 12,
    title: 'Student Engineering & Horizons',
    category: 'Technical',
    imageUrl: (contentPages as any).Page12,
    description: 'Innovative student architectures, algorithms, and experimental software systems.',
  },
  {
    pageNumber: 14,
    title: 'Creative Corner & Verses',
    category: 'Creative',
    imageUrl: (contentPages as any).Page14,
    description: 'Original poetry, creative writing, and introspective literary pieces.',
  },
  {
    pageNumber: 16,
    title: 'Philosophy of Modern Computing',
    category: 'Creative',
    imageUrl: (contentPages as any).Page16,
    description: 'Critical perspectives examining the socio-ethical dimensions of hyper-connected algorithms.',
  },
  {
    pageNumber: 18,
    title: 'Department Events & Symposia',
    category: 'Events',
    imageUrl: (contentPages as any).Page18,
    description: 'Recap of hackathons, technical paper meets, seminars, and collaborative student achievements.',
  },
  {
    pageNumber: 20,
    title: 'Class of 2026 & Department Gallery',
    category: 'Events',
    imageUrl: (contentPages as any).Page20,
    description: 'Photographic memories, student accomplishments, and departmental milestones.',
  },
  {
    pageNumber: contentPageList?.length || 63,
    title: 'Special Thanks & Back Cover',
    category: 'Back',
    imageUrl: contentPages.backCover || '/prisma_backcover.webp',
    description: 'The concluding artistic back cover and credits to all contributors and patrons.',
  },
];

export const EDITORIAL_TEAMS: TeamCategory[] = [
  {
    categoryTitle: 'Faculty Advisory Council',
    description: 'Guiding academic standards, review rigor, and institutional vision',
    members: [
      { name: 'Dr. Debabrata Roy', role: 'Chief Faculty Advisor & HOD', department: 'CSE, KGEC', badge: 'Patron' },
      { name: 'Prof. Anirban Mukherjee', role: 'Faculty Editor & Reviewer', department: 'CSE, KGEC', badge: 'Advisory' },
      { name: 'Prof. Subhasish Banerjee', role: 'Technical Content Mentor', department: 'CSE, KGEC', badge: 'Advisory' },
    ],
  },
  {
    categoryTitle: 'Student Editorial Committee',
    description: 'Curating student papers, essays, poetry, and narrative flow',
    members: [
      { name: 'Soujanya Mondal', role: 'Editor-in-Chief & Lead Curator', department: 'CSE Final Year', badge: 'Lead' },
      { name: 'Debrup Ray', role: 'Technical Features Editor', department: 'CSE 3rd Year', badge: 'Editorial' },
      { name: 'Aindrila Mukherjee', role: 'Literary & Creative Editor', department: 'CSE 3rd Year', badge: 'Creative' },
      { name: 'Arpan Dey', role: 'Copy Editor & Archival Lead', department: 'CSE 2nd Year', badge: 'Editorial' },
    ],
  },
  {
    categoryTitle: '3D Web & Interactive Engineering',
    description: 'Architecting the WebGL 3D flipbook engine and digital experience',
    members: [
      { name: 'CSE Web Innovation Lab', role: 'Next.js 16 & Three.js Architecture', department: 'Digital Media Wing', badge: 'Engine' },
      { name: 'PRISMA Creative Studio', role: 'Layouts, Typography & Artwork Curation', department: 'Creative Cell', badge: 'Design' },
    ],
  },
];

export const MAGAZINE_STATS = [
  { label: 'Edition Year', value: '2026', subtext: 'Annual Flagship' },
  { label: 'Total Pages', value: String(contentPageList?.length || 63), subtext: 'Full Color 300 DPI' },
  { label: 'Articles & Poetry', value: '18+', subtext: 'Student & Faculty Voices' },
  { label: 'Interactive Flip', value: '3D', subtext: 'Physics Page Engine' },
];

export const MAGAZINE_INDEX: import('./types').CuratedTheme[] = [
  // Top Row (3 Index Chapters - Appears from Left to Right)
  {
    id: 'index-prologue',
    number: '01',
    chapter: 'CHAPTER I',
    title: 'Prologue',
    subtitle: 'PRATHAMA PARVA',
    subtitleMeaning: 'Vision & Foreword',
    description:
      'Presidential address, advisory council reflections, and the Head of Department’s foreword chronicling fifty semesters of computing legacy at KGEC.',
    themeType: 'ai',
    pageRange: 'P. 01 – 04',
    pageTarget: 1,
  },
  {
    id: 'index-theme-horizon',
    number: '02',
    chapter: 'CHAPTER II',
    title: 'Theme Horizon',
    subtitle: 'SARVAVYAPI CHETANA',
    subtitleMeaning: 'Ambient Ubiquity',
    description:
      'Lead philosophical and architectural inquiries into ubiquitous computing, ambient intelligence, and post-screen cognitive environments.',
    themeType: 'blockchain',
    pageRange: 'P. 05 – 09',
    pageTarget: 5,
  },
  {
    id: 'index-engineering',
    number: '03',
    chapter: 'CHAPTER III',
    title: 'Engineering',
    subtitle: 'TANTRA & SYSTEMS',
    subtitleMeaning: 'Frontier Architectures',
    description:
      'Deep research investigations: distributed consensus protocols, neural vision, edge compiler swarms, and cryptographic privacy architectures.',
    themeType: 'cybersecurity',
    pageRange: 'P. 10 – 13',
    pageTarget: 10,
  },

  // Bottom Row (3 Index Chapters - Appears from Right to Left)
  {
    id: 'index-innovations',
    number: '04',
    chapter: 'CHAPTER IV',
    title: 'Innovations',
    subtitle: 'NAVONMESH & LABS',
    subtitleMeaning: 'Student Research',
    description:
      'Inside the KGEC research laboratories: open-source toolkits, precision agritech prototypes, and IoT sensor networks engineered by student cohorts.',
    themeType: 'agriculture',
    pageRange: 'P. 14 – 15',
    pageTarget: 14,
  },
  {
    id: 'index-creative',
    number: '05',
    chapter: 'CHAPTER V',
    title: 'Literary Canvas',
    subtitle: 'KAVYA & KALA',
    subtitleMeaning: 'Human Resonance',
    description:
      'When logic meets lyricism. Original student poetry, introspective prose, digital photography, and creative reflections balancing code and emotion.',
    themeType: 'robotics',
    pageRange: 'P. 16 – 18',
    pageTarget: 16,
  },
  {
    id: 'index-chronicles',
    number: '06',
    chapter: 'CHAPTER VI',
    title: 'Chronicles',
    subtitle: 'SMRITI & ARCHIVES',
    subtitleMeaning: 'Community & Legacy',
    description:
      'Graduating Class of 2026 gallery, editorial committee citations, departmental symposia recaps, faculty milestones, and patron acknowledgments.',
    themeType: 'gaming',
    pageRange: `P. 19 – ${contentPageList?.length || 63}`,
    pageTarget: 19,
  },
];

export const CURATED_THEMES = MAGAZINE_INDEX;

