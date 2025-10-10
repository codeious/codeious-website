// Default content data for seeding
export const defaultContent = [
  {
    sectionId: 'hero',
    title: {
      en: 'Welcome to codeious',
      pl: 'Witamy w codeious',
    },
    subtitle: {
      en: 'We build next-gen, cloud-based eCommerce for Enterprise',
      pl: 'Budujemy eCommerce nowej generacji w chmurze dla przedsiębiorstw',
    },
    media: {
      backgroundImage: 'bg-image.png',
      logo: 'codeious-logo.png',
    },
    metadata: {
      showSection: true,
      order: 1,
    },
  },
  {
    sectionId: 'about-us',
    title: {
      en: 'About Us',
      pl: 'O Nas',
    },
    description: {
      en: '<p>We are a team of passionate developers and designers creating innovative eCommerce solutions.</p>',
      pl: '<p>Jesteśmy zespołem pasjonatów programistów i projektantów tworzących innowacyjne rozwiązania eCommerce.</p>',
    },
    metadata: {
      showSection: true,
      order: 2,
    },
  },
  {
    sectionId: 'shopen',
    title: {
      en: 'Meet shopen, our new buddy.',
      pl: 'Poznaj shopen, naszego nowego kumpla.',
    },
    description: {
      en: '<p><strong>It is designed to revolutionize online retail with cutting-edge AI, enabling personalized customer experiences and data-driven insights.</strong></p>',
      pl: '<p><strong>Został zaprojektowany, aby zrewolucjonizować handel internetowy dzięki najnowocześniejszej sztucznej inteligencji, umożliwiając spersonalizowane doświadczenia klientów i spostrzeżenia oparte na danych.</strong></p>',
    },
    additionalContent: {
      en: '<p>Fully customizable, it empowers businesses to tailor every aspect to their unique brand and operational needs. Built for speed, the platform ensures lightning-fast load times and seamless performance, even under high traffic.</p>',
      pl: '<p>W pełni konfigurowalny, umożliwia firmom dostosowanie każdego aspektu do ich unikalnej marki i potrzeb operacyjnych. Zbudowany z myślą o szybkości, zapewnia błyskawiczne czasy ładowania i płynną wydajność, nawet przy dużym ruchu.</p>',
    },
    media: {
      sectionImage: 'shopen-section-image.png',
    },
    carouselItems: [
      {
        title: {
          en: 'Meet shopen, our new buddy.',
          pl: 'Poznaj shopen, naszego nowego kumpla.',
        },
        description: {
          en: '<p><strong>It is designed to revolutionize online retail with cutting-edge AI, enabling personalized customer experiences and data-driven insights.</strong></p>',
          pl: '<p><strong>Został zaprojektowany, aby zrewolucjonizować handel internetowy dzięki najnowocześniejszej sztucznej inteligencji.</strong></p>',
        },
        additionalText: {
          en: '<p>Fully customizable, it empowers businesses to tailor every aspect to their unique brand and operational needs. Built for speed, the platform ensures lightning-fast load times and seamless performance, even under high traffic.</p>',
          pl: '<p>W pełni konfigurowalny, umożliwia firmom dostosowanie każdego aspektu do ich unikalnej marki i potrzeb operacyjnych.</p>',
        },
      },
      {
        title: {
          en: 'Shopen transforms ecommerce.',
          pl: 'Shopen przekształca ecommerce.',
        },
        description: {
          en: '<p><strong>Our innovative platform leverages machine learning algorithms to predict customer behavior and optimize the shopping experience in real-time.</strong></p>',
          pl: '<p><strong>Nasza innowacyjna platforma wykorzystuje algorytmy uczenia maszynowego do przewidywania zachowań klientów i optymalizacji doświadczenia zakupowego w czasie rzeczywistym.</strong></p>',
        },
        additionalText: {
          en: '<p>With advanced analytics and intelligent automation, businesses can make data-driven decisions that drive growth and increase customer satisfaction across all touchpoints.</p>',
          pl: '<p>Dzięki zaawansowanej analityce i inteligentnej automatyzacji, firmy mogą podejmować decyzje oparte na danych, które napędzają wzrost i zwiększają zadowolenie klientów we wszystkich punktach kontaktu.</p>',
        },
      },
      {
        title: {
          en: 'Scale with confidence.',
          pl: 'Skaluj z pewnością.',
        },
        description: {
          en: '<p><strong>Built on cloud-native architecture, Shopen handles millions of transactions seamlessly while maintaining peak performance and reliability.</strong></p>',
          pl: '<p><strong>Zbudowany w oparciu o architekturę natywną dla chmury, Shopen obsługuje miliony transakcji bezproblemowo, zachowując szczytową wydajność i niezawodność.</strong></p>',
        },
        additionalText: {
          en: '<p>From startup to enterprise, our platform grows with your business, offering unlimited scalability and enterprise-grade security that you can trust.</p>',
          pl: '<p>Od startupu do przedsiębiorstwa, nasza platforma rośnie razem z Twoim biznesem, oferując nieograniczoną skalowalność i bezpieczeństwo klasy korporacyjnej, któremu możesz zaufać.</p>',
        },
      },
    ],
    metadata: {
      showSection: true,
      order: 3,
    },
  },
  {
    sectionId: 'shopen-features',
    title: {
      en: 'Shopen in a nutshell',
      pl: 'Shopen w pigułce',
    },
    carouselItems: [
      {
        title: {
          en: '10 times faster, 10 times stronger',
          pl: '10 razy szybszy, 10 razy silniejszy',
        },
        description: {
          en: '<p>Our platform delivers transactions and page loads up to 10 times faster than competitors, ensuring seamless performance.</p>',
          pl: '<p>Nasza platforma dostarcza transakcje i ładowanie stron do 10 razy szybciej niż konkurencja, zapewniając płynną wydajność.</p>',
        },
      },
      {
        title: {
          en: 'Packed with smart UX and unique UI',
          pl: 'Wyposażony w inteligentny UX i unikalny UI',
        },
        description: {
          en: '<p>Intuitive UX solutions optimize navigation and personalization, boosting engagement and conversions.</p>',
          pl: '<p>Intuicyjne rozwiązania UX optymalizują nawigację i personalizację, zwiększając zaangażowanie i konwersje.</p>',
        },
      },
      {
        title: {
          en: 'Seamless editing and interaction',
          pl: 'Płynna edycja i interakcja',
        },
        description: {
          en: '<p>Drag-and-drop editing and interactive features enable real-time customization and engaging user experiences.</p>',
          pl: '<p>Edycja metodą przeciągnij i upuść oraz funkcje interaktywne umożliwiają dostosowanie w czasie rzeczywistym i angażujące doświadczenia użytkownika.</p>',
        },
      },
      {
        title: {
          en: 'Fully on board with new AI trends',
          pl: 'W pełni na pokładzie z nowymi trendami AI',
        },
        description: {
          en: '<p>The platform leverages cutting-edge AI trends like predictive analytics for personalized, future-ready ecommerce.</p>',
          pl: '<p>Platforma wykorzystuje najnowocześniejsze trendy AI, takie jak analityka predykcyjna dla spersonalizowanego, przyszłościowego ecommerce.</p>',
        },
      },
      {
        title: {
          en: 'Chatbot Integration and customization',
          pl: 'Integracja i dostosowywanie chatbota',
        },
        description: {
          en: '<p>AI-powered chatbots provide instant, personalized customer support, enhancing satisfaction and sales.</p>',
          pl: '<p>Chatboty oparte na AI zapewniają natychmiastową, spersonalizowaną obsługę klienta, zwiększając zadowolenie i sprzedaż.</p>',
        },
      },
      {
        title: {
          en: '24/7 Support for all customers',
          pl: 'Wsparcie 24/7 dla wszystkich klientów',
        },
        description: {
          en: '<p>Round-the-clock support ensures prompt issue resolution for all businesses and users.</p>',
          pl: '<p>Całodobowe wsparcie zapewnia szybkie rozwiązywanie problemów dla wszystkich firm i użytkowników.</p>',
        },
      },
    ],
    metadata: {
      showSection: true,
      order: 3.5,
    },
  },
  {
    sectionId: 'technology',
    title: {
      en: 'Technology at the core of our operations',
      pl: 'Technologia w centrum naszych działań',
    },
    description: {
      en: '<p>Our team operates in full alignment with industry-leading IT standards, ensuring robust, secure, and efficient ecommerce solutions.</p>',
      pl: '<p>Nasz zespół działa w pełnej zgodności z wiodącymi w branży standardami IT, zapewniając solidne, bezpieczne i wydajne rozwiązania ecommerce.</p>',
    },
    additionalContent: {
      en: "<p>We proactively seek new opportunities, embracing cutting-edge technologies to enhance platform performance and user experience.</p><p>Go, with its lightweight concurrency model and fast compilation, powers modern <strong>ecommerce platforms</strong> by enabling scalable, high-performance backend systems. Its efficient handling of microservices allows seamless processing of millions of daily transactions, crucial for high-volume online stores.</p><p>Go's robust standard library and memory safety features streamline development, ensuring <strong>secure and reliable platform operations</strong>. Leading ecommerce companies leverage Go to build responsive APIs and real-time inventory systems, enhancing user experience and operational agility.</p>",
      pl: '<p>Proaktywnie poszukujemy nowych możliwości, przyjmując najnowocześniejsze technologie w celu poprawy wydajności platformy i doświadczenia użytkownika.</p><p>Go, dzięki swojemu lekkiemu modelowi współbieżności i szybkiej kompilacji, napędza nowoczesne <strong>platformy ecommerce</strong>, umożliwiając skalowalne, wydajne systemy backendowe. Jego efektywna obsługa mikrousług pozwala na bezproblemowe przetwarzanie milionów dziennych transakcji, co jest kluczowe dla sklepów internetowych o dużym natężeniu ruchu.</p><p>Solidna biblioteka standardowa Go i funkcje bezpieczeństwa pamięci usprawniają rozwój, zapewniając <strong>bezpieczne i niezawodne operacje platformy</strong>. Wiodące firmy ecommerce wykorzystują Go do budowania responsywnych API i systemów inwentaryzacji w czasie rzeczywistym, poprawiając doświadczenie użytkownika i zwinność operacyjną.</p>',
    },
    ctaText: {
      en: "Let's GO!",
      pl: 'Idźmy z GO!',
    },
    media: {
      backgroundImage: 'technology-background.png',
    },
    carouselItems: [
      {
        title: {
          en: 'Technology at the core\nof our operations',
          pl: 'Technologia w centrum\nnaszych działań',
        },
        description: {
          en: '<p>Our team operates in full alignment with industry-leading IT standards, ensuring robust, secure, and efficient ecommerce solutions.</p>',
          pl: '<p>Nasz zespół działa w pełnej zgodności z wiodącymi w branży standardami IT, zapewniając solidne, bezpieczne i wydajne rozwiązania ecommerce.</p>',
        },
        additionalText: {
          en: '<p>We proactively seek new opportunities, embracing cutting-edge technologies to enhance platform performance and user experience.</p>',
          pl: '<p>Proaktywnie poszukujemy nowych możliwości, przyjmując najnowocześniejsze technologie w celu poprawy wydajności platformy i doświadczenia użytkownika.</p>',
        },
      },
      {
        title: {
          en: 'Innovation drives\nour solutions',
          pl: 'Innowacje napędzają\nnasze rozwiązania',
        },
        description: {
          en: '<p>We leverage cutting-edge technologies to build scalable and performant ecommerce platforms that handle millions of transactions daily.</p>',
          pl: '<p>Wykorzystujemy najnowocześniejsze technologie do budowania skalowalnych i wydajnych platform ecommerce, które obsługują miliony transakcji dziennie.</p>',
        },
        additionalText: {
          en: '<p>Our innovative approach ensures your business stays ahead of the competition with future-ready technology solutions.</p>',
          pl: '<p>Nasze innowacyjne podejście zapewnia, że Twój biznes wyprzedza konkurencję dzięki gotowym na przyszłość rozwiązaniom technologicznym.</p>',
        },
      },
      {
        title: {
          en: 'Excellence in\nevery implementation',
          pl: 'Doskonałość w\nkażdej implementacji',
        },
        description: {
          en: '<p>From cloud infrastructure to microservices architecture, we implement best practices that ensure reliability and scalability.</p>',
          pl: '<p>Od infrastruktury chmurowej po architekturę mikrousług, wdrażamy najlepsze praktyki zapewniające niezawodność i skalowalność.</p>',
        },
        additionalText: {
          en: '<p>Our commitment to excellence drives us to deliver solutions that exceed expectations and grow with your business.</p>',
          pl: '<p>Nasze zaangażowanie w doskonałość skłania nas do dostarczania rozwiązań, które przekraczają oczekiwania i rosną razem z Twoim biznesem.</p>',
        },
      },
    ],
    metadata: {
      showSection: true,
      order: 4,
    },
  },
  {
    sectionId: 'team',
    title: {
      en: 'Meet the team',
      pl: 'Poznaj zespół',
    },
    carouselItems: [
      {
        title: {
          en: 'Patryk Wąsik',
          pl: 'Patryk Wąsik',
        },
        role: {
          en: 'CEO Codeious',
          pl: 'CEO Codeious',
        },
        description: {
          en: '<p>Patryk, a seasoned CEO with over 20 years of coding expertise, leads our ecommerce platform company with a hands-on approach to innovation. His extensive experience in software development, from crafting scalable systems to pioneering AI-driven solutions, drives our mission to redefine online retail. Living in Kraków with family, Jan balances family life with a passion for building cutting-edge technology. His deep technical knowledge and strategic vision ensure our platform remains fast, customizable, and aligned with industry trends.</p>',
          pl: '<p>Patryk, doświadczony CEO z ponad 20-letnim doświadczeniem w programowaniu, kieruje naszą firmą platform ecommerce z praktycznym podejściem do innowacji. Jego bogate doświadczenie w rozwoju oprogramowania, od tworzenia skalowalnych systemów po pionierskie rozwiązania oparte na AI, napędza naszą misję przedefiniowania handlu internetowego. Mieszkając w Krakowie z rodziną, Jan równoważy życie rodzinne z pasją do budowania najnowocześniejszych technologii.</p>',
        },
        additionalText: {
          en: '<p>Living in Kraków with family, Jan balances family life with a passion for building cutting-edge technology. His deep technical knowledge and strategic vision ensure our platform remains fast, customizable, and aligned with industry trends.</p>',
          pl: '<p>Mieszkając w Krakowie z rodziną, Jan równoważy życie rodzinne z pasją do budowania najnowocześniejszych technologii. Jego głęboka wiedza techniczna i strategiczna wizja zapewniają, że nasza platforma pozostaje szybka, konfigurowalna i zgodna z trendami branżowymi.</p>',
        },
        media: {
          image: 'ceo.png',
        },
      },
    ],
    metadata: {
      showSection: true,
      order: 5,
    },
  },
  {
    sectionId: 'contact',
    title: {
      en: 'Get in touch',
      pl: 'Skontaktuj się z nami',
    },
    subtitle: {
      en: 'Connect with us',
      pl: 'Połącz się z nami',
    },
    ctaText: {
      en: 'Send',
      pl: 'Wyślij',
    },
    metadata: {
      showSection: true,
      order: 6,
    },
  },
  {
    sectionId: 'footer',
    title: {
      en: 'Copyright @ Codeious 2025',
      pl: 'Copyright @ Codeious 2025',
    },
    media: {
      logo: 'codeious-logo.png',
    },
    metadata: {
      showSection: true,
      order: 7,
    },
  },
]

// Media files to be uploaded during seeding
export const mediaFiles = [
  {
    filename: 'bg-image.png',
    alt: 'Hero background image',
    description: 'Main background image for the hero section',
  },
  {
    filename: 'ceo.png',
    alt: 'CEO photo',
    description: 'Photo of the CEO for the team section',
  },
  {
    filename: 'codeious-logo.png',
    alt: 'Codeious logo',
    description: 'Company logo for branding and footer',
  },
  {
    filename: 'shopen-section-image.png',
    alt: 'Shopen platform interface',
    description: 'Interface screenshot for the Shopen section',
  },
  {
    filename: 'technology-background.png',
    alt: 'Technology background',
    description: 'Background image for the technology section',
  },
]
