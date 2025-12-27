import * as fs from 'fs';
import * as path from 'path';
import { type Region } from './regions';

/**
 * Test Pipeline: Generate sample topics for each region
 * This creates realistic test data without requiring API keys
 */

const SAMPLE_TOPICS: Record<Region, Array<{
  slug: string;
  category: 'politics' | 'economy' | 'tech' | 'entertainment' | 'sports';
  locale: Record<string, { title: string; question: string; description: string }>;
  options: [string, string];
  keywords: string[];
  expirationDate: string;
  source: string;
}>> = {
  global: [
    {
      slug: 'super-bowl-lvix-winner-2025',
      category: 'sports',
      locale: {
        en: {
          title: 'Super Bowl LVIX 2025 Winner',
          question: 'Will the Kansas City Chiefs win Super Bowl LVIX?',
          description: 'Predict the winner of Super Bowl LVIX featuring the AFC and NFC champions.',
        },
      },
      options: ['Chiefs Win', 'Other Team Wins'],
      keywords: ['Super Bowl', 'NFL', 'Chiefs', 'Kansas City', '2025'],
      expirationDate: '2025-02-10T00:00:00Z',
      source: 'ESPN',
    },
    {
      slug: 'nba-finals-2025-champion',
      category: 'sports',
      locale: {
        en: {
          title: 'NBA Finals 2025 Champion',
          question: 'Which team will win the NBA Finals 2025?',
          description: 'Predict the winner of the 2025 NBA Finals championship.',
        },
      },
      options: ['Lakers/Celtics Win', 'Other Team Wins'],
      keywords: ['NBA', 'Basketball', 'Finals', '2025'],
      expirationDate: '2025-06-30T00:00:00Z',
      source: 'ESPN',
    },
    {
      slug: '2025-oscars-best-picture',
      category: 'entertainment',
      locale: {
        en: {
          title: '2025 Oscars Best Picture Winner',
          question: 'Which film will win the 2025 Academy Award for Best Picture?',
          description: 'Predict the winner of the Best Picture award at the 2025 Academy Awards.',
        },
      },
      options: ['Major Studio Film', 'Independent/International Film'],
      keywords: ['Oscars', 'Academy Awards', 'Best Picture', '2025'],
      expirationDate: '2025-03-03T00:00:00Z',
      source: 'Variety',
    },
    {
      slug: 'sp500-above-6000-by-q1-2025',
      category: 'economy',
      locale: {
        en: {
          title: 'S&P 500 Above 6000 by Q1 2025',
          question: 'Will the S&P 500 exceed 6000 points by end of Q1 2025?',
          description: 'Predict if the S&P 500 stock index will break above 6000 in the first quarter of 2025.',
        },
      },
      options: ['Yes', 'No'],
      keywords: ['Stock Market', 'S&P 500', 'Economy', 'Investment'],
      expirationDate: '2025-03-31T00:00:00Z',
      source: 'Bloomberg',
    },
    {
      slug: 'openai-gpt5-announcement-2025',
      category: 'tech',
      locale: {
        en: {
          title: 'OpenAI GPT-5 Announcement 2025',
          question: 'Will OpenAI announce GPT-5 before end of 2025?',
          description: 'Predict whether OpenAI will announce the next generation GPT-5 model in 2025.',
        },
      },
      options: ['Yes', 'No'],
      keywords: ['AI', 'OpenAI', 'GPT', 'Artificial Intelligence'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'Tech News',
    },
    {
      slug: 'bitcoin-20000-by-2025-end',
      category: 'economy',
      locale: {
        en: {
          title: 'Bitcoin Above $20,000 by End of 2025',
          question: 'Will Bitcoin price exceed $20,000 by December 31, 2025?',
          description: 'Predict if Bitcoin will reach a price above $20,000 by the end of 2025.',
        },
      },
      options: ['Yes', 'No'],
      keywords: ['Bitcoin', 'Cryptocurrency', 'Crypto', 'Digital Asset'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'CoinMarketCap',
    },
  ],
  india: [
    {
      slug: 'india-t20-world-cup-2025',
      category: 'sports',
      locale: {
        hi: {
          title: 'भारत T20 विश्व कप 2025',
          question: 'क्या भारत T20 विश्व कप 2025 जीतेगा?',
          description: 'भारत T20 विश्व कप 2025 जीतने की भविष्यवाणी करें।',
        },
      },
      options: ['हाँ', 'नहीं'],
      keywords: ['T20', 'क्रिकेट', 'भारत', '2025'],
      expirationDate: '2025-06-30T00:00:00Z',
      source: 'BCCI',
    },
    {
      slug: 'ipl-2025-champion-team',
      category: 'sports',
      locale: {
        hi: {
          title: 'IPL 2025 चैंपियन',
          question: 'IPL 2025 का चैंपियन कौन सा टीम होगा?',
          description: 'IPL 2025 टूर्नामेंट के विजेता की भविष्यवाणी करें।',
        },
      },
      options: ['Mumbai Indians', 'अन्य टीम'],
      keywords: ['IPL', 'क्रिकेट', 'भारत', '2025'],
      expirationDate: '2025-05-31T00:00:00Z',
      source: 'IPL',
    },
    {
      slug: 'bollywood-blockbuster-2025',
      category: 'entertainment',
      locale: {
        hi: {
          title: 'बॉलीवुड ब्लॉकबस्टर 2025',
          question: 'क्या 2025 में 100 करोड़ से अधिक कमाई वाली बॉलीवुड फिल्म आएगी?',
          description: 'बॉलीवुड में 2025 में एक बड़ी हिट फिल्म की भविष्यवाणी करें।',
        },
      },
      options: ['हाँ', 'नहीं'],
      keywords: ['बॉलीवुड', 'फिल्म', '2025'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'Bollywood Hungama',
    },
    {
      slug: 'india-sensex-80000-2025',
      category: 'economy',
      locale: {
        hi: {
          title: 'भारत सेंसेक्स 80000 2025',
          question: 'क्या भारत का सेंसेक्स 80,000 तक पहुंचेगा 2025 में?',
          description: 'भारतीय शेयर बाजार सेंसेक्स सूचकांक के 80000 तक पहुंचने की भविष्यवाणी करें।',
        },
      },
      options: ['हाँ', 'नहीं'],
      keywords: ['सेंसेक्स', 'शेयर बाजार', 'भारत', 'अर्थव्यवस्था'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'BSE',
    },
    {
      slug: 'india-elections-2025',
      category: 'politics',
      locale: {
        hi: {
          title: 'भारत राज्य चुनाव 2025',
          question: 'क्या BJP 2025 के राज्य चुनावों में बहुमत बनाए रखेगी?',
          description: '2025 के भारतीय राज्य चुनावों के परिणामों की भविष्यवाणी करें।',
        },
      },
      options: ['हाँ', 'नहीं'],
      keywords: ['चुनाव', 'भारत', 'राजनीति', '2025'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'Election Commission',
    },
  ],
  taiwan_hk: [
    {
      slug: 'taiwan-election-2026-prediction',
      category: 'politics',
      locale: {
        'zh-TW': {
          title: '2026年台灣選舉預測',
          question: '國民黨能否贏得2026年台灣地方選舉?',
          description: '預測2026年台灣地方選舉的結果。',
        },
      },
      options: ['是', '否'],
      keywords: ['台灣', '選舉', '2026', '政治'],
      expirationDate: '2026-11-30T00:00:00Z',
      source: '中央社',
    },
    {
      slug: 'cpbl-2025-champion-baseball',
      category: 'sports',
      locale: {
        'zh-TW': {
          title: '中華職棒2025年冠軍',
          question: '2025年中華職棒冠軍會是誰?',
          description: '預測2025年中華職棒聯賽的冠軍隊伍。',
        },
      },
      options: ['統一獅', '其他隊伍'],
      keywords: ['棒球', '中華職棒', '台灣', '2025'],
      expirationDate: '2025-10-31T00:00:00Z',
      source: 'CPBL',
    },
    {
      slug: 'taiwan-drama-hit-2025',
      category: 'entertainment',
      locale: {
        'zh-TW': {
          title: '2025年台劇收視爆款',
          question: '2025年會有收視超過2的台劇嗎?',
          description: '預測2025年是否會出現收視超過2%的熱門台灣電視劇。',
        },
      },
      options: ['是', '否'],
      keywords: ['台劇', '電視', '台灣', '2025'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: '三立',
    },
    {
      slug: 'tse-taiwan-stock-2025-prediction',
      category: 'economy',
      locale: {
        'zh-TW': {
          title: '2025年台股預測',
          question: '台股加權指數2025年能否突破20000點?',
          description: '預測台灣股票加權指數在2025年是否能突破20000點。',
        },
      },
      options: ['是', '否'],
      keywords: ['台股', '股市', '台灣', '經濟'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: '台灣證券交易所',
    },
    {
      slug: 'hong-kong-olympics-2026',
      category: 'sports',
      locale: {
        'zh-TW': {
          title: '2026年亞運會獎牌預測',
          question: '台灣能否在亞運會獲得超過10面金牌?',
          description: '預測台灣在2026年亞運會的獎牌表現。',
        },
      },
      options: ['是', '否'],
      keywords: ['亞運會', '運動會', '台灣', '獎牌'],
      expirationDate: '2026-10-31T00:00:00Z',
      source: 'OCA',
    },
  ],
  latam: [
    {
      slug: 'brasileirao-2025-champion',
      category: 'sports',
      locale: {
        pt: {
          title: 'Campeonato Brasileiro 2025 Campeão',
          question: 'Qual time vencerá o Campeonato Brasileiro 2025?',
          description: 'Preveja o campeão do Campeonato Brasileiro de Futebol 2025.',
        },
        es: {
          title: 'Campeón del Brasileirão 2025',
          question: '¿Cuál será el campeón del Brasileirão 2025?',
          description: 'Pronostique el campeón del Campeonato Brasileño 2025.',
        },
      },
      options: ['Flamengo/São Paulo', 'Outro time'],
      keywords: ['Futebol', 'Brasil', 'Campeonato Brasileiro', '2025'],
      expirationDate: '2025-11-30T00:00:00Z',
      source: 'CBF',
    },
    {
      slug: 'libertadores-2025-winner',
      category: 'sports',
      locale: {
        pt: {
          title: 'Copa Libertadores 2025 Vencedor',
          question: 'Qual time vencerá a Copa Libertadores 2025?',
          description: 'Preveja o vencedor da Copa Libertadores 2025.',
        },
        es: {
          title: 'Ganador de la Copa Libertadores 2025',
          question: '¿Quién ganará la Copa Libertadores 2025?',
          description: 'Pronostique el ganador de la Copa Libertadores 2025.',
        },
      },
      options: ['Time Brasileiro', 'Time Argentino/Outro'],
      keywords: ['Futebol', 'Copa Libertadores', 'América do Sul'],
      expirationDate: '2025-11-30T00:00:00Z',
      source: 'CONMEBOL',
    },
    {
      slug: 'brazil-economy-2025-growth',
      category: 'economy',
      locale: {
        pt: {
          title: 'Brasil Crescimento Econômico 2025',
          question: 'O Brasil terá crescimento econômico acima de 3% em 2025?',
          description: 'Preveja o crescimento do PIB brasileiro em 2025.',
        },
        es: {
          title: 'Crecimiento Económico de Brasil 2025',
          question: '¿El crecimiento económico de Brasil será superior a 3% en 2025?',
          description: 'Pronostique el crecimiento económico de Brasil en 2025.',
        },
      },
      options: ['Sim/Sí', 'Não/No'],
      keywords: ['Brasil', 'Economia', 'PIB', 'Crescimento'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'IBGE',
    },
    {
      slug: 'argentina-economy-2025',
      category: 'economy',
      locale: {
        pt: {
          title: 'Argentina Estabilidade Econômica 2025',
          question: 'A Argentina conseguirá estabilizar a inflação em 2025?',
          description: 'Preveja a situação econômica da Argentina em 2025.',
        },
        es: {
          title: 'Estabilidad Económica de Argentina 2025',
          question: '¿Argentina logrará estabilizar la inflación en 2025?',
          description: 'Pronostique la situación económica de Argentina en 2025.',
        },
      },
      options: ['Sim/Sí', 'Não/No'],
      keywords: ['Argentina', 'Economia', 'Inflação'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'INDEC',
    },
    {
      slug: 'latam-cinema-blockbuster-2025',
      category: 'entertainment',
      locale: {
        pt: {
          title: 'Cinema Latino Sucesso 2025',
          question: 'Haverá um filme latino-americano no top 10 de bilheteria global em 2025?',
          description: 'Preveja se um filme latino-americano fará sucesso global em 2025.',
        },
        es: {
          title: 'Éxito del Cine Latinoamericano 2025',
          question: '¿Habrá una película latinoamericana en el top 10 de taquilla global en 2025?',
          description: 'Pronostique el éxito global del cine latinoamericano en 2025.',
        },
      },
      options: ['Sim/Sí', 'Não/No'],
      keywords: ['Cinema', 'Filme', 'América Latina'],
      expirationDate: '2025-12-31T00:00:00Z',
      source: 'Box Office',
    },
  ],
};

async function generateTestTopics() {
  const processed: { slugs: string[]; lastUpdated: string | null } = { slugs: [], lastUpdated: null };
  let totalGenerated = 0;

  console.log('🧪 TEST PIPELINE: Generating sample topics');
  console.log('═'.repeat(60));

  for (const [region, topics] of Object.entries(SAMPLE_TOPICS)) {
    console.log(`\n📍 Region: ${region}`);
    
    for (const topic of topics) {
      const category = topic.category;
      const contentDir = path.join(
        process.cwd(),
        'src/content/topics',
        region,
        category
      );

      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }

      const topicData = {
        ...topic,
        slug: topic.slug,
        region: region as Region,
        category: topic.category,
        status: 'active',
        publishedAt: new Date().toISOString().split('T')[0],
      };

      const filepath = path.join(contentDir, `${topic.slug}.json`);
      fs.writeFileSync(filepath, JSON.stringify(topicData, null, 2), 'utf-8');
      
      processed.slugs.push(topic.slug);
      totalGenerated++;
      console.log(`  ✅ ${topic.slug}`);
    }
  }

  // Save processed data
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  processed.lastUpdated = new Date().toISOString();
  fs.writeFileSync(
    path.join(dataDir, 'processed.json'),
    JSON.stringify(processed, null, 2),
    'utf-8'
  );

  console.log('\n' + '═'.repeat(60));
  console.log(`📊 Generated ${totalGenerated} test topics`);
  console.log('═'.repeat(60));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateTestTopics();
}
