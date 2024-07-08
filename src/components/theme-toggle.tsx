'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function ThemeToggle() {
  const { setTheme, themes, resolvedTheme } = useTheme()

  const switchTheme = () => {
    if (resolvedTheme == undefined) {
      setTheme('system')
      return;
    }
    if (resolvedTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <button onClick={switchTheme} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9'>
      <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white' />
    </button>
  )
}