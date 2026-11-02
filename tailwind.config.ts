import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  // ThemeToggle이 <html>에 class="dark"를 붙이고 떼는 방식으로 다크 모드를 켠다.
  darkMode: "class",
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Pretendard", "Malgun Gothic", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
