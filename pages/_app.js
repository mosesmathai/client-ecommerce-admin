import '@/styles/globals.css'
import '@/styles/switcher.scss'
import '@/styles/stats.css'
import { ThemeContextProvider } from '@/components/ThemeContext'
import { SessionProvider } from "next-auth/react"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <Component {...pageProps}/>
      </ThemeContextProvider> 
    </SessionProvider>
  )
}
