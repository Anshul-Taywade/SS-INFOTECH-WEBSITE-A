const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\908abd2f-0806-40b0-9b67-70f615298382\\.user_uploaded';

const mappings = [
  { 
    id: 'real-1',
    src: 'media_1786968973176.jpg', 
    dest: 'ss-infotech-classroom-session-1.jpg',
    mime: 'image/jpeg',
    title: 'SS Infotech Tech Seminar & Classroom Session',
    category: 'Training & Workshops',
    date: '2024',
    location: 'SS Infotech Learning Center',
    caption: 'Live technical training and developer upskilling session on web architecture and modern software stack at SS Infotech.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-2',
    src: 'media_1786968973336.png', 
    dest: 'ss-infotech-tech-team-collaboration.png',
    mime: 'image/png',
    title: 'Enterprise Cloud & Tech Team Collaboration',
    category: 'Office Environment',
    date: '2024',
    location: 'Software R&D Hub',
    caption: 'Cross-functional engineering team collaborating on cloud architecture, microservices, and network infrastructure.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-3',
    src: 'media_1786968973338.jpg', 
    dest: 'ss-infotech-team-lead-1.jpg',
    mime: 'image/jpeg',
    title: 'Senior Software Specialist & Team Leadership',
    category: 'Team Activities',
    date: '2024',
    location: 'SS Infotech Headquarters',
    caption: 'Dedicated technology leader driving software engineering excellence, agile delivery, and client success.',
    aspect: 'aspect-square'
  },
  { 
    id: 'real-4',
    src: 'media_1786968973408.jpg', 
    dest: 'ss-infotech-executive-leader.jpg',
    mime: 'image/jpeg',
    title: 'Executive Leadership & Technology Strategy',
    category: 'Team Activities',
    date: '2024',
    location: 'Executive Suite',
    caption: 'Executive management setting strategic direction, enterprise compliance, and product roadmap innovation.',
    aspect: 'aspect-square'
  },
  { 
    id: 'real-5',
    src: 'media_1786968973411.jpg', 
    dest: 'ss-infotech-live-workshop-session.jpg',
    mime: 'image/jpeg',
    title: 'Interactive Engineering Workshop & Seminar',
    category: 'Training & Workshops',
    date: '2024',
    location: 'Innovation & Training Lab',
    caption: 'Engaging classroom training workshop demonstrating live system design, database management, and code reviews.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-6',
    src: 'media_1786970202290.jpg', 
    dest: 'ss-infotech-data-analytics-presentation.jpg',
    mime: 'image/jpeg',
    title: 'Data Analytics & Power BI Sales Seminar',
    category: 'Training & Workshops',
    date: '2024',
    location: 'SS Infotech Analytics Lab',
    caption: 'In-depth data visualization and business intelligence workshop presenting real-world sales dashboard analytics.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-7',
    src: 'media_1786970202368.png', 
    dest: 'ss-infotech-conference-boardroom.png',
    mime: 'image/png',
    title: 'Executive Boardroom & Conference Suite',
    category: 'Office Environment',
    date: '2024',
    location: 'Corporate Boardroom',
    caption: 'State-of-the-art conference boardroom equipped for high-level enterprise client meetings and strategic planning.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-8',
    src: 'media_1786970202416.png', 
    dest: 'ss-infotech-reception-office.png',
    mime: 'image/png',
    title: 'Placement Hall of Fame & Corporate Office Desk',
    category: 'Office Environment',
    date: '2024',
    location: 'SS Infotech Main Office',
    caption: 'SS Infotech office desk featuring ISO certification trophies, course modules, and alumni success placement wall.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-9',
    src: 'media_1786970202523.png', 
    dest: 'ss-infotech-lounge-reception.png',
    mime: 'image/png',
    title: 'Executive Client Lounge & Reception Lounge',
    category: 'Office Environment',
    date: '2024',
    location: 'SS Infotech Reception Suite',
    caption: 'Modern circular curved leather lounge seating designed for welcoming guests, clients, and project consultation.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-10',
    src: 'media_1786970202550.jpg', 
    dest: 'ss-infotech-html-coding-lecture.jpg',
    mime: 'image/jpeg',
    title: 'Live Web Development & HTML/CSS Coding Lecture',
    category: 'Training & Workshops',
    date: '2024',
    location: 'Web Development Lab',
    caption: 'Instructor presenting live HTML5 code execution on smart TV screen to an interactive batch of web development trainees.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-11',
    src: 'media_1786971434384.png', 
    dest: 'ss-infotech-open-workspace-benches.png',
    mime: 'image/png',
    title: 'Modern Corporate Open Workstation Floor',
    category: 'Office Environment',
    date: '2024',
    location: 'SS Infotech R&D Open Floor',
    caption: 'Spacious open-plan workstation layout with ergonomic chairs, iMac systems, and glowing SS Infotech branding.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-12',
    src: 'media_1786971434454.png', 
    dest: 'ss-infotech-developer-workstations.png',
    mime: 'image/png',
    title: 'Dedicated Developer Workstation Desks',
    category: 'Office Environment',
    date: '2024',
    location: 'Software Engineering Studio',
    caption: 'Dual developer desks with code editors running on monitors and backlit SS Infotech corporate logo backdrop.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-13',
    src: 'media_1786971434525.png', 
    dest: 'ss-infotech-executive-sofa-lounge.png',
    mime: 'image/png',
    title: 'Executive Magenta Reception Lounge Suite',
    category: 'Office Environment',
    date: '2024',
    location: 'SS Infotech Executive Suite',
    caption: 'Premium reception lounge featuring plush velvet seating, ambient lighting, and illuminated SS Infotech wall sign.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-14',
    src: 'media_1786971434571.jpg', 
    dest: 'ss-infotech-cubicle-workstations.jpg',
    mime: 'image/jpeg',
    title: 'Individual Developer Cubicles & Coding Partitions',
    category: 'Office Environment',
    date: '2024',
    location: 'Development Bay B',
    caption: 'Quiet focused coding partition desks where engineers build, test, and debug high-performance applications.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-15',
    src: 'media_1786971434572.png', 
    dest: 'ss-infotech-computer-lab-hallway.png',
    mime: 'image/png',
    title: 'Computer Workstation Lab & Activity Wall',
    category: 'Training & Workshops',
    date: '2024',
    location: 'Learning Center Hallway',
    caption: 'Dedicated computer lab row featuring artificial turf green accent wall and corporate event activity bulletin board.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-16',
    src: 'media_1786973135915.jpg', 
    dest: 'ss-infotech-kdk-college-seminar-team.jpg',
    mime: 'image/jpeg',
    title: 'KDK College of Engineering Tech Seminar & Workshop Team',
    category: 'Company Events',
    date: '2024',
    location: 'K.D.K. College of Engineering, Nagpur',
    caption: 'SS Infotech expert trainers and IETE student forum team at the 3-day Industry Skill Training workshop.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-17',
    src: 'media_1786973135931.jpg', 
    dest: 'ss-infotech-kdk-college-certificate-ceremony.jpg',
    mime: 'image/jpeg',
    title: 'Industry Skill Training Certificate & Trophy Award Ceremony',
    category: 'Company Events',
    date: '2024',
    location: 'K.D.K. College Auditorium, Nagpur',
    caption: 'SS Infotech leadership awarding certificates of merit and trophies to outstanding engineering workshop participants.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-18',
    src: 'media_1786973135951.jpg', 
    dest: 'ss-infotech-jit-college-memento-ceremony.jpg',
    mime: 'image/jpeg',
    title: 'Jhulelal Institute of Technology AI & Coding Seminar',
    category: 'Company Events',
    date: '2024',
    location: 'Jhulelal Institute of Technology (JIT)',
    caption: 'SS Infotech founders presenting mementos during the Computer Science & AI Tech Seminar felicitations.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-19',
    src: 'media_1786973729417.jpg', 
    dest: 'ss-infotech-independence-day-ethnic.jpg',
    mime: 'image/jpeg',
    title: 'Independence Day Office Ethnic Celebration',
    category: 'Cultural & Celebrations',
    date: '2024',
    location: 'SS Infotech Corporate Lounge',
    caption: 'SS Infotech team members celebrating Independence Day in traditional attire with festive office decorations.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-20',
    src: 'media_1786973729688.jpg', 
    dest: 'ss-infotech-traditional-festival-pooja.jpg',
    mime: 'image/jpeg',
    title: 'Traditional Festival & Cultural Pooja Celebration',
    category: 'Cultural & Celebrations',
    date: '2024',
    location: 'SS Infotech Main Office Suite',
    caption: 'Annual corporate festival pooja celebration with team members dressed in Maharashtrian sarees, kurtas, and traditional wear.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-21',
    src: 'media_1786973729694.jpg', 
    dest: 'ss-infotech-tricolor-handpaint-terrace.jpg',
    mime: 'image/jpeg',
    title: 'Independence Day Tri-Color Terrace Hand Paint Event',
    category: 'Cultural & Celebrations',
    date: '2024',
    location: 'SS Infotech Terrace Sky Deck',
    caption: 'Team members showcasing patriotic tri-color hand prints (saffron, white, green) on the office terrace deck.',
    aspect: 'aspect-video'
  },
  { 
    id: 'real-22',
    src: 'media_1786973729835.jpg', 
    dest: 'ss-infotech-grand-cultural-gathering.jpg',
    mime: 'image/jpeg',
    title: 'Grand Annual Cultural & Festive Gathering',
    category: 'Cultural & Celebrations',
    date: '2024',
    location: 'SS Infotech Event Hall',
    caption: 'All employees and management gathering for festive celebrations, cultural programs, and team bonding.',
    aspect: 'aspect-video'
  }
];

