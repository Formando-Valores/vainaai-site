import React, { useState } from "react";
import { submitForm } from "./lib/api";
import { Toaster, toast } from "sonner";
import { 
  Home, 
  Users, 
  Briefcase, 
  MapPin, 
  FolderOpen, 
  Newspaper, 
  UserPlus, 
  AlertTriangle, 
  Heart, 
  Phone,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Shield,
  Info,
  Calculator,
  Scale,
  ShoppingCart,
  Gavel,
  Trophy,
  Building,
  Baby,
  Handshake,
  Plane,
  HomeIcon,
  Laptop,
  HardHat,
  Users2,
  PiggyBank
} from "lucide-react";

type Page = 'home' | 'about' | 'services' | 'areas' | 'projects' | 'news' | 'join' | 'report' | 'volunteers' | 'contact';

// Logo component using static assets from /public
function Logo({ size = "w-10 h-10", className = "" }: { size?: string; className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="AI Logo"
      className={`${size} rounded-full object-cover ${className}`}
    />
  );
}

// Page Header component with logo and title
function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-center mb-12">
      <Logo size="w-16 h-16" className="mr-6" />
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-xl text-sky-400 mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home' as Page, label: 'Início', icon: Home },
    { id: 'about' as Page, label: 'Quem Somos', icon: Users },
    { id: 'services' as Page, label: 'Serviços', icon: Briefcase },
    { id: 'areas' as Page, label: 'Áreas de Atuação', icon: MapPin },
    { id: 'projects' as Page, label: 'Projetos', icon: FolderOpen },
    { id: 'news' as Page, label: 'Notícias', icon: Newspaper },
    { id: 'join' as Page, label: 'Associe-se', icon: UserPlus },
    { id: 'report' as Page, label: 'Denuncie', icon: AlertTriangle },
    { id: 'volunteers' as Page, label: 'Voluntários', icon: Heart },
    { id: 'contact' as Page, label: 'Contactos', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 shadow-lg backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Logo />
              <div>
                <h1 className="text-xl font-bold text-white">AI</h1>
                <p className="text-xs text-sky-400 font-medium">Unidos contra as Injustiças</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* CTA Section */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('join')}
                className="btn-primary px-4 py-2 text-sm"
              >
                Associe-se
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-md p-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black border-t border-gray-800">
            <div className="space-y-3 px-3 pb-4 pt-3">
              <button
                onClick={() => {
                  setCurrentPage('join');
                  setMobileMenuOpen(false);
                }}
                className="btn-primary w-full"
              >
                Associe-se
              </button>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <PageContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Logo />
                <div>
                  <h3 className="text-xl font-bold">AI</h3>
                  <p className="text-sky-400 text-sm">Unidos contra as Injustiças</p>
                </div>
              </div>
              <p className="text-sky-300 mb-4 text-justified">
                Organização dedicada à promoção da justiça social e defesa dos direitos dos cidadãos.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1FELtv6TMH/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 text-gray-400 hover:text-sky-400 cursor-pointer" />
                </a>
                <Twitter className="w-6 h-6 text-gray-400 hover:text-sky-400 cursor-pointer" />
                <a href="https://www.instagram.com/ai.associacaocontrainjusticas?utm_source=qr&igsh=bnE4ZmVzaTVtZDMy" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 text-gray-400 hover:text-sky-400 cursor-pointer" />
                </a>
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-sky-400 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('about')} className="text-sky-300 hover:text-white">Quem Somos</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="text-sky-300 hover:text-white">Serviços</button></li>
                <li><button onClick={() => setCurrentPage('join')} className="text-sky-300 hover:text-white">Associe-se</button></li>
                <li><button onClick={() => setCurrentPage('report')} className="text-sky-300 hover:text-white">Denuncie</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-sky-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@vainaai.pt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+351 916 068 515</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sky-400">
            <p>&copy; 2025 AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

function PageContent({ currentPage, setCurrentPage }: { currentPage: Page; setCurrentPage: (page: Page) => void }) {
  switch (currentPage) {
    case 'home':
      return <HomePage setCurrentPage={setCurrentPage} />;
    case 'about':
      return <AboutPage />;
    case 'services':
      return <ServicesPage />;
    case 'areas':
      return <AreasPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'news':
      return <NewsPage />;
    case 'join':
      return <JoinPage />;
    case 'report':
      return <ReportPage />;
    case 'volunteers':
      return <VolunteersPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage setCurrentPage={setCurrentPage} />;
  }
}

