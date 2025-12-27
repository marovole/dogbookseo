import type { Locale } from '@/config/site';

/**
 * UI translations for all supported locales
 */
export const ui: Record<Locale, Record<string, string>> = {
  'en': {
    // Navigation
    'nav.home': 'Home',
    'nav.topics': 'Topics',
    'nav.launchApp': 'Launch App',
    
    // Topic listing
    'topics.title': 'Prediction Topics',
    'topics.subtitle': 'Choose a topic and make your prediction',
    'topics.filter.all': 'All',
    'topics.filter.politics': 'Politics',
    'topics.filter.economy': 'Economy',
    'topics.filter.tech': 'Technology',
    'topics.filter.entertainment': 'Entertainment',
    'topics.filter.sports': 'Sports',
    'topics.empty': 'No topics available',
    'topics.related': 'Related Predictions',
    
    // Topic card
    'topic.predict': 'Make Prediction',
    'topic.status.active': 'Active',
    'topic.status.closed': 'Closed',
    'topic.expires': 'Expires',
    
    // Options
    'option.yes': 'Yes',
    'option.no': 'No',
    
    // CTA
    'cta.play': 'Play Now',
    'cta.viewAll': 'View All Topics',
    
    // Footer
    'footer.copyright': 'All rights reserved',
    'footer.poweredBy': 'Powered by Minority Game',
    'footer.tagline': 'Predict the future with the Minority Game. Be the contrarian.',
    'footer.explore': 'Explore',
    'footer.getStarted': 'Get Started',
    'footer.rights': 'All rights reserved.',
    
    // Misc
    'language': 'Language',
  },
  
  'zh-TW': {
    'nav.home': '首頁',
    'nav.topics': '話題',
    'nav.launchApp': '啟動應用',
    
    'topics.title': '預測話題',
    'topics.subtitle': '選擇話題並做出你的預測',
    'topics.filter.all': '全部',
    'topics.filter.politics': '政治',
    'topics.filter.economy': '經濟',
    'topics.filter.tech': '科技',
    'topics.filter.entertainment': '娛樂',
    'topics.filter.sports': '體育',
    'topics.empty': '暫無話題',
    'topics.related': '相關預測',
    
    'topic.predict': '立即預測',
    'topic.status.active': '進行中',
    'topic.status.closed': '已結束',
    'topic.expires': '截止時間',
    
    'option.yes': '會',
    'option.no': '不會',
    
    'cta.play': '開始遊戲',
    'cta.viewAll': '查看所有話題',
    
    'footer.copyright': '版權所有',
    'footer.poweredBy': '由少數派遊戲驅動',
    'footer.tagline': '用少數派遊戲預測未來。成為逆向思考者。',
    'footer.explore': '探索',
    'footer.getStarted': '開始使用',
    'footer.rights': '版權所有。',
    
    'language': '語言',
  },
  
  'hi': {
    'nav.home': 'होम',
    'nav.topics': 'विषय',
    'nav.launchApp': 'ऐप लॉन्च करें',
    
    'topics.title': 'भविष्यवाणी विषय',
    'topics.subtitle': 'एक विषय चुनें और अपनी भविष्यवाणी करें',
    'topics.filter.all': 'सभी',
    'topics.filter.politics': 'राजनीति',
    'topics.filter.economy': 'अर्थव्यवस्था',
    'topics.filter.tech': 'तकनीक',
    'topics.filter.entertainment': 'मनोरंजन',
    'topics.filter.sports': 'खेल',
    'topics.empty': 'कोई विषय उपलब्ध नहीं',
    'topics.related': 'संबंधित पूर्वानुमान',
    
    'topic.predict': 'भविष्यवाणी करें',
    'topic.status.active': 'सक्रिय',
    'topic.status.closed': 'बंद',
    'topic.expires': 'समाप्ति',
    
    'option.yes': 'हाँ',
    'option.no': 'नहीं',
    
    'cta.play': 'अभी खेलें',
    'cta.viewAll': 'सभी विषय देखें',
    
    'footer.copyright': 'सर्वाधिकार सुरक्षित',
    'footer.poweredBy': 'माइनॉरिटी गेम द्वारा संचालित',
    'footer.tagline': 'माइनॉरिटी गेम के साथ भविष्य की भविष्यवाणी करें। विरोधाभासी बनें।',
    'footer.explore': 'खोजें',
    'footer.getStarted': 'शुरू करें',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    
    'language': 'भाषा',
  },
  
  'pt': {
    'nav.home': 'Início',
    'nav.topics': 'Tópicos',
    'nav.launchApp': 'Abrir App',
    
    'topics.title': 'Tópicos de Previsão',
    'topics.subtitle': 'Escolha um tópico e faça sua previsão',
    'topics.filter.all': 'Todos',
    'topics.filter.politics': 'Política',
    'topics.filter.economy': 'Economia',
    'topics.filter.tech': 'Tecnologia',
    'topics.filter.entertainment': 'Entretenimento',
    'topics.filter.sports': 'Esportes',
    'topics.empty': 'Nenhum tópico disponível',
    'topics.related': 'Previsões Relacionadas',
    
    'topic.predict': 'Fazer Previsão',
    'topic.status.active': 'Ativo',
    'topic.status.closed': 'Encerrado',
    'topic.expires': 'Expira em',
    
    'option.yes': 'Sim',
    'option.no': 'Não',
    
    'cta.play': 'Jogar Agora',
    'cta.viewAll': 'Ver Todos os Tópicos',
    
    'footer.copyright': 'Todos os direitos reservados',
    'footer.poweredBy': 'Desenvolvido por Minority Game',
    'footer.tagline': 'Preveja o futuro com o Minority Game. Seja o contrário.',
    'footer.explore': 'Explorar',
    'footer.getStarted': 'Comece Agora',
    'footer.rights': 'Todos os direitos reservados.',
    
    'language': 'Idioma',
  },
  
  'es': {
    'nav.home': 'Inicio',
    'nav.topics': 'Temas',
    'nav.launchApp': 'Abrir App',
    
    'topics.title': 'Temas de Predicción',
    'topics.subtitle': 'Elige un tema y haz tu predicción',
    'topics.filter.all': 'Todos',
    'topics.filter.politics': 'Política',
    'topics.filter.economy': 'Economía',
    'topics.filter.tech': 'Tecnología',
    'topics.filter.entertainment': 'Entretenimiento',
    'topics.filter.sports': 'Deportes',
    'topics.empty': 'No hay temas disponibles',
    'topics.related': 'Predicciones Relacionadas',
    
    'topic.predict': 'Hacer Predicción',
    'topic.status.active': 'Activo',
    'topic.status.closed': 'Cerrado',
    'topic.expires': 'Expira',
    
    'option.yes': 'Sí',
    'option.no': 'No',
    
    'cta.play': 'Jugar Ahora',
    'cta.viewAll': 'Ver Todos los Temas',
    
    'footer.copyright': 'Todos los derechos reservados',
    'footer.poweredBy': 'Desarrollado por Minority Game',
    'footer.tagline': 'Predice el futuro con el Minority Game. Sé el contrario.',
    'footer.explore': 'Explorar',
    'footer.getStarted': 'Comenzar',
    'footer.rights': 'Todos los derechos reservados.',
    
    'language': 'Idioma',
  },
};

/**
 * Get translated string for a key in the specified locale
 * Falls back to English if key not found in target locale
 * @param key - Translation key (e.g., 'nav.home')
 * @param locale - Target locale
 * @returns Translated string or the key itself if not found
 */
export function t(key: string, locale: Locale): string {
  return ui[locale]?.[key] ?? ui['en']?.[key] ?? key;
}

/** Alias for t() with more descriptive name */
export const translate = t;

/**
 * Create a translation function bound to a specific locale
 * @param locale - Target locale
 * @returns Translation function
 */
export function useTranslations(locale: Locale) {
  return (key: string) => t(key, locale);
}
