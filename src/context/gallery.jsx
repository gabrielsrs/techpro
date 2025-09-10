//# MARK: FINAL

// import { useState, createContext, useRef, useEffect } from 'react';
// import { Button } from '../components/ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import Autoplay from "embla-carousel-autoplay"




// const GalleryContext  = createContext()

// function GalleryView({ children }) {
//     // const dialogRef  = useRef(null)
//     // const carrouselRef  = useRef(null)
//     // const currentImageRef  = useRef([])
//     const [toggleDialog, setToggleDialog] = useState(true)
//     const [display, setDisplay] = useState({
//         currentProject: {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
//         "/projects/padrao-energia/padrao-energia-2.jpeg",
//         "/projects/padrao-energia/padrao-energia-3.jpeg",
//         "/projects/padrao-energia/padrao-energia-4.jpeg",
//         "/projects/padrao-energia/padrao-energia-5.jpeg",
//         "/projects/padrao-energia/padrao-energia-6.jpeg",
//         "/projects/padrao-energia/padrao-energia-7.jpeg",
//       ]
//     },
//         galleryImage: {
//           projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//           currentImagePos: 0
//         }
//     })
//     // const [translateTo, setTranslateTo] = useState(0)
//     // const SWAP_INTERVAL = 10000

//     const { currentProject, galleryImage } = display
//     const [galleryView, setGalleryView] = useState({})
//     const [indexImg, setIndexImg] = useState({prev: 0, next: 0})
//     const [api, setApi] = useState()
    

//     useEffect(() => {
//         setGalleryView(galleryImage)
//     }, [galleryImage])

//     // useEffect(() => {
//     //     if (
//     //         typeof galleryView?.currentImagePos === "number" &&
//     //         carrouselRef.current &&
//     //         currentImageRef[galleryView.currentImagePos]
//     //     ) {
//     //         const carouselWidth = carrouselRef.current.offsetWidth;
//     //         const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
//     //         const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
//     //         setTranslateTo(toTranslateX);
//     //     }
        
//     // }, [galleryView])

//     useEffect(() => {
//         if (!api) return
    
//         api.on("select", (q) => {
//             setIndexImg(prev => ({prev: prev.next, next: q.selectedScrollSnap()}))
//         })
//     }, [api])

//     useEffect(() => {
//         const interval = setTimeout(() => {
//             setIndexImg(prev => {

//                 if (currentProject.images[indexImg.next + 1]) {
//                     return {prev: prev.next, next: indexImg.next + 1}
//                 }
//                 return {prev: prev.next, next: 0}
//             })
//         }, 10000);

//         return () => clearTimeout(interval)
//     }, [indexImg])

//     // useEffect(() => {
//     //     if (
//     //         typeof galleryView?.currentImagePos === "number" &&
//     //         carrouselRef.current &&
//     //         currentImageRef[galleryView.currentImagePos]
//     //     ) {
//     //         const carouselWidth = carrouselRef.current.offsetWidth;
//     //         const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
//     //         const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
//     //         setTranslateTo(toTranslateX);
//     //     }
        
//     // }, [galleryView])

//     console.log(indexImg)

