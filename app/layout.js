import './globals.css'

export const metadata = {
  title: 'RoxReady - Hyrox Training Planner',
  description: '20-week training plan for Hyrox May 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
