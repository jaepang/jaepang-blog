import './styles/global.css'
import ThemeRootProvider from './provider/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>jaepang-blog</title>
      </head>
      <body>
        <ThemeRootProvider>{children}</ThemeRootProvider>
      </body>
    </html>
  )
}
