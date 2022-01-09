module.exports = {
  mode: "jit", // jitモードを有効化するための設定
  purge: [
    // ビルドする際に参照するファイルを指定
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/pages/components/*.{js,ts,jsx,tsx}",
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
