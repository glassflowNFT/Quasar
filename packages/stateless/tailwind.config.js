/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
const tailwindConfig = {
    content: ['./**/*.{js,jsx,ts,tsx}', '../**/*.{js,jsx,ts,tsx}'],
    presets: [require('@quasar-vote/config/tailwind/config')],
  }
  
  module.exports = tailwindConfig
  