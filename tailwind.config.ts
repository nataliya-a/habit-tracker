import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {extend:{

    fontFamily: {
       'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
    }
  }},
  
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#ffdf00",
        
"secondary": "#ff8533",
        
"accent": "#6729ff",
        
"neutral": "#1b1d21",
        
"base-100": "#f8f8f8",
        
"info": "#38bdf8",
        
"success": "#22c55e",
        
"warning": "#fb7185",
        
"error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config

