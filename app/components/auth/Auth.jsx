'use client'

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";

const Auth = () => {

  const handleLogin = async (provider) => {
      await signIn(provider, { callbackUrl: '/studio', redirect: false })
  }

  return (
<div 
        className="fixed flex flex-col p-8 w-full max-w-[500px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  bg-base-50 dark:bg-base-900 transition-all duration-300 shadow-lg rounded-xl z-50">
                <div className="h-[60px] flex flex-row items-center">
                <Link 
                  title="Adrenalize | User Portal"
                  href="/"
                  className="flex flex-row items-center space-x-2 h-full group w-f"
                  >
                  <div 
                    className="relative h-full w-[80px]"
                  >
                    <Image 
                      src="/ad-logo.png" 
                      alt="White Adrenalize AD Logo"
                      priority
                      fill
                      sizes="(max-width:1920px) 80px"
                      className="object-cover group-hover:scale-100 transition-all duration-300 scale-90"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-brand text-xl font-bold leading-none text-brand-500"
                    >
                      Adrenalize
                    </span>
                    <span
                      className="text-xs font-medium"
                    >
                      User Portal
                    </span>
                  </div>
                </Link>
                </div>
                
                <div className="flex flex-col grow px-2 py-8 space-y-3 justify-center">
                
                    <button
                      onClick={() => handleLogin('google')}
                      className="font-medium text-base-950 dark:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 flex flex-row items-center justify-center"
                    >
                      <FcGoogle className="text-xl mr-4" />
                      Login With Google
                    </button>
                    <button
                      onClick={() => handleLogin('github')}
                      className="font-medium text-base-950 dark:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 flex flex-row items-center justify-center"
                    >
                      <IoLogoGithub className="text-xl text-[#FFFFFF] mr-4" />
                      Login With GitHub
                    </button>
                    <button
                      onClick={() => handleLogin('facebook')}
                      className="font-medium text-base-950 dark:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 flex flex-row items-center justify-center"
                    >
                      <FaFacebook className="text-xl mr-4 text-[#4267B2]" />
                      Login With Facebook
                    </button>

                  </div>
            </div>
  )
}
export default Auth