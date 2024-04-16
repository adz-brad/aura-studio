'use client'

import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link"
import { IoPerson, IoApps } from "react-icons/io5";
import { nav, social } from "@/app/data/menus";
import UserMenu from "./UserMenu";
import { GiPerpendicularRings } from "react-icons/gi";

const MainNavbar = ({ user }) => {

  const [ menu, setMenu ] = useState(false)
  const [ userMenu, setUserMenu ] = useState(false)

  const userRef = useRef(null)
  const menuRef = useRef(null)

  const handleClickOutsideUserMenu = () => {
    userMenu ? setUserMenu(false) : null
  }

  const handleClickOutsideMenu = () => {
    menu ? setMenu(false) : null
  }

  useOnClickOutside(userRef, handleClickOutsideUserMenu)
  useOnClickOutside(menuRef, handleClickOutsideMenu)

  return (
    <nav className="absolute top-0 left-0 w-full h-[80px] p-2 rounded-lg">
      <div className="flex flex-row items-center h-full px-3 py-2">

        <Link 
          title="aura | creative cloud."
          href="/"
          className="flex flex-row items-center space-x-2 h-full group"
          >
         <GiPerpendicularRings className="text-brand-500 group-hover:brightness-125 text-4xl" />
         <div className="flex flex-col">
            <span
              className="font-brand text-2xl font-bold leading-none tracking-wide"
            >
              aura
            </span>
            <span
              className="font-brand text-sm leading-none"
            >
              creative cloud
            </span>
          </div>
        </Link>

        <div className="relative flex flex-row items-center space-x-2 h-full ml-auto leading-none">

          <div
            className="relative z-40"
            ref={userRef}
          >
            <button
              title="Toggle User Menu"
              onClick={() => setUserMenu(!userMenu)}
              className="group"
            >
            {user ?
                user.image ?
                  <img 
                    src={user.image} 
                    className="h-8 w-8 shadow-md rounded-full mr-1 border-2 border-base-50 hover:border-brand-500 transition-colors duration-200"
                  />
                :
                  <div className="flex flex-col items-center justify-center h-8 w-8 shadow-md rounded-full mr-1 border-2 border-base-50 hover:border-brand-500 transition-colors duration-200">
                    {user.name.charAt(0)}
                  </div>
            :
              <IoPerson 
                className={`text-3xl scale-90 ${userMenu ? 'scale-100 group-hover:text-base-950 dark:group-hover:text-base-50 text-brand-500' : 'group-hover:scale-100 group-hover:text-brand-500'} transition-all`}
              />
            }
            </button>
            <div 
              className={`fixed top-[82px] ${userMenu ? 'right-3' : '-right-[300px]'} w-[300px] bg-base-50 dark:bg-base-950 transition-all duration-300 rounded-lg shadow-lg p-2 z-40`}
            >
              <UserMenu user={user} close={() => setUserMenu(false)}/>
            </div>
          </div>

          <div
            className="relative z-50"
            ref={menuRef}
          >
            <button
              title="Toggle Menu"
              onClick={() => setMenu(!menu)}
              className="group"
            >
              <IoApps 
                className={`text-3xl ${menu ? 'scale-105 group-hover:text-base-950 dark:group-hover:text-base-50 text-brand-500' : 'group-hover:scale-105 group-hover:text-brand-500'} transition-all`}
              />
            </button>
            <div 
              className={`fixed bottom-0 ${menu ? 'right-0' : '-right-[300px]'} h-[calc(100vh-68px)] w-[300px] px-3 py-4 transition-all duration-300 flex flex-col`}
            >
              <div 
                className="flex flex-col p-2 bg-base-50 dark:bg-base-950 shadow-lg rounded-lg h-full z-50"
              >
                <ul 
                  title="Menu Links"
                  className="grow"
                >
                {nav.map((category) => {
                  return (
                    <li 
                      title={category.title}
                      key={category.title}
                      className="p-2"
                    >
                      <Link className="flex flex-row items-center space-x-3 p-2 " href={category.slug} onClick={() => setMenu(false)}>
                        <category.icon className="text-2xl text-brand-500 drop-shadow-xl"/>
                        <span className="text-lg font-brand font-medium leading-none duration-300">
                          {category.title}
                        </span>
                      </Link>
                      <ul
                        className="flex flex-col space-y-1 text-base font-light p-2"
                      >
                          {category.links.map((link) => {
                            return (
                              <li 
                                key={link.title}
                              >
                                <Link 
                                  title={link.title}
                                  href={link.slug}
                                  className="flex hover:text-brand-500 hover:font-medium duration-200"
                                  onClick={() => setMenu(false)}
                                >
                                  {link.title}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                    </li>
                  )
                })}
                </ul>
                <ul 
                  title="Social Links"
                  className="flex flex-row items-center space-x-2 p-2"
                >
                  {social.map((link) => {
                    return (
                      <li
                        key={link.title}
                        title={link.title}
                      >
                        <a 
                          href={link.link}
                          referrerPolicy="no-referrer"
                          target="_blank"
                          className="hover:text-brand-500 duration-200"
                        >
                          <link.icon className="text-2xl"/>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default MainNavbar