import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    //npm run dev has to be restarted for config changes to take effect
    //themes: ["light", "dark", "synthwave", "acid", "lemonade", "sunset"],
    themes: ["acid", "dracula", "sunset", "synthwave", "lemonade"],  
    darkTheme: "dracula",
  }
}