//     return (
//         <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
//             { children }
//             <dialog className="group/text flex flex-col gap-5 place-self-center max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
//                 <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <Carousel
//                             plugins={[
//                                 Autoplay({
//                                     delay: 10000,
//                                 }),
//                             ]}
//                             opts={{
//                                 loop: true,
//                                 startIndex: indexImg.next
//                             }}
//                             className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white"
//                             setApi={setApi}
//                         >
//                             <CarouselContent className="">
//                                 {currentProject.images.map((image, index) => (
//                                     <CarouselItem key={index}>
//                                         <ImageWithFallback
//                                             src={image}
//                                             alt={currentProject.title}
//                                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                                         />
//                                         <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                             <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                             <p className="text-sm text-white/60">{currentProject.description}</p>
//                                         </div>
//                                     </CarouselItem>
//                                 ))}
//                             </CarouselContent>
//                         </Carousel>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-full p-1 mt-2 bg-transparent z-10">
//                         <div className=" relative flex mb-2"> {/* h-0 group-hover/images:h-full */}
//                             <div  className="flex w-32 justify-center gap-4 duration-1000 ease-in-out">
//                                 {toggleDialog && (
//                                     <Carousel
//                                         plugins={[
//                                             Autoplay({
//                                                 delay: 10000,
//                                             }),
//                                         ]}
//                                         opts={{
//                                             duration: 5,
//                                             align: "center",
//                                             startIndex: indexImg.prev
//                                         }}
//                                         className="w-full overflow-visible " aria-hidden={false}
//                                         id="thumbnails"
//                                     >{/* opacity-0 group-hover/images:opacity-100 */}
//                                         <CarouselContent className="overflow-visible -ml-4">
//                                             {currentProject.images.map((image, index) => (
//                                                 <CarouselItem key={index} className="flex basis-32 pl-4 select-none">
//                                                     <div className="relative border-1 border-white w-32 h-full rounded-sm cursor-pointer" onClick={() => setIndexImg(prev => ({prev: prev.next, next: index}))}>
//                                                         <img  className="w-full h-full" src={image} alt=""/>
//                                                         {index == indexImg.next? (
//                                                             <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                                         ): (
//                                                             <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                                         )}
//                                                     </div>
//                                                 </CarouselItem>
//                                             ))}
//                                         </CarouselContent>
//                                     </Carousel>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 flex gap-4">
//                             {toggleDialog && (
//                                 <Carousel
//                                     plugins={[
//                                         Autoplay({
//                                             delay: 10000,
//                                         }),
//                                     ]}
//                                     opts={{
//                                         align: "start",
//                                     }}
//                                     className="w-full max-w-7xl"
//                                 >
//                                     <CarouselContent className="-ml-4">
//                                         {currentProject.images.map((image, index) => (
//                                         <CarouselItem key={index} className="flex basis-14 pl-4">
//                                             <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden">
//                                                 {index == indexImg.next && (
//                                                     <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                                 )}
//                                             </div>
//                                         </CarouselItem>
//                                         ))}
//                                     </CarouselContent>
//                                 </Carousel>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </dialog>
//             {toggleDialog && (
//             <>
//                 <div className="fixed inset-0 bg-[#1E3A5F]/70 z-30" onClick={() => console.log("close")}></div>
//                 <Button size="none" variant="none" className="fixed top-0 right-0 p-2 z-50 [&_svg:not([class*='size-'])]:size-16" onClick={() => console.log("close")}>
//                     <X strokeWidth={1}/>
//                 </Button>
//                 {/* <Button size="none" variant="none" className="fixed h-full top-0 p-2 left-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapPreviousImage}>
//                     <ChevronLeft strokeWidth={1}/>
//                 </Button>
//                 <Button size="none" variant="none" className="fixed h-full top-0 p-2 right-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapNextImage}>
//                     <ChevronRight strokeWidth={1}/>
//                 </Button> */}
//             </>
//             )}
//         </GalleryContext.Provider>
//     )
// }

// export { GalleryView, GalleryContext }


















//# MARK: CARROUSEL/EMBALA FUNCTIONS

// import { useState, createContext, useRef, useEffect } from 'react';
// import { Button } from '../components/ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import Autoplay from "embla-carousel-autoplay"




// const GalleryContext  = createContext()

// function GalleryView({ children }) {
//     // const dialogRef  = useRef(null)
//     // const carrouselRef  = useRef(null)
//     // const currentImageRef  = useRef([])
//     const [toggleDialog, setToggleDialog] = useState(true)
//     const [display, setDisplay] = useState({
//         currentProject: {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
//         "/projects/padrao-energia/padrao-energia-2.jpeg",
//         "/projects/padrao-energia/padrao-energia-3.jpeg",
//         "/projects/padrao-energia/padrao-energia-4.jpeg",
//         "/projects/padrao-energia/padrao-energia-5.jpeg",
//         "/projects/padrao-energia/padrao-energia-6.jpeg",
//         "/projects/padrao-energia/padrao-energia-7.jpeg",
//       ]
//     },
//         galleryImage: {
//           projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//           currentImagePos: 0
//         }
//     })
//     // const [translateTo, setTranslateTo] = useState(0)
//     // const SWAP_INTERVAL = 10000

//     const { currentProject, galleryImage } = display
//     const [galleryView, setGalleryView] = useState({})
//     const [indexImg, setIndexImg] = useState(0)
//     const [api, setApi] = useState()
//     const [apiThumb, setApiThumb] = useState()
//     const [apiBar, setApiBar] = useState()

//     useEffect(() => {
//         setGalleryView(galleryImage)
//     }, [galleryImage])

//     // useEffect(() => {
//     //     if (
//     //         typeof galleryView?.currentImagePos === "number" &&
//     //         carrouselRef.current &&
//     //         currentImageRef[galleryView.currentImagePos]
//     //     ) {
//     //         const carouselWidth = carrouselRef.current.offsetWidth;
//     //         const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
//     //         const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
//     //         setTranslateTo(toTranslateX);
//     //     }
        
//     // }, [galleryView])

//     // if(toggleDialog) {
//     //     document.querySelector("body").classList.add("overflow-hidden")
//     // } else {
//     //     document.querySelector("body").classList.remove("overflow-hidden")
//     // }

//     // function swapPreviousImage() {
//     //     setGalleryView(prev => {
//     //         let prevPos = prev.currentImagePos - 1
//     //         if (prevPos < 0) prevPos = currentProject.images.length - 1
            
