import { useState, createContext, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/sub-components/ImageWithFallback';


const GalleryContext  = createContext()

function GalleryView({ children }) {
    const dialogRef  = useRef(null)
    const carrouselRef  = useRef(null)
    const thumbImage  = useRef(null)
    const currentImageRef  = useRef([])
    const [toggleDialog, setToggleDialog] = useState(false)
    const [display, setDisplay] = useState({})
    const [translateTo, setTranslateTo] = useState(0)
    const [orientation, setOrientation] = useState(null)
    const SWAP_INTERVAL = 10000

    const { currentProject, galleryImage } = display
    const [galleryView, setGalleryView] = useState({})

    useEffect(() => {
        setGalleryView(galleryImage)
    }, [galleryImage])

    useEffect(() => {
        if (
            typeof galleryView?.currentImagePos === "number" &&
            carrouselRef.current &&
            currentImageRef[galleryView.currentImagePos]
        ) {
            const carouselWidth = carrouselRef.current.offsetWidth;
            const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
            const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
            setTranslateTo(toTranslateX);
        }
    }, [galleryView])

    if(toggleDialog) {
        document.querySelector("body").classList.add("overflow-hidden")
    } else {
        document.querySelector("body").classList.remove("overflow-hidden")
    }

    function swapPreviousImage() {
        setGalleryView(prev => {
            let prevPos = prev.currentImagePos - 1
            if (prevPos < 0) prevPos = currentProject.images.length - 1

            return {
                projectImage: currentProject.images[prevPos],
                currentImagePos: prevPos
            }
        })
    }

    function swapNextImage() {
        setGalleryView(prev => {
            let nextPos = prev.currentImagePos + 1
            if (!currentProject.images[nextPos]) nextPos = 0
            
            return {
                projectImage: currentProject.images[nextPos],
                currentImagePos: nextPos
            }
        })
    }

    function swapIndexImage(index) {
        setGalleryView({           
            projectImage: currentProject.images[index],
            currentImagePos: index
        })
    }

    useEffect(() => {
        let interval
        if(toggleDialog) {
            interval = setInterval(swapNextImage, SWAP_INTERVAL)
        }

        return () => clearInterval(interval)        
      }, [galleryView])

    function handleImageLoad(e) {
        const { naturalWidth, naturalHeight } = e.target;
        if (!naturalWidth || !naturalHeight) return;

        if (naturalWidth > naturalHeight) setOrientation("w-xl xl:w-7xl");
        else if (naturalWidth < naturalHeight) setOrientation("w-xl xl:w-3xl");
        else setOrientation("w-5xl");
    }

    return (
        <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
            { children }
            <dialog ref={dialogRef} className="flex flex-col gap-5 place-self-center w-xl xl:w-auto max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
                <div className="relative flex justify-center">
                    {toggleDialog && (
                        <div className={`absolute bottom-10 overflow-hidden shadow-xl/30 rounded-xl border-1 border-white max-h-[70vh] ${orientation} animate-open group/text`}>
                            <ImageWithFallback
                                ref={thumbImage}
                                src={galleryView?.projectImage}
                                alt={currentProject.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                onLoad={handleImageLoad}
                            />
                            <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
                                <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
                                <p className="text-sm text-white/60">{currentProject.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="group/images relative flex flex-col justify-center items-center w-auto p-1 mt-2 bg-transparent z-10">
                        <div ref={carrouselRef} className="h-0 relative flex mb-2 group-hover/images:h-full w-[200%] ease-in-out">
                            <div className="flex duration-1000 gap-4 ease-in-out" style={{ transform: `translateX(${translateTo}px)` }}>
                                {toggleDialog && currentProject.images.map((image, index) => {
                                    return (
                                        <div ref={(el) => currentImageRef[index] = el} onClick={() => swapIndexImage(index)} className="opacity-0 relative border-1 border-white w-32 h-full max-h-36 rounded-sm overflow-hidden group-hover/images:opacity-100 cursor-pointer select-none">
                                            <img  className="w-full h-full" src={image} alt=""/>
                                            {index == galleryView?.currentImagePos? (
                                                <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
                                            ): (
                                                <div className="absolute inset-0 rounded-sm bg-black/50"></div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="absolute bottom-0 flex gap-4 max-w-7xl">
                            {toggleDialog && currentProject.images.map((image, index) => {
                                return (
                                    <div className="relative w-14 h-0.5 bg-white/40 cursor-pointer overflow-hidden" onClick={() => swapIndexImage(index)}>
                                        {index == galleryView?.currentImagePos && (
                                            <div className="absolute inset-0 animate-test bg-white h-1 w-full origin-left will-change-transform"></div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </dialog>
            {toggleDialog && (
            <>
                <div className="fixed inset-0 bg-black/90 z-30" onClick={() => setToggleDialog(!toggleDialog)}></div>
                <Button size="none" variant="none" className="fixed top-0 right-0 size-24 p-2 z-50 [&_svg:not([class*='size-'])]:size-14 text-white hover:text-white/40" onClick={() => setToggleDialog(!toggleDialog)}>
                    <X strokeWidth={1} className="text-inherit"/>
                </Button>
                <Button size="none" variant="none" className="fixed hidden xl:flex h-full top-0 p-2 left-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10 text-white hover:text-white/40" onClick={swapPreviousImage}>
                    <ChevronLeft strokeWidth={1} className="text-inherit"/>
                </Button>
                <Button size="none" variant="none" className="fixed hidden xl:flex h-full top-0 p-2 right-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10 text-white hover:text-white/40" onClick={swapNextImage}>
                    <ChevronRight strokeWidth={1} className="text-inherit"/>
                </Button>
            </>
            )}
        </GalleryContext.Provider>
    )
}

export { GalleryView, GalleryContext }