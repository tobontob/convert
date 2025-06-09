import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://www.imagetools.co.kr/sitemap.xml
RSS: https://www.imagetools.co.kr/rss.xml
`
  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 