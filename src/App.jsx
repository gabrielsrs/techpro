import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Shield, Users, Wrench, Lightbulb, Settings, CheckCircle, Camera, MessageCircle, Monitor, Wifi, Radio, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { toast } from "sonner"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import icon from "./assets/icon.png"

export function App() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    servico: '',
    descricao: ''
  });
  const [navSelect, setNavSelect] = useState("");

  const heroRef = useRef(null);
  const servicosRef = useRef(null);
  const comoTrabalhamosRef = useRef(null);
  const sobreRef = useRef(null);
  const projetosoRef = useRef(null);
  const orcamentoRef = useRef(null);
  
  useEffect(() => {
    function calcScroll() {
      if(window.scrollY < servicosRef.current.offsetTop) setNavSelect("")
      else if(window.scrollY == document.body.offsetHeight - window.innerHeight) setNavSelect("orcamento")
      else if(window.scrollY >= orcamentoRef.current.offsetTop) setNavSelect("orcamento")
      else if(window.scrollY >= projetosoRef.current.offsetTop) setNavSelect("projetos")
      else if(window.scrollY >= sobreRef.current.offsetTop) setNavSelect("sobre")
      else if(window.scrollY >= comoTrabalhamosRef.current.offsetTop) setNavSelect("como-trabalhamos")
      else if(window.scrollY >= servicosRef.current.offsetTop) setNavSelect("servicos")
    }

    window.addEventListener("scroll", calcScroll)
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
    } else {
      toast('Erro ao enviar orçamento.')
    }
  };

  const services = [
    {
      icon: Lightbulb,
      title: "Instalações Elétricas",
      description: "Instalação completa de sistemas elétricos residenciais e comerciais, incluindo tomadas, interruptores, quadros elétricos e iluminação LED.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop",
      serviceType: "eletrica"
    },
    {
      icon: Camera,
      title: "Sistemas de Segurança",
      description: "Instalação de câmeras de segurança, sistemas de alarme, controle de acesso e monitoramento 24h para residências e empresas.",
      image: "https://img.freepik.com/free-photo/portrait-male-security-guard-with-uniform_23-2150368726.jpg",
      serviceType: "seguranca"
    },
    {
      icon: Monitor,
      title: "TV Coletiva e Satélite",
      description: "Sistemas de distribuição de TV coletiva, instalação de antenas parabólicas, decodificadores e soluções de entretenimento.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=500&fit=crop",
      serviceType: "tv-satelite"
    },
    {
      icon: Radio,
      title: "Interfonia e Portaria",
      description: "Sistemas de interfone residencial e condominial, portaria eletrônica, videoporteiros e controle de acesso predial.",
      image: "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-596c-622f-9483-a26880a6feab/raw?se=2025-07-30T00%3A28%3A47Z&sp=r&sv=2024-08-04&sr=b&scid=3cfd5d77-f507-5a7b-a873-9073d7ec53d8&skoid=ea0c7534-f237-4ccd-b7ea-766c4ed977ad&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-29T18%3A51%3A49Z&ske=2025-07-30T18%3A51%3A49Z&sks=b&skv=2024-08-04&sig=BvfN%2Bp4YkXRvFpIyOmKWhok6uj8QNx0a6rv5dLwuDuw%3D",
      serviceType: "interfonia"
    },
    {
      icon: Wifi,
      title: "Redes de Computadores",
      description: "Instalação de redes estruturadas, cabeamento de dados, configuração de Wi-Fi empresarial e soluções de conectividade.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      serviceType: "redes"
    },
    {
      icon: Settings,
      title: "Manutenção Técnica",
      description: "Manutenção preventiva e corretiva de todos os sistemas instalados, suporte técnico e atualizações de equipamentos.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop",
      serviceType: "manutencao"
    }
  ];

  const workProcess = [
    {
      step: "1",
      icon: MessageCircle,
      title: "Primeiro Contato",
      description: "Entre em contato conosco via WhatsApp, telefone ou formulário. Fazemos uma primeira avaliação das suas necessidades."
    },
    {
      step: "2",
      icon: Camera,
      title: "Avaliação e Orçamento",
      description: "Agendamos uma visita técnica gratuita para avaliar o local e elaborar um orçamento detalhado sem compromisso."
    },
    {
      step: "3",
      icon: CheckCircle,
      title: "Execução do Serviço",
      description: "Com a aprovação, executamos o serviço com qualidade, pontualidade e garantia. Emitimos certificado de conclusão."
    }
  ];

  const projects = [
    {
      title: "Condomínio Residencial",
      description: "Sistema completo: elétrica, câmeras, interfonia e redes",
      image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=400&h=300&fit=crop"
    },
    {
      title: "Escritório Corporativo",
      description: "Infraestrutura tecnológica completa + segurança",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    },
    {
      title: "Shopping Center",
      description: "Redes estruturadas e sistema de monitoramento",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
    },
    {
      title: "Residência de Alto Padrão",
      description: "Automação residencial e sistema de entretenimento",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div onClick={() => scrollTo("")}>
              <img src={icon} alt="TechPro Logo" className="h-10 w-10 cursor-pointer"/>
            </div>
            <h1 className="text-xl font-bold text-primary">TechPro Soluções</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <span className={`${navSelect == "servicos" && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors cursor-pointer`} onClick={() => scrollTo("servicos")}>Serviços</span>
            <span className={`${navSelect == "como-trabalhamos" && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors cursor-pointer`} onClick={() => scrollTo("como-trabalhamos")}>Como Trabalhamos</span>
            <span className={`${navSelect == "sobre" && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors cursor-pointer`} onClick={() => scrollTo("sobre")}>Sobre Nós</span>
            <span className={`${navSelect == "projetos" && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors cursor-pointer`} onClick={() => scrollTo("projetos")}>Projetos</span>
            <span className={`${navSelect == "orcamento" && "border-b-[1px] border-b-[#1E3A5F]"} hover:text-primary transition-colors cursor-pointer`} onClick={() => scrollTo("orcamento")}>Orçamento</span>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm hover:text-primary">
              <Phone className="h-4 w-4" />
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
      {/* <section ref={heroRef} className="relative flex justify-center text-primary-foreground py-52 bg-[url(https://t4.ftcdn.net/jpg/08/84/48/39/240_F_884483949_6Gw6kgsy4WtF8eOthRyMvMy7y5BhmPmb.jpg)] bg-no-repeat bg-cover mask-radial-from-regal-blue"> */}
      <section ref={heroRef} className="relative flex justify-center bg-linear-145 from-[#1E3A5F] from-58% to-[#F4B942] to-72% text-primary-foreground py-52">
      {/* <section className="relative flex justify-center bg-gradient-to-br from-primary via-primary to-[#2a4a6b] text-primary-foreground py-40"> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div> */}
        <div className="container px-4 relative z-10">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos soluções tecnológicas completas para residências e empresas, 
              sempre priorizando qualidade, segurança e inovação.
            </p>
          </div>
          
          <div className="relative">
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
                            <service.icon className="h-6 w-6 text-primary drop-shadow-lg" />
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Como Trabalhamos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo simples e transparente, do primeiro contato até a conclusão do seu projeto tecnológico.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workProcess.map((process, index) => (
              <Card key={index} className="text-center border-primary/10">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <process.icon className="h-8 w-8" />
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
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-6 text-primary">Por que escolher a TechPro?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-accent mt-1 flex-shrink-0" style={{ color: '#f4b942' }} />
                  <div>
                    <h3 className="mb-2 text-primary">Experiência Multidisciplinar</h3>
                    <p className="text-muted-foreground">Mais de 15 anos no mercado com expertise em múltiplas áreas tecnológicas integradas.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-accent mt-1 flex-shrink-0" style={{ color: '#f4b942' }} />
                  <div>
                    <h3 className="mb-2 text-primary">Segurança e Conformidade</h3>
                    <p className="text-muted-foreground">Todos os serviços seguem rigorosamente as normas técnicas e de segurança vigentes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-accent mt-1 flex-shrink-0" style={{ color: '#f4b942' }} />
                  <div>
                    <h3 className="mb-2 text-primary">Equipe Especializada</h3>
                    <p className="text-muted-foreground">Técnicos certificados em cada área, em constante atualização com as tecnologias mais recentes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Wrench className="h-6 w-6 text-accent mt-1 flex-shrink-0" style={{ color: '#f4b942' }} />
                  <div>
                    <h3 className="mb-2 text-primary">Garantia Estendida</h3>
                    <p className="text-muted-foreground">3 meses de garantia em todos os serviços.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
                alt="Técnico especializado trabalhando"
                className="rounded-lg shadow-lg w-full h-80 object-cover border-2 border-accent/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projetos Realizados */}
      <section id="projetos" ref={projetosoRef} className="flex justify-center py-40">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Projetos Realizados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira alguns dos nossos trabalhos mais recentes e veja a qualidade e diversidade de soluções que entregamos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-primary">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solicite seu Orçamento */}
      <section id="orcamento" ref={orcamentoRef} className="flex justify-center py-40 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-primary">Solicite seu Orçamento</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha o formulário abaixo ou entre em contato diretamente conosco. 
              Retornaremos o seu contato para o agendamento de uma visita.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulário */}
            <div className="lg:col-span-2">
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
                      <div className="space-y-2">
                        <Label htmlFor="nome" className="text-primary">Nome completo *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          className="border-primary/20 focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone" className="text-primary">Telefone *</Label>
                        <Input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          required
                          value={formData.telefone}
                          onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                          className="border-primary/20 focus:border-accent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-primary">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="border-primary/20 focus:border-accent"
                        />
                      </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="endereco" className="text-primary">Endereço do serviço</Label>
                      <Input
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                        className="border-primary/20 focus:border-accent"
                      />
                    </div>
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
            <div className="space-y-6">
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="text-primary">Contato Direto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-accent" style={{ color: '#f4b942' }} />
                    <div>
                      <p className="font-medium text-primary">(32) 98811-7587</p>
                      <p className="text-sm text-muted-foreground">WhatsApp e chamadas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-accent" style={{ color: '#f4b942' }} />
                    <div>
                      <p className="font-medium text-primary">contato@techpro.com</p>
                      <p className="text-sm text-muted-foreground">Email comercial</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-accent" style={{ color: '#f4b942' }} />
                    <div>
                      <p className="font-medium text-primary">Juiz de Fora - MG</p>
                      <p className="text-sm text-muted-foreground">Atendemos toda a região metropolitana</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-accent" style={{ color: '#f4b942' }} />
                    <div>
                      <p className="font-medium text-primary">Seg à Sex: 8h às 18h</p>
                      <p className="text-sm text-muted-foreground">Agendamentos disponíveis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="flex justify-center bg-primary text-primary-foreground py-12">
        <div className="container flex flex-col gap-20 px-4">
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
                <Instagram className="cursor-pointer hover:text-[#f4b942]"/>
                <Linkedin className="cursor-pointer hover:text-[#f4b942]"/>
                <Facebook className="cursor-pointer hover:text-[#f4b942]"/>
              </div>
            </div>
            
            <div>
              <h4 className="mb-4 text-accent" style={{ color: '#f4b942' }}>Serviços</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Instalações Elétricas</li>
                <li>Sistemas de Segurança</li>
                <li>TV Coletiva e Satélite</li>
                <li>Interfonia e Portaria</li>
                <li>Redes de Computadores</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-accent" style={{ color: '#f4b942' }}>Contato</h4>
              <div className="space-y-3 text-primary-foreground/80">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(32) 98811-7587</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@techpro.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Juiz de Fora - MG</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span><strong className="font-medium">CNPJ</strong>: 00.623.904/0001-73</span>
                </div>
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