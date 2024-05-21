import { SessionProvider } from "next-auth/react";
import {Dashboard} from "./Dashboard/page";


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      
      <Dashboard {...pageProps}/>
    </SessionProvider>
  );
}

export default MyApp;
