import React, { createContext, useContext, useState } from "react";

import { submitForm } from "./lib/api";
import { Toaster, toast } from "sonner";
import 'animate.css';
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
  Lock,
  CheckCircle2,
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

// ===== Types =====
type Locale = 'pt-BR' | 'pt-PT' | 'es';
type Page = 'home' | 'about' | 'services' | 'areas' | 'projects' | 'news' | 'join' | 'report' | 'volunteers' | 'contact' | 'privacy';

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
} | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageContext.Provider");
  }

  return context;
}

// ===== Shared UI: Page Header =====
// Page Header component with logo and title
function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  return (
    <div className="mb-12 flex items-center border-b border-white/10 pb-8">
      <img
        src="/LogoMod.svg"
        alt="AI Logo"
        className="mr-6 h-16 w-16 object-contain"
      />
      <div>
        <p className="eyebrow-text mb-2 text-xs text-blue-300">{isSpanish ? 'Unidos contra las injusticias' : 'Unidos contra as injustiças'}</p>
        <h1 className="text-4xl font-semibold text-slate-100 lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-slate-300">{subtitle}</p>}
      </div>
    </div>
  );
}

// ===== App Shell (Header / Navigation / Footer) =====
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>('pt-BR');
  const isSpanish = locale === 'es';
  const isPortuguesePortugal = locale === 'pt-PT';

  const toggleLocale = () => {
    setLocale((previousLocale) => {
      if (previousLocale === 'pt-BR') {
        return 'pt-PT';
      }

      if (previousLocale === 'pt-PT') {
        return 'es';
      }

      return 'pt-BR';
    });
  };

  const currentLocaleFlag = locale === 'pt-BR' ? '🇧🇷' : locale === 'pt-PT' ? '🇵🇹' : '🇪🇸';
  const currentLocaleLabel = locale === 'pt-BR' ? 'PT-BR' : locale === 'pt-PT' ? 'PT-PT' : 'ES';
  const currentLocaleTitle = locale === 'pt-BR'
    ? 'Português do Brasil'
    : locale === 'pt-PT'
      ? 'Português de Portugal'
      : 'Español';

  const menuItems = [
    { id: 'home' as Page, label: isSpanish ? '' : '', icon: Home },
    { id: 'about' as Page, label: isSpanish ? 'Quiénes Somos' : 'Quem Somos', icon: Users },
    { id: 'services' as Page, label: isSpanish ? 'Servicios' : 'Serviços', icon: Briefcase },
    { id: 'areas' as Page, label: isSpanish ? 'Áreas de Actuación' : isPortuguesePortugal ? 'Áreas de Atuação' : 'Áreas de Atuação', icon: MapPin },
    { id: 'projects' as Page, label: isSpanish ? 'Proyectos' : 'Projetos', icon: FolderOpen },
    { id: 'news' as Page, label: isSpanish ? 'Noticias' : 'Notícias', icon: Newspaper },
    { id: 'join' as Page, label: isSpanish ? 'Hazte Socio' : isPortuguesePortugal ? 'Torne-se Associado' : 'Associe-se', icon: UserPlus },
    { id: 'report' as Page, label: isSpanish ? 'Denuncia' : 'Denuncie', icon: AlertTriangle },
    { id: 'volunteers' as Page, label: isSpanish ? 'Voluntarios' : isPortuguesePortugal ? 'Voluntariado' : 'Voluntários', icon: Heart },
    { id: 'contact' as Page, label: isSpanish ? 'Contactos' : 'Contatos', icon: Phone },
  ];

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
    <div className="min-h-screen overflow-x-hidden bg-[#0d1117] text-slate-100" lang={isSpanish ? 'es' : locale}>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0d1117]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 ">
              <img
                src="/LogoMod.svg"
                alt="AI Logo"
                className="h-16 w-[20px] sm:w-auto shrink-0 object-contain lg:mr-8 pr-3"
              />
              <div>
                <h1 className="font-display text-xl font-semibold text-slate-100 lg:hidden">AI</h1>
                <p className="eyebrow-text text-[10px] text-blue-300 lg:hidden">
                  {isSpanish ? 'Unidos contra las injusticias' : isPortuguesePortugal ? 'Unidos contra as injustiças' : 
                  'Unidos contra as injustiças'}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
  {menuItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <React.Fragment key={item.id}>
        {index > 0 && (
          <span className="self-center h-4 w-px bg-white/20" aria-hidden="true" />
        )}
        <button
          onClick={() => setCurrentPage(item.id)}
          className={`flex items-center space-x-1 border-b px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
            currentPage === item.id
              ? 'border-blue-500 text-white'
              : 'border-transparent text-slate-300 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      </React.Fragment>
    );
  })}
</nav>

            {/* CTA Section */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('join')}
                className="btn-primary px-4 py-2 text-sm"
              >
                {isSpanish ? 'Hazte Socio' : isPortuguesePortugal ? 'Torne-se Associado' : 'Associe-se'}
              </button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleLocale}
                className="inline-flex min-w-12 items-center justify-center rounded-none border border-white/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:border-blue-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                aria-label={`Idioma atual: ${currentLocaleTitle}. Clique para mudar.`}
                title={currentLocaleTitle}
              >
                <span className="inline-flex items-center gap-1">
                  <span>{currentLocaleFlag}</span>
                  <span>{currentLocaleLabel}</span>
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 transition-colors hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0f1725] lg:hidden">
            <div className="space-y-3 px-3 pb-4 pt-3">
              <button
                onClick={() => {
                  setCurrentPage('join');
                  setMobileMenuOpen(false);
                }}
                className="btn-primary w-full"
              >
                {isSpanish ? 'Hazte Socio' : isPortuguesePortugal ? 'Torne-se Associado' : 'Associe-se'}
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
                    className={`flex w-full items-center space-x-2 border px-3 py-2 text-base font-medium ${
                      currentPage === item.id
                        ? 'border-blue-500 bg-blue-900/30 text-white'
                        : 'border-white/10 text-slate-300 hover:border-slate-500 hover:text-white'
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
      <main className="flex-1 pt-16 lg:pt-0">
        <PageContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c1018] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="/LogoMod.svg"
                  alt="AI Logo"
                  className="h-10 w-10 object-contain"
                />
                <div>
      
                  <p className="eyebrow-text text-[10px] text-blue-300">{isSpanish ? 'Unidos contra las injusticias' : isPortuguesePortugal ? 'Unidos contra as injustiças' : 'Unidos contra as injustiças'}</p>
                </div>
              </div>
              <p className="mb-4 text-justified text-slate-300">
                {isSpanish
                  ? 'Organización dedicada a la promoción de la justicia social y a la defensa de los derechos de los ciudadanos.'
                  : isPortuguesePortugal
                    ? 'Organização dedicada à promoção da justiça social e à defesa dos direitos dos cidadãos.'
                    : 'Organização dedicada à promoção da justiça social e defesa dos direitos dos cidadãos.'}
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1FELtv6TMH/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-300" />
                </a>
                <Twitter className="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-300" />
                <a href="https://www.instagram.com/ai.associacaocontrainjusticas?utm_source=qr&igsh=bnE4ZmVzaTVtZDMy" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-300" />
                </a>
                <Linkedin className="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-300" />
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{isSpanish ? 'Enlaces Rápidos' : 'Links Rápidos'}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('about')} className="text-slate-300 hover:text-white">{isSpanish ? 'Quiénes Somos' : 'Quem Somos'}</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="text-slate-300 hover:text-white">{isSpanish ? 'Servicios' : 'Serviços'}</button></li>
                <li><button onClick={() => setCurrentPage('join')} className="text-slate-300 hover:text-white">{isSpanish ? 'Hazte Socio' : isPortuguesePortugal ? 'Torne-se Associado' : 'Associe-se'}</button></li>
                <li><button onClick={() => setCurrentPage('report')} className="text-slate-300 hover:text-white">{isSpanish ? 'Denuncia' : 'Denuncie'}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{isSpanish ? 'Contacto' : 'Contacto'}</h4>
              <div className="space-y-2 text-slate-300">
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
          
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-slate-400">
            <p>{isSpanish ? '© 2025 AI. Todos los derechos reservados.' : isPortuguesePortugal ? '© 2025 AI. Todos os direitos reservados.' : '© 2025 AI. Todos os direitos reservados.'}</p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={toggleLocale}
        className="fixed bottom-5 left-5 z-50 hidden h-14 min-w-14 items-center justify-center rounded-full border border-white/15 bg-[#0f1725] px-4 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105 hover:border-blue-400 hover:bg-[#15213a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] lg:flex"
        aria-label={`Idioma atual: ${currentLocaleTitle}. Clique para mudar.`}
        title={currentLocaleTitle}
      >
        <span className="inline-flex items-center gap-1">
          <span>{currentLocaleFlag}</span>
          <span>{currentLocaleLabel}</span>
        </span>
      </button>

      <a
        href="https://wa.me/351916068515"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar via WhatsApp"
        className="animate-bounce fixed bottom-5 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105 hover:bg-[#1fba57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.43 1.31 4.93L2 22l5.35-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.89-6.98Zm-7.02 15.21h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.18.83.85-3.1-.19-.32a8.25 8.25 0 0 1-1.27-4.39c0-4.55 3.71-8.25 8.27-8.25 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.41 5.84c0 4.56-3.71 8.27-8.25 8.27Zm4.53-6.18c-.25-.13-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.39.11-.52.11-.11.25-.29.38-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44l-.49-.01c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.13.17 1.75 2.67 4.23 3.74.59.25 1.04.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.09-.23-.15-.48-.28Z" />
        </svg>
      </a>

      <Toaster />
    </div>
    </LanguageContext.Provider>
  );
}

