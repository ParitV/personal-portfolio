export type Project = {
  slug: string
  title: string
  oneLiner: string
  techStack: string[]
  role: string
  date: string
  type: string
  problem: string
  whatIBuilt: string
  impact: string[]
  myRole: string
  keyDecisions: string[]
  repoUrl: string
  demoUrl?: string
  demoEmbedUrl?: string
  docUrl?: string
  coverImage?: string
  architectureImage?: string
}

export const projects: Project[] = [
  {
    slug: 'eight',
    title: 'Eight',
    oneLiner:
      'An automated SAST/DAST security pipeline that scans every pull request and blocks merges on high-severity findings.',
    techStack: ['CodeQL', 'Semgrep', 'OWASP ZAP', 'GitHub Actions'],
    role: 'Design & Development',
    date: 'Jan 2026 – Mar 2026',
    type: 'Personal Project',
    problem:
      'Manual security review does not scale with commit frequency, so vulnerabilities routinely reach production before anyone looks for them. Teams needed a way to catch high-risk issues automatically, in CI, without slowing every PR down with a full audit.',
    whatIBuilt:
      "A GitHub Actions pipeline that runs CodeQL and Semgrep for static analysis and an OWASP ZAP baseline scan for dynamic analysis on every pull request, aggregates the findings by severity, and fails the build when High or Critical issues are found. It's also used to scan its own repository.",
    impact: [
      'Stops high-severity issues before merge',
      'Saves time with automated checks',
      'Easy to adopt for other repositories',
      'Improves overall security visibility',
    ],
    myRole: 'Sole developer — designed, built, and maintained the entire pipeline end-to-end.',
    keyDecisions: [
      'High/Critical findings fail the build, but Medium/Low findings only get reported: a hard gate on every finding would bury real risk in noise and train developers to bypass the check, so only the severities worth blocking a release actually block one.',
      "OWASP ZAP's baseline scan was used instead of a full active scan: baseline scans are passive and fast enough to run on every PR without risking side effects on the target application, where a full active scan is slower and can mutate state — not something to run unsupervised in CI.",
    ],
    repoUrl: 'https://github.com/ParitV/Eight',
  },
]
