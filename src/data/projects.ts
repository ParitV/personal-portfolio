export type Project = {
  slug: string
  title: string
  oneLiner: string
  techStack: string[]
  problem: string
  whatIBuilt: string
  myRole: string
  keyDecisions: string[]
  repoUrl: string
  demoUrl?: string
  docUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    oneLiner: 'Short description of the project, what problem it solves, and the tech used.',
    techStack: ['React', 'TypeScript'],
    problem: 'Placeholder description of the problem this project set out to solve.',
    whatIBuilt: 'Placeholder description of the solution and how it works.',
    myRole: 'Placeholder description of your role and responsibilities.',
    keyDecisions: [
      'Placeholder key decision made during the project.',
      'Placeholder trade-off and why it was chosen.',
    ],
    repoUrl: 'https://github.com/your-username/project-one',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    oneLiner: 'Short description of the project, what problem it solves, and the tech used.',
    techStack: ['Node.js', 'PostgreSQL'],
    problem: 'Placeholder description of the problem this project set out to solve.',
    whatIBuilt: 'Placeholder description of the solution and how it works.',
    myRole: 'Placeholder description of your role and responsibilities.',
    keyDecisions: [
      'Placeholder key decision made during the project.',
      'Placeholder trade-off and why it was chosen.',
    ],
    repoUrl: 'https://github.com/your-username/project-two',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    oneLiner: 'Short description of the project, what problem it solves, and the tech used.',
    techStack: ['Python', 'Data'],
    problem: 'Placeholder description of the problem this project set out to solve.',
    whatIBuilt: 'Placeholder description of the solution and how it works.',
    myRole: 'Placeholder description of your role and responsibilities.',
    keyDecisions: [
      'Placeholder key decision made during the project.',
      'Placeholder trade-off and why it was chosen.',
    ],
    repoUrl: 'https://github.com/your-username/project-three',
  },
]