const targetDirs = [
  path.join(__dirname, 'Public', 'images', 'gallery'),
  path.join(__dirname, 'Public', 'img', 'gallery'),
  path.join(__dirname, 'public', 'images', 'gallery'),
  path.join(__dirname, 'public', 'img', 'gallery')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

let base64Exports = {};

mappings.forEach(item => {
  const sourcePath = path.join(srcDir, item.src);
  if (fs.existsSync(sourcePath)) {
    const buffer = fs.readFileSync(sourcePath);
    targetDirs.forEach(dir => {
      const destPath = path.join(dir, item.dest);
      fs.writeFileSync(destPath, buffer);
    });

    const b64 = buffer.toString('base64');
    base64Exports[item.id] = `data:${item.mime};base64,${b64}`;
    console.log(`[SUCCESS] Copied and converted ${item.src}`);
  } else {
    console.warn(`[WARN] Source file not found: ${sourcePath}`);
  }
});

// Write src/components/galleryData.js
const galleryDataJsPath = path.join(__dirname, 'src', 'components', 'galleryData.js');
const jsContent = `// Auto-generated 100% real gallery items for SS Infotech (22 Real Images)
export const REAL_GALLERY_IMAGES = ${JSON.stringify(base64Exports, null, 2)};

export const REAL_COMPANY_GALLERY_ITEMS = ${JSON.stringify(mappings.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  date: item.date,
  location: item.location,
  caption: item.caption,
  imgSrc: `/images/gallery/${item.dest}`,
  fallbackSrc: base64Exports[item.id] || `/images/gallery/${item.dest}`,
  aspect: item.aspect,
  isReal: true
})), null, 2)};
`;

const jsDir = path.dirname(galleryDataJsPath);
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}
fs.writeFileSync(galleryDataJsPath, jsContent);
console.log(`[SUCCESS] Created ${galleryDataJsPath} with 22 real SS Infotech images.`);
