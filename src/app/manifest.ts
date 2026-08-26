import { MetadataRoute } from 'next'

export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GanpatiMitra',
    short_name: 'GanpatiMitra',
    description: 'आपल्या मंडळाचा डिजिटल साथीदार',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/screenshot.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  }
}
