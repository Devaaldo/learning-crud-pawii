import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata = {
  title: 'Travelopedia',
  description: 'Travel Place Encyclopedia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
