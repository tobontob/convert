/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-blue-50',
    'bg-purple-50',
    'bg-green-50',
    'bg-orange-50',
    'bg-pink-50',
    'bg-cyan-50',
    'bg-yellow-50',
    'text-blue-600',
    'text-purple-600',
    'text-green-600',
    'text-orange-600',
    'text-pink-600',
    'text-cyan-600',
    'text-yellow-600',
    'hover:text-blue-600',
    'hover:text-purple-600',
    'hover:text-green-600',
    'hover:text-orange-600',
    'hover:text-pink-600',
    'hover:text-cyan-600',
    'hover:text-yellow-600',
    'hover:bg-blue-50',
    'hover:bg-purple-50',
    'hover:bg-green-50',
    'hover:bg-orange-50',
    'hover:bg-pink-50',
    'hover:bg-cyan-50',
    'hover:bg-yellow-50',
  ],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 