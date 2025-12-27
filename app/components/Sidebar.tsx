"use client";
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher';
import Link from 'next/link';


const Sidebar = () => {
  return (
    // used for sidebars or complementary content
    <>
    <aside className="w-64 h-screen bg-gray-1000 p-9 flex flex-col justify-between">
    {/* <aside className="w-64 h-screen bg-gray-1000 p-3"> */}
        <div className="space-y-5">
            <ul className="mt-2 space-y-1 list-none">
            {['/home', '/about', '/resume', '/blog', '/library'].map((item) => (
                <li
                key={item}
                className="text-3xl text-gray-1000 px-2 py-1 rounded-md cursor-pointer transition-transform duration-200 ease-out hover:scale-125 hover:-translate-y-1 hover"
                >
                  <Link href={item !== "/home" ? item : "/"}>
                    {item.slice(1)}
                  </Link>
                </li>
            ))}
            </ul>
        </div>
        <br></br>
        <div className="pt-10 border-t border-gray-200 dark:border-zinc-800">
             <ThemeSwitcher />
        </div>
    </aside>
    </>
  )
}

export default Sidebar