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
}

type DastExample = {
  tab: string
  method: string
  path: string
  baselineLabel: string
  attackLabel: string
  flagged: boolean
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
    flagged: true,
  },
  {
    tab: 'CORS Misconfig',
    method: 'GET',
    path: '/api/profile',
    baselineLabel: '200 OK — no CORS headers (same-origin)',
    attackLabel: 'Access-Control-Allow-Origin: evil.example',
    flagged: true,
  },
  {
    tab: 'Missing Headers',
    method: 'GET',
    path: '/',
    baselineLabel: '200 OK — response received',
    attackLabel: 'No CSP, no X-Frame-Options',
    flagged: true,
  },
  {
    tab: 'Auth Check',
    method: 'GET',
    path: '/api/settings',
    baselineLabel: '401 Unauthorized — no token',
    attackLabel: '401 Unauthorized — bypass rejected',
    flagged: false,
  },
]

const dastLog: LogEntry[] = [
  { kind: 'run', text: 'Spidering target...' },
  { kind: 'ok', text: 'Spider complete — 4 endpoints found' },
  { kind: 'run', text: 'Running passive scan...' },
  { kind: 'ok', text: 'Passive scan complete' },
  { kind: 'run', text: 'Running active scan (baseline)...' },
  { kind: 'ok', text: 'Active scan complete' },
  { kind: 'alert', text: '3 issues found' },
  { kind: 'blank' },
  { kind: 'finding', text: '[High] Broken Access Control (IDOR) (/api/orders)' },
  { kind: 'finding', text: '[Medium] CORS Misconfiguration (/api/profile)' },
  { kind: 'finding', text: '[Low] Missing Security Headers (site-wide)' },
  { kind: 'blank' },
  { kind: 'alert', text: 'Build failed.' },
]

const dastFindings: Finding[] = [
  { severity: 'High', title: 'Broken Access Control (IDOR)', location: '/api/orders' },
  { severity: 'Medium', title: 'CORS Misconfiguration', location: '/api/profile' },
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

  // DAST attack-path animation state
  const [attackStep, setAttackStep] = useState(-1)
  const [testedSteps, setTestedSteps] = useState<number[]>([])
  const [pillLabel, setPillLabel] = useState('')
  const [pillSide, setPillSide] = useState<'out' | 'back'>('out')
  const [pillVisible, setPillVisible] = useState(false)

  const logScript = mainTab === 'sast' ? sastLog : dastLog
  const findings = mainTab === 'sast' ? sastFindings : dastFindings
  const activeSast = sastExamples[exampleIndex]

  function switchMainTab(tab: 'sast' | 'dast') {
    if (running) return
    setMainTab(tab)
    setExampleIndex(0)
    setOutputTab('log')
    setHasRun(false)
    setVisibleLines(0)
    setAttackStep(-1)
    setTestedSteps([])
    setPillVisible(false)
  }

  function switchExample(index: number) {
    if (running) return
    setExampleIndex(index)
  }

  async function runSast() {
    if (running) return
    setRunning(true)
    setHasRun(false)
    setOutputTab('log')
    setVisibleLines(0)
    for (let i = 0; i < sastLog.length; i++) {
      await sleep(350)
      setVisibleLines((n) => n + 1)
    }
    await sleep(200)
    setRunning(false)
    setHasRun(true)
  }

  async function sendPill(label: string, side: 'out' | 'back') {
    setPillLabel(label)
    setPillSide(side)
    setPillVisible(true)
    await sleep(450)
    setPillVisible(false)
    await sleep(150)
  }

  async function runDast() {
    if (running) return
    setRunning(true)
    setHasRun(false)
    setOutputTab('log')
    setVisibleLines(0)
    setTestedSteps([])

    for (let i = 0; i < dastExamples.length; i++) {
      setAttackStep(i)
      await sendPill(dastExamples[i].method, 'out')
      await sendPill('resp', 'back')
      setTestedSteps((steps) => [...steps, i])
      await sleep(150)
    }
    setAttackStep(-1)

    for (let i = 0; i < dastLog.length; i++) {
      await sleep(300)
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
                <span>{activeSast.header}</span>
              </div>
              <div className="h-72 overflow-y-auto bg-[#2A2118] p-4 font-mono text-xs leading-6 text-[#EFE7D8]">
                {activeSast.lines.map((line, i) => (
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
                      attackStep >= 0 ? 'border-sage' : 'border-[#4A3F30]'
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
                      attackStep >= 0 ? 'border-sage' : 'border-[#4A3F30]'
                    }`}
                  >
                    <p className="font-serif text-sm text-[#EFE7D8]">target-app</p>
                    <p className="text-[10px] text-[#9C8F7A]">Running container</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5 font-mono text-[11px]">
                  {dastExamples.map((ex, i) => {
                    const isActive = attackStep === i
                    const isSelected = i === exampleIndex
                    const tested = testedSteps.includes(i)
                    return (
                      <div
                        key={ex.tab}
                        className={`flex items-center justify-between gap-2 ${
                          isActive
                            ? 'text-[#D8B26E]'
                            : isSelected
                              ? 'text-[#EFE7D8]'
                              : 'text-[#9C8F7A]'
                        }`}
                      >
                        <span>
                          {ex.method} {ex.path}
                        </span>
                        {tested && (
                          <span className={ex.flagged ? 'text-[#E1997F]' : 'text-[#9FB08A]'}>
                            {ex.flagged ? '⚠' : '✓'}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {(() => {
                  const detail = dastExamples[attackStep >= 0 ? attackStep : exampleIndex]
                  return (
                    <div className="mt-6 border-t border-[#4A3F30] pt-3 font-mono text-[11px]">
                      <p className="text-[#9C8F7A]">
                        {detail.method} {detail.path}
                      </p>
                      <p className="mt-1 text-[#EFE7D8]">baseline: {detail.baselineLabel}</p>
                      <p className={detail.flagged ? 'text-[#E1997F]' : 'text-[#9FB08A]'}>
                        attack: {detail.attackLabel}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </>
          )}
          <div className="p-4">
            <button
              type="button"
              onClick={mainTab === 'sast' ? runSast : runDast}
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
              Security Findings{hasRun ? ` (${findings.length})` : ''}
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
