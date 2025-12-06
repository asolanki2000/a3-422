import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard'; 
const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) throw new Error(`Request failed with status: ${res.status}`);
  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <RouteGuard>   {/* WRAP EVERYTHING INSIDE ROUTEGUARD */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </SWRConfig>
  );
}