//     //         return {
//     //             projectImage: currentProject.images[prevPos],
//     //             currentImagePos: prevPos
//     //         }
//     //     })
//     // }

//     // function swapNextImage() {
//     //     setGalleryView(prev => {
//     //         let nextPos = prev.currentImagePos + 1
//     //         if (!currentProject.images[nextPos]) nextPos = 0
            
//     //         return {
//     //             projectImage: currentProject.images[nextPos],
//     //             currentImagePos: nextPos
//     //         }
//     //     })
//     // }

//     // function swapIndexImage(index) {
//     //     setGalleryView({           
//     //         projectImage: currentProject.images[index],
//     //         currentImagePos: index
//     //     })
//     // }

//     // useEffect(() => {
//     //     let interval
//     //     if(toggleDialog) {
//     //       interval = setInterval(swapNextImage, SWAP_INTERVAL)
//     //     }

//     //     return () => clearInterval(interval)        
//     //   }, [galleryView])


//     // ####

    
//     // useEffect(() => {
//     //     if (!api) return
    
//     //     api.on("select", (q) => {
//     //         setIndexImg(q.selectedScrollSnap())
//     //     })
//     // }, [api])

//     // useEffect(() => {
//     //     const interval = setTimeout(() => {
//     //         setIndexImg(() => {
//     //             if (currentProject.images[indexImg + 1]) {
//     //                 return indexImg + 1
//     //             }
//     //             return 0
//     //         })
//     //     }, 10000);

//     //     return () => clearTimeout(interval)
//     // }, [indexImg])

//     return (
//         <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
//             { children }
//             <dialog className="group/text flex flex-col gap-5 place-self-center max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
//                 {/* <div className={`relative duration-1500 ${showSection?.servicos || "translate-y-full opacity-0"}`}>
//                     <Carousel className="w-full" opts={{ align: "start", loop: true }}>
//                         <CarouselContent className="-ml-2 md:-ml-4">
//                         {services.map((service, index) => (
//                             <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                             <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full border-primary/10">
//                                 <div className="relative h-48 overflow-hidden">
//                                 <ImageWithFallback
//                                     src={service.image}
//                                     alt={service.title}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
//                                 <div className="absolute top-4 left-4">
//                                     <div className="p-2 rounded-full" style={{ backgroundColor: '#f4b942' }}>
//                                     <service.icon className="h-6 w-6 text-primary drop-shadow-lg" />
//                                     </div>
//                                 </div>
//                                 <div className="absolute bottom-4 left-4 right-4">
//                                     <h3 className="text-white font-medium mb-2 drop-shadow-lg">
//                                     {service.title}
//                                     </h3>
//                                 </div>
//                                 </div>
//                                 <CardContent className="p-6">
//                                 <CardDescription className="text-base mb-4 min-h-[4.5rem]">
//                                     {service.description}
//                                 </CardDescription>
//                                 <Button 
//                                     className="w-full"
//                                     style={{ backgroundColor: '#f4b942', color: '#1e3a5f' }}
//                                     onClick={() => scrollTo("orcamento", service.serviceType)}
//                                 >
//                                     Solicitar Orçamento
//                                 </Button>
//                                 </CardContent>
//                             </Card>
//                             </CarouselItem>
//                         ))}
//                         </CarouselContent>
//                         <CarouselPrevious className="hidden md:flex -left-12" />
//                         <CarouselNext className="hidden md:flex -right-12" />
//                     </Carousel>
//                 </div> */}

