import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import { Toaster } from './components/ui/sonner';
import { GalleryView } from './context/gallery.jsx';

createRoot(document.getElementById('root')).render(
  <GalleryView>
    <App />
    <Toaster/>
  </GalleryView>
  
)
