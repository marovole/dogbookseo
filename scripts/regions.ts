export type Region = 'global' | 'india' | 'taiwan_hk' | 'latam';
export type Category = 'politics' | 'economy' | 'tech' | 'entertainment' | 'sports';

export interface RegionConfig {
  languages: string[];
  searchLang: string;
  categories: {
    name: string;
    category: Category;
    queries: string[];
  }[];
}

export const regions: Record<Region, RegionConfig> = {
  global: {
    languages: ['en'],
    searchLang: 'en',
    categories: [
      {
        name: 'Politics/US',
        category: 'politics',
        queries: [
          'US 2024 election results',
          'Biden Trump 2025 political news',
          'Senate Congress elections prediction',
          'Presidential campaign 2025',
          'White House policy decision 2025',
        ],
      },
      {
        name: 'Sports/NFL',
        category: 'sports',
        queries: [
          'NFL playoffs Super Bowl 2025 predictions',
          'AFC NFC conference championship',
          'Super Bowl winners odds 2025',
          'NFL championship game prediction',
          'Super Bowl LVIII winner forecast',
        ],
      },
      {
        name: 'Sports/NBA',
        category: 'sports',
        queries: [
          'NBA Finals 2025 predictions championship',
          'NBA playoffs winner 2025',
          'Lakers Celtics NBA prediction',
          'NBA championship odds 2025',
          'NBA season winner forecast',
        ],
      },
      {
        name: 'Entertainment/Hollywood',
        category: 'entertainment',
        queries: [
          'Oscars 2025 predictions Academy Awards',
          'box office weekend predictions',
          'Movie award show winner prediction',
          'Golden Globe awards 2025',
          'Hollywood awards ceremony predictions',
        ],
      },
      {
        name: 'Economy/US',
        category: 'economy',
        queries: [
          'S&P 500 prediction 2025 stock market',
          'Fed interest rate decision 2025',
          'Bitcoin Ethereum crypto prediction',
          'US economy forecast 2025',
          'Stock market crash prediction 2025',
        ],
      },
      {
        name: 'Technology',
        category: 'tech',
        queries: [
          'AI technology news 2025 breakthrough',
          'Apple Google tech predictions 2025',
          'OpenAI GPT-5 release date',
          'Tech IPO predictions 2025',
          'Artificial intelligence development 2025',
        ],
      },
    ],
  },

  india: {
    languages: ['hi'],
    searchLang: 'en',
    categories: [
      {
        name: 'Sports/Cricket',
        category: 'sports',
        queries: [
          'India cricket match 2025 prediction',
          'IPL 2025 predictions cricket',
          'India vs England cricket series',
          'T20 world cup prediction 2025',
          'Indian cricket team performance forecast',
        ],
      },
      {
        name: 'Movies/Bollywood',
        category: 'entertainment',
        queries: [
          'Bollywood box office 2025 predictions',
          'Hindi movie release 2025 forecast',
          'Bollywood movie collection prediction',
          'Indian cinema box office record',
          'Bollywood film success prediction',
        ],
      },
      {
        name: 'Politics/India',
        category: 'politics',
        queries: [
          'India elections 2025 prediction',
          'BJP Congress politics news forecast',
          'Indian state elections prediction',
          'Modi government policy 2025',
          'Indian political forecast',
        ],
      },
      {
        name: 'Economy/India',
        category: 'economy',
        queries: [
          'Sensex Nifty prediction 2025 stock market',
          'Indian stock market forecast 2025',
          'Rupee dollar rate prediction',
          'Indian economy growth 2025',
          'India GDP forecast 2025',
        ],
      },
      {
        name: 'Sports/Other',
        category: 'sports',
        queries: [
          'India Olympics medal 2025 prediction',
          'Indian badminton tennis prediction',
          'India football tournament 2025',
          'Indian sports championship forecast',
          'India athletic performance 2025',
        ],
      },
    ],
  },

  taiwan_hk: {
    languages: ['zh-TW'],
    searchLang: 'zh-hant',
    categories: [
      {
        name: 'Politics/Taiwan',
        category: 'politics',
        queries: [
          '台灣政治 2025 預測',
          '2026選舉 預測 台灣',
          '民進黨 國民黨 政治',
          '台灣地方選舉 2026',
          '台灣政府政策 預測',
        ],
      },
      {
        name: 'Sports/Baseball',
        category: 'sports',
        queries: [
          '中華職棒 CPBL 2025 預測',
          '台灣棒球 冠軍 預測',
          '中職 明年 冠軍',
          '棒球 台灣 預測',
          '職棒 季後賽 預測',
        ],
      },
      {
        name: 'Entertainment',
        category: 'entertainment',
        queries: [
          '台劇 2025 收視率 預測',
          '金曲獎 2025 預測',
          '台灣綜藝節目 收視',
          '台灣電視劇 成績',
          '台灣娛樂 獎項 預測',
        ],
      },
      {
        name: 'Economy/Stock',
        category: 'economy',
        queries: [
          '台股 2025 預測 走勢',
          '港股 2025 分析 預測',
          '台幣 升值 預測',
          '台灣股市 指數 預測',
          '亞洲股市 台灣 預測',
        ],
      },
      {
        name: 'Sports/Other',
        category: 'sports',
        queries: [
          '台灣羽毛球 奧運 預測',
          '台灣網球 排球 預測',
          '台灣運動 國際賽 預測',
          '華人體育 台灣',
          '亞洲運動會 台灣',
        ],
      },
    ],
  },

  latam: {
    languages: ['pt', 'es'],
    searchLang: 'pt-br',
    categories: [
      {
        name: 'Sports/Football',
        category: 'sports',
        queries: [
          'Brasileirão 2025 previsão campeão',
          'Copa Libertadores 2025 previsão',
          'Brasil futebol 2025 predictions',
          'Campeonato brasileiro 2025',
          'Futebol Brasil próxima rodada',
        ],
      },
      {
        name: 'Politics/Brazil',
        category: 'politics',
        queries: [
          'Brasil política 2025 previsão',
          'eleições Brasil previsão próximas',
          'Lula governo 2025 previsão',
          'Política brasileira 2025 forecast',
          'Brasil eleição municipal 2025',
        ],
      },
      {
        name: 'Economy/Latam',
        category: 'economy',
        queries: [
          'Bovespa previsão 2025 bolsa',
          'dólar real cotação 2025',
          'Brasil economia 2025 previsão',
          'Economia latino americana 2025',
          'Mercado financeiro Brasil 2025',
        ],
      },
      {
        name: 'Sports/Argentina',
        category: 'sports',
        queries: [
          'Argentina fútbol 2025 previsão',
          'selección argentina predicción 2025',
          'Messi Argentina previsão',
          'Campeonato argentina 2025',
          'Copa America 2025 Argentina',
        ],
      },
      {
        name: 'Entertainment',
        category: 'entertainment',
        queries: [
          'Cinema Brasil 2025 previsão',
          'Telenovela 2025 previsão',
          'Entretenimento Brasil latino 2025',
          'Série brasil previsão sucesso',
          'Música latino americana 2025',
        ],
      },
    ],
  },
};

export function getRegionLanguages(region: Region): string[] {
  return regions[region].languages;
}

export function getAllRegions(): Region[] {
  return Object.keys(regions) as Region[];
}