//                 <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <Carousel
//                             plugins={[
//                                 Autoplay({
//                                     delay: 10000,
//                                 }),
//                             ]}
//                             opts={{
//                                 loop: true,
//                                 // startIndex: indexImg
//                             }}
//                             className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white"
//                             setApi={setApi}
//                         >
//                             <CarouselContent className="">
//                                 {currentProject.images.map((image, index) => (
//                                     <CarouselItem key={index}>
//                                         <ImageWithFallback
//                                             src={image}
//                                             alt={currentProject.title}
//                                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                                         />
//                                         <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                             <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                             <p className="text-sm text-white/60">{currentProject.description}</p>
//                                         </div>
//                                     </CarouselItem>
//                                 ))}
//                             </CarouselContent>
//                         </Carousel>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-full p-1 mt-2 bg-transparent z-10">
//                         <div className=" relative flex mb-2"> {/* h-0 group-hover/images:h-full */}
//                             <div className="flex w-32 justify-center gap-4 duration-1000 ease-in-out">
//                                 {toggleDialog && (
//                                     <Carousel
//                                         plugins={[
//                                             Autoplay({
//                                                 delay: 10000,
//                                             }),
//                                         ]}
//                                         opts={{
//                                             align: "center",
//                                             // startIndex: indexImg
//                                         }}
//                                         className="w-full overflow-visible " aria-hidden={false}
//                                         id="thumbnails"
//                                         setApi={setApiThumb}
//                                     >{/* opacity-0 group-hover/images:opacity-100 */}
//                                         <CarouselContent className="overflow-visible -ml-4 duration-1000 ease-in-out">
//                                             {currentProject.images.map((image, index) => (
//                                                 <CarouselItem key={index} className="flex basis-32 pl-4 select-none">
//                                                     <div className="relative border-1 border-white w-32 h-full rounded-sm cursor-pointer" onClick={() => apiThumb.scrollTo(index, true)}>
//                                                         <img  className="w-full h-full" src={image} alt=""/>
//                                                         {index == apiThumb && apiThumb.selectedScrollSnap()? (
//                                                             <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                                         ): (
//                                                             <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                                         )}
//                                                     </div>
//                                                 </CarouselItem>
//                                             ))}
//                                         </CarouselContent>
//                                     </Carousel>
//                                 )}
//                             </div>
//                         </div>
//                         {/* <Bar toggleDialog={toggleDialog} currentProject={currentProject} api={api}/> */}
//                         <div className="absolute bottom-0 flex gap-4">
//                             {toggleDialog && (
//                                 <Carousel
//                                     plugins={[
//                                         Autoplay({
//                                             delay: 10000,
//                                         }),
//                                     ]}
//                                     opts={{
//                                         align: "start",
//                                     }}
//                                     className="w-full max-w-7xl"
//                                     setApi={setApiBar}
//                                 >
//                                     <CarouselContent className="-ml-4">
//                                         {currentProject.images.map((image, index) => (
//                                         <CarouselItem key={index} className="flex basis-14 pl-4">
//                                             <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden">
//                                                 {index == apiBar && apiBar.selectedScrollSnap() && (
//                                                     <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                                 )}
//                                             </div>
//                                         </CarouselItem>
//                                         ))}
//                                     </CarouselContent>
//                                 </Carousel>
//                             )}
//                         </div>
//                     </div>
//                 </div>


//                 {/* <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <div className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white">
//                             <ImageWithFallback
//                                 src={galleryView?.projectImage}
//                                 alt={currentProject.title}
//                                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                             />
//                             <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                 <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                 <p className="text-sm text-white/60">{currentProject.description}</p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-full p-1 mt-2 bg-transparent z-10">
//                         <div ref={carrouselRef} className="h-0 relative flex mb-2 group-hover/images:h-full w-[200%] ease-in-out">
//                             <div className="flex duration-1000 gap-4 ease-in-out" style={{ transform: `translateX(${translateTo}px)` }}>
//                                 {toggleDialog && currentProject.images.map((image, index) => {
//                                     return (
//                                         <div ref={(el) => currentImageRef[index] = el} onClick={() => swapIndexImage(index)} className="opacity-0 relative border-1 border-white w-32 h-full rounded-sm overflow-hidden group-hover/images:opacity-100 cursor-pointer">
//                                             <img  className="w-full h-full" src={image} alt=""/>
//                                             {image == galleryView?.projectImage? (
//                                                 <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                             ): (
//                                                 <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                             )}
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 flex gap-4">
//                             {toggleDialog && currentProject.images.map((image, index) => {
//                                 return (
//                                     <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden" onClick={() => swapIndexImage(index)}>
//                                         {image == galleryView?.projectImage && (
//                                             <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                         )}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div> */}
//             </dialog>
//             {toggleDialog && (
//             <>
//                 <div className="fixed inset-0 bg-[#1E3A5F]/70 z-30" onClick={() => console.log("close")}></div>
//                 <Button size="none" variant="none" className="fixed top-0 right-0 p-2 z-50 [&_svg:not([class*='size-'])]:size-16" onClick={() => console.log("close")}>
//                     <X strokeWidth={1}/>
//                 </Button>
//                 {/* <Button size="none" variant="none" className="fixed h-full top-0 p-2 left-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapPreviousImage}>
//                     <ChevronLeft strokeWidth={1}/>
//                 </Button>
//                 <Button size="none" variant="none" className="fixed h-full top-0 p-2 right-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapNextImage}>
//                     <ChevronRight strokeWidth={1}/>
//                 </Button> */}
//             </>
//             )}
//         </GalleryContext.Provider>
//     )
// }


// // function Bar({ toggleDialog, currentProject, api }) {
// //     return (
// //         <div className="absolute bottom-0 flex gap-4">
// //             {toggleDialog && (
// //                 <Carousel
// //                     plugins={[
// //                         Autoplay({
// //                             delay: 10000,
// //                         }),
// //                     ]}
// //                     opts={{
// //                         align: "start",
// //                     }}
// //                     className="w-full max-w-7xl"
// //                 >
// //                     <CarouselContent className="-ml-4">
// //                         {currentProject.images.map((image, index) => (
// //                         <CarouselItem key={index} className="flex basis-14 pl-4">
// //                             <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden">
// //                                 {index == api.selectedScrollSnap() && (
// //                                     <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
// //                                 )}
// //                             </div>
// //                         </CarouselItem>
// //                         ))}
// //                     </CarouselContent>
// //                 </Carousel>
// //             )}
// //         </div>
// //     )
// // }

