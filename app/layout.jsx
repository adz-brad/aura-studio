import ClientProvider from './components/auth/ClientProvider'
import FirebaseAuthProvider from './components/auth/FirebaseAuthProvider'

export default function RootLayout({ children }) {

  return (
      <ClientProvider>
          <FirebaseAuthProvider>
            {children}
          </FirebaseAuthProvider>
      </ClientProvider>
  )
}
