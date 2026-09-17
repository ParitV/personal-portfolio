import { useState } from 'react'

type Severity = 'High' | 'Medium' | 'Low'

type Finding = {
  severity: Severity
  title: string
  location: string
}

type CodeLine = { text: string; flag?: boolean }

type SastExample = {
  tab: string
  header: string
  lines: CodeLine[]
  finding: Finding | null
}

type DastExample = {
  tab: string
  method: string
  path: string
  baselineLabel: string
  attackLabel: string
  finding: Finding | null
}

type LogEntry =
  | { kind: 'run' | 'ok' | 'alert' | 'finding'; text: string }
  | { kind: 'blank' }

const sastExamples: SastExample[] = [
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
    finding: { severity: 'High', title: 'SQL Injection', location: 'search.js:4' },
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
    finding: { severity: 'High', title: 'Cross-Site Scripting', location: 'xss.js:12' },
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
    finding: { severity: 'Medium', title: 'Hardcoded Secret', location: 'config.js:8' },
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
    finding: null,
  },
]

// Deliberately distinct from the SAST examples above — these are the kind of
// runtime-only issues source-code scanning can't see: broken access control
// across requests, live response headers, and error-handling behaviour.
const dastExamples: DastExample[] = [
  {
    tab: 'IDOR',
    method: 'GET',
    path: '/api/orders/1002',
    baselineLabel: '200 OK — order #1001 (your own)',
    attackLabel: '200 OK — order #1003 (not yours)',
    finding: { severity: 'High', title: 'Broken Access Control (IDOR)', location: '/api/orders' },
  },
  {
    tab: 'CORS Misconfig',
    method: 'GET',
    path: '/api/profile',
    baselineLabel: '200 OK — no CORS headers (same-origin)',
    attackLabel: 'Access-Control-Allow-Origin: evil.example',
    finding: { severity: 'Medium', title: 'CORS Misconfiguration', location: '/api/profile' },
  },
  {
    tab: 'Missing Headers',
    method: 'GET',
    path: '/',
    baselineLabel: '200 OK — response received',
    attackLabel: 'No CSP, no X-Frame-Options',
    finding: { severity: 'Low', title: 'Missing Security Headers', location: 'site-wide' },
  },
  {
    tab: 'Auth Check',
    method: 'GET',
    path: '/api/settings',
    baselineLabel: '401 Unauthorized — no token',
    attackLabel: '401 Unauthorized — bypass rejected',
    finding: null,
  },
]

