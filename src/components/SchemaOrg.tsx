import Script from 'next/script'

export default function SchemaOrg() {
  return (
    <Script id="schema-org" type="application/ld+json">
      {JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Image Tools',
        'applicationCategory': 'MultimediaApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'description': '웹에서 바로 사용하는 무료 이미지 편집 도구. 회전, 자르기, 크기 조정, 형식 변환, 워터마크 추가, 용량 줄이기 등 다양한 기능을 한 곳에서!',
        'url': 'https://www.imagetools.co.kr',
        'image': 'https://www.imagetools.co.kr/og-image.png',
        'screenshot': 'https://www.imagetools.co.kr/og-image.png',
        'featureList': [
          '이미지 회전',
          '이미지 자르기',
          '이미지 크기 조정',
          '이미지 형식 변환',
          '워터마크 추가',
          '이미지 압축'
        ]
      })}
    </Script>
  )
} 