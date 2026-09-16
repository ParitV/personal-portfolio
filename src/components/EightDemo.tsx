import { useState } from 'react'

type Severity = 'High' | 'Medium' | 'Low'

type Finding = {
  severity: Severity
  title: string
  location: string
}

type CodeLine = { text: string; flag?: boolean }

type InputExample = {
  tab: string
  header: string
  lines: CodeLine[]
}

type LogEntry =
  | { kind: 'run' | 'ok' | 'alert' | 'finding'; text: string }
  | { kind: 'blank' }

const sastExamples: InputExample[] = [
  {
    tab: 'search.js',
    header: 'search.js',
    lines: [
      { text: "app.get('/search', (req, res) => {" },
      { text: '  const query = req.query.q;', flag: true },
      { text: "  db.raw(`SELECT * FROM items WHERE name = '${query}'`);", flag: true },
      { text: '  res.send(results);' },
      { text: '});' },
    ],
  },
  {
    tab: 'xss.js',
    header: 'xss.js',
    lines: [
      { text: "app.get('/render', (req, res) => {" },
      { text: '  const name = req.query.name;', flag: true },
      { text: '  res.send(`<h1>Hello ${name}</h1>`);', flag: true },
      { text: '});' },
    ],
  },
  {
    tab: 'config.js',
    header: 'config.js',
    lines: [
      { text: 'module.exports = {' },
      { text: '  apiKey: "sk_live_4f9a2b7c1e0d...",', flag: true },
      { text: '  timeout: 5000' },
      { text: '};' },
    ],
  },
  {
    tab: 'utils.js',
    header: 'utils.js',
    lines: [
      { text: 'function formatDate(date) {' },
      { text: "  return new Intl.DateTimeFormat('en-AU').format(date);" },
      { text: '}' },
      { text: '' },
      { text: 'module.exports = { formatDate };' },
    ],
  },
]

const sastLog: LogEntry[] = [
  { kind: 'run', text: 'Running CodeQL...' },
  { kind: 'ok', text: 'CodeQL scan complete' },
  { kind: 'run', text: 'Running Semgrep...' },
  { kind: 'ok', text: 'Semgrep scan complete' },
  { kind: 'alert', text: '3 high severity issues found' },
  { kind: 'blank' },
  { kind: 'finding', text: '[High] SQL Injection (search.js:4)' },
  { kind: 'finding', text: '[High] Cross-Site Scripting (xss.js:12)' },
  { kind: 'finding', text: '[Medium] Hardcoded Secret (config.js:8)' },
  { kind: 'blank' },
  { kind: 'alert', text: 'Build failed.' },
]

const sastFindings: Finding[] = [
  { severity: 'High', title: 'SQL Injection', location: 'search.js:4' },
  { severity: 'High', title: 'Cross-Site Scripting', location: 'xss.js:12' },
  { severity: 'Medium', title: 'Hardcoded Secret', location: 'config.js:8' },
]

const dastExamples: InputExample[] = [
  {
    tab: 'SQL Injection',
    header: "GET /search?q=' OR '1'='1 --",
    lines: [
      { text: "GET /search?q=' OR '1'='1 -- HTTP/1.1" },
      { text: 'Host: target-app.local' },
      { text: 'User-Agent: ZAP/2.15.0' },
    ],
  },
  {
    tab: 'Reflected XSS',
    header: 'GET /render?name=<script>alert(1)</script>',
    lines: [
      { text: 'GET /render?name=<script>alert(1)</script> HTTP/1.1' },
      { text: 'Host: target-app.local' },
      { text: 'User-Agent: ZAP/2.15.0' },
    ],
  },
  {
    tab: 'Missing Headers',
    header: 'GET /',
    lines: [
      { text: 'GET / HTTP/1.1' },
      { text: 'Host: target-app.local' },
      { text: 'User-Agent: ZAP/2.15.0' },
    ],
  },
  {
    tab: 'Health Check',
    header: 'GET /health',
    lines: [
      { text: 'GET /health HTTP/1.1' },
      { text: 'Host: target-app.local' },
      { text: 'User-Agent: ZAP/2.15.0' },
    ],
  },
]

const dastLog: LogEntry[] = [
  { kind: 'run', text: 'Spidering target...' },
  { kind: 'ok', text: 'Spider complete — 4 URLs found' },
  { kind: 'run', text: 'Running passive scan...' },
  { kind: 'ok', text: 'Passive scan complete' },
  { kind: 'run', text: 'Running active scan (baseline)...' },
  { kind: 'ok', text: 'Active scan complete' },
  { kind: 'alert', text: '3 issues found' },
  { kind: 'blank' },
  { kind: 'finding', text: '[High] SQL Injection (/search)' },
  { kind: 'finding', text: '[High] Reflected XSS (/render)' },
  { kind: 'finding', text: '[Low] Missing Security Headers (site-wide)' },
  { kind: 'blank' },
  { kind: 'alert', text: 'Build failed.' },
]

const dastFindings: Finding[] = [
  { severity: 'High', title: 'SQL Injection', location: '/search' },
  { severity: 'High', title: 'Reflected XSS', location: '/render' },
  { severity: 'Low', title: 'Missing Security Headers', location: 'site-wide' },
]

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function severityClasses(severity: Severity) {
  if (severity === 'High') return 'bg-alert/10 text-alert'
  if (severity === 'Medium') return 'bg-wood-dark/10 text-wood-dark'
  return 'bg-sage/10 text-sage'
}

