import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/context_api/globalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRender from "./components/login/render";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HackerMars",
  description: "HackerMars at your Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >

        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <GlobalProvider>
          <Navbar />
          <UserRender />
          <div className='min-h-screen'>

            {children}

          </div>
          <Footer />
          <ToastContainer />
        </GlobalProvider>
      </body>
    </html>
  );
}