// export { GalleryView, GalleryContext }








//# MARK: CARROUSEL FUNCTIONS








// import { useState, createContext, useRef, useEffect } from 'react';
// import { Button } from '../components/ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import Autoplay from "embla-carousel-autoplay"




// const GalleryContext  = createContext()

// function GalleryView({ children }) {
//     // const dialogRef  = useRef(null)
//     // const carrouselRef  = useRef(null)
//     // const currentImageRef  = useRef([])
//     const [toggleDialog, setToggleDialog] = useState(true)
//     const [display, setDisplay] = useState({
//         currentProject: {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
//         "/projects/padrao-energia/padrao-energia-2.jpeg",
//         "/projects/padrao-energia/padrao-energia-3.jpeg",
//         "/projects/padrao-energia/padrao-energia-4.jpeg",
//         "/projects/padrao-energia/padrao-energia-5.jpeg",
//         "/projects/padrao-energia/padrao-energia-6.jpeg",
//         "/projects/padrao-energia/padrao-energia-7.jpeg",
//       ]
//     },
//         galleryImage: {
//           projectImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//           currentImagePos: 0
//         }
//     })
//     // const [translateTo, setTranslateTo] = useState(0)
//     // const SWAP_INTERVAL = 10000

//     const { currentProject, galleryImage } = display
//     const [galleryView, setGalleryView] = useState({})
//     const [indexImg, setIndexImg] = useState(0)
//     const [api, setApi] = useState()

//     useEffect(() => {
//         setGalleryView(galleryImage)
//     }, [galleryImage])

//     // useEffect(() => {
//     //     if (
//     //         typeof galleryView?.currentImagePos === "number" &&
//     //         carrouselRef.current &&
//     //         currentImageRef[galleryView.currentImagePos]
//     //     ) {
//     //         const carouselWidth = carrouselRef.current.offsetWidth;
//     //         const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
//     //         const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
//     //         setTranslateTo(toTranslateX);
//     //     }
        
//     // }, [galleryView])

//     // if(toggleDialog) {
//     //     document.querySelector("body").classList.add("overflow-hidden")
//     // } else {
//     //     document.querySelector("body").classList.remove("overflow-hidden")
//     // }

//     // function swapPreviousImage() {
//     //     setGalleryView(prev => {
//     //         let prevPos = prev.currentImagePos - 1
//     //         if (prevPos < 0) prevPos = currentProject.images.length - 1
            
//     //         return {
//     //             projectImage: currentProject.images[prevPos],
//     //             currentImagePos: prevPos
//     //         }
//     //     })
//     // }

//     // function swapNextImage() {
//     //     setGalleryView(prev => {
//     //         let nextPos = prev.currentImagePos + 1
//     //         if (!currentProject.images[nextPos]) nextPos = 0
            
//     //         return {
//     //             projectImage: currentProject.images[nextPos],
//     //             currentImagePos: nextPos
//     //         }
//     //     })
//     // }

//     // function swapIndexImage(index) {
//     //     setGalleryView({           
//     //         projectImage: currentProject.images[index],
//     //         currentImagePos: index
//     //     })
//     // }

//     // useEffect(() => {
//     //     let interval
//     //     if(toggleDialog) {
//     //       interval = setInterval(swapNextImage, SWAP_INTERVAL)
//     //     }

//     //     return () => clearInterval(interval)        
//     //   }, [galleryView])

//     useEffect(() => {
//         if (!api) return
    
//         api.on("select", (q) => {
//             setIndexImg(q.selectedScrollSnap())
//         })
//     }, [api])

//     useEffect(() => {
//         const interval = setTimeout(() => {
//             setIndexImg(() => {
//                 if (currentProject.images[indexImg + 1]) {
//                     return indexImg + 1
//                 }
//                 return 0
//             })
//         }, 10000);

//         return () => clearTimeout(interval)
//     }, [indexImg])

