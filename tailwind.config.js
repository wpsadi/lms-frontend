import tailwindcssAnimate from "tailwindcss-animate";
import daisyui from "daisyui";
import flowbitePlugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */

export const darkMode = ["class"];

export const content = [
  './src/**/*.{js,jsx}',
];
export const prefix = "";
export const theme = {
  extend: {
    safelist: ['keep-default'],
  },
  plugins: [tailwindcssAnimate, flowbitePlugin, daisyui]
};
