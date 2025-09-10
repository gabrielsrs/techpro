import { useState, useEffect, useContext, useRef } from 'react';
import { GalleryContext } from '../context/gallery';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from "@/components/ui/badge"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


function Gallery({ showSection, navSelect }){
  const [galleryImage, setGalleryImage] = useState([]);
  const [toggleDialog, setToggleDialog, setDisplay] = useContext(GalleryContext)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [mobileResize, setMobileResize] = useState({status: false})
  const SWAP_INTERVAL = 10000

    const projects = [
    {
      title: "Condomínio Residencial",
      description: "Sistema completo: elétrica, câmeras, interfonia e redes",
      images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
        "/projects/padrao-energia/padrao-energia-2.jpeg",
        "/projects/padrao-energia/padrao-energia-3.jpeg",
        "/projects/padrao-energia/padrao-energia-4.jpeg",
        "/projects/padrao-energia/padrao-energia-5.jpeg",
        "/projects/padrao-energia/padrao-energia-6.jpeg",
        "/projects/padrao-energia/padrao-energia-7.jpeg",
      ],
      category: "Instalações Elétricas",
    },
    {
      title: "Condomínio Residencial",
      description: "Sistema completo: elétrica, câmeras, interfonia e redes",
      images: ["/projects/antena-casa/antena-casa-1.jpeg",
        "/projects/antena-casa/antena-casa-2.jpeg",
        "/projects/antena-casa/antena-casa-3.jpeg"
      ],
      category: "TV Coletiva e Satélite",
    },
    {
      title: "Escritório Corporativo",
      description: "Infraestrutura tecnológica completa + segurança",
      images: ["/projects/antena-mikrotik/antena-mikrotik-1.jpeg",
        "/projects/antena-mikrotik/antena-mikrotik-2.jpeg"
      ],
      category: "TV Coletiva e Satélite",
    },
    {
      title: "Shopping Center",
      description: "Redes estruturadas e sistema de monitoramento",
      images: ["/projects/tecsys/tecsys-1.jpeg"],
      category: "TV Coletiva e Satélite",
    },
    {
      title: "Residência de Alto Padrão",
      description: "Automação residencial e sistema de entretenimento",
      images: ["/projects/dijuntores/dijuntores-1.jpeg"],
      category: "Instalações Elétricas",
    }
  ];

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



            {/* <div className="aspect-[4/3] overflow-hidden" draggable={false}>
              <ImageWithFallback
                key={galleryImage[index]?.projectImage}
                src={galleryImage[index]?.projectImage}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 animate-open"
              />
            </div> */}
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



//# MARK: sem carrousel to pass


// import { useState, useEffect, useContext, useRef } from 'react';
// import { GalleryContext } from '../context/gallery';
// import { Card, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';


// function Gallery({ showSection, navSelect }){
//   const [galleryImage, setGalleryImage] = useState([]);
//   const [toggleDialog, setToggleDialog, setDisplay] = useContext(GalleryContext)
//   const SWAP_INTERVAL = 10000

//     const projects = [
//     {
//       title: "Condomínio Residencial",
//       description: "Sistema completo: elétrica, câmeras, interfonia e redes",
//       images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
//         "/projects/padrao-energia/padrao-energia-2.jpeg",
//         "/projects/padrao-energia/padrao-energia-3.jpeg",
//         "/projects/padrao-energia/padrao-energia-4.jpeg",
//         "/projects/padrao-energia/padrao-energia-5.jpeg",
//         "/projects/padrao-energia/padrao-energia-6.jpeg",
//         "/projects/padrao-energia/padrao-energia-7.jpeg",
//       ]
//     },
//     {
//       title: "Condomínio Residencial",
//       description: "Sistema completo: elétrica, câmeras, interfonia e redes",
//       images: ["/projects/antena-casa/antena-casa-1.jpeg",
//         "/projects/antena-casa/antena-casa-2.jpeg",
//         "/projects/antena-casa/antena-casa-3.jpeg"
//       ]
//     },
//     {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["/projects/antena-mikrotik/antena-mikrotik-1.jpeg",
//         "/projects/antena-mikrotik/antena-mikrotik-2.jpeg"
//       ]
//     },
//     {
//       title: "Shopping Center",
//       description: "Redes estruturadas e sistema de monitoramento",
//       images: ["/projects/tecsys/tecsys-1.jpeg"]
//     },
//     {
//       title: "Residência de Alto Padrão",
//       description: "Automação residencial e sistema de entretenimento",
//       images: ["/projects/dijuntores/dijuntores-1.jpeg"]
//     }
//   ];

//   useEffect(() => {
//     setGalleryImage(
//       projects.map(project => ({
//         projectImage: project.images[0],
//         currentImagePos: 0
//       }))
//     )
//   }, [])

