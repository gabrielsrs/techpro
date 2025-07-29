import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster/>
  </>
  
)
