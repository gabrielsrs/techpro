import { Toaster } from './components/ui/sonner';
import { GalleryView } from './context/gallery.jsx';
import { Home } from "./pages/home";

export function App() {
  return (
    <GalleryView>
      <Home />
      <Toaster/>
    </GalleryView>
  )
}