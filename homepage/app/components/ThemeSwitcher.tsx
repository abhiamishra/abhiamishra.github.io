'use client';

import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

import React from 'react'
import Switch from "./Switch";

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // If not mounted yet, return empty div to prevent hydration mismatch
    if (!mounted) {
        return <div className="w-11 h-6"></div>;
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <>
        <Switch 
            toggle={theme}
            onClick={toggleTheme}
            onColor="#AD8301"
        />
        </>
    );
}

export default ThemeSwitcher