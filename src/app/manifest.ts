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
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
