import { Inter } from 'next/font/google'
import './globals.css'
import '@/style/main.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DeCrypto',
  description: 'De Crypt the Cryto stats',
}

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>{children}</body>
    </html>
  )
}
