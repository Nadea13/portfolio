export type Locale = 'en' | 'th';

export const translations = {
  en: {
    // Navbar
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },

    // Hero
    hero: {
      greeting: 'Hi, I\'m Idea',
      title: 'I build things\nfor the web.',
      subtitle: 'Full-stack developer focused on creating clean, user-friendly applications with modern technologies.',
      cta_work: 'View Projects',
      cta_contact: 'Get in Touch',
      status: 'Available for work',
    },

    // About
    about: {
      title: 'About Me',
      p1: 'I\'m a passionate developer with a keen eye for design. I bridge the gap between engineering and aesthetics, creating software that not only works underneath the hood but feels amazing to use.',
      p2: 'With a background in both computer science and visual arts, I bring a unique perspective to every project. I believe in clean code, user-centric design, and continuous learning.',
      download_cv: 'Download CV',
      stats: {
        experience: 'Years Exp.',
        projects: 'Projects',
        clients: 'Clients',
      },
    },

    // Projects
    projects: {
      title: 'Projects',
      subtitle: 'A selection of recent work.',
      live: 'Live',
      code: 'Code',
      items: [
        {
          title: 'LeagueFlow',
          description: 'A comprehensive football tournament management platform that empowers organizers to create tournaments, manage schedules, track real-time scores, and handle payments professionally in one place.',
        },
        {
          title: 'ÊTRE',
          description: 'A premium single-page E-commerce landing page built with Next.js, featuring a high-end product showcase with a real-time shopping cart system and fully responsive design.',
        },
      ],
    },

    // Skills
    skills: {
      title: 'Skills',
      subtitle: 'Technologies and tools I work with.',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI & Machine Learning',
        tools: 'Tools & DevOps',
      },
    },

    // Contact
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have a project in mind? I\'d love to hear about it.',
      name: 'Name',
      name_placeholder: 'Your name',
      email: 'Email',
      email_placeholder: 'you@example.com',
      message: 'Message',
      message_placeholder: 'Tell me about your project...',
      send: 'Send Message',
      info_email: 'Email',
      info_location: 'Location',
      location_value: 'Sisaket, Thailand',
    },

    // Footer
    footer: {
      copyright: '© {year} Idea. All rights reserved.',
      built_with: 'Built with Next.js & Tailwind CSS',
    },
  },

  th: {
    // Navbar
    nav: {
      about: 'เกี่ยวกับ',
      projects: 'ผลงาน',
      skills: 'ทักษะ',
      contact: 'ติดต่อ',
    },

    // Hero
    hero: {
      greeting: 'สวัสดีครับ ผม Idea',
      title: 'ผมสร้างสิ่งต่างๆ\nบนเว็บ',
      subtitle: 'นักพัฒนา Full-stack ที่มุ่งเน้นสร้างแอปพลิเคชันที่สะอาด ใช้งานง่าย ด้วยเทคโนโลยีสมัยใหม่',
      cta_work: 'ดูผลงาน',
      cta_contact: 'ติดต่อผม',
      status: 'พร้อมรับงาน',
    },

    // About
    about: {
      title: 'เกี่ยวกับผม',
      p1: 'ผมเป็นนักพัฒนาที่มีความหลงใหลในงานดีไซน์ ผมเชื่อมต่อช่องว่างระหว่างวิศวกรรมและความสวยงาม สร้างซอฟต์แวร์ที่ไม่เพียงทำงานได้ดีแต่ยังให้ประสบการณ์ที่ยอดเยี่ยม',
      p2: 'ด้วยพื้นฐานทั้งด้านวิทยาการคอมพิวเตอร์และศิลปะ ผมนำมุมมองที่เป็นเอกลักษณ์มาสู่ทุกโปรเจกต์ ผมเชื่อในโค้ดที่สะอาด การออกแบบที่เน้นผู้ใช้ และการเรียนรู้อย่างต่อเนื่อง',
      download_cv: 'ดาวน์โหลด CV',
      stats: {
        experience: 'ปีประสบการณ์',
        projects: 'โปรเจกต์',
        clients: 'ลูกค้า',
      },
    },

    // Projects
    projects: {
      title: 'ผลงาน',
      subtitle: 'ผลงานที่เลือกสรรล่าสุด',
      live: 'เว็บไซต์',
      code: 'โค้ด',
      items: [
        {
          title: 'LeagueFlow',
          description: 'แพลตฟอร์มบริหารจัดการการแข่งขันฟุตบอลแบบครบวงจรที่ช่วยให้ผู้จัดการแข่งขันสามารถสร้างทัวร์นาเมนต์, จัดการตารางแข่งขัน, ติดตามผลคะแนนแบบเรียลไทม์, และจัดการระบบชำระเงินได้อย่างมืออาชีพในที่เดียว',
        },
        {
          title: 'ÊTRE',
          description: 'เว็บไซต์ E-commerce Landing Page แบบหน้าเดียวที่พัฒนาด้วย Next.js เน้นการนำเสนอสินค้าแบบพรีเมียมพร้อมระบบตะกร้าสินค้าแบบ Real-time และรองรับการแสดงผลแบบ Responsive ทุกหน้าจอ',
        },
      ],
    },

    // Skills
    skills: {
      title: 'ทักษะ',
      subtitle: 'เทคโนโลยีและเครื่องมือที่ผมใช้งาน',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI & Machine Learning',
        tools: 'เครื่องมือ & DevOps',
      },
    },

    // Contact
    contact: {
      title: 'ติดต่อผม',
      subtitle: 'มีโปรเจกต์ในใจ? ผมยินดีรับฟังครับ',
      name: 'ชื่อ',
      name_placeholder: 'ชื่อของคุณ',
      email: 'อีเมล',
      email_placeholder: 'you@example.com',
      message: 'ข้อความ',
      message_placeholder: 'บอกผมเกี่ยวกับโปรเจกต์ของคุณ...',
      send: 'ส่งข้อความ',
      info_email: 'อีเมล',
      info_location: 'ที่อยู่',
      location_value: 'ศรีสะเกษ, ประเทศไทย',
    },

    // Footer
    footer: {
      copyright: '© {year} Idea. สงวนลิขสิทธิ์.',
      built_with: 'สร้างด้วย Next.js & Tailwind CSS',
    },
  },
};

export type Translations = typeof translations['en'];
