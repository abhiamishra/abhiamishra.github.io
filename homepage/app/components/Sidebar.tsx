"use client";
import React, { useState } from 'react'
import Switch from './Switch'
import ThemeSwitcher from './ThemeSwitcher';
import Link from 'next/link';

const Sidebar = () => {
  return (
    // used for sidebars or complementary content
    <>
    <aside className="w-40 h-screen bg-gray-1000 p-3">
        <div className="space-y-5">
            <ul className="mt-2 space-y-1 list-none">
            {['home', 'about', 'resume', 'blog', 'library'].map((item) => (
                <li
                key={item}
                className="text-2xl text-gray-1000 px-2 py-1 rounded-md cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-1 hover"
                >
                  <Link href={item !== "home" ? item : "/"}>
                    {item}
                  </Link>
                </li>
            ))}
            </ul>
        </div>
        <br></br>
        <ThemeSwitcher />
    </aside>
    </>
  )
}

export default Sidebar