//     return (
//         <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
//             { children }
//             <dialog className="group/text flex flex-col gap-5 place-self-center max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
//                 {/* <div className={`relative duration-1500 ${showSection?.servicos || "translate-y-full opacity-0"}`}>
//                     <Carousel className="w-full" opts={{ align: "start", loop: true }}>
//                         <CarouselContent className="-ml-2 md:-ml-4">
//                         {services.map((service, index) => (
//                             <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
//                             <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full border-primary/10">
//                                 <div className="relative h-48 overflow-hidden">
//                                 <ImageWithFallback
//                                     src={service.image}
//                                     alt={service.title}
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
//                                 <div className="absolute top-4 left-4">
//                                     <div className="p-2 rounded-full" style={{ backgroundColor: '#f4b942' }}>
//                                     <service.icon className="h-6 w-6 text-primary drop-shadow-lg" />
//                                     </div>
//                                 </div>
//                                 <div className="absolute bottom-4 left-4 right-4">
//                                     <h3 className="text-white font-medium mb-2 drop-shadow-lg">
//                                     {service.title}
//                                     </h3>
//                                 </div>
//                                 </div>
//                                 <CardContent className="p-6">
//                                 <CardDescription className="text-base mb-4 min-h-[4.5rem]">
//                                     {service.description}
//                                 </CardDescription>
//                                 <Button 
//                                     className="w-full"
//                                     style={{ backgroundColor: '#f4b942', color: '#1e3a5f' }}
//                                     onClick={() => scrollTo("orcamento", service.serviceType)}
//                                 >
//                                     Solicitar Orçamento
//                                 </Button>
//                                 </CardContent>
//                             </Card>
//                             </CarouselItem>
//                         ))}
//                         </CarouselContent>
//                         <CarouselPrevious className="hidden md:flex -left-12" />
//                         <CarouselNext className="hidden md:flex -right-12" />
//                     </Carousel>
//                 </div> */}

//                 <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <Carousel
//                             plugins={[
//                                 Autoplay({
//                                     delay: 10000,
//                                 }),
//                             ]}
//                             opts={{
//                                 loop: true,
//                                 startIndex: indexImg
//                             }}
//                             className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white"
//                             setApi={setApi}
//                         >
//                             <CarouselContent className="">
//                                 {currentProject.images.map((image, index) => (
//                                     <CarouselItem key={index}>
//                                         <ImageWithFallback
//                                             src={image}
//                                             alt={currentProject.title}
//                                             className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                                         />
//                                         <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                             <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                             <p className="text-sm text-white/60">{currentProject.description}</p>
//                                         </div>
//                                     </CarouselItem>
//                                 ))}
//                             </CarouselContent>
//                         </Carousel>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-full p-1 mt-2 bg-transparent z-10">
//                         <div className=" relative flex mb-2"> {/* h-0 group-hover/images:h-full */}
//                             <div key={indexImg} className="flex w-32 justify-center gap-4 duration-1000 ease-in-out">
//                                 {toggleDialog && (
//                                     <Carousel
//                                         plugins={[
//                                             Autoplay({
//                                                 delay: 10000,
//                                             }),
//                                         ]}
//                                         opts={{
//                                             duration: 5,
//                                             align: "center",
//                                             startIndex: indexImg
//                                         }}
//                                         className="w-full overflow-visible " aria-hidden={false}
//                                         id="thumbnails"
//                                     >{/* opacity-0 group-hover/images:opacity-100 */}
//                                         <CarouselContent className="overflow-visible -ml-4">
//                                             {currentProject.images.map((image, index) => (
//                                                 <CarouselItem key={index} className="flex basis-32 pl-4 select-none">
//                                                     <div className="relative border-1 border-white w-32 h-full rounded-sm cursor-pointer" onClick={() => setIndexImg(index)}>
//                                                         <img  className="w-full h-full" src={image} alt=""/>
//                                                         {index == indexImg? (
//                                                             <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                                         ): (
//                                                             <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                                         )}
//                                                     </div>
//                                                 </CarouselItem>
//                                             ))}
//                                         </CarouselContent>
//                                     </Carousel>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 flex gap-4">
//                             {toggleDialog && (
//                                 <Carousel
//                                     plugins={[
//                                         Autoplay({
//                                             delay: 10000,
//                                         }),
//                                     ]}
//                                     opts={{
//                                         align: "start",
//                                     }}
//                                     className="w-full max-w-7xl"
//                                 >
//                                     <CarouselContent className="-ml-4">
//                                         {currentProject.images.map((image, index) => (
//                                         <CarouselItem key={index} className="flex basis-14 pl-4">
//                                             <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden">
//                                                 {index == indexImg && (
//                                                     <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                                 )}
//                                             </div>
//                                         </CarouselItem>
//                                         ))}
//                                     </CarouselContent>
//                                 </Carousel>
//                             )}
//                         </div>
//                     </div>
//                 </div>


