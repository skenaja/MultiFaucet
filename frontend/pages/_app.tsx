import "styles/global.scss"; // Global styles
import type { AppProps } from "next/app"; // Types
import { SessionProvider } from "next-auth/react"; // Next auth state
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import { ToastContainer } from "react-toastify"; // Toast notifications
import Fonts from "../components/Fonts";

export default function MultiFaucet({ Component, pageProps }: AppProps) {
  return (
    // Wrap app in auth session provider
    <SessionProvider session={pageProps.session}>
      <Fonts />
      {/* Toast container */}
      <ToastContainer />

      {/* Site */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
