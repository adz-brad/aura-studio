import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { user as userMenu } from "@/app/data/menus";
import { LuUser } from "react-icons/lu";
import ModeToggle from "../ui/ModeToggle";

const UserMenu = ({ user, close }) => {

    if(user){
        return (
            <div className="w-full flex flex-col p-2 ">
                <div className="flex flex-row items-center pb-2 border-b border-brand-500 mb-3">
                    <LuUser className="text-xl text-brand-500"/>
                    <span className=" font-semibold text-lg mx-4">{user.name}</span>
                    <ModeToggle />
                </div>
                
                {userMenu.map((item) => {
                    return (
                        <Link 
                            key={item.title}
                            href={item.slug}
                            onClick={close}
                            className="hover:text-brand-500 duration-200 transition-colors py-1"
                        >
                            {item.title}
                        </Link>
                    )
                })}
                <button
                    onClick={() => signOut({callbackUrl: '/'})}
                    className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full mt-3"
                >
                    <span>Logout</span>
                </button>
            </div>
        )
    } else {
        return (
        <button
          onClick={() => signIn()}
          className="font-medium text-base-950 dark:text-base-50 hover:text-base-50 border px-4 py-2 hover:bg-brand-600 hover:border-brand-600 transition-all duration-200 w-full"
        >
          <span>Login</span>
        </button>
        )
    }
}
export default UserMenu