function buildLog(mainTab: 'sast' | 'dast', finding: Finding | null): LogEntry[] {
  const steps: LogEntry[] =
    mainTab === 'sast'
      ? [
          { kind: 'run', text: 'Running CodeQL...' },
          { kind: 'ok', text: 'CodeQL scan complete' },
          { kind: 'run', text: 'Running Semgrep...' },
          { kind: 'ok', text: 'Semgrep scan complete' },
        ]
      : [
          { kind: 'run', text: 'Spidering target...' },
          { kind: 'ok', text: 'Spider complete — 1 endpoint found' },
          { kind: 'run', text: 'Running passive scan...' },
          { kind: 'ok', text: 'Passive scan complete' },
          { kind: 'run', text: 'Running active scan (baseline)...' },
          { kind: 'ok', text: 'Active scan complete' },
        ]

  if (!finding) {
    return [...steps, { kind: 'ok', text: 'No issues found' }, { kind: 'blank' }, { kind: 'ok', text: 'Build passed.' }]
  }

  return [
    ...steps,
    { kind: 'alert', text: `1 ${finding.severity.toLowerCase()} severity issue found` },
    { kind: 'blank' },
    { kind: 'finding', text: `[${finding.severity}] ${finding.title} (${finding.location})` },
    { kind: 'blank' },
    { kind: 'alert', text: 'Build failed.' },
  ]
}

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

  // DAST attack-path animation state
  const [attacking, setAttacking] = useState(false)
  const [pillLabel, setPillLabel] = useState('')
  const [pillSide, setPillSide] = useState<'out' | 'back'>('out')
  const [pillVisible, setPillVisible] = useState(false)

  const sastActive = sastExamples[exampleIndex]
  const dastActive = dastExamples[exampleIndex]
  const active = mainTab === 'sast' ? sastActive : dastActive
  const logScript = buildLog(mainTab, active.finding)

  function resetRunState() {
    setOutputTab('log')
    setHasRun(false)
    setVisibleLines(0)
    setAttacking(false)
    setPillVisible(false)
  }

  function switchMainTab(tab: 'sast' | 'dast') {
    if (running) return
    setMainTab(tab)
    setExampleIndex(0)
    resetRunState()
  }

  function switchExample(index: number) {
    if (running) return
    setExampleIndex(index)
    resetRunState()
  }

  async function sendPill(label: string, side: 'out' | 'back') {
    setPillLabel(label)
    setPillSide(side)
    setPillVisible(true)
    await sleep(450)
    setPillVisible(false)
    await sleep(150)
  }

  async function run() {
    if (running) return
    setRunning(true)
    resetRunState()

    if (mainTab === 'dast') {
      setAttacking(true)
      await sendPill(dastActive.method, 'out')
      await sendPill('resp', 'back')
      setAttacking(false)
      await sleep(150)
    }

    for (let i = 0; i < logScript.length; i++) {
      await sleep(mainTab === 'sast' ? 350 : 300)
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
        {(mainTab === 'sast' ? sastExamples : dastExamples).map((example, i) => (
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
          {mainTab === 'sast' ? (
            <>
              <div className="flex items-center gap-2 border-b border-stone px-4 py-3 font-mono text-xs text-wood">
                <span>📄</span>
                <span>{sastActive.header}</span>
              </div>
              <div className="h-72 overflow-y-auto bg-[#2A2118] p-4 font-mono text-xs leading-6 text-[#EFE7D8]">
                {sastActive.lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.flag ? '-mx-4 border-l-2 border-alert bg-alert/20 px-4' : undefined
                    }
                  >
                    {line.text || ' '}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 border-b border-stone px-4 py-3 font-mono text-xs text-wood">
                <span>🛰️</span>
                <span>Attack Path</span>
              </div>
              <div className="h-72 overflow-y-auto bg-[#2A2118] p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-1 rounded-sm border px-3 py-2 text-center transition-colors ${
                      attacking ? 'border-sage' : 'border-[#4A3F30]'
                    }`}
                  >
                    <p className="font-serif text-sm text-[#EFE7D8]">ZAP</p>
                    <p className="text-[10px] text-[#9C8F7A]">No source access</p>
                  </div>
                  <div className="relative h-px flex-1 bg-[#4A3F30]">
                    <span
                      className="absolute top-1/2 -translate-y-1/2 rounded-sm bg-[#D8B26E] px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-[#2A2118] transition-all duration-500 ease-in-out"
                      style={{
                        left: pillSide === 'out' ? '4%' : '78%',
                        opacity: pillVisible ? 1 : 0,
                      }}
                    >
                      {pillLabel}
                    </span>
                  </div>
                  <div
                    className={`flex-1 rounded-sm border px-3 py-2 text-center transition-colors ${
                      attacking ? 'border-sage' : 'border-[#4A3F30]'
                    }`}
                  >
                    <p className="font-serif text-sm text-[#EFE7D8]">target-app</p>
                    <p className="text-[10px] text-[#9C8F7A]">Running container</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 font-mono text-[11px]">
                  {dastExamples.map((ex, i) => {
                    const isSelected = i === exampleIndex
                    const showResult = isSelected && hasRun
                    return (
                      <div
                        key={ex.tab}
                        className={`flex items-center justify-between gap-2 ${
                          isSelected ? 'text-[#EFE7D8]' : 'text-[#9C8F7A]'
                        }`}
                      >
                        <span>
                          {ex.method} {ex.path}
                        </span>
                        {showResult && (
                          <span className={ex.finding ? 'text-[#E1997F]' : 'text-[#9FB08A]'}>
                            {ex.finding ? '⚠' : '✓'}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 border-t border-[#4A3F30] pt-3 font-mono text-[11px]">
                  <p className="text-[#9C8F7A]">
                    {dastActive.method} {dastActive.path}
                  </p>
                  <p className="mt-1 text-[#EFE7D8]">baseline: {dastActive.baselineLabel}</p>
                  <p className={dastActive.finding ? 'text-[#E1997F]' : 'text-[#9FB08A]'}>
                    attack: {dastActive.attackLabel}
                  </p>
                </div>
              </div>
            </>
          )}
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
              Security Findings{hasRun ? ` (${active.finding ? 1 : 0})` : ''}
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
                ) : active.finding ? (
                  <div className="flex items-center justify-between gap-4 py-1">
                    <div>
                      <p className="text-ink">{active.finding.title}</p>
                      <p className="font-mono text-xs text-wood">{active.finding.location}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${severityClasses(active.finding.severity)}`}
                    >
                      {active.finding.severity}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-sage">
                    ✓ No issues detected — this {mainTab === 'sast' ? 'file' : 'endpoint'} is
                    clean.
                  </p>
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