function LogLine({ entry }: { entry: LogEntry }) {
  if (entry.kind === 'blank') return <div className="h-3" />
  const prefix =
    entry.kind === 'run' ? '▶ ' : entry.kind === 'ok' ? '✓ ' : entry.kind === 'alert' ? '✗ ' : ''
  const color =
    entry.kind === 'ok'
      ? 'text-[#9FB08A]'
      : entry.kind === 'alert'
        ? 'text-[#E1997F] font-medium'
        : entry.kind === 'finding'
          ? 'text-[#EFE7D8]'
          : 'text-[#D8B26E]'
  return (
    <div className={color}>
      {prefix}
      {entry.text}
    </div>
  )
}

function EightDemo() {
  const [mainTab, setMainTab] = useState<'sast' | 'dast'>('sast')
  const [exampleIndex, setExampleIndex] = useState(0)
  const [outputTab, setOutputTab] = useState<'log' | 'findings'>('log')
  const [running, setRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  const examples = mainTab === 'sast' ? sastExamples : dastExamples
  const logScript = mainTab === 'sast' ? sastLog : dastLog
  const findings = mainTab === 'sast' ? sastFindings : dastFindings
  const active = examples[exampleIndex]

  function switchMainTab(tab: 'sast' | 'dast') {
    if (running) return
    setMainTab(tab)
    setExampleIndex(0)
    setOutputTab('log')
    setHasRun(false)
    setVisibleLines(0)
  }

  function switchExample(index: number) {
    if (running) return
    setExampleIndex(index)
  }

  async function run() {
    if (running) return
    setRunning(true)
    setHasRun(false)
    setOutputTab('log')
    setVisibleLines(0)
    for (let i = 0; i < logScript.length; i++) {
      await sleep(350)
      setVisibleLines((n) => n + 1)
    }
    await sleep(200)
    setRunning(false)
    setHasRun(true)
  }

  return (
    <div>
      <div className="flex gap-8 border-b border-stone text-sm">
        <button
          type="button"
          onClick={() => switchMainTab('sast')}
          className={
            mainTab === 'sast'
              ? 'border-b-2 border-sage pb-3 text-ink'
              : 'pb-3 text-wood transition-colors hover:text-ink'
          }
        >
          SAST — CodeQL &amp; Semgrep
        </button>
        <button
          type="button"
          onClick={() => switchMainTab('dast')}
          className={
            mainTab === 'dast'
              ? 'border-b-2 border-sage pb-3 text-ink'
              : 'pb-3 text-wood transition-colors hover:text-ink'
          }
        >
          DAST — OWASP ZAP
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-1 border-b border-stone/60 text-xs">
        {examples.map((example, i) => (
          <button
            key={example.tab}
            type="button"
            onClick={() => switchExample(i)}
            className={
              i === exampleIndex
                ? 'border-b-2 border-wood-dark px-3 py-2 text-ink'
                : 'px-3 py-2 text-wood transition-colors hover:text-ink'
            }
          >
            {example.tab}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="border border-stone">
          <div className="flex items-center gap-2 border-b border-stone px-4 py-3 font-mono text-xs text-wood">
            <span>📄</span>
            <span>{active.header}</span>
          </div>
          <div className="h-72 overflow-y-auto bg-[#2A2118] p-4 font-mono text-xs leading-6 text-[#EFE7D8]">
            {active.lines.map((line, i) => (
              <div
                key={i}
                className={
                  line.flag
                    ? '-mx-4 border-l-2 border-alert bg-alert/20 px-4'
                    : undefined
                }
              >
                {line.text || ' '}
              </div>
            ))}
          </div>
          <div className="p-4">
            <button
              type="button"
              onClick={run}
              disabled={running}
              className="w-full bg-sage px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-sage/80 disabled:opacity-60"
            >
              {running
                ? 'Running…'
                : mainTab === 'sast'
                  ? 'Run static analysis'
                  : 'Run baseline scan'}
            </button>
          </div>
        </div>

        <div className="border border-stone">
          <div className="flex border-b border-stone text-sm">
            <button
              type="button"
              onClick={() => setOutputTab('log')}
              className={
                outputTab === 'log'
                  ? 'border-b-2 border-sage px-4 py-3 text-ink'
                  : 'px-4 py-3 text-wood transition-colors hover:text-ink'
              }
            >
              Output
            </button>
            <button
              type="button"
              onClick={() => setOutputTab('findings')}
              className={
                outputTab === 'findings'
                  ? 'border-b-2 border-sage px-4 py-3 text-ink'
                  : 'px-4 py-3 text-wood transition-colors hover:text-ink'
              }
            >
              Security Findings ({findings.length})
            </button>
          </div>

          <div className="h-[336px] overflow-y-auto">
            {outputTab === 'log' ? (
              <div className="h-full bg-[#2A2118] p-4 font-mono text-xs leading-6">
                {visibleLines === 0 && !running ? (
                  <span className="text-[#9C8F7A]">Waiting to start…</span>
                ) : (
                  logScript
                    .slice(0, visibleLines)
                    .map((entry, i) => <LogLine key={i} entry={entry} />)
                )}
              </div>
            ) : (
              <div className="p-4">
                {!hasRun ? (
                  <p className="text-sm text-wood">
                    Run the {mainTab === 'sast' ? 'static analysis' : 'baseline scan'} to see
                    the findings report.
                  </p>
                ) : (
                  findings.map((finding) => (
                    <div
                      key={finding.title + finding.location}
                      className="flex items-center justify-between gap-4 border-b border-stone/60 py-3 last:border-0"
                    >
                      <div>
                        <p className="text-ink">{finding.title}</p>
                        <p className="font-mono text-xs text-wood">{finding.location}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${severityClasses(finding.severity)}`}
                      >
                        {finding.severity}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EightDemo