//                 {/* <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <div className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white">
//                             <ImageWithFallback
//                                 src={galleryView?.projectImage}
//                                 alt={currentProject.title}
//                                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                             />
//                             <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                 <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                 <p className="text-sm text-white/60">{currentProject.description}</p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-full p-1 mt-2 bg-transparent z-10">
//                         <div ref={carrouselRef} className="h-0 relative flex mb-2 group-hover/images:h-full w-[200%] ease-in-out">
//                             <div className="flex duration-1000 gap-4 ease-in-out" style={{ transform: `translateX(${translateTo}px)` }}>
//                                 {toggleDialog && currentProject.images.map((image, index) => {
//                                     return (
//                                         <div ref={(el) => currentImageRef[index] = el} onClick={() => swapIndexImage(index)} className="opacity-0 relative border-1 border-white w-32 h-full rounded-sm overflow-hidden group-hover/images:opacity-100 cursor-pointer">
//                                             <img  className="w-full h-full" src={image} alt=""/>
//                                             {image == galleryView?.projectImage? (
//                                                 <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                             ): (
//                                                 <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                             )}
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 flex gap-4">
//                             {toggleDialog && currentProject.images.map((image, index) => {
//                                 return (
//                                     <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden" onClick={() => swapIndexImage(index)}>
//                                         {image == galleryView?.projectImage && (
//                                             <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                         )}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div> */}
//             </dialog>
//             {toggleDialog && (
//             <>
//                 <div className="fixed inset-0 bg-[#1E3A5F]/70 z-30" onClick={() => console.log("close")}></div>
//                 <Button size="none" variant="none" className="fixed top-0 right-0 p-2 z-50 [&_svg:not([class*='size-'])]:size-16" onClick={() => console.log("close")}>
//                     <X strokeWidth={1}/>
//                 </Button>
//                 {/* <Button size="none" variant="none" className="fixed h-full top-0 p-2 left-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapPreviousImage}>
//                     <ChevronLeft strokeWidth={1}/>
//                 </Button>
//                 <Button size="none" variant="none" className="fixed h-full top-0 p-2 right-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapNextImage}>
//                     <ChevronRight strokeWidth={1}/>
//                 </Button> */}
//             </>
//             )}
//         </GalleryContext.Provider>
//     )
// }

// export { GalleryView, GalleryContext }






//# MARK: RAW






