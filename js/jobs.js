const jobData = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechNova Solutions',
    location: 'Chandigarh',
    salary: '₹4 - ₹7 LPA',
    type: 'Full Time',
    experience: '0-2 Years',
    category: 'Web Development',
    mode: 'Hybrid',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    description: 'We are looking for a creative Frontend Developer to build responsive and user-friendly web interfaces for modern digital experiences.',
    responsibilities: [
      'Develop responsive UI components using modern web technologies.',
      'Collaborate with designers to translate ideas into polished interfaces.',
      'Optimize applications for speed and mobile usability.'
    ],
    requirements: [
      'Strong knowledge of HTML, CSS, and JavaScript.',
      'Familiarity with responsive design and UI/UX principles.',
      'Basic understanding of Git and debugging tools.'
    ],
    posted: '2 days ago'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'CodeCraft Labs',
    location: 'Bengaluru',
    salary: '₹6 - ₹10 LPA',
    type: 'Full Time',
    experience: '2-4 Years',
    category: 'Software Development',
    mode: 'On-site',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
    description: 'Join our backend engineering team to build scalable APIs and server-side systems that power our platform.',
    responsibilities: [
      'Design and maintain backend services and APIs.',
      'Ensure system reliability and performance in production.',
      'Work with databases and cloud infrastructure.'
    ],
    requirements: [
      'Hands-on experience with Java and Spring Boot.',
      'Understanding of REST APIs and database design.',
      'Ability to write clean and maintainable code.'
    ],
    posted: '5 days ago'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Digital Orbit',
    location: 'Pune',
    salary: '₹8 - ₹12 LPA',
    type: 'Full Time',
    experience: '2-5 Years',
    category: 'Software Development',
    mode: 'Remote',
    skills: ['JavaScript', 'Node.js', 'MongoDB', 'Express'],
    description: 'We are hiring a Full Stack Developer to build and maintain end-to-end digital products for clients across multiple industries.',
    responsibilities: [
      'Develop front-end and back-end modules for web apps.',
      'Implement data models and work with APIs.',
      'Participate in code reviews and deployment processes.'
    ],
    requirements: [
      'Experience with frontend and backend technologies.',
      'Strong problem-solving skills and communication.',
      'Knowledge of database systems and version control.'
    ],
    posted: '1 week ago'
  },
  {
    id: 4,
    title: 'Python Developer',
    company: 'SmartGrid AI',
    location: 'Hyderabad',
    salary: '₹5 - ₹9 LPA',
    type: 'Full Time',
    experience: '1-3 Years',
    category: 'Artificial Intelligence',
    mode: 'Hybrid',
    skills: ['Python', 'Django', 'Flask', 'API Development'],
    description: 'Work on innovative AI-enabled products and data-driven applications while collaborating with product and research teams.',
    responsibilities: [
      'Build Python-based services and integrations.',
      'Create efficient data processing pipelines.',
      'Support application deployment and monitoring.'
    ],
    requirements: [
      'Proficiency in Python and backend frameworks.',
      'Good understanding of RESTful APIs.',
      'Experience with testing and debugging.'
    ],
    posted: '3 days ago'
  },
  {
    id: 5,
    title: 'Java Developer',
    company: 'Enterprise Stack',
    location: 'Noida',
    salary: '₹7 - ₹11 LPA',
    type: 'Full Time',
    experience: '2-4 Years',
    category: 'Software Development',
    mode: 'On-site',
    skills: ['Java', 'Spring', 'Microservices', 'Hibernate'],
    description: 'We need a Java Developer to create enterprise-grade applications with secure and maintainable architecture.',
    responsibilities: [
      'Develop Java-based services and microservices.',
      'Write clean code and unit tests.',
      'Coordinate with QA and product teams.'
    ],
    requirements: [
      'Strong Java programming fundamentals.',
      'Experience with Spring framework and databases.',
      'Good application performance optimization skills.'
    ],
    posted: '4 days ago'
  },
  {
    id: 6,
    title: 'Data Analyst',
    company: 'InsightMatrix',
    location: 'Gurugram',
    salary: '₹5 - ₹8 LPA',
    type: 'Full Time',
    experience: '1-3 Years',
    category: 'Data Science',
    mode: 'Hybrid',
    skills: ['SQL', 'Excel', 'Power BI', 'Data Visualization'],
    description: 'Analyze business data and create meaningful insights that help teams make better strategic decisions.',
    responsibilities: [
      'Create dashboards and performance reports.',
      'Analyze trends and prepare stakeholder-ready summaries.',
      'Support business planning with data insights.'
    ],
    requirements: [
      'Strong SQL and data analysis skills.',
      'Experience with dashboards and reporting tools.',
      'Ability to communicate findings clearly.'
    ],
    posted: '6 days ago'
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: 'Nexa Analytics',
    location: 'Mumbai',
    salary: '₹9 - ₹15 LPA',
    type: 'Full Time',
    experience: '3-6 Years',
    category: 'Data Science',
    mode: 'Remote',
    skills: ['Python', 'Machine Learning', 'Statistics', 'R'],
    description: 'Build predictive models and data strategies for business growth and digital transformation initiatives.',
    responsibilities: [
      'Build statistical and machine learning models.',
      'Create experiments to validate data-driven hypotheses.',
      'Present insights to stakeholders clearly.'
    ],
    requirements: [
      'Strong knowledge of Python and ML frameworks.',
      'Familiarity with model evaluation and experimentation.',
      'Solid analytical and communication skills.'
    ],
    posted: '2 weeks ago'
  },
  {
    id: 8,
    title: 'UI/UX Designer',
    company: 'Pixel Studio',
    location: 'Ahmedabad',
    salary: '₹4 - ₹8 LPA',
    type: 'Full Time',
    experience: '1-3 Years',
    category: 'Web Development',
    mode: 'Hybrid',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'UX Research'],
    description: 'We are looking for a UI/UX Designer who can turn complex ideas into elegant and intuitive digital experiences.',
    responsibilities: [
      'Create user flows, wireframes, and visual designs.',
      'Collaborate with product teams and developers.',
      'Ensure accessibility and usability standards.'
    ],
    requirements: [
      'Proficiency in design tools like Figma or Adobe XD.',
      'Strong eye for aesthetics and usability.',
      'Research-driven design thinking skills.'
    ],
    posted: '3 days ago'
  },
  {
    id: 9,
    title: 'Cyber Security Analyst',
    company: 'SecureArc',
    location: 'Delhi',
    salary: '₹7 - ₹12 LPA',
    type: 'Full Time',
    experience: '2-5 Years',
    category: 'Cyber Security',
    mode: 'On-site',
    skills: ['Network Security', 'SIEM', 'Threat Analysis', 'Ethical Hacking'],
    description: 'Protect corporate networks and digital assets by monitoring threats and responding to security incidents in real time.',
    responsibilities: [
      'Monitor security events and detect vulnerabilities.',
      'Prepare incident reports and coordinate responses.',
      'Support security awareness and compliance initiatives.'
    ],
    requirements: [
      'Knowledge of cybersecurity tools and best practices.',
      'Understanding of networking and incident response.',
      'Ability to analyze risks and communicate effectively.'
    ],
    posted: '5 days ago'
  },
  {
    id: 10,
    title: 'AI/ML Engineer',
    company: 'Vision Labs',
    location: 'Bengaluru',
    salary: '₹10 - ₹18 LPA',
    type: 'Full Time',
    experience: '3-6 Years',
    category: 'Artificial Intelligence',
    mode: 'Remote',
    skills: ['Python', 'TensorFlow', 'Deep Learning', 'Computer Vision'],
    description: 'Create intelligent models and algorithms that improve automation, personalization, and decision-making in real-world systems.',
    responsibilities: [
      'Develop machine learning pipelines and AI solutions.',
      'Train and evaluate models for production use.',
      'Collaborate with stakeholders to define AI use cases.'
    ],
    requirements: [
      'Strong machine learning and deep learning fundamentals.',
      'Experience with Python frameworks like TensorFlow or PyTorch.',
      'Strong analytical and coding skills.'
    ],
    posted: '1 week ago'
  },
  {
    id: 11,
    title: 'Digital Marketing Executive',
    company: 'BrandBoost Media',
    location: 'Jaipur',
    salary: '₹3 - ₹6 LPA',
    type: 'Full Time',
    experience: '0-2 Years',
    category: 'Digital Marketing',
    mode: 'Hybrid',
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Google Ads'],
    description: 'Drive brand growth by managing digital campaigns, SEO efforts, and customer engagement strategies across channels.',
    responsibilities: [
      'Plan and execute digital marketing campaigns.',
      'Monitor performance metrics and optimize campaigns.',
      'Create content and manage social media engagement.'
    ],
    requirements: [
      'Good understanding of digital marketing strategies.',
      'Knowledge of SEO, SEM, and social media tools.',
      'Excellent communication and creative thinking.'
    ],
    posted: '4 days ago'
  },
  {
    id: 12,
    title: 'HR Executive',
    company: 'PeopleMatrix',
    location: 'Indore',
    salary: '₹3 - ₹5 LPA',
    type: 'Full Time',
    experience: '1-3 Years',
    category: 'Human Resources',
    mode: 'On-site',
    skills: ['Recruitment', 'Employee Relations', 'HRMS', 'Communication'],
    description: 'Support various HR functions including recruitment, onboarding, employee engagement, and policy management.',
    responsibilities: [
      'Coordinate interviews and onboarding.',
      'Maintain employee records and HR documentation.',
      'Support employee engagement and organizational needs.'
    ],
    requirements: [
      'Good understanding of HR operations and recruitment processes.',
      'Strong interpersonal and communication skills.',
      'Experience with HR software is a plus.'
    ],
    posted: '7 days ago'
  },
  {
    id: 13,
    title: 'Software Engineer',
    company: 'CloudStack Technologies',
    location: 'Kochi',
    salary: '₹6 - ₹10 LPA',
    type: 'Full Time',
    experience: '2-4 Years',
    category: 'Software Development',
    mode: 'Hybrid',
    skills: ['C++', 'Python', 'System Design', 'Testing'],
    description: 'Collaborate with product teams to build robust software systems with clean architecture and high quality.',
    responsibilities: [
      'Develop and maintain production software features.',
      'Write tests and participate in code quality reviews.',
      'Assist in debugging and deployment workflows.'
    ],
    requirements: [
      'Experience with modern software engineering practices.',
      'Strong problem-solving and debugging skills.',
      'Knowledge of system design is beneficial.'
    ],
    posted: '2 days ago'
  },
  {
    id: 14,
    title: 'Web Designer',
    company: 'Canvas Works',
    location: 'Lucknow',
    salary: '₹3 - ₹6 LPA',
    type: 'Part Time',
    experience: '0-2 Years',
    category: 'Web Development',
    mode: 'Remote',
    skills: ['HTML', 'CSS', 'Photoshop', 'Bootstrap'],
    description: 'Create visually appealing and user-focused website layouts for clients across different industries.',
    responsibilities: [
      'Design landing pages and promotional websites.',
      'Improve website usability and responsiveness.',
      'Work closely with content and marketing teams.'
    ],
    requirements: [
      'Experience with web design tools and page layouts.',
      'Good sense of typography and color design.',
      'Knowledge of responsive design best practices.'
    ],
    posted: '3 days ago'
  },
  {
    id: 15,
    title: 'Cloud Engineer',
    company: 'Skyline Cloud',
    location: 'Bengaluru',
    salary: '₹9 - ₹14 LPA',
    type: 'Full Time',
    experience: '3-5 Years',
    category: 'Software Development',
    mode: 'Hybrid',
    skills: ['AWS', 'Azure', 'DevOps', 'Docker'],
    description: 'Design and manage cloud-based infrastructure to ensure reliability, scalability, and efficient deployment workflows.',
    responsibilities: [
      'Deploy and manage applications in cloud environments.',
      'Work with CI/CD and monitoring systems.',
      'Ensure infrastructure security and scalability.'
    ],
    requirements: [
      'Experience with AWS or Azure.',
      'Understanding of containerization and automation.',
      'Ability to troubleshoot production issues.'
    ],
    posted: '8 days ago'
  },
  {
    id: 16,
    title: 'Product Analyst',
    company: 'NextGen Commerce',
    location: 'Chennai',
    salary: '₹6 - ₹9 LPA',
    type: 'Full Time',
    experience: '1-3 Years',
    category: 'Data Science',
    mode: 'Remote',
    skills: ['Business Analysis', 'SQL', 'Product Metrics', 'Excel'],
    description: 'Use data and user insights to improve product decisions and business performance across digital platforms.',
    responsibilities: [
      'Analyze product metrics and customer behavior.',
      'Support roadmap planning with actionable insights.',
      'Work closely with product, design, and engineering teams.'
    ],
    requirements: [
      'Strong analytical and communication skills.',
      'Understanding of product metrics and funnel analysis.',
      'Comfort with SQL and data reporting tools.'
    ],
    posted: '6 days ago'
  }
];

window.jobData = jobData;
