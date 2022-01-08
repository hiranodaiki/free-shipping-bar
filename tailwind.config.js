module.exports = {
  mode: "jit", // jitモードを有効化するための設定
  purge: [
    // ビルドする際に参照するファイルを指定
    "./theme-app-extension/**/*.liquid",
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/components/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