//   function swapPreviousImage(projectIndex) {
//     const current = galleryImage[projectIndex] || { currentImagePos: 0 }
//     let prevPos = current.currentImagePos - 1
//     if (!projects[projectIndex].images[prevPos]) prevPos = projects[projectIndex].images.length - 1
//     const newImg = {
//       projectImage: projects[projectIndex].images[prevPos],
//       currentImagePos: prevPos
//     }

//     const newImgs = galleryImage
//     newImgs[projectIndex] = newImg

//     setGalleryImage(newImgs)
//   }

//   function swapNextImage(projectIndex) {
//     const current = galleryImage[projectIndex] || { currentImagePos: 0 }
//     let nextPos = current.currentImagePos + 1
//     if (!projects[projectIndex].images[nextPos]) nextPos = 0
//     const newImg = {
//       projectImage: projects[projectIndex].images[nextPos],
//       currentImagePos: nextPos
//     }

//     const newImgs = galleryImage
//     newImgs[projectIndex] = newImg

//     setGalleryImage(prev => {
//       const newImgs = prev
//       newImgs[projectIndex] = newImg

//       return newImgs
//     })
//   }

//   function swapImage() {
//     setGalleryImage(prev =>
//       projects.map((project, index) => {
//         const current = prev[index] || { currentImagePos: 0 }
//         let nextPos = current.currentImagePos + 1
//         if (!project.images[nextPos]) nextPos = 0
//         return {
//           projectImage: project.images[nextPos],
//           currentImagePos: nextPos
//         }
//       })
//     )
//   }

//   useEffect(() => {
//     if(!toggleDialog && navSelect == "projetos") {
//       const interval = setInterval(swapImage, SWAP_INTERVAL)
//       return () => clearInterval(interval)
//     }
//   }, [projects])

//   function openView(index) {
//     if(window.innerWidth > 768) {
//       setToggleDialog(!toggleDialog)
//       setDisplay({ currentProject: projects[index], galleryImage: galleryImage[index] })
//     }  
//   }




//   const startX = useRef(0);
//   const isDragging = useRef(false);

//   const handleMouseDown = (e) => {
//     if(window.innerWidth > 768) return
//     isDragging.current = true;
//     startX.current = e.clientX;
//   };

//   const handleMouseUp = (e) => {
//     if(window.innerWidth > 768) return

//     if (!isDragging.current) return;
//     isDragging.current = false;

//     const diff = e.clientX - startX.current;

//     if (diff > 50) {
//       swapNextImage(Number())
//       console.log(e.target.id)
//     } else if (diff < -50) {
//       swapPreviousImage(Number(e.target.id))
//       console.log(e.target.id)
//     }
//   };

//   const handleMouseLeave = () => {
//     if(window.innerWidth > 768) return
//     isDragging.current = false; // Cancel if mouse leaves
//   };

//   const handleTouchStart = (e) => {
//     if(window.innerWidth > 768) return
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     if(window.innerWidth > 768) return
//     const diff = e.changedTouches[0].clientX - startX.current;
//     if (diff > 50) {
//       swapNextImage(e.target.id)
//     } else if (diff < -50) {
//       swapPreviousImage(e.target.id)
//     }
//   };

//   return (
//       <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 duration-1000 ${showSection?.projetos || "translate-y-full opacity-0"}`}>
//         {projects.map((project, index) => {
//           return (
//           <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10 cursor-pointer" onClick={() => openView(index)}>
//             <div className="aspect-[4/3] overflow-hidden"
//               onMouseDown={handleMouseDown}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseLeave}
//               onTouchStart={handleTouchStart}
//               onTouchEnd={handleTouchEnd}
//             >
//               <ImageWithFallback
//                 key={galleryImage[index]?.projectImage}
//                 src={galleryImage[index]?.projectImage}
//                 alt={project.title}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 animate-open"
//                 draggable={false}
//                 id={index}
//               />
//             </div>
//             <CardContent className="p-4">
//               <h3 className="mb-2 text-primary">{project.title}</h3>
//               <p className="text-sm text-muted-foreground">{project.description}</p>
//             </CardContent>
//           </Card>
//         )
//         })}
//       </div>
//   )

// }

// export { Gallery }





//# MARK: Cosias






