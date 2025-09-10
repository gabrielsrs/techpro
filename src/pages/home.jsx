import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Shield, Star, Users, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import icon from "../assets/icon.png";
import { Gallery } from '../components/gallery';
import { Particle } from '../components/particle';
import { AboutUsTopics } from '../components/sub-components/about-us-topics';
import { Contact } from '../components/sub-components/contact';
import { ContactDescription } from '../components/sub-components/contact-description';
import { IconMap } from '../components/sub-components/icon-map';
import { ImageWithFallback } from '../components/sub-components/ImageWithFallback';
import { InputForm } from '../components/sub-components/input-form';
import { NavLink } from '../components/sub-components/nav-link';
import { SocialLink } from '../components/sub-components/social-link';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import services from "../data/services.json";
import workProcess from "../data/work-progress.json";


export function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    servico: '',
    descricao: ''
  });
  const [navSelect, setNavSelect] = useState("");
  const [showSection, setShowSection] = useState({})

  const servicosRef = useRef(null);
  const comoTrabalhamosRef = useRef(null);
  const sobreRef = useRef(null);
  const projetosoRef = useRef(null);
  const orcamentoRef = useRef(null);

  
  useEffect(() => {
    
    function calcScroll() {
      const roundedScrollY = window.scrollY + 5
      if(roundedScrollY < servicosRef.current.offsetTop) setNavSelect("")
      else if(roundedScrollY >= document.body.offsetHeight - window.innerHeight) setNavSelect("orcamento")
      else if(roundedScrollY >= orcamentoRef.current.offsetTop) setNavSelect("orcamento")
      else if(roundedScrollY >= projetosoRef.current.offsetTop) setNavSelect("projetos")
      else if(roundedScrollY >= sobreRef.current.offsetTop) setNavSelect("sobre")
      else if(roundedScrollY >= comoTrabalhamosRef.current.offsetTop) setNavSelect("como-trabalhamos")
      else if(roundedScrollY >= servicosRef.current.offsetTop) setNavSelect("servicos")
    }

    window.addEventListener("scroll", calcScroll)

    const observers = []
    const sections = [servicosRef, comoTrabalhamosRef, sobreRef, projetosoRef, orcamentoRef]

    sections.forEach((section) => {
      const elementOne = section.current.firstChild.firstChild
      if (!elementOne) return;

      const elementTwo = section.current.firstChild.lastChild
      if (!elementTwo) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const parentRef = entry.target.parentElement.parentElement.id
            if(parentRef == "servicos") {
              setShowSection(previous => ({...previous, servicos: "translate-y-0 opacity-100" }))
            } else if(parentRef == "como-trabalhamos") {
              setShowSection(previous => ({...previous, comoTrabalhamos: "translate-y-0 opacity-100" }))
            } else if(parentRef == "sobre") {
              setShowSection(previous => ({...previous, sobre: "translate-x-0 opacity-100" }))
            } else if(parentRef == "projetos") {
              setShowSection(previous => ({...previous, projetos: "translate-y-0 opacity-100" }))
            } else if(parentRef == "orcamento") {
              setShowSection(previous => ({...previous, orcamento: "translate-y-0 translate-x-0 opacity-100" }))
            }
            observer.unobserve(entry.target)
          }
        }
      )

      observer.observe(elementOne);
      observers.push(observer);

      observer.observe(elementTwo);
      observers.push(observer);
    })

    return () => observers.forEach((o) => o.disconnect())

  }, [])

  const scrollTo = (target, servicoTipo="") => {
    switch (target) {
      case "servicos":
        servicosRef.current && servicosRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case "como-trabalhamos":
        comoTrabalhamosRef.current && comoTrabalhamosRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case "sobre":
        sobreRef.current && sobreRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case "projetos":
        projetosoRef.current && projetosoRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case "orcamento":
        if(orcamentoRef.current) {
          setFormData(prev => ({ ...prev, servico: servicoTipo }));
          orcamentoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setNavSelect("")
    }
  }  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://formsubmit.co/ajax/gueibrisuel@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      toast('Solicitação enviada! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        endereco: '',
        servico: '',
        descricao: ''
      })
    } else {
      toast('Erro ao enviar orçamento.')
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full flex justify-center border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex gap-2 h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div onClick={() => scrollTo("")} className="flex">
              <img src={icon} alt="TechPro Logo" className="h-10 w-10 cursor-pointer shrink-0"/>
            </div>
            <h1 className="text-xl font-bold text-primary">TechPro Soluções</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink navSelect={navSelect} selected={"servicos"} content={"Serviços"} scrollTo={scrollTo}/>
            <NavLink navSelect={navSelect} selected={"como-trabalhamos"} content={"Como Trabalhamos"} scrollTo={scrollTo}/>
            <NavLink navSelect={navSelect} selected={"sobre"} content={"Sobre Nós"} scrollTo={scrollTo}/>
            <NavLink navSelect={navSelect} selected={"projetos"} content={"Projetos"} scrollTo={scrollTo}/>
            <NavLink navSelect={navSelect} selected={"orcamento"} content={"Orçamento"} scrollTo={scrollTo}/>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm hover:text-primary">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">(32) 98811-7587</span>
            </div>
            <Button style={{ backgroundColor: '#25D366' }} className="text-white hover:opacity-90" onClick={() => window.open("https://wa.me/32988117587", "_blank")}>
              <MessageCircle className="h-4 w-4 mr-1.5" />
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}      
      <section className="relative flex justify-center bg-[#1E3A5F] text-primary-foreground py-52">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/10 z-2"></div>
        <div className="absolute top-0 left-0 w-full h-full mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent bg-[url(/header.jpeg)] bg-no-repeat bg-cover bg-top text-primary-foreground py-52 z-1"></div>
        <Particle id="particle-header"/>
        
        <div className="container px-4 relative z-10"> {/* z-10 */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Soluções Tecnológicas Completas
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Mais de 15 anos oferecendo serviços especializados em elétrica, segurança, redes, TV e interfonia. 
              Qualidade garantida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" style={{ backgroundColor: '#f4b942', color: '#1e3a5f' }} className="hover:opacity-90" onClick={() => scrollTo('orcamento')}>
                <Phone className="h-5 w-5 mr-2" />
                Solicitar Orçamento
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-primary-foreground/80 " onClick={() => window.open("https://wa.me/32988117587", "_blank")}>
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Serviços - Carrossel */}
      <section id="servicos" ref={servicosRef} className="flex justify-center py-40 bg-muted/30">
        <div className="container px-4">
          <div className={`text-center mb-16 duration-1000 ${showSection?.servicos || "translate-y-full opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções tecnológicas completas para residências e empresas, 
              sempre priorizando qualidade, segurança e inovação.
            </p>
          </div>
          
          <div className={`relative duration-1500 ${showSection?.servicos || "translate-y-full opacity-0"}`}>
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {services.map((service, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full border-primary/10">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <div className="p-2 rounded-full" style={{ backgroundColor: '#f4b942' }}>
                            <IconMap iconName={service.icon} className="h-6 w-6 text-primary drop-shadow-lg" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-medium mb-2 drop-shadow-lg">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <CardDescription className="text-base mb-4 min-h-[4.5rem]">
                          {service.description}
                        </CardDescription>
                        <Button 
                          className="w-full"
                          style={{ backgroundColor: '#f4b942', color: '#1e3a5f' }}
                          onClick={() => scrollTo("orcamento", service.serviceType)}
                        >
                          Solicitar Orçamento
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Como Trabalhamos */}
      <section id="como-trabalhamos" ref={comoTrabalhamosRef} className="flex justify-center py-40">
        <div className="container px-4">
          <div className={`text-center mb-16 duration-1000 ${showSection?.comoTrabalhamos || "translate-y-full opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Como Trabalhamos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo simples e transparente, do primeiro contato até a conclusão do seu projeto tecnológico.
            </p>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 duration-1500 ${showSection?.comoTrabalhamos || "translate-y-full opacity-0"}`}>
            {workProcess.map((process, index) => (
              <Card key={index} className="text-center border-primary/10 hover:shadow-lg hover:border-accent/50">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <IconMap iconName={process.icon} className="h-8 w-8" />
                  </div>
                  <Badge variant="outline" className="mx-auto mb-2 w-fit border-accent text-accent" style={{ borderColor: '#f4b942', color: '#f4b942' }}>
                    Etapa {process.step}
                  </Badge>
                  <CardTitle className="text-primary">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {process.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" ref={sobreRef} className="flex justify-center py-40 bg-muted/30">
        <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`duration-1000 ${showSection?.sobre || "-translate-x-full opacity-0"}`}>
              <h2 className="text-3xl md:text-4xl mb-6 text-primary">Por que escolher a TechPro?</h2>
              <div className="space-y-6">
                <AboutUsTopics icon={Star} title={"Experiência Multidisciplinar"} description={"Mais de 15 anos no mercado com expertise em múltiplas áreas tecnológicas integradas."}/>
                <AboutUsTopics icon={Shield} title={"Segurança e Conformidade"} description={"Todos os serviços seguem rigorosamente as normas técnicas e de segurança vigentes."}/>
                <AboutUsTopics icon={Users} title={"Equipe Especializada"} description={"Técnicos certificados em cada área, em constante atualização com as tecnologias mais recentes."}/>
                <AboutUsTopics icon={Wrench} title={"Garantia Estendida"} description={"Oferecemos 3 meses de garantia para assegurar a qualidade dos nossos serviços."}/>
              </div>
            </div>
            <div className={`relative duration-1000 ${showSection?.sobre || "translate-x-full opacity-0"}`}>
              <ImageWithFallback
                src="/services/manutencao-tecnica.jpg"
                alt="Técnico especializado trabalhando"
                className="rounded-lg shadow-lg w-full h-80 object-cover border-2 border-accent/20"
              />
            </div>
        </div>
      </section>

      {/* Projetos Realizados */}
      <section id="projetos" ref={projetosoRef} className="flex justify-center py-40">
        <div className="container px-4">
          <div className={`text-center mb-16 duration-1000 ${showSection?.projetos || "translate-y-full opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Projetos Realizados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes e veja a qualidade e diversidade de soluções que entregamos.
            </p>
          </div>
          <Gallery showSection={showSection} navSelect={navSelect}/>
        </div>
      </section>

      {/* Solicite seu Orçamento */}
      <section id="orcamento" ref={orcamentoRef} className="flex justify-center py-40 bg-muted/30">
        <div className="container px-4">
          <div className={`text-center mb-16 duration-1000 ${showSection?.orcamento || "translate-y-full opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Solicite seu Orçamento</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha o formulário abaixo ou entre em contato diretamente conosco. 
              Retornaremos o seu contato para o agendamento de uma visita.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulário */}
            <div className={`lg:col-span-2 duration-1000 ${showSection?.orcamento || "-translate-x-full opacity-0"}`}>
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-primary">Formulário de Orçamento</CardTitle>
                  <CardDescription>
                    Preencha as informações para recebermos sua solicitação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputForm name={"nome"} content={"Nome completo *"} formData={formData} setFormData={setFormData} required={true}/>
                        <InputForm name={"telefone"} type={"tel"} content={"Telefone *"} formData={formData} setFormData={setFormData} required={true}/>
                        <InputForm name={"email"} type={"email"} content={"Email"} formData={formData} setFormData={setFormData}/>
                      <div className="space-y-2">
                        <Label htmlFor="servico" className="text-primary">Tipo de Serviço</Label>
                        <select
                          id="servico"
                          name="servico"
                          className="w-full h-10 px-3 py-2 bg-input-background border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                          value={formData.servico}
                          required
                          onChange={(e) => setFormData({...formData, servico: e.target.value})}
                        >
                          <option value="">Selecione um serviço</option>
                          <option value="eletrica">Instalações Elétricas</option>
                          <option value="seguranca">Sistemas de Segurança</option>
                          <option value="tv-satelite">TV Coletiva e Satélite</option>
                          <option value="interfonia">Interfonia e Portaria</option>
                          <option value="redes">Redes de Computadores</option>
                          <option value="manutencao">Manutenção Técnica</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>
                        <InputForm name={"endereco"} content={"Endereço do serviço"} formData={formData} setFormData={setFormData}/>
                    <div className="space-y-2">
                      <Label htmlFor="descricao" className="text-primary">Descrição do serviço *</Label>
                      <Textarea
                        id="descricao"
                        name="descricao"
                        required
                        rows={4}
                        placeholder="Descreva detalhadamente o serviço que precisa..."
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        className="border-primary/20 focus:border-accent"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" style={{ backgroundColor: '#f4b942', color: '#1e3a5f' }}>
                      Solicitar Orçamento Gratuito
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informações de Contato */}
            <div className={`space-y-6 duration-2000 ${showSection?.orcamento || "translate-x-full opacity-0"}`}>
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-primary">Contato Direto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ContactDescription icon={Phone} title={"(32) 98811-7587"} description={"WhatsApp e chamadas"}/>
                    <ContactDescription icon={Mail} title={"contato@techpro.com.br"} description={"Email comercial"}/>
                    <ContactDescription icon={MapPin} title={"Juiz de Fora - MG"} description={"Atendemos toda a região metropolitana"}/>
                    <ContactDescription icon={Clock} title={"Seg à Sex: 8h às 18h"} description={"Agendamentos disponíveis"}/>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="relative flex justify-center bg-[#1E3A5F] text-primary-foreground py-12">
        <Particle id="particle-footer"/>
        <div className="container flex flex-col gap-20 px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={icon} alt="TechPro Logo" className="h-10 w-10" />
                <h3 className="text-2xl">TechPro Soluções</h3>
              </div>
              <p className="text-primary-foreground/80 mb-4 max-w-md">
                Especialistas em soluções tecnológicas integradas com mais de 15 anos de experiência. 
                Qualidade, segurança e inovação em cada projeto.
              </p>
              <div className="flex space-x-4">
                <SocialLink icon={Instagram}/>
                <SocialLink icon={Linkedin}/>
                <SocialLink icon={Facebook}/>
              </div>
            </div>
            
            <div>
              <h4 className="mb-4 text-accent" style={{ color: '#f4b942' }}>Serviços</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                {services.map(service => <li>{service.title}</li>)}
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-accent" style={{ color: '#f4b942' }}>Contato</h4>
              <div className="space-y-3 text-primary-foreground/80">
                <Contact icon={Phone} text={"(32) 98811-7587"}/>
                <Contact icon={Mail} text={"contato@techpro.com.br"}/>
                <Contact icon={MapPin} text={"Juiz de Fora - MG"}/>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2025 TechPro Soluções. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}