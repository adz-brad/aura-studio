import '../styles/globals.css'
import { Inter, Quicksand } from 'next/font/google'
import { ServerThemeProvider } from '@wits/next-themes'

export const metadata = {
  title: 'aura | creative cloud',
}

const inter = Inter({subsets: ['latin'], variable: '--font-inter'})
const quicksand = Quicksand({subsets: ['latin'], variable: '--font-quicksand'})

export default function PortalLayout({ children }) {

  return (
    <ServerThemeProvider
      attribute="class"
      storageKey="webcrm-theme"
      enableColorScheme={false}
    >
      <html lang="en" className={`${inter.variable} ${quicksand.variable}`}>
          <body className='bg-base-50 dark:bg-base-950 text-base-950 dark:text-base-50 font-body'>{children}</body>
      </html>
    </ServerThemeProvider>
  )
}