import { useState, createContext, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';


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
        else setOrientation("w-5xl"); // Optional: for square images
    }

    //   landscape:w-7xl portrait:w-3xl

    return (
        <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
            { children }
            <dialog ref={dialogRef} className="group/text flex flex-col gap-5 place-self-center w-xl xl:w-auto max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
                <div className="relative flex justify-center">
                    {toggleDialog && (
                        <div className={`absolute bottom-10 overflow-hidden shadow-xl/30 rounded-xl border-1 border-white max-h-[70vh] ${orientation} animate-open`}>
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


// REMOVE GALLERY BELLOW 720PX 
// RESIZE/ACTIVATE PASS TOUCH IMAGE/REMOVE ARROW BELLOW 1280PX










//# MARK: BACKUP









// import { useState, createContext, useRef, useEffect, useCallback } from 'react';
// import { Button } from '../components/ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';
// import useEmblaCarousel from "embla-carousel-react";


// const GalleryContext  = createContext()

// function GalleryView({ children }) {
//     const dialogRef  = useRef(null)
//     const carrouselRef  = useRef(null)
//     const [thumbsRef, thumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });
//     const [selectedIndex, setSelectedIndex] = useState(0);

//     const currentImageRef  = useRef([])
//     const [toggleDialog, setToggleDialog] = useState(false)
//     const [display, setDisplay] = useState({})
//     const [translateTo, setTranslateTo] = useState(0)
//     const SWAP_INTERVAL = 10000

//     const { currentProject, galleryImage } = display
//     const [galleryView, setGalleryView] = useState({})


//     // Update big image when drag or snap changes
//     const onSelect = useCallback(() => {
//         if (!thumbsApi) return;
//         const index = thumbsApi.selectedScrollSnap();
//         setSelectedIndex(index);
//     }, [thumbsApi]);

//     // Bind listener to Embla events
//     useEffect(() => {
//         if (!thumbsApi) return;

//         onSelect();
//         thumbsApi.on("select", onSelect);
//         thumbsApi.on("scroll", onSelect);
//     }, [thumbsApi, onSelect]);

//     useEffect(() => {
//         setGalleryView(galleryImage)
//     }, [galleryImage])

//     useEffect(() => {
//         if (
//             typeof galleryView?.currentImagePos === "number" &&
//             thumbsRef.current &&
//             currentImageRef[galleryView.currentImagePos]
//         ) {
//             const carouselWidth = thumbsRef.current.offsetWidth;
//             const imageWidth = currentImageRef[galleryView.currentImagePos].offsetWidth || 140;
//             const toTranslateX = (carouselWidth / 2) - (imageWidth / 2) - currentImageRef[galleryView.currentImagePos].offsetLeft;
//             setTranslateTo(toTranslateX);
//         }
        
//     }, [galleryView])

//     if(toggleDialog) {
//         document.querySelector("body").classList.add("overflow-hidden")
//     } else {
//         document.querySelector("body").classList.remove("overflow-hidden")
//     }

//     function swapPreviousImage() {
//         setGalleryView(prev => {
//             let prevPos = prev.currentImagePos - 1
//             if (prevPos < 0) prevPos = currentProject.images.length - 1
            
//             return {
//                 projectImage: currentProject.images[prevPos],
//                 currentImagePos: prevPos
//             }
//         })
//     }

//     function swapNextImage() {
//         setGalleryView(prev => {
//             let nextPos = prev.currentImagePos + 1
//             if (!currentProject.images[nextPos]) nextPos = 0
            
//             return {
//                 projectImage: currentProject.images[nextPos],
//                 currentImagePos: nextPos
//             }
//         })
//     }

//     function swapIndexImage(index) {
//         setGalleryView({           
//             projectImage: currentProject.images[index],
//             currentImagePos: index
//         })
//     }

//     useEffect(() => {
//         let interval
//         if(toggleDialog) {
//           interval = setInterval(swapNextImage, SWAP_INTERVAL)
//         }

//         return () => clearInterval(interval)        
//       }, [galleryView])

//     return (
//         <GalleryContext.Provider value={[toggleDialog, setToggleDialog, setDisplay]}>
//             { children }
//             <dialog ref={dialogRef} className="group/text flex flex-col gap-5 place-self-center max-w-[1120px] fixed bottom-2/12 z-40 bg-transparent p-4" open={toggleDialog}>
//                 <div className="relative flex justify-center">
//                     {toggleDialog && (
//                         <div className="absolute bottom-10 aspect-[4/3] overflow-hidden w-7xl shadow-xl/30 rounded-xl border-1 border-white">
//                             <ImageWithFallback
//                                 src={galleryView?.projectImage}
//                                 alt={currentProject.title}
//                                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
//                             />
//                             <div className="absolute bottom-0 w-full bg-linear-0 from-black/60 from-0% to-transparent to-100% opacity-0 group-hover/text:opacity-100 p-2">
//                                 <h3 className="mb-2 text-white/80 font-semibold">{currentProject.title}</h3>
//                                 <p className="text-sm text-white/60">{currentProject.description}</p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="group/images relative flex flex-col justify-center items-center w-auto p-1 mt-2 bg-transparent z-10">
//                         <div ref={thumbsRef} className="h-0 relative flex mb-2 group-hover/images:h-full w-[200%] ease-in-out">
//                             <div className="flex duration-1000 gap-4 ease-in-out" style={{ transform: `translateX(${translateTo}px)` }}>
//                                 {toggleDialog && currentProject.images.map((image, index) => {
//                                     return (
//                                         <div ref={(el) => currentImageRef[index] = el} onClick={() => swapIndexImage(index)} className="opacity-0 relative border-1 border-white w-32 h-full rounded-sm overflow-hidden group-hover/images:opacity-100 cursor-pointer">
//                                             <img  className="w-full h-full" src={image} alt=""/>
//                                             {index == galleryView?.currentImagePos? (
//                                                 <div className="absolute inset-0 animate-test rounded-sm bg-black/50 w-full origin-left will-change-transform"></div>
//                                             ): (
//                                                 <div className="absolute inset-0 rounded-sm bg-black/50"></div>
//                                             )}
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                         <div className="absolute bottom-0 flex gap-4 max-w-7xl">
//                             {toggleDialog && currentProject.images.map((image, index) => {
//                                 return (
//                                     <div className="relative w-14 h-0.5 bg-black cursor-pointer overflow-hidden" onClick={() => swapIndexImage(index)}>
//                                         {index == galleryView?.currentImagePos && (
//                                             <div className="absolute inset-0 animate-test bg-white/50 h-1 w-full origin-left will-change-transform"></div>
//                                         )}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </dialog>
//             {toggleDialog && (
//             <>
//                 <div className="fixed inset-0 bg-[#1E3A5F]/70 z-30" onClick={() => setToggleDialog(!toggleDialog)}></div>
//                 <Button size="none" variant="none" className="fixed top-0 right-0 p-2 z-50 [&_svg:not([class*='size-'])]:size-16" onClick={() => setToggleDialog(!toggleDialog)}>
//                     <X strokeWidth={1}/>
//                 </Button>
//                 <Button size="none" variant="none" className="fixed h-full top-0 p-2 left-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapPreviousImage}>
//                     <ChevronLeft strokeWidth={1}/>
//                 </Button>
//                 <Button size="none" variant="none" className="fixed h-full top-0 p-2 right-0 z-40 [&_svg:not([class*='size-'])]:size-20 hover:bg-[#000]/10" onClick={swapNextImage}>
//                     <ChevronRight strokeWidth={1}/>
//                 </Button>
//             </>
//             )}
//         </GalleryContext.Provider>
//     )
// }

// export { GalleryView, GalleryContext }