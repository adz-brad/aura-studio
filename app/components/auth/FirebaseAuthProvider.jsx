'use client'

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { signInWithCustomToken } from "firebase/auth"
import { auth } from "@/app/lib/firebase"

async function syncFirebaseAuth(session) {
    if(session && session.firebaseToken){
        try {
            await signInWithCustomToken(auth, session.firebaseToken)
        } catch (err) {
            console.error('Error Signing In With Custom Token', err)
        }
    } else {
        auth.signOut()
    }
}

const FirebaseAuthProvider = ({children}) => {

    const { data: session } = useSession()

    useEffect(() => {
        if(!session) return;
        syncFirebaseAuth(session)
    }, [ session ])

  return (
    <>{children}</>
  )
}
export default FirebaseAuthProvider