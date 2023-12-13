import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ToastContainer />
    <SpeedInsights />
    <Analytics />
  </>,
)
