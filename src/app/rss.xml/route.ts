import { NextResponse } from 'next/server'

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Image Tools - 무료 온라인 이미지 편집 도구</title>
    <link>https://www.imagetools.co.kr</link>
    <description>웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!</description>
    <language>ko</language>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>이미지 변환 - Image Tools</title>
      <link>https://www.imagetools.co.kr/convert</link>
      <description>다양한 이미지 형식으로 변환할 수 있는 무료 온라인 도구입니다. JPG, PNG, WEBP 등 원하는 형식으로 이미지를 변환하세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>이미지 압축 - Image Tools</title>
      <link>https://www.imagetools.co.kr/compress</link>
      <description>이미지 용량을 줄이고 최적화할 수 있는 무료 온라인 도구입니다. 이미지 품질은 유지하면서 파일 크기를 효과적으로 줄일 수 있습니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>워터마크 추가 - Image Tools</title>
      <link>https://www.imagetools.co.kr/watermark</link>
      <description>이미지에 워터마크를 추가할 수 있는 무료 온라인 도구입니다. 텍스트나 이미지를 워터마크로 추가하여 이미지를 보호하세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>이미지 회전 - Image Tools</title>
      <link>https://www.imagetools.co.kr/rotate</link>
      <description>이미지를 원하는 각도로 회전하고 반전할 수 있는 무료 온라인 도구입니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>이미지 자르기 - Image Tools</title>
      <link>https://www.imagetools.co.kr/crop</link>
      <description>이미지를 원하는 크기와 비율로 자를 수 있는 무료 온라인 도구입니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    <item>
      <title>이미지 크기 조정 - Image Tools</title>
      <link>https://www.imagetools.co.kr/resize</link>
      <description>이미지 크기를 원하는 대로 조정할 수 있는 무료 온라인 도구입니다. 픽셀 단위로 정확하게 크기를 조정하세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 