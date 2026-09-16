import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} — Parit Vorasaran`
    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', window.location.href)
  }, [title, description])

  return null
}

export default Seo
