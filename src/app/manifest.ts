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
        src: '/icon?size=192x192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon?size=512x512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/icon?size=512x512',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  }
}
