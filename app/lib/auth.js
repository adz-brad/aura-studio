import GoogleProvider from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import FacebookProvider  from 'next-auth/providers/facebook'
import { FirestoreAdapter } from '@auth/firebase-adapter'
import { adminAuth, adminDb } from './firebase-admin'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

// Add in error handling for case where user attempts to login with other provider that uses same email
// ex. The email for your account is already associated with another provider. Please sign in with your approved provider.

const getUser = async (id) => {
    'use server'
    const snap = await getDoc(doc(db,"users",id))
    return {id: id, ...snap?.data()}
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
    ],
    adapter: FirestoreAdapter(adminDb),
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        session: async ({ session, token }) => {
            if(session?.user) {
                if(token.sub) {
                    session.user.id = token.sub
                    const firebaseToken = await adminAuth.createCustomToken(token.sub)
                    session.user = await getUser(token.sub)
                    session.firebaseToken = firebaseToken
                }
            }
            return session
        },
        jwt: async ({ user, token }) => {
            if(user) {
                token.sub = user.id
            }
            return token;
        },
        signIn: async (res) => {
            return res
         }
    },
    pages: {
        signIn: '/auth',
        signOut: '/',
    }
}