// const projects = [
//     {
//       title: "Condomínio Residencial",
//       description: "Sistema completo: elétrica, câmeras, interfonia e redes",
//       images: ["https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=400&h=300&fit=crop", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1FMt_kPF3N5V1nrhel2sN9S8IniJcOCpwg&s"]
//     },
//     {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//         "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "https://media.istockphoto.com/id/910729490/photo/presence-detection-clock.webp?a=1&b=1&s=612x612&w=0&k=20&c=QZykQVIhgfBXUrxZFYsBmBF34riyhNtUm9wzCF_0X9o=",
//         "https://media.istockphoto.com/id/1592012299/photo/close-up-of-surveillance-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=5pTHqsVezbSJyb-bUrJRY6p4MdciQySsP0TSbXkXKtc=",
//         "https://media.istockphoto.com/id/1134098127/photo/construction-worker-safety-protective-eywear.webp?a=1&b=1&s=612x612&w=0&k=20&c=LYn1MtRNhYXQSDT4FyDLV_DGsSR2lUtX2JV5E5telaM=",
//         "https://media.istockphoto.com/id/936277716/photo/construction-foreman-speaking-by-phone.webp?a=1&b=1&s=612x612&w=0&k=20&c=id4JJ3n0ez_QwZk8QPgniSM3HR6NDN0_XQTl9gDndVc=",
//         "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       ]
//     },
//     {
//       title: "Shopping Center",
//       description: "Redes estruturadas e sistema de monitoramento",
//       images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"]
//     },
//     {
//       title: "Residência de Alto Padrão",
//       description: "Automação residencial e sistema de entretenimento",
//       images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"]
//     }
//   ];





// import { useState, useEffect, useContext } from 'react';
// import { GalleryContext } from '../context/gallery';
// import { Card, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';


// function Gallery({ showSection, navSelect }){
//   const [galleryImage, setGalleryImage] = useState([]);
//   const [toggleDialog, setToggleDialog, setDisplay] = useContext(GalleryContext)
//   const SWAP_INTERVAL = 10000

//     const projects = [
//     {
//       title: "Condomínio Residencial",
//       description: "Sistema completo: elétrica, câmeras, interfonia e redes",
//       images: ["/projects/padrao-energia/padrao-energia-1.jpeg",
//         "/projects/padrao-energia/padrao-energia-2.jpeg",
//         "/projects/padrao-energia/padrao-energia-3.jpeg",
//         "/projects/padrao-energia/padrao-energia-4.jpeg",
//         "/projects/padrao-energia/padrao-energia-5.jpeg",
//         "/projects/padrao-energia/padrao-energia-6.jpeg",
//         "/projects/padrao-energia/padrao-energia-7.jpeg",
//       ]
//     },
//     {
//       title: "Condomínio Residencial",
//       description: "Sistema completo: elétrica, câmeras, interfonia e redes",
//       images: ["/projects/antena-casa/antena-casa-1.jpeg",
//         "/projects/antena-casa/antena-casa-2.jpeg",
//         "/projects/antena-casa/antena-casa-3.jpeg"
//       ]
//     },
//     {
//       title: "Escritório Corporativo",
//       description: "Infraestrutura tecnológica completa + segurança",
//       images: ["/projects/antena-mikrotik/antena-mikrotik-1.jpeg",
//         "/projects/antena-mikrotik/antena-mikrotik-2.jpeg"
//       ]
//     },
//     {
//       title: "Shopping Center",
//       description: "Redes estruturadas e sistema de monitoramento",
//       images: ["/projects/tecsys/tecsys-1.jpeg"]
//     },
//     {
//       title: "Residência de Alto Padrão",
//       description: "Automação residencial e sistema de entretenimento",
//       images: ["/projects/dijuntores/dijuntores-1.jpeg"]
//     }
//   ];

//   useEffect(() => {
//     setGalleryImage(
//       projects.map(project => ({
//         projectImage: project.images[0],
//         currentImagePos: 0
//       }))
//     )
//   }, [])

//   function swapImage() {
//     setGalleryImage(prev =>
//       projects.map((project, index) => {
//         const current = prev[index] || { currentImagePos: 0 }
//         let nextPos = current.currentImagePos + 1
//         if (!project.images[nextPos]) nextPos = 0
//         return {
//           projectImage: project.images[nextPos],
//           currentImagePos: nextPos
//         }
//       })
//     )
//   }

//   useEffect(() => {
//     if(!toggleDialog && navSelect == "projetos") {
//       const interval = setInterval(swapImage, SWAP_INTERVAL)
//       return () => clearInterval(interval)
//     }
//   }, [projects])

//   function openView(index) {
//     if(window.innerWidth > 720) {
//       setToggleDialog(!toggleDialog)
//       setDisplay({ currentProject: projects[index], galleryImage: galleryImage[index] })
//     }  
//   }

//   return (
//       <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 duration-1000 ${showSection?.projetos || "translate-y-full opacity-0"}`}>
//         {projects.map((project, index) => {
//           return (
//           <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10 cursor-pointer" onClick={() => openView(index)}>
//             <div className="aspect-[4/3] overflow-hidden" draggable={false}>
//               <ImageWithFallback
//                 key={galleryImage[index]?.projectImage}
//                 src={galleryImage[index]?.projectImage}
//                 alt={project.title}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 animate-open"
//               />
//             </div>
//             <CardContent className="p-4">
//               <h3 className="mb-2 text-primary">{project.title}</h3>
//               <p className="text-sm text-muted-foreground">{project.description}</p>
//             </CardContent>
//           </Card>
//         )
//         })}
//       </div>
//   )

// }

// export { Gallery }