export type Project = {
  slug: string
  title: string
  oneLiner: string
  techStack: string[]
  role?: string
  date?: string
  type?: string
  problem?: string
  whatIBuilt?: string
  objective?: string
  whatIDid?: string
  impact: string[]
  myRole: string
  keyDecisions: string[]
  repoUrl: string
  demoUrl?: string
  demoEmbedUrl?: string
  docUrl?: string
  coverImage?: string
  architectureImage?: string
  architectureNote?: string
  keyFinding?: {
    summary: string
    points: string[]
  }
  detectionCards?: {
    mitreId: string
    title: string
    detail: string
  }[]
  skillsDemonstrated?: string[]
}

export const projects: Project[] = [
  {
    slug: 'eight',
    title: 'Eight',
    coverImage: '../../public/image/Eight.jpeg', 
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
  {
    slug: 'soc-siem-lab',
    title: 'Home SOC / SIEM Detection Lab',
    coverImage: '../../public/image/SIEM_Lab.jpeg',
    oneLiner:
      'Built a home lab with Wazuh SIEM and Sysmon, simulated 4 MITRE ATT&CK techniques, and closed a real detection gap in a built-in SIEM rule with custom detection rules I engineered and debugged myself.',
    techStack: ['Wazuh', 'Sysmon', 'MITRE ATT&CK', 'Docker', 'VirtualBox', 'Windows Event Logs'],
    objective:
      "A SIEM's built-in ruleset either fires or it doesn't, and it is easy to trust that silently. The objective of this lab was to simulate real MITRE ATT&CK techniques against live telemetry and verify, rather than assume, that the detections behind them actually work.",
    whatIDid:
      "Built a home SOC lab with Wazuh ingesting Sysmon and Windows event logs from an isolated Windows target and Kali attacker VM. Simulated 4 MITRE ATT&CK techniques and investigated the resulting alerts like an analyst would, which surfaced a real gap: Wazuh's built-in rule for LSASS credential dumping never fired against a real ProcDump attack, because its access-mask allowlist predates current Windows and Sysmon conventions.",
    impact: [
      'Found and closed a real detection gap in a built-in SIEM rule',
      'Validated custom rules against live attack traffic across 4 MITRE ATT&CK techniques',
      'Debugged two independent rule dependency bugs by reading the ruleset directly',
      'Weighed precision versus coverage across two custom detection rules',
    ],
    myRole:
      'Sole builder: designed the lab environment, configured the SIEM and telemetry pipeline, simulated each technique, and investigated, engineered, and validated every detection myself.',
    keyDecisions: [
      'Kept the lab on a fully isolated internal network with no route to the internet or the host network: safely running real attacker tooling (Hydra, ProcDump, encoded PowerShell payloads) requires a target that cannot accidentally reach anything else.',
      'Verified every detection against the raw Sysmon and Windows event data instead of trusting the SIEM dashboard: the built-in credential-dumping rule looked like a working detection until the raw GrantedAccess value proved otherwise, the same gap an analyst would need to catch in production.',
    ],
    architectureNote:
      'Kali (attacker) and a Windows target sit on an isolated internal network with no internet or host access. Both feed Sysmon and Windows event logs to a single-node Wazuh manager running in Docker, which is where every detection in this project was investigated and validated.',
    keyFinding: {
      summary:
        "Wazuh's built-in rule for LSASS credential dumping never fired against a real attack, and closing the gap took reading the rule's own logic against the raw event.",
      points: [
        "Wazuh's built-in rule 92900 for detecting LSASS credential dumping never fired against a real ProcDump attack. Its GrantedAccess allowlist only matches 0x1010 or 0x40, values that predate current Windows and Sysmon conventions. The raw Sysmon Event 10 record for the actual ProcDump-to-LSASS access shows GrantedAccess: 0x1FFFFF, a value entirely outside that allowlist.",
        'Two custom rules were written to close the gap: rule 100004, precisely scoped to ProcDump, and rule 100010, a broader rule that catches any process touching lsass.exe. Neither fired at first, for two independent rule dependency bugs found by reading the actual built-in rule definitions off the manager, then fixed and reloaded.',
        'Both rules were then validated against live attack traffic and fired correctly. Rule 100010 also fired 999 times against completely benign VBoxService.exe activity in testing, a real lesson about precision versus coverage in detection design, and why both rules are worth keeping.',
      ],
    },
    detectionCards: [
      {
        mitreId: 'T1110',
        title: 'Brute Force Login',
        detail:
          "SMB password guessing with Hydra and netexec. Caught by Wazuh's built-in ruleset with no custom rule, Event ID 4625 x5. Evidence includes the NTSTATUS code confirming password guessing rather than username enumeration, and a sub-50-millisecond timing pattern across 5 distinct source ports proving automated tooling.",
      },
      {
        mitreId: 'T1059.001',
        title: 'Encoded PowerShell',
        detail:
          "Base64-encoded download-and-execute command. Wazuh's built-in ruleset does not flag this on its own; caught by a custom rule (100002) tagged to the correct MITRE technique, feeding the ATT&CK dashboard directly.",
      },
      {
        mitreId: 'T1098 / T1136.001',
        title: 'New Local Admin Account',
        detail:
          'Create-then-escalate account manipulation, caught end to end by built-in rules with a severity tier that jumps from level 5 (routine group membership) to level 12 (Administrators group), a genuine finding about how the ruleset weighs privilege escalation.',
      },
      {
        mitreId: 'T1003.001',
        title: 'LSASS Credential Dumping',
        detail:
          "The headline case: Wazuh's built-in rule for LSASS dumping missed a real ProcDump attack. Two custom rules were engineered, debugged, and validated against live attack traffic to close the gap. Full investigation on GitHub.",
      },
    ],
    skillsDemonstrated: [
      'SIEM deployment and tuning',
      'Sysmon configuration',
      'Windows event log analysis',
      'Custom detection rule authoring and debugging (Wazuh rule syntax)',
      'MITRE ATT&CK mapping',
      'Gap analysis on an existing detection ruleset',
      'Evidence-based investigation',
    ],
    repoUrl: 'https://github.com/ParitV/soc-siem-detection-lab',
  },
]
