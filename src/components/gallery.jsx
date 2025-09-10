import { useState, useEffect, useContext } from 'react';
import { GalleryContext } from '../context/gallery';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './sub-components/ImageWithFallback';

import { Carousel, CarouselContent, CarouselItem} from '../components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

import projects from "../data/projects.json"


function Gallery({ showSection, navSelect }){
  const [galleryImage, setGalleryImage] = useState([]);
  const [toggleDialog, setToggleDialog, setDisplay] = useContext(GalleryContext)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [mobileResize, setMobileResize] = useState({status: false})
  const SWAP_INTERVAL = 10000


  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth)
      setMobileResize({status: false})
    })
    
  }, [])

  useEffect(() => {
    setGalleryImage(
      projects.map(project => ({
        projectImage: project.images[0],
        currentImagePos: 0
      }))
    )
  }, [])

  function swapImage() {
    setGalleryImage(prev =>
      projects.map((project, index) => {
        const current = prev[index] || { currentImagePos: 0 }
        let nextPos = current.currentImagePos + 1
        if (!project.images[nextPos]) nextPos = 0
        return {
          projectImage: project.images[nextPos],
          currentImagePos: nextPos
        }
      })
    )
  }

  useEffect(() => {
    if(!toggleDialog && navSelect == "projetos") {
      const interval = setInterval(swapImage, SWAP_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [projects])

  function openView(index) {
    if(windowSize > 768) {
      setToggleDialog(!toggleDialog)
      setDisplay({ currentProject: projects[index], galleryImage: galleryImage[index] })
    } else {
      setMobileResize(prev => ({index: index, status: index == prev.index? !prev.status: true }))
    }
  }

  return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 duration-1000 ${showSection?.projetos || "translate-y-full opacity-0"}`}>
        {projects.map((project, index) => {
          return (
          <Card key={index} className="relative max-h-dvh overflow-hidden hover:shadow-lg transition-shadow border-primary/10 cursor-pointer" onClick={() => openView(index)}>
            <Carousel
              plugins={[
                  Autoplay({
                      delay: 10000,
                  }),
              ]}
              opts={{
                  loop: true,
                  watchDrag: windowSize < 768? true: false,
                  active: windowSize < 768? true: navSelect == "projetos",
                  startIndex: 0
              }}
              className={`${!(mobileResize?.index == index)? "aspect-[4/3]": !mobileResize.status && "aspect-[4/3]"} overflow-hidden`}
            >
                <CarouselContent>
                    {project.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <ImageWithFallback
                              key={image}
                              src={image}
                              alt={project.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 animate-open"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <CardContent className="p-4">
              <h3 className="mb-2 text-primary">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        )
        })}
      </div>
  )

}

export { Gallery }