function HomePage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  return (
    <div className="relative min-h-screen home-hero-bg">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/65"></div>
      {/* Hero Section */}
      <section className="content-section relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Logo size="w-48 h-48" className="mx-auto mb-8" />
            <h1 
              className="text-8xl font-black mb-6" 
              style={{ 
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: '#87ceeb',
                textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000',
                WebkitTextStroke: '2px #000'
              }}
            >
              AI
            </h1>
            <p 
              className="text-4xl font-black" 
              style={{ 
                fontFamily: 'Impact, "Arial Black", sans-serif',
                color: '#87ceeb',
                textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 1px 1px 0px #000',
                WebkitTextStroke: '1px #000'
              }}
            >
              Unidos contra as Injustiças
            </p>
          </div>
          
          <p className="surface-panel mb-10 mx-auto max-w-3xl text-justify text-lg leading-relaxed text-sky-50">
            Defendemos os direitos dos cidadãos e promovemos a justiça social através de ações concretas e transparentes.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setCurrentPage('join')}
              className="btn-primary px-8 py-4 text-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>👉 Associe-se</span>
            </button>
            <button
              onClick={() => setCurrentPage('report')}
              className="btn-secondary px-8 py-4 text-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>👉 Denuncie as ilegalidades</span>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-tertiary px-8 py-4 text-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span>👉 Precisa de ajuda? Contacte-nos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent mb-4">Como Podemos Ajudar</h2>
            <p className="surface-panel inline-block text-lg text-sky-50">Conheça os nossos principais serviços</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="surface-panel text-center">
              <Briefcase className="w-12 h-12 text-sky-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Consultoria Jurídica</h3>
              <p className="text-sky-100 text-justified">Orientação legal gratuita para cidadãos em situação de vulnerabilidade.</p>
            </div>
            
            <div className="surface-panel text-center">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Canal de Denúncias</h3>
              <p className="text-sky-100 text-justified">Plataforma segura para reportar irregularidades e injustiças.</p>
            </div>
            
            <div className="surface-panel text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">Apoio Social</h3>
              <p className="text-sky-100 text-justified">Programas de assistência e apoio às comunidades mais necessitadas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Quem Somos" subtitle="Conheça a nossa missão, visão e valores" />

        <div className="prose prose-lg max-w-none">
          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">Quem Somos</h2>
            <p className="text-sky-700 mb-4 text-justified">
              A Associação contra as Injustiças – AI é uma entidade independente, de âmbito nacional e europeu, 
              que defende os direitos de cidadãos e imigrantes contra ilegalidades do poder público e privado.
            </p>
            <p className="text-sky-700 mb-6 text-justified">
              Com uma equipa de mais de 20 especialistas, prestamos serviços jurídicos, de mediação e fiscalização 
              de processos administrativos e fiscais, assegurando justiça acessível, transparente e de qualidade.
            </p>
          </div>

          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">Nossa Missão</h2>
            <p className="text-sky-700 mb-6 text-justified">
              Defender os direitos de todos, garantindo acesso à justiça com simplicidade e baixo custo.
            </p>
          </div>

          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">Nossa Visão</h2>
            <p className="text-sky-700 mb-6 text-justified">
              Ser referência em Portugal e na União Europeia na luta contra injustiças e ilegalidades.
            </p>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">Justiça</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">Transparência</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">Solidariedade</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">Ética</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">Acessibilidade</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  const services = [
    {
      title: "Apoio jurídico em tribunais e órgãos públicos",
      description: "Representação e assistência jurídica especializada em processos judiciais e administrativos.",
      icon: Briefcase,
      color: "sky"
    },
    {
      title: "Consultoria e mediação de conflitos",
      description: "Resolução pacífica de disputas através de mediação especializada e consultoria jurídica.",
      icon: Users,
      color: "sky"
    },
    {
      title: "Fiscalização de contas públicas e processos administrativos",
      description: "Monitorização e auditoria de processos públicos para garantir transparência e legalidade.",
      icon: FolderOpen,
      color: "sky"
    },
    {
      title: "Coordenação e execução de projetos de interesse público",
      description: "Desenvolvimento e implementação de iniciativas que beneficiam a comunidade.",
      icon: Heart,
      color: "sky"
    },
    {
      title: "Formação e informação jurídica acessíveis",
      description: "Programas educativos sobre direitos fundamentais e cidadania para todos.",
      icon: Newspaper,
      color: "sky"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Serviços ao Associado" subtitle="Conheça como podemos ajudá-lo" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full text-sky-600 bg-sky-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sky-600 text-justified">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AreasPage() {
  const areas = [
    { name: "Consultoria Jurídica & Conciliação", icon: Handshake },
    { name: "Administrativo e Fiscal", icon: Calculator },
    { name: "Cível", icon: Scale },
    { name: "Compliance e LGPD", icon: Shield },
    { name: "Direito do Consumidor", icon: ShoppingCart },
    { name: "Criminal", icon: Gavel },
    { name: "Desportivo", icon: Trophy },
    { name: "Empresarial", icon: Building },
    { name: "Família", icon: Baby },
    { name: "Mediação & Arbitragem", icon: Handshake },
    { name: "Imigração", icon: Plane },
    { name: "Imobiliário", icon: HomeIcon },
    { name: "Tecnologia & Sistemas de Informação", icon: Laptop },
    { name: "Trabalho", icon: HardHat },
    { name: "Relações Governamentais & Cooperativismo", icon: Users2 },
    { name: "Segurança Social", icon: PiggyBank }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Áreas de Atuação Jurídica" subtitle="Especialidades jurídicas em que atuamos" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{area.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const projects = [
    {
      title: "Justiça Digital",
      description: "Plataforma online para facilitar o acesso à justiça através de tecnologia.",
      status: "Em andamento",
      progress: 75
    },
    {
      title: "Educação Jurídica Comunitária",
      description: "Programa de educação em direitos para comunidades carentes.",
      status: "Concluído",
      progress: 100
    },
    {
      title: "Centro de Mediação",
      description: "Criação de centro especializado em mediação de conflitos.",
      status: "Planejamento",
      progress: 25
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Nossos Projetos" subtitle="Iniciativas que transformam a sociedade" />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                  project.status === 'Em andamento' ? 'bg-sky-100 text-sky-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sky-600 mb-4 text-justified">{project.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-sky-500 mt-2">{project.progress}% concluído</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsPage() {
  const news = [
    {
      title: "Injustiças da CPAS: Denúncias e Irregularidades",
      date: "Janeiro, 2025",
      summary: "Documentação de casos de má gestão e irregularidades na Caixa de Previdência dos Advogados e Solicitadores.",
      category: "Denúncias",
      content: "A CPAS tem sido alvo de múltiplas denúncias relacionadas com a gestão de fundos de pensões e benefícios dos seus associados. Casos documentados incluem atrasos no pagamento de pensões, falta de transparência na gestão financeira e dificuldades no acesso aos direitos dos beneficiários."
    },
    {
      title: "Problemas Estruturais na Gestão da CPAS",
      date: "Dezembro, 2024",
      summary: "Análise dos principais problemas identificados na estrutura organizacional e processos da CPAS.",
      category: "Análise",
      content: "Foram identificados problemas sistemáticos na gestão da CPAS, incluindo falta de auditoria independente, processos burocráticos excessivos e ausência de mecanismos eficazes de reclamação para os associados."
    },
    {
      title: "Direitos dos Associados da CPAS",
      date: "Novembro, 2024",
      summary: "Guia completo sobre os direitos dos associados e como proceder em caso de violação dos mesmos.",
      category: "Direitos",
      content: "Os associados da CPAS têm direito a informação transparente sobre a gestão dos seus fundos, acesso atempado aos benefícios e um processo justo de reclamação. Este guia detalha como exercer estes direitos e onde procurar ajuda."
    },
    {
      title: "Casos de Sucesso: Recuperação de Benefícios",
      date: "Outubro, 2024",
      summary: "Exemplos de casos onde foi possível recuperar benefícios negados ou atrasados pela CPAS.",
      category: "Casos de Sucesso",
      content: "Através de ação legal adequada e persistência, vários associados conseguiram recuperar benefícios que lhes tinham sido negados ou atrasados pela CPAS. Estes casos demonstram a importância de conhecer os seus direitos e procurar apoio jurídico especializado."
    },
    {
      title: "Reforma do Sistema de Previdência dos Advogados",
      date: "Setembro, 2024",
      summary: "Propostas para reforma estrutural do sistema de previdência para advogados e solicitadores.",
      category: "Propostas",
      content: "É urgente uma reforma profunda do sistema de previdência dos advogados, incluindo maior transparência, auditoria independente, simplificação de processos e criação de mecanismos eficazes de proteção dos direitos dos associados."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Notícias" subtitle="Informações sobre injustiças da CPAS e direitos dos associados" />

        <div className="space-y-8">
          {news.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  article.category === 'Denúncias' ? 'bg-red-100 text-red-800' :
                  article.category === 'Análise' ? 'bg-blue-100 text-blue-800' :
                  article.category === 'Direitos' ? 'bg-green-100 text-green-800' :
                  article.category === 'Casos de Sucesso' ? 'bg-purple-100 text-purple-800' :
                  'bg-sky-100 text-sky-800'
                }`}>
                  {article.category}
                </span>
                <time className="text-sky-500 text-sm">{article.date}</time>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h2>
              <p className="text-sky-600 text-lg mb-4 text-justified">{article.summary}</p>
              <p className="text-gray-700 text-justified">{article.content}</p>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-sky-600">
                  <strong>Precisa de ajuda com questões relacionadas à CPAS?</strong> Entre em contacto connosco para orientação jurídica especializada.
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Tem uma situação similar?</h3>
              <p className="text-yellow-700 text-justified mb-4">
                Se está a enfrentar problemas com a CPAS ou outras entidades, não hesite em contactar-nos. 
                Oferecemos consultoria jurídica especializada e apoio na defesa dos seus direitos.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:contato@vainaai.pt" className="text-yellow-800 font-medium hover:text-yellow-900">
                  📧 contato@vainaai.pt
                </a>
                <span className="text-yellow-800 font-medium">
                  📞 +351 916 068 515
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JoinPage() {
  const sendAssociationForm = (payload: Record<string, unknown>) => submitForm("/api/association", payload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    documentType: '',
    documentNumber: '',
    nif: '',
    address: '',
    postalCode: '',
    phone: '',
    email: '',
    maritalStatus: '',
    profession: '',
    nationality: '',
    memberType: '',
    agreeTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error('Deve concordar com os termos do Estatuto Social para prosseguir.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await sendAssociationForm({
        fullName: formData.fullName,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        nif: formData.nif,
        address: formData.address,
        postalCode: formData.postalCode,
        phone: formData.phone,
        email: formData.email,
        maritalStatus: formData.maritalStatus,
        profession: formData.profession,
        nationality: formData.nationality,
        memberType: formData.memberType,
      });
      
      toast.success('Formulário de associação enviado com sucesso! Entraremos em contacto em breve para finalizar o processo.');
      setFormData({
        fullName: '',
        documentType: '',
        documentNumber: '',
        nif: '',
        address: '',
        postalCode: '',
        phone: '',
        email: '',
        maritalStatus: '',
        profession: '',
        nationality: '',
        memberType: '',
        agreeTerms: false
      });
    } catch (error) {
      toast.error('Erro ao enviar formulário. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Associe-se" subtitle="Junte-se à nossa causa e faça a diferença" />

        <div className="surface-card p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Formulário de Associação</h2>
              <p className="text-sky-600 mb-6 text-justified">
                Preencha o formulário abaixo para se tornar membro da AI - Associação contra as Injustiças.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Tipo de Documento <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="bi">Bilhete de Identidade</option>
                    <option value="cc">Cartão de Cidadão</option>
                    <option value="passaporte">Passaporte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Número do Documento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    NIF <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nif}
                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Morada <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Rua, número, andar..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Código Postal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="0000-000"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Telemóvel <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="+351 XXX XXX XXX"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Correio Eletrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Estado Civil <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Selecione</option>
                    <option value="solteiro">Solteiro(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viuvo">Viúvo(a)</option>
                    <option value="uniao_facto">União de Facto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Profissão <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Nacionalidade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Tipo de Associação <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.memberType}
                    onChange={(e) => setFormData({ ...formData, memberType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="cliente">Cliente</option>
                    <option value="prestador">Prestador de Serviços</option>
                  </select>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-5 h-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1"
                    required
                    disabled={isSubmitting}
                  />
                  <div>
                    <label htmlFor="agreeTerms" className="text-sm text-sky-800 font-medium">
                      Concordo com os termos <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-sky-700 mt-2 text-justified">
                      <strong>AVISO:</strong> Concorda com os termos do Estatuto Social da entidade e com o pagamento da taxa de adesão para associado efetivo, estando isento das jóias enquanto cliente ou prestador de serviços junto à AI, para fazer jus aos benefícios, serviços e valores aplicados na tabela de valores mínimos da entidade.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Formulário de Associação'}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
}

function ReportPage() {
  const sendReportForm = (payload: Record<string, unknown>) => submitForm("/api/report", payload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    phone: '',
    anonymous: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação: se não for anônimo, telefone é obrigatório
    if (!formData.anonymous && !formData.phone.trim()) {
      toast.error('Para prosseguir com a consultoria, é necessário fornecer um telefone de contacto.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await sendReportForm({
        type: formData.type,
        description: formData.description,
        location: formData.location,
        phone: formData.phone || undefined,
        anonymous: formData.anonymous,
      });
      
      toast.success('Denúncia enviada com sucesso! Obrigado por nos ajudar a combater as injustiças.');
      setFormData({ type: '', description: '', location: '', phone: '', anonymous: false });
    } catch (error) {
      toast.error('Erro ao enviar denúncia. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Canal de Denúncias" subtitle="Reporte irregularidades de forma segura e confidencial" />

        <div className="surface-card p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Informação Importante</h3>
                <p className="text-yellow-700 text-sm mt-1 text-justified">
                  Todas as denúncias são tratadas com total confidencialidade. 
                  Você pode optar por permanecer anônimo.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Tipo de Irregularidade
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                required
                disabled={isSubmitting}
              >
                <option value="">Selecione o tipo</option>
                <option value="corruption">Corrupção</option>
                <option value="discrimination">Discriminação</option>
                <option value="abuse">Abuso de Poder</option>
                <option value="fraud">Fraude</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Descrição Detalhada
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Descreva a situação com o máximo de detalhes possível..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                Local da Ocorrência
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Cidade, bairro, instituição..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                disabled={isSubmitting}
              />
              <label htmlFor="anonymous" className="text-sm text-sky-700">
                Desejo permanecer anônimo
              </label>
            </div>

            {/* Aviso para denúncias anônimas */}
            {formData.anonymous && (
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sky-800 mb-2">Denúncia Anônima</h4>
                    <p className="text-sky-700 text-sm mb-3 text-justified">
                      Recebemos a sua denúncia e iremos analisá-la. Para efetivar a nossa ajuda e prestar 
                      serviços de consultoria, será necessário fornecer um contacto telefónico posteriormente.
                    </p>
                    <div className="flex items-center space-x-2 text-sky-700 text-sm">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Garantimos total sigilo e proteção dos seus dados pessoais</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campo de telefone obrigatório quando não é anônimo */}
            {!formData.anonymous && (
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Telefone de Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="+351 XXX XXX XXX"
                  required={!formData.anonymous}
                  disabled={isSubmitting}
                />
                <p className="text-sm text-sky-600 mt-1 text-justified">
                  Necessário para prosseguir com a consultoria e registo do serviço.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Denúncia'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function VolunteersPage() {
  const sendVolunteerForm = (payload: Record<string, unknown>) => submitForm("/api/volunteer", payload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    availability: '',
    experience: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await sendVolunteerForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        area: formData.area,
        availability: formData.availability,
        experience: formData.experience,
      });
      
      toast.success('Inscrição enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', area: '', availability: '', experience: '' });
    } catch (error) {
      toast.error('Erro ao enviar inscrição. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Programa de Voluntários" subtitle="Faça parte da mudança que você quer ver no mundo" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que ser Voluntário?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Impacto Social</h3>
                  <p className="text-sky-600 text-justified">Contribua diretamente para a construção de uma sociedade mais justa.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Networking</h3>
                  <p className="text-sky-600 text-justified">Conecte-se com pessoas que compartilham dos mesmos valores.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Desenvolvimento</h3>
                  <p className="text-sky-600 text-justified">Desenvolva novas habilidades e ganhe experiência valiosa.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Áreas de Atuação</h3>
              <ul className="space-y-2 text-sky-600">
                <li>• Atendimento ao público</li>
                <li>• Pesquisa jurídica</li>
                <li>• Comunicação e marketing</li>
                <li>• Organização de eventos</li>
                <li>• Apoio administrativo</li>
                <li>• Tradução e interpretação</li>
              </ul>
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Inscreva-se como Voluntário</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Área de Interesse</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione uma área</option>
                  <option value="atendimento">Atendimento ao Público</option>
                  <option value="pesquisa">Pesquisa Jurídica</option>
                  <option value="comunicacao">Comunicação</option>
                  <option value="eventos">Organização de Eventos</option>
                  <option value="administrativo">Apoio Administrativo</option>
                  <option value="traducao">Tradução</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Disponibilidade</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione sua disponibilidade</option>
                  <option value="manhã">Manhã</option>
                  <option value="tarde">Tarde</option>
                  <option value="noite">Noite</option>
                  <option value="fins-semana">Fins de Semana</option>
                  <option value="flexivel">Horário Flexível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Experiência Relevante</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Descreva sua experiência relevante (opcional)"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const sendContactForm = (payload: Record<string, unknown>) => submitForm("/api/contact", payload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await sendContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      
      toast.success('Mensagem enviada com sucesso! Responderemos em breve.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      name: "Lisboa – Sede",
      address: "Avenida Dom Dinis, 68A, sala 28\nCentro Comercial Oceano\nOdivelas, CP. 2675-328, Lisboa",
      type: "Sede"
    },
    {
      name: "Lisboa – Delegação",
      address: "Avenida Barbosa Du Bocage, 113\n5º dto, CP. 1050-031, Lisboa",
      type: "Delegação"
    },
    {
      name: "Porto – Delegação",
      address: "Rua de Angola, nº 164B, sala 25\nMafamude, 4430-014\nVila Nova de Gaia, Porto",
      type: "Delegação"
    },
    {
      name: "Leiria – Delegação",
      address: "Rua Vasco da Gama Lote 6\n1 Esquerdo, CP. 2415-823 Leiria",
      type: "Delegação"
    },
    {
      name: "Braga – Delegação",
      address: "Rua Engenheiro José Justino de Amorim\nnº 94, 4º andar esquerdo\n4715-023, Braga",
      type: "Delegação"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="Contactos" subtitle="Entre em contacto connosco" />

        {/* Main Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contacto</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-sky-600">contato@vainaai.pt</p>
                  <p className="text-sky-600">juridico@vainaai.pt</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefone/WhatsApp</h3>
                  <p className="text-sky-600">+351 916 068 515</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Site Oficial</h3>
                  <a href="https://www.vainaai.pt" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800">
                    www.vainaai.pt
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Horário de Atendimento</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sky-600 mb-2"><strong>Segunda a Sexta:</strong> 9:00 - 18:00</p>
                <p className="text-sky-600 mb-2"><strong>Sábado:</strong> 9:00 - 13:00</p>
                <p className="text-sky-600"><strong>Domingo:</strong> Fechado</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1FELtv6TMH/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer" />
                </a>
                <Twitter className="w-8 h-8 text-sky-400 hover:text-sky-600 cursor-pointer" />
                <a href="https://www.instagram.com/ai.associacaocontrainjusticas?utm_source=qr&igsh=bnE4ZmVzaTVtZDMy" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-8 h-8 text-pink-600 hover:text-pink-800 cursor-pointer" />
                </a>
                <Linkedin className="w-8 h-8 text-blue-700 hover:text-blue-900 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie-nos uma Mensagem</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Assunto</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">Mensagem</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Escreva a sua mensagem aqui..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>

        {/* Offices Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sede e Delegações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{office.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      office.type === 'Sede' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {office.type}
                    </span>
                  </div>
                </div>
                <p className="text-sky-600 text-sm whitespace-pre-line">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
