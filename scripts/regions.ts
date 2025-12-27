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
        queries: ['US politics 2025 prediction', 'Trump Biden news 2025'],
      },
      {
        name: 'Sports/NFL',
        category: 'sports',
        queries: ['NFL playoffs Super Bowl 2025 predictions'],
      },
      {
        name: 'Sports/NBA',
        category: 'sports',
        queries: ['NBA Finals 2025 predictions championship'],
      },
      {
        name: 'Entertainment/Hollywood',
        category: 'entertainment',
        queries: ['Oscars 2025 predictions', 'box office weekend predictions'],
      },
      {
        name: 'Economy/US',
        category: 'economy',
        queries: ['S&P 500 prediction 2025', 'Fed interest rate decision 2025'],
      },
      {
        name: 'Technology',
        category: 'tech',
        queries: ['AI technology news 2025', 'Apple Google tech predictions'],
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
        queries: ['India cricket match 2025', 'IPL 2025 predictions'],
      },
      {
        name: 'Movies/Bollywood',
        category: 'entertainment',
        queries: ['Bollywood box office 2025', 'Hindi movie release 2025'],
      },
      {
        name: 'Politics/India',
        category: 'politics',
        queries: ['India elections 2025', 'BJP Congress politics news'],
      },
      {
        name: 'Economy/India',
        category: 'economy',
        queries: ['Sensex Nifty prediction 2025', 'Indian stock market forecast'],
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
        queries: ['台灣政治 2025', '2026選舉 預測'],
      },
      {
        name: 'Sports/Baseball',
        category: 'sports',
        queries: ['中華職棒 CPBL 2025 預測'],
      },
      {
        name: 'Entertainment',
        category: 'entertainment',
        queries: ['台劇 2025 收視率', '金曲獎 預測'],
      },
      {
        name: 'Economy/Stock',
        category: 'economy',
        queries: ['台股 2025 預測', '港股 走勢 分析'],
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
        queries: ['Brasileirão 2025 previsão', 'Copa Libertadores 2025'],
      },
      {
        name: 'Politics/Brazil',
        category: 'politics',
        queries: ['Brasil política 2025', 'eleições Brasil previsão'],
      },
      {
        name: 'Economy/Latam',
        category: 'economy',
        queries: ['Bovespa previsão 2025', 'dólar real cotação'],
      },
      {
        name: 'Sports/Argentina',
        category: 'sports',
        queries: ['Argentina fútbol 2025', 'selección argentina predicción'],
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