// ===== Page Router =====
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
    case 'privacy':
      return <PrivacyPage />;
    default:
      return <HomePage setCurrentPage={setCurrentPage} />;
  }
}

// ===== Page: Home =====
function HomePage({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
  const slides = [
    {
      icon: Briefcase,
      title: isSpanish ? 'Consultoría Jurídica' : 'Consultoria Jurídica',
      description: isSpanish
        ? 'Orientación legal gratuita para ciudadanos en situación de vulnerabilidad.'
        : 'Orientação legal gratuita para cidadãos em situação de vulnerabilidade.'
    },
    {
      icon: AlertTriangle,
      title: isSpanish ? 'Canal de Denuncias' : 'Canal de Denúncias',
      description: isSpanish
        ? 'Plataforma segura para denunciar irregularidades e injusticias.'
        : 'Plataforma segura para reportar irregularidades e injustiças.'
    },
    {
      icon: Heart,
      title: isSpanish ? 'Apoyo Social' : 'Apoio Social',
      description: isSpanish
        ? 'Programas de asistencia y apoyo a las comunidades más necesitadas.'
        : 'Programas de assistência e apoio às comunidades mais necessitadas.'
    }
  ];

  return (
    <div className="relative min-h-screen home-hero-bg">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/65"></div>
      {/* Hero Section */}
      <section className="content-section relative z-10 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-8 flex flex-col items-start gap-4 lg:items-start lg:text-left">
            <img
              src="/LogoMod.svg"
              alt="AI Logo"
              className="mx-auto h-28 w-28 object-contain sm:h-36 sm:w-36 lg:mx-0 lg:h-52 lg:w-100 hover:scale-110 transition-transform duration-300 animate__animated animate__fadeInDown  animate__delay-1s"
            />
              <h1
                className="
                mb-5 max-w-2xl font-black
                text-[clamp(5.4rem,10vw,3.6rem)]
                sm:text-[clamp(3rem,9vw,5.2rem)]
                md:text-7xl lg:text-7xl
               leading-[1.0] tracking-tight
               drop-shadow-md
               animate__animated animate__fadeInLeft  animate__delay-1s
               " >
                 <span className="block text-white ">{isSpanish ? 'La justicia' : 'A justiça'}</span>
                 <span className="block -mt-1 text-white">{isSpanish ? 'no' : 'não'}</span>
                   <span className="block -mt-1 text-primary  ">{isSpanish ? 'puede' : 'pode'}</span>
                   <span className="block -mt-1 text-primary">{isSpanish ? 'esperar.' : 'esperar.'}</span>
              </h1>
            <p className="mb-0 w-2xl text-base text-sky-100/90 sm:text-lg lg:text-xl animate__animated animate__fadeInLeft  animate__delay-2s">
                {isSpanish
                  ? 'Defendemos los derechos de los ciudadanos y promovemos la justicia social mediante acciones concretas y transparentes.'
                  : 'Defendemos os direitos dos cidadãos e promovemos a justiça social através de ações concretas e transparentes.'}
            </p>
            <p className="mb-0 w-2xl text-base text-sky-100/90 sm:text-lg lg:text-xl animate__animated animate__fadeInLeft  animate__delay-2s">
                 {isSpanish
                   ? 'Actuación en Portugal y en la Unión Europea con orientación, denuncia y acompañamiento en casos de injusticia.'
                   : 'Atuação em Portugal e na União Europeia com orientação, denúncia e acompanhamento em casos de injustiça.'}
            </p>
          </div>


          <div className="flex flex-wrap items-start gap-3 sm:gap-4 animate__animated animate__fadeInUp  animate__delay-2s">
            <button
              onClick={() => setCurrentPage('report')}
              className="btn-primary px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
            >
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              <span>{isSpanish ? 'Denuncia ahora' : 'Denuncie agora'}</span>
            </button>
            <button
              onClick={() => setCurrentPage('join')}
              className="btn-secondary px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>{isSpanish ? 'Hazte Socio' : 'Associe-se'}</span>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-tertiary px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{isSpanish ? '¿Necesitas ayuda?' : 'Precisa de ajuda?'}</span>
            </button>
          </div>
          <div className="surface-panel mt-8 mx-auto max-w-4xl border border-sky-300/40 animate__animated animate__fadeInUp  animate__delay-2s">
            <div className="mb-4 flex items-center justify-start gap-2">
              <Shield className="w-5 h-5 text-sky-300" />
              <h3 className="text-xl font-semibold text-sky-100">{isSpanish ? 'Privacidad y Confianza' : 'Privacidade e Confiança'}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:grid-cols-">
              <div className="rounded-lg bg-black/20 p-3">
                <Lock className="mb-1 h-4 w-4 text-sky-300" />
                <p className="text-sm text-sky-50"><strong>{isSpanish ? 'Confidencialidad:' : 'Confidencialidade:'}</strong> {isSpanish ? 'identidad y contenido protegidos.' : 'identidade e conteúdo protegidos.'}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <Shield className="mb-1 h-4 w-4 text-sky-300" />
                <p className="text-sm text-sky-50"><strong>{isSpanish ? 'Protección de datos:' : 'Proteção de dados:'}</strong> {isSpanish ? 'tratamiento conforme a buenas prácticas y legislación.' : 'tratamento conforme boas práticas e legislação.'}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <CheckCircle2 className="mb-1 h-4 w-4 text-sky-300" />
                <p className="text-sm text-sky-50"><strong>{isSpanish ? 'Uso responsable:' : 'Uso responsável:'}</strong> {isSpanish ? 'solo para el análisis y seguimiento del caso.' : 'somente para análise e acompanhamento do caso.'}</p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <MessageSquare className="mb-1 h-4 w-4 text-sky-300" />
                <p className="text-sm text-sky-50"><strong>{isSpanish ? 'Canal seguro:' : 'Canal seguro:'}</strong> {isSpanish ? 'envío en entorno protegido.' : 'envio em ambiente protegido.'}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-sky-100">
              {isSpanish ? 'En los formularios de ' : 'Nos formulários de '}<strong>{isSpanish ? 'denuncia' : 'denúncia'}</strong>{isSpanish ? ' y ' : ' e '}<strong>{isSpanish ? 'contacto' : 'contacto'}</strong>{isSpanish ? ', pedimos solo los datos mínimos necesarios para responder con seguridad y prioridad.' : ', pedimos apenas os dados mínimos necessários para responder com segurança e prioridade.'}
            </p>
            <button
              onClick={() => setCurrentPage('privacy')}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 underline underline-offset-4 hover:text-white"
            >
              <Info className="h-4 w-4" />
              {isSpanish ? 'Política de Privacidad y Términos de Uso' : 'Política de Privacidade e Termos de Uso'}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section relative z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
              {isSpanish ? 'Cómo Podemos Ayudar' : 'Como Podemos Ajudar'}
            </h2>
            <p className=" text-xl text-sky-50">
              {isSpanish ? 'Conozca nuestros principales servicios' : 'Conheça os nossos principais serviços'}
            </p>
          </div>

          <Swiper
            modules={[EffectFlip, Autoplay, Pagination, Navigation]}
            loop={true}
            grabCursor={true}
            pagination={true}
            navigation={true}
            effect={'flip'}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            speed={700}
            className="w-full"
          >
            {slides.map((slide) => {
              const Icon = slide.icon;

              return (
                <SwiperSlide key={slide.title}>
                  <div className="surface-panel h-full text-center ">
                    <Icon className="mx-auto mb-4 h-12 w-12 text-sky-400" />
                    <h3 className="mb-2 text-xl font-semibold">{slide.title}</h3>
                    <p className="text-sky-100 mb-12">{slide.description}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

// ===== Page: Privacy =====
function PrivacyPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Política de Privacidad y Términos' : 'Política de Privacidade e Termos'} subtitle={isSpanish ? 'Transparencia sobre la recopilación, uso y protección de datos' : 'Transparência sobre coleta, uso e proteção de dados'} />
        <div className="surface-card p-8 space-y-5 text-sky-700">
          <p className="text-justified">
            {isSpanish ? 'Esta sección resume cómo tratamos la información compartida en los canales de la asociación, incluidos los formularios de denuncia y contacto.' : 'Esta seção resume como tratamos informações partilhadas nos canais da associação, incluindo formulários de denúncia e contacto.'}
          </p>
          <p className="text-justified">
            {isSpanish ? 'Recopilamos únicamente los datos esenciales para el análisis, la respuesta y la tramitación de su solicitud. La información es accedida por un equipo autorizado y utilizada de forma responsable.' : 'Coletamos apenas dados essenciais para análise, retorno e encaminhamento do seu pedido. As informações são acessadas por equipa autorizada e utilizadas de forma responsável.'}
          </p>
          <p className="text-justified">
            {isSpanish ? 'Las denuncias y los mensajes se tratan con confidencialidad, respetando las obligaciones legales y las medidas de seguridad para la protección de los datos personales.' : 'Denúncias e mensagens são tratadas com confidencialidade, respeitando deveres legais e medidas de segurança para proteção de dados pessoais.'}
          </p>
          <p className="text-justified">
            {isSpanish ? 'Al utilizar los formularios, usted acepta este tratamiento con fines de atención, seguimiento y comunicación sobre el caso comunicado.' : 'Ao utilizar os formulários, você concorda com este tratamento para fins de atendimento, acompanhamento e comunicação sobre o caso reportado.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== Page: About =====
function AboutPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Quiénes Somos' : 'Quem Somos'} subtitle={isSpanish ? 'Conozca nuestra misión, visión y valores' : 'Conheça a nossa missão, visão e valores'} />

        <div className="prose prose-lg max-w-none">
          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">{isSpanish ? 'Quiénes Somos' : 'Quem Somos'}</h2>
            <p className="text-sky-700 mb-4 text-justified">
              {isSpanish ? 'La Asociación contra las Injusticias – AI es una entidad independiente, de ámbito nacional y europeo, que defiende los derechos de ciudadanos e inmigrantes frente a las ilegalidades del poder público y privado.' : 'A Associação contra as Injustiças – AI é uma entidade independente, de âmbito nacional e europeu, que defende os direitos de cidadãos e imigrantes contra ilegalidades do poder público e privado.'}
            </p>
            <p className="text-sky-700 mb-6 text-justified">
              {isSpanish ? 'Con un equipo de más de 20 especialistas, prestamos servicios jurídicos, de mediación y de supervisión de procedimientos administrativos y fiscales, garantizando una justicia accesible, transparente y de calidad.' : 'Com uma equipa de mais de 20 especialistas, prestamos serviços jurídicos, de mediação e fiscalização de processos administrativos e fiscais, assegurando justiça acessível, transparente e de qualidade.'}
            </p>
          </div>

          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">{isSpanish ? 'Nuestra Misión' : 'Nossa Missão'}</h2>
            <p className="text-sky-700 mb-6 text-justified">
              {isSpanish ? 'Defender los derechos de todos, garantizando el acceso a la justicia con simplicidad y bajo coste.' : 'Defender os direitos de todos, garantindo acesso à justiça com simplicidade e baixo custo.'}
            </p>
          </div>

          <div className="surface-card mb-8 p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">{isSpanish ? 'Nuestra Visión' : 'Nossa Visão'}</h2>
            <p className="text-sky-700 mb-6 text-justified">
              {isSpanish ? 'Ser una referencia en Portugal y en la Unión Europea en la lucha contra las injusticias y las ilegalidades.' : 'Ser referência em Portugal e na União Europeia na luta contra injustiças e ilegalidades.'}
            </p>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold text-sky-600 mb-4">{isSpanish ? 'Nuestros Valores' : 'Nossos Valores'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">{isSpanish ? 'Justicia' : 'Justiça'}</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">{isSpanish ? 'Transparencia' : 'Transparência'}</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">{isSpanish ? 'Solidaridad' : 'Solidariedade'}</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">{isSpanish ? 'Ética' : 'Ética'}</h3>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-semibold text-sky-800">{isSpanish ? 'Accesibilidad' : 'Acessibilidade'}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Page: Services =====
function ServicesPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const services = [
    {
      title: isSpanish ? "Apoyo jurídico en tribunales y organismos públicos" : "Apoio jurídico em tribunais e órgãos públicos",
      description: isSpanish ? "Representación y asistencia jurídica especializada en procedimientos judiciales y administrativos." : "Representação e assistência jurídica especializada em processos judiciais e administrativos.",
      icon: Briefcase,
      color: "sky"
    },
    {
      title: isSpanish ? "Consultoría y mediación de conflictos" : "Consultoria e mediação de conflitos",
      description: isSpanish ? "Resolución pacífica de disputas mediante mediación especializada y consultoría jurídica." : "Resolução pacífica de disputas através de mediação especializada e consultoria jurídica.",
      icon: Users,
      color: "sky"
    },
    {
      title: isSpanish ? "Supervisión de cuentas públicas y procedimientos administrativos" : "Fiscalização de contas públicas e processos administrativos",
      description: isSpanish ? "Monitorización y auditoría de procesos públicos para garantizar transparencia y legalidad." : "Monitorização e auditoria de processos públicos para garantir transparência e legalidade.",
      icon: FolderOpen,
      color: "sky"
    },
    {
      title: isSpanish ? "Coordinación y ejecución de proyectos de interés público" : "Coordenação e execução de projetos de interesse público",
      description: isSpanish ? "Desarrollo e implementación de iniciativas que benefician a la comunidad." : "Desenvolvimento e implementação de iniciativas que beneficiam a comunidade.",
      icon: Heart,
      color: "sky"
    },
    {
      title: isSpanish ? "Formación e información jurídica accesibles" : "Formação e informação jurídica acessíveis",
      description: isSpanish ? "Programas educativos sobre derechos fundamentales y ciudadanía para todos." : "Programas educativos sobre direitos fundamentais e cidadania para todos.",
      icon: Newspaper,
      color: "sky"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Servicios al Socio' : 'Serviços ao Associado'} subtitle={isSpanish ? 'Conozca cómo podemos ayudarle' : 'Conheça como podemos ajudá-lo'} />

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

// ===== Page: Areas =====
function AreasPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const areas = [
    { name: isSpanish ? "Consultoría Jurídica y Conciliación" : "Consultoria Jurídica & Conciliação", icon: Handshake },
    { name: isSpanish ? "Administrativo y Fiscal" : "Administrativo e Fiscal", icon: Calculator },
    { name: isSpanish ? "Civil" : "Cível", icon: Scale },
    { name: isSpanish ? "Compliance y RGPD" : "Compliance e LGPD", icon: Shield },
    { name: isSpanish ? "Derecho del Consumidor" : "Direito do Consumidor", icon: ShoppingCart },
    { name: isSpanish ? "Penal" : "Criminal", icon: Gavel },
    { name: isSpanish ? "Deportivo" : "Desportivo", icon: Trophy },
    { name: isSpanish ? "Empresarial" : "Empresarial", icon: Building },
    { name: isSpanish ? "Familia" : "Família", icon: Baby },
    { name: isSpanish ? "Mediación y Arbitraje" : "Mediação & Arbitragem", icon: Handshake },
    { name: isSpanish ? "Inmigración" : "Imigração", icon: Plane },
    { name: isSpanish ? "Inmobiliario" : "Imobiliário", icon: HomeIcon },
    { name: isSpanish ? "Tecnología y Sistemas de Información" : "Tecnologia & Sistemas de Informação", icon: Laptop },
    { name: isSpanish ? "Trabajo" : "Trabalho", icon: HardHat },
    { name: isSpanish ? "Relaciones Gubernamentales y Cooperativismo" : "Relações Governamentais & Cooperativismo", icon: Users2 },
    { name: isSpanish ? "Seguridad Social" : "Segurança Social", icon: PiggyBank }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Áreas de Actuación Jurídica' : 'Áreas de Atuação Jurídica'} subtitle={isSpanish ? 'Especialidades jurídicas en las que actuamos' : 'Especialidades jurídicas em que atuamos'} />

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

// ===== Page: Projects =====
function ProjectsPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const projects = [
    {
      title: isSpanish ? "Justicia Digital" : "Justiça Digital",
      description: isSpanish ? "Plataforma en línea para facilitar el acceso a la justicia mediante la tecnología." : "Plataforma online para facilitar o acesso à justiça através de tecnologia.",
      status: isSpanish ? "En curso" : "Em andamento",
      progress: 75
    },
    {
      title: isSpanish ? "Educación Jurídica Comunitaria" : "Educação Jurídica Comunitária",
      description: isSpanish ? "Programa de educación en derechos para comunidades vulnerables." : "Programa de educação em direitos para comunidades carentes.",
      status: isSpanish ? "Completado" : "Concluído",
      progress: 100
    },
    {
      title: isSpanish ? "Centro de Mediación" : "Centro de Mediação",
      description: isSpanish ? "Creación de un centro especializado en mediación de conflictos." : "Criação de centro especializado em mediação de conflitos.",
      status: isSpanish ? "Planificación" : "Planejamento",
      progress: 25
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Nuestros Proyectos' : 'Nossos Projetos'} subtitle={isSpanish ? 'Iniciativas que transforman la sociedad' : 'Iniciativas que transformam a sociedade'} />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === (isSpanish ? 'Completado' : 'Concluído') ? 'bg-green-100 text-green-800' :
                  project.status === (isSpanish ? 'En curso' : 'Em andamento') ? 'bg-sky-100 text-sky-800' :
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
              <p className="text-sm text-sky-500 mt-2">{project.progress}% {isSpanish ? 'completado' : 'concluído'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Page: News =====
function NewsPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  const news = [
    {
      title: isSpanish ? "Injusticias de la CPAS: denuncias e irregularidades" : "Injustiças da CPAS: Denúncias e Irregularidades",
      date: isSpanish ? "Enero, 2025" : "Janeiro, 2025",
      summary: isSpanish ? "Documentación de casos de mala gestión e irregularidades en la Caixa de Previdência dos Advogados e Solicitadores." : "Documentação de casos de má gestão e irregularidades na Caixa de Previdência dos Advogados e Solicitadores.",
      category: isSpanish ? "Denuncias" : "Denúncias",
      content: isSpanish ? "La CPAS ha sido objeto de múltiples denuncias relacionadas con la gestión de fondos de pensiones y beneficios de sus asociados. Los casos documentados incluyen retrasos en el pago de pensiones, falta de transparencia financiera y dificultades en el acceso a los derechos de los beneficiarios." : "A CPAS tem sido alvo de múltiplas denúncias relacionadas com a gestão de fundos de pensões e benefícios dos seus associados. Casos documentados incluem atrasos no pagamento de pensões, falta de transparência na gestão financeira e dificuldades no acesso aos direitos dos beneficiários."
    },
    {
      title: isSpanish ? "Problemas estructurales en la gestión de la CPAS" : "Problemas Estruturais na Gestão da CPAS",
      date: isSpanish ? "Diciembre, 2024" : "Dezembro, 2024",
      summary: isSpanish ? "Análisis de los principales problemas identificados en la estructura organizativa y en los procesos de la CPAS." : "Análise dos principais problemas identificados na estrutura organizacional e processos da CPAS.",
      category: isSpanish ? "Análisis" : "Análise",
      content: isSpanish ? "Se identificaron problemas sistemáticos en la gestión de la CPAS, incluida la falta de auditoría independiente, procedimientos burocráticos excesivos y la ausencia de mecanismos eficaces de reclamación para los asociados." : "Foram identificados problemas sistemáticos na gestão da CPAS, incluindo falta de auditoria independente, processos burocráticos excessivos e ausência de mecanismos eficazes de reclamação para os associados."
    },
    {
      title: isSpanish ? "Derechos de los asociados de la CPAS" : "Direitos dos Associados da CPAS",
      date: isSpanish ? "Noviembre, 2024" : "Novembro, 2024",
      summary: isSpanish ? "Guía completa sobre los derechos de los asociados y cómo actuar en caso de vulneración de los mismos." : "Guia completo sobre os direitos dos associados e como proceder em caso de violação dos mesmos.",
      category: isSpanish ? "Derechos" : "Direitos",
      content: isSpanish ? "Los asociados de la CPAS tienen derecho a información transparente sobre la gestión de sus fondos, acceso oportuno a las prestaciones y un proceso justo de reclamación. Esta guía detalla cómo ejercer estos derechos y dónde buscar ayuda." : "Os associados da CPAS têm direito a informação transparente sobre a gestão dos seus fundos, acesso atempado aos benefícios e um processo justo de reclamação. Este guia detalha como exercer estes direitos e onde procurar ajuda."
    },
    {
      title: isSpanish ? "Casos de éxito: recuperación de prestaciones" : "Casos de Sucesso: Recuperação de Benefícios",
      date: isSpanish ? "Octubre, 2024" : "Outubro, 2024",
      summary: isSpanish ? "Ejemplos de casos en los que fue posible recuperar prestaciones denegadas o retrasadas por la CPAS." : "Exemplos de casos onde foi possível recuperar benefícios negados ou atrasados pela CPAS.",
      category: isSpanish ? "Casos de Éxito" : "Casos de Sucesso",
      content: isSpanish ? "A través de una acción legal adecuada y de la persistencia, varios asociados lograron recuperar prestaciones que les habían sido denegadas o retrasadas por la CPAS. Estos casos demuestran la importancia de conocer sus derechos y buscar apoyo jurídico especializado." : "Através de ação legal adequada e persistência, vários associados conseguiram recuperar benefícios que lhes tinham sido negados ou atrasados pela CPAS. Estes casos demonstram a importância de conhecer os seus direitos e procurar apoio jurídico especializado."
    },
    {
      title: isSpanish ? "Reforma del sistema de previsión de los abogados" : "Reforma do Sistema de Previdência dos Advogados",
      date: isSpanish ? "Septiembre, 2024" : "Setembro, 2024",
      summary: isSpanish ? "Propuestas para una reforma estructural del sistema de previsión para abogados y procuradores." : "Propostas para reforma estrutural do sistema de previdência para advogados e solicitadores.",
      category: isSpanish ? "Propuestas" : "Propostas",
      content: isSpanish ? "Es urgente una reforma profunda del sistema de previsión de los abogados, que incluya mayor transparencia, auditoría independiente, simplificación de procesos y creación de mecanismos eficaces de protección de los derechos de los asociados." : "É urgente uma reforma profunda do sistema de previdência dos advogados, incluindo maior transparência, auditoria independente, simplificação de processos e criação de mecanismos eficazes de proteção dos direitos dos associados."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Noticias' : 'Notícias'} subtitle={isSpanish ? 'Información sobre las injusticias de la CPAS y los derechos de los asociados' : 'Informações sobre injustiças da CPAS e direitos dos associados'} />

        <div className="space-y-8">
          {news.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  article.category === (isSpanish ? 'Denuncias' : 'Denúncias') ? 'bg-red-100 text-red-800' :
                  article.category === (isSpanish ? 'Análisis' : 'Análise') ? 'bg-blue-100 text-blue-800' :
                  article.category === (isSpanish ? 'Derechos' : 'Direitos') ? 'bg-green-100 text-green-800' :
                  article.category === (isSpanish ? 'Casos de Éxito' : 'Casos de Sucesso') ? 'bg-purple-100 text-purple-800' :
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
                  <strong>{isSpanish ? '¿Necesita ayuda con cuestiones relacionadas con la CPAS?' : 'Precisa de ajuda com questões relacionadas à CPAS?'}</strong> {isSpanish ? 'Póngase en contacto con nosotros para recibir orientación jurídica especializada.' : 'Entre em contacto connosco para orientação jurídica especializada.'}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">{isSpanish ? '¿Tiene una situación similar?' : 'Tem uma situação similar?'}</h3>
              <p className="text-yellow-700 text-justified mb-4">
                {isSpanish ? 'Si está afrontando problemas con la CPAS u otras entidades, no dude en ponerse en contacto con nosotros. Ofrecemos consultoría jurídica especializada y apoyo en la defensa de sus derechos.' : 'Se está a enfrentar problemas com a CPAS ou outras entidades, não hesite em contactar-nos. Oferecemos consultoria jurídica especializada e apoio na defesa dos seus direitos.'}
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

// ===== Page: Join (Association Form) =====
function JoinPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Hazte Socio' : 'Associe-se'} subtitle={isSpanish ? 'Únase a nuestra causa y marque la diferencia' : 'Junte-se à nossa causa e faça a diferença'} />

        <div className="surface-card p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{isSpanish ? 'Formulario de Asociación' : 'Formulário de Associação'}</h2>
              <p className="text-sky-600 mb-6 text-justified">
                {isSpanish ? 'Rellene el siguiente formulario para hacerse miembro de AI - Asociación contra las Injusticias.' : 'Preencha o formulário abaixo para se tornar membro da AI - Associação contra as Injustiças.'}
              </p>
            </div>

            <iframe
              src="https://sgi-fv-prod.vercel.app/associate.html?org_id=d535afe4-6279-40a9-aaa9-f5a7f6ee4825&source=vainaai&site=VAINAAI"
              width="100%"
              height={900}
              style={{ border: 'none', maxWidth: '820px', display: 'block', margin: '0 auto' }}
              title={isSpanish ? 'Formulario de Asociación' : 'Formulário de Associação'}
            />
        </div>
      </div>
    </div>
  );
}

// ===== Page: Report (Complaints Form) =====
function ReportPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
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
      toast.error(isSpanish ? 'Para continuar con la consultoría, es necesario proporcionar un teléfono de contacto.' : 'Para prosseguir com a consultoria, é necessário fornecer um telefone de contacto.');
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
      
      toast.success(isSpanish ? '¡Denuncia enviada con éxito! Gracias por ayudarnos a combatir las injusticias.' : 'Denúncia enviada com sucesso! Obrigado por nos ajudar a combater as injustiças.');
      setFormData({ type: '', description: '', location: '', phone: '', anonymous: false });
    } catch (error) {
      toast.error(isSpanish ? 'Error al enviar la denuncia. Inténtelo de nuevo.' : 'Erro ao enviar denúncia. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Canal de Denuncias' : 'Canal de Denúncias'} subtitle={isSpanish ? 'Comunique irregularidades de forma segura y confidencial' : 'Reporte irregularidades de forma segura e confidencial'} />

        <div className="surface-card p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">{isSpanish ? 'Información Importante' : 'Informação Importante'}</h3>
                <p className="text-yellow-700 text-sm mt-1 text-justified">
                  {isSpanish ? 'Todas las denuncias se tratan con total confidencialidad. Puede optar por permanecer en el anonimato.' : 'Todas as denúncias são tratadas com total confidencialidade. Você pode optar por permanecer anônimo.'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                {isSpanish ? 'Tipo de Irregularidad' : 'Tipo de Irregularidade'}
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                required
                disabled={isSubmitting}
              >
                <option value="">{isSpanish ? 'Seleccione el tipo' : 'Selecione o tipo'}</option>
                <option value="corruption">{isSpanish ? 'Corrupción' : 'Corrupção'}</option>
                <option value="discrimination">{isSpanish ? 'Discriminación' : 'Discriminação'}</option>
                <option value="abuse">{isSpanish ? 'Abuso de Poder' : 'Abuso de Poder'}</option>
                <option value="fraud">{isSpanish ? 'Fraude' : 'Fraude'}</option>
                <option value="other">{isSpanish ? 'Otro' : 'Outro'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                {isSpanish ? 'Descripción Detallada' : 'Descrição Detalhada'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                placeholder={isSpanish ? 'Describa la situación con el mayor detalle posible...' : 'Descreva a situação com o máximo de detalhes possível...'}
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-700 mb-2">
                {isSpanish ? 'Lugar de los Hechos' : 'Local da Ocorrência'}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                placeholder={isSpanish ? 'Ciudad, barrio, institución...' : 'Cidade, bairro, instituição...'}
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
                {isSpanish ? 'Deseo permanecer en el anonimato' : 'Desejo permanecer anônimo'}
              </label>
            </div>

            {/* Aviso para denúncias anônimas */}
            {formData.anonymous && (
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sky-800 mb-2">{isSpanish ? 'Denuncia Anónima' : 'Denúncia Anônima'}</h4>
                    <p className="text-sky-700 text-sm mb-3 text-justified">
                      {isSpanish ? 'Hemos recibido su denuncia y la analizaremos. Para hacer efectiva nuestra ayuda y prestar servicios de consultoría, será necesario facilitar posteriormente un contacto telefónico.' : 'Recebemos a sua denúncia e iremos analisá-la. Para efetivar a nossa ajuda e prestar serviços de consultoria, será necessário fornecer um contacto telefónico posteriormente.'}
                    </p>
                    <div className="flex items-center space-x-2 text-sky-700 text-sm">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">{isSpanish ? 'Garantizamos total confidencialidad y protección de sus datos personales' : 'Garantimos total sigilo e proteção dos seus dados pessoais'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campo de telefone obrigatório quando não é anônimo */}
            {!formData.anonymous && (
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  {isSpanish ? 'Teléfono de Contacto' : 'Telefone de Contacto'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-gray-900"
                  placeholder="+351 XXX XXX XXX"
                  required={!formData.anonymous}
                  disabled={isSubmitting}
                />
                <p className="text-sm text-sky-600 mt-1 text-justified">
                  {isSpanish ? 'Necesario para continuar con la consultoría y el registro del servicio.' : 'Necessário para prosseguir com a consultoria e registo do serviço.'}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : (isSpanish ? 'Enviar Denuncia' : 'Enviar Denúncia')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ===== Page: Volunteers =====
function VolunteersPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
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
      
      toast.success(isSpanish ? '¡Inscripción enviada con éxito! Nos pondremos en contacto en breve.' : 'Inscrição enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', area: '', availability: '', experience: '' });
    } catch (error) {
      toast.error(isSpanish ? 'Error al enviar la inscripción. Inténtelo de nuevo.' : 'Erro ao enviar inscrição. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title={isSpanish ? 'Programa de Voluntarios' : 'Programa de Voluntários'} subtitle={isSpanish ? 'Forme parte del cambio que quiere ver en el mundo' : 'Faça parte da mudança que você quer ver no mundo'} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{isSpanish ? '¿Por qué ser voluntario?' : 'Por que ser Voluntário?'}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{isSpanish ? 'Impacto Social' : 'Impacto Social'}</h3>
                  <p className="text-sky-600 text-justified">{isSpanish ? 'Contribuya directamente a la construcción de una sociedad más justa.' : 'Contribua diretamente para a construção de uma sociedade mais justa.'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Networking</h3>
                  <p className="text-sky-600 text-justified">{isSpanish ? 'Conéctese con personas que comparten los mismos valores.' : 'Conecte-se com pessoas que compartilham dos mesmos valores.'}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{isSpanish ? 'Desarrollo' : 'Desenvolvimento'}</h3>
                  <p className="text-sky-600 text-justified">{isSpanish ? 'Desarrolle nuevas habilidades y adquiera experiencia valiosa.' : 'Desenvolva novas habilidades e ganhe experiência valiosa.'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{isSpanish ? 'Áreas de Actuación' : 'Áreas de Atuação'}</h3>
              <ul className="space-y-2 text-sky-600">
                <li>• {isSpanish ? 'Atención al público' : 'Atendimento ao público'}</li>
                <li>• {isSpanish ? 'Investigación jurídica' : 'Pesquisa jurídica'}</li>
                <li>• {isSpanish ? 'Comunicación y marketing' : 'Comunicação e marketing'}</li>
                <li>• {isSpanish ? 'Organización de eventos' : 'Organização de eventos'}</li>
                <li>• {isSpanish ? 'Apoyo administrativo' : 'Apoio administrativo'}</li>
                <li>• {isSpanish ? 'Traducción e interpretación' : 'Tradução e interpretação'}</li>
              </ul>
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{isSpanish ? 'Inscríbase como Voluntario' : 'Inscreva-se como Voluntário'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">{isSpanish ? 'Nombre Completo' : 'Nome Completo'}</label>
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
                <label className="block text-sm font-medium text-sky-700 mb-1">{isSpanish ? 'Teléfono' : 'Telefone'}</label>
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
                <label className="block text-sm font-medium text-sky-700 mb-1">{isSpanish ? 'Área de Interés' : 'Área de Interesse'}</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">{isSpanish ? 'Seleccione un área' : 'Selecione uma área'}</option>
                  <option value="atendimento">{isSpanish ? 'Atención al Público' : 'Atendimento ao Público'}</option>
                  <option value="pesquisa">{isSpanish ? 'Investigación Jurídica' : 'Pesquisa Jurídica'}</option>
                  <option value="comunicacao">{isSpanish ? 'Comunicación' : 'Comunicação'}</option>
                  <option value="eventos">{isSpanish ? 'Organización de Eventos' : 'Organização de Eventos'}</option>
                  <option value="administrativo">{isSpanish ? 'Apoyo Administrativo' : 'Apoio Administrativo'}</option>
                  <option value="traducao">{isSpanish ? 'Traducción' : 'Tradução'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">{isSpanish ? 'Disponibilidad' : 'Disponibilidade'}</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">{isSpanish ? 'Seleccione su disponibilidad' : 'Selecione sua disponibilidade'}</option>
                  <option value="manhã">{isSpanish ? 'Mañana' : 'Manhã'}</option>
                  <option value="tarde">{isSpanish ? 'Tarde' : 'Tarde'}</option>
                  <option value="noite">{isSpanish ? 'Noche' : 'Noite'}</option>
                  <option value="fins-semana">{isSpanish ? 'Fines de Semana' : 'Fins de Semana'}</option>
                  <option value="flexivel">{isSpanish ? 'Horario Flexible' : 'Horário Flexível'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">{isSpanish ? 'Experiencia Relevante' : 'Experiência Relevante'}</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder={isSpanish ? 'Describa su experiencia relevante (opcional)' : 'Descreva sua experiência relevante (opcional)'}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : (isSpanish ? 'Enviar Inscripción' : 'Enviar Inscrição')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Page: Contact =====
function ContactPage() {
  const { locale } = useLanguage();
  const isSpanish = locale === 'es';
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
      
      toast.success(isSpanish ? '¡Mensaje enviado con éxito! Responderemos en breve.' : 'Mensagem enviada com sucesso! Responderemos em breve.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(isSpanish ? 'Error al enviar el mensaje. Inténtelo de nuevo.' : 'Erro ao enviar mensagem. Tente novamente.');
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
        <PageHeader title={isSpanish ? 'Contactos' : 'Contactos'} subtitle={isSpanish ? 'Póngase en contacto con nosotros' : 'Entre em contacto connosco'} />

        {/* Main Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white-900 mb-6">{isSpanish ? 'Información de Contacto' : 'Informações de Contato'}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200 mb-1">Email</h3>
                  <p className="text-sky-600">contato@vainaai.pt</p>
                  <p className="text-sky-600">juridico@vainaai.pt</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold  text-gray-200 mb-1">{isSpanish ? 'Teléfono/WhatsApp' : 'Telefone/WhatsApp'}</h3>
                  <p className="text-sky-600">+351 916 068 515</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold  text-gray-200 mb-1">{isSpanish ? 'Sitio Oficial' : 'Site Oficial'}</h3>
                  <a href="https://www.vainaai.pt" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800">
                    www.vainaai.pt
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold  text-gray-200 mb-4">{isSpanish ? 'Horario de Atención' : 'Horário de Atendimento'}</h3>
              <div className="bg-gray-50 bg-slate-900 rounded-lg p-4">
                <p className="text-sky-600 mb-2"><strong>{isSpanish ? 'Lunes a Viernes:' : 'Segunda a Sexta:'}</strong> 9:00 - 18:00</p>
                <p className="text-sky-600 mb-2"><strong>{isSpanish ? 'Sábado:' : 'Sábado:'}</strong> 9:00 - 13:00</p>
                <p className="text-sky-600"><strong>{isSpanish ? 'Domingo:' : 'Domingo:'}</strong> {isSpanish ? 'Cerrado' : 'Fechado'}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold  text-gray-200 mb-4">{isSpanish ? 'Redes Sociales' : 'Redes Sociais'}</h3>
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
            <h2 className="text-2xl font-bold text-gray-200 mb-6">{isSpanish ? 'Envíenos un Mensaje' : 'Envie-nos uma Mensagem'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-600 mb-1">{isSpanish ? 'Nombre' : 'Nome'}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border bg-slate-700 border-primary rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-600 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border bg-slate-700 border-primary rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-600 mb-1">{isSpanish ? 'Asunto' : 'Assunto'}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border bg-slate-700 border-primary rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-600 mb-1">{isSpanish ? 'Mensaje' : 'Mensagem'}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 border bg-slate-700 border-primary rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder={isSpanish ? 'Escriba su mensaje aquí...' : 'Escreva a sua mensagem aqui...'}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : (isSpanish ? 'Enviar Mensaje' : 'Enviar Mensagem')}
              </button>
            </form>
          </div>
        </div>

        {/* Offices Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-200 mb-8 text-center">{isSpanish ? 'Sede y Delegaciones' : 'Sede e Delegações'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-slate-800 border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-200">{office.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      office.type === 'Sede' ? 'bg-sky-200 text-primary' : 'bg-sky-200 text-primary'
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
