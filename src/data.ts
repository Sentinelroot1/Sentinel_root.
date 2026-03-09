export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Offensive' | 'Defensive' | 'Fundamentals';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  thumbnail: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Tool' | 'Article' | 'Video' | 'Book';
  category: string;
}

export const COURSES: Course[] = [
  {
    id: 'intro-to-cyber',
    title: 'Cybersecurity Fundamentals',
    description: 'The absolute starting point. Learn about networks, protocols, and the mindset of a security professional.',
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '10 hours',
    modules: 5,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ethical-hacking-101',
    title: 'Ethical Hacking: The Basics',
    description: 'Learn the phases of a penetration test: Reconnaissance, Scanning, Gaining Access, and Maintaining Access.',
    category: 'Offensive',
    level: 'Beginner',
    duration: '15 hours',
    modules: 8,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'defensive-ops',
    title: 'SOC Analyst Operations',
    description: 'Master the art of defense. Learn about SIEMs, log analysis, and incident response.',
    category: 'Defensive',
    level: 'Beginner',
    duration: '12 hours',
    modules: 6,
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'web-app-security',
    title: 'Web Application Security',
    description: 'Understand the OWASP Top 10. Learn how to find and fix vulnerabilities like SQLi and XSS.',
    category: 'Offensive',
    level: 'Intermediate',
    duration: '20 hours',
    modules: 10,
    thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee667ff1f6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'wifi-pentesting',
    title: 'WiFi Pentesting & Wireless Security',
    description: 'Master the art of auditing wireless networks. Learn about WEP/WPA/WPA2/WPA3 vulnerabilities and cracking techniques.',
    category: 'Offensive',
    level: 'Intermediate',
    duration: '12 hours',
    modules: 6,
    thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'phishing-sim',
    title: 'Social Engineering & Phishing',
    description: 'Learn how attackers exploit the human element. Build and defend against sophisticated phishing campaigns.',
    category: 'Offensive',
    level: 'Beginner',
    duration: '8 hours',
    modules: 4,
    thumbnail: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bruteforce-mastery',
    title: 'Password Cracking & Bruteforcing',
    description: 'Deep dive into hash types, dictionary attacks, and high-performance bruteforcing using tools like Hashcat and John the Ripper.',
    category: 'Offensive',
    level: 'Intermediate',
    duration: '10 hours',
    modules: 5,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'network-defense',
    title: 'Network Security & Hardening',
    description: 'Learn how to secure routers, switches, and firewalls against common network-level attacks.',
    category: 'Defensive',
    level: 'Intermediate',
    duration: '15 hours',
    modules: 7,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
  }
];

export const RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'TryHackMe',
    description: 'Hands-on cybersecurity training through browser-based labs.',
    url: 'https://tryhackme.com',
    type: 'Tool',
    category: 'Labs'
  },
  {
    id: '2',
    title: 'Hack The Box',
    description: 'A massive hacking playground with machines ranging from easy to insane.',
    url: 'https://hackthebox.com',
    type: 'Tool',
    category: 'Labs'
  },
  {
    id: '3',
    title: 'OWASP Top 10',
    description: 'The standard awareness document for developers and web application security.',
    url: 'https://owasp.org/www-project-top-ten/',
    type: 'Article',
    category: 'Web Security'
  },
  {
    id: '4',
    title: 'The Cyber Mentor (YouTube)',
    description: 'Excellent video resources for practical ethical hacking.',
    url: 'https://www.youtube.com/c/TheCyberMentor',
    type: 'Video',
    category: 'Learning'
  },
  {
    id: '5',
    title: 'Aircrack-ng',
    description: 'A complete suite of tools to assess WiFi network security.',
    url: 'https://www.aircrack-ng.org/',
    type: 'Tool',
    category: 'WiFi'
  },
  {
    id: '6',
    title: 'Social-Engineer Toolkit (SET)',
    description: 'An open-source penetration testing framework designed for social engineering.',
    url: 'https://github.com/trustedsec/social-engineer-toolkit',
    type: 'Tool',
    category: 'Social Engineering'
  },
  {
    id: '7',
    title: 'Hashcat',
    description: 'The world\'s fastest and most advanced password recovery utility.',
    url: 'https://hashcat.net/hashcat/',
    type: 'Tool',
    category: 'Password Cracking'
  },
  {
    id: '8',
    title: 'Krebs on Security',
    description: 'In-depth investigative journalism on cybercrime and security.',
    url: 'https://krebsonsecurity.com/',
    type: 'Article',
    category: 'News'
  }
];
