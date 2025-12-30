import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata = {
  title: 'RoxReady - Hyrox Training Planner',
  description: '20-week training plan for Hyrox May 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-white min-h-screen pb-20">
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
