import { Source_Code_Pro } from "next/font/google";
import "./global.css";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "bio",
  description: "bio @pomppa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={source_code_pro.className}>
      <body>{children}</body>
    </html>
  );
}
