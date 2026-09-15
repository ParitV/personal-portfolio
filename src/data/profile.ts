export type SkillCategory = {
  category: string
  skills: string[]
}

export type ExperienceEntry = {
  role: string
  company: string
  location?: string
  dates: string
  bullets: string[]
}

export type EducationEntry = {
  degree: string
  institution: string
  location?: string
  dates: string
  bullets?: string[]
}

export type Profile = {
  summary: string
  skills: SkillCategory[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
}

export const profile: Profile = {
  summary:
    'Cyber Security Analyst with a Master of Cyber Security from Monash University and commercial experience across full-stack software engineering, technical support and threat mitigation. Hands-on experience monitoring, investigating and triaging application vulnerabilities, executing grey-box penetration tests and performing root cause analysis on production incidents. Skilled in automating security checks using Python, evaluating AI/LLM integration risks and translating complex technical findings into actionable recommendations for clients and stakeholders.',

  skills: [
    {
      category: 'Technical Support',
      skills: [
        'Incident Triage & Escalation',
        'Root-Cause Analysis',
        'Ticketing & Case Management',
        'Remote Troubleshooting',
        'Client-Facing Support',
        'Technical Documentation',
      ],
    },
    {
      category: 'Security Tools & Testing',
      skills: [
        'Burp Suite',
        'Nmap',
        'Nikto',
        'Nuclei',
        'testssl.sh',
        'sqlmap',
        'CodeRabbit (SAST)',
        'Vulnerability Assessment & Remediation',
      ],
    },
    {
      category: 'Systems & Infrastructure',
      skills: [
        'Windows/Web Application Support',
        'AWS (Lambda, API Gateway, RDS, CloudWatch, ECR)',
        'System Administration',
        'Website & Hosting Maintenance',
        'CI/CD (GitHub Actions)',
      ],
    },
    {
      category: 'Software & Scripting',
      skills: [
        'Python',
        'C# / .NET',
        'JavaScript / TypeScript',
        'React.js',
        'SQL',
        'REST APIs',
        'HTML',
        'CSS',
      ],
    },
    {
      category: 'Security Awareness',
      skills: [
        'OWASP Top 10',
        'Vulnerability Assessment',
        'Secure Configuration',
        'Australian Privacy Act 1988 / APPs',
        'Data Protection',
      ],
    },
    {
      category: 'Communication',
      skills: [
        'Technical ↔ Non-Technical Translation',
        'Stakeholder Communication',
        'Cross-Functional Collaboration',
      ],
    },
  ],

  experience: [
    {
      role: 'Application Security Engineer & Full-Stack Developer',
      company: 'NeuroGuide Industry Project',
      location: 'Melbourne, AU',
      dates: '2026',
      bullets: [
        'Developed full-stack features across the React front-end and FastAPI back-end, integrating AWS Lambda, API Gateway and PostgreSQL within a serverless architecture.',
        'Owned the CI/CD process using GitHub Actions, automating build, validation and deployment workflows to create a repeatable release process.',
        'Designed and deployed the AWS serverless backend, integrating Lambda, API Gateway, PostgreSQL/RDS, CloudWatch and ECR to support secure, scalable application services.',
        'Designed and implemented REST API functionality and integrated the Gemini API to support AI-driven application features.',
        "Authored the application's Security Plan using CIA triad and privacy-by-design principles, covering authentication, encryption, logging and data protection controls.",
        'Conducted three iterations of penetration testing across the live application, identifying and working with developers to remediate issues including IDOR, exposed credentials and CORS misconfiguration.',
        'Performed automated code analysis across frontend and backend repositories using CodeRabbit, producing prioritized recommendations for code quality and maintainability.',
        'Produced technical documentation covering security findings, reproduction steps and remediation guidance for developers and stakeholders.',
      ],
    },
    {
      role: 'Technical Support Engineer (Remote)',
      company: 'Insider',
      location: 'Bangkok, Thailand',
      dates: 'Aug 2024 – Feb 2026',
      bullets: [
        'Diagnosed, reproduced and resolved application-layer issues across HTML, CSS and JavaScript, maintaining hands-on involvement with front-end development while working in a technical support role.',
        'Developed and applied front-end solutions to investigate and resolve production issues, giving practical experience with how web applications behave in real-world environments.',
        'Investigated complex and escalated technical issues through root-cause analysis and collaborated with internal engineering teams and external stakeholders to develop solutions.',
        'Translated client-reported problems and requirements into clear technical information for developers, then communicated technical root causes and remediation steps back to non-technical clients.',
        'Maintained detailed technical documentation covering investigations, resolutions and escalations.',
      ],
    },
    {
      role: 'Data Accuracy Team',
      company: 'Insider',
      location: 'Bangkok, Thailand',
      dates: 'Dec 2023 – Aug 2024',
      bullets: [
        'Investigated data discrepancies and anomalies across systems, identifying root causes and maintaining data integrity and consistency for client-facing products.',
        'Applied analytical and investigative skills to support reliable, accurate handling of system data.',
      ],
    },
    {
      role: 'Technical Support Specialist',
      company: 'Insider',
      location: 'Bangkok, Thailand',
      dates: 'Feb 2023 – Aug 2024',
      bullets: [
        'Provided direct technical support to clients, translating client-reported issues into structured technical detail and following escalation procedures for cases with potential security or compliance implications.',
        'Developed customised solutions using HTML, CSS and JavaScript to resolve specific client and user requirements.',
      ],
    },
    {
      role: 'Full Stack Developer',
      company: 'INF Systems & Engineering',
      dates: 'May 2022 – Feb 2023',
      bullets: [
        'Developed, enhanced, and maintained full-stack web applications and RESTful integration services using Java, C#, JavaScript, and SQL within an Agile development setup.',
        'Built and enhanced REST API functionality to support frontend workflows, backend business logic and data exchange between application components.',
        'Developed React-based user-interface components and integrated them with backend API services and SQL-backed application data.',
        'Implemented new functionality across frontend and backend layers, translating business or technical requirements into maintainable application features.',
        'Investigated, diagnosed and resolved defects across React UI, .NET backend services, REST APIs and SQL data operations.',
      ],
    },
    {
      role: 'Software Development Intern',
      company: 'Move On Solution',
      dates: 'Jun 2021 – Oct 2021',
      bullets: [
        'Contributed to the design and development of desktop applications using SQL, C# and the .NET Framework.',
      ],
    },
  ],

  education: [
    {
      degree: 'Master of Cyber Security',
      institution: 'Monash University',
      location: 'Melbourne, Australia',
      dates: 'Jul 2024 – Jul 2026',
      bullets: [
        'Industry Experience Project: Full-stack developer and security engineer responsible for the application Security Plan, penetration testing, vulnerability identification, remediation and verification.',
      ],
    },
    {
      degree: 'Bachelor of Digital Engineering, First Class Honours',
      institution: 'Thai-Nichi Institute of Technology',
      dates: 'Feb 2018 – Mar 2022',
      bullets: [
        'Relevant coursework: Data Structures | Algorithms | Computer Systems | Machine Learning | Industrial Robotics | IoT | Web & Application Development | Cloud Computing | Wireless Communication',
      ],
    },
  ],
}
