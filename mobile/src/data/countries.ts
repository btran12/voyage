export type VisaKind = 'free' | 'voa' | 'req';

export type EmergencyNumbers = {
  police: string;
  ambulance: string;
  fire: string;
  tourist: string;
};

export type PhraseMap = Record<string, [string, string]>;

export type TravelSpot = {
  name: string;
  emoji: string;
  desc: string;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  tz: string;
  capital: string;
  lang: string;
  plug: string;
  voltage: string;
  plugIcon: string;
  airport: string;
  visa: { default: VisaKind; text: string; days?: number };
  emergency: EmergencyNumbers;
  phrases: PhraseMap;
  drives: 'left' | 'right';
  spots: TravelSpot[];
};

export type CityCoords = {
  lat: number;
  lon: number;
  city: string;
};

export const COUNTRIES: Country[] = [
  {
    "code": "US",
    "name": "United States",
    "flag": "🇺🇸",
    "currency": "USD",
    "symbol": "$",
    "tz": "America/New_York",
    "capital": "Washington D.C.",
    "lang": "English",
    "plug": "A/B",
    "voltage": "120V / 60Hz",
    "plugIcon": "🔌",
    "airport": "JFK",
    "visa": {
      "default": "voa",
      "text": "Visa on Arrival or ESTA for many nationalities. Citizens of VWP countries need ESTA ($21). Others may need B-2 visa.",
      "days": 90
    },
    "emergency": {
      "police": "911",
      "ambulance": "911",
      "fire": "911",
      "tourist": "1-800-USA-INFO"
    },
    "phrases": {},
    "drives": "right",
    "spots": [
      {
        "name": "New York City",
        "emoji": "🗽",
        "desc": "The city that never sleeps — Times Square, Central Park, world-class museums."
      },
      {
        "name": "Grand Canyon",
        "emoji": "🏜️",
        "desc": "Jaw-dropping natural wonder carved by the Colorado River over millions of years."
      },
      {
        "name": "Las Vegas",
        "emoji": "🎰",
        "desc": "Entertainment capital of the world — casinos, shows, and neon-lit nightlife."
      },
      {
        "name": "Yellowstone",
        "emoji": "🦬",
        "desc": "First national park on Earth with geysers, hot springs, and abundant wildlife."
      },
      {
        "name": "San Francisco",
        "emoji": "🌉",
        "desc": "Golden Gate Bridge, Alcatraz, Fisherman's Wharf, and hilly Victorian streets."
      },
      {
        "name": "Hawaii",
        "emoji": "🌺",
        "desc": "Volcanic islands with pristine beaches, lush rainforests, and aloha culture."
      },
      {
        "name": "New Orleans",
        "emoji": "🎷",
        "desc": "Jazz birthplace with vibrant Creole cuisine, Mardi Gras, and French Quarter charm."
      },
      {
        "name": "Yellowstone",
        "emoji": "🌋",
        "desc": "Old Faithful geyser, prismatic springs, and the largest supervolcano in North America."
      }
    ]
  },
  {
    "code": "GB",
    "name": "United Kingdom",
    "flag": "🇬🇧",
    "currency": "GBP",
    "symbol": "£",
    "tz": "Europe/London",
    "capital": "London",
    "lang": "English",
    "plug": "G",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "LHR",
    "visa": {
      "default": "voa",
      "text": "No visa required for most Western nationals. ETA required from 2025 for eligible nationalities (£10).",
      "days": 180
    },
    "emergency": {
      "police": "999",
      "ambulance": "999",
      "fire": "999",
      "tourist": "0800 400 900"
    },
    "phrases": {
      "Hello": [
        "Hiya!",
        "Hiya"
      ],
      "Thank you": [
        "Ta / Cheers",
        "tah / cheerz"
      ],
      "Excuse me": [
        "Pardon",
        "par-don"
      ],
      "Where is...": [
        "Where is...",
        "wer-iz"
      ]
    },
    "drives": "left",
    "spots": [
      {
        "name": "London",
        "emoji": "🏰",
        "desc": "Big Ben, Tower of London, Buckingham Palace, and world-renowned museums."
      },
      {
        "name": "Edinburgh",
        "emoji": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "desc": "Scotland's dramatic capital with a medieval castle, Arthur's Seat, and the Royal Mile."
      },
      {
        "name": "The Cotswolds",
        "emoji": "🌿",
        "desc": "Idyllic honey-stone villages, rolling hills, and quintessentially English countryside."
      },
      {
        "name": "Stonehenge",
        "emoji": "🪨",
        "desc": "Mysterious prehistoric monument on Salisbury Plain, over 4,000 years old."
      },
      {
        "name": "Bath",
        "emoji": "🛁",
        "desc": "Georgian architecture, Roman baths, and Jane Austen heritage in one elegant city."
      },
      {
        "name": "Lake District",
        "emoji": "⛰️",
        "desc": "England's largest national park with dramatic fells, lakes, and Wordsworth connections."
      },
      {
        "name": "Oxford & Cambridge",
        "emoji": "🎓",
        "desc": "Centuries-old university cities with stunning colleges, punting, and academic tradition."
      }
    ]
  },
  {
    "code": "JP",
    "name": "Japan",
    "flag": "🇯🇵",
    "currency": "JPY",
    "symbol": "¥",
    "tz": "Asia/Tokyo",
    "capital": "Tokyo",
    "lang": "Japanese",
    "plug": "A/B",
    "voltage": "100V / 50/60Hz",
    "plugIcon": "🔌",
    "airport": "NRT",
    "visa": {
      "default": "free",
      "text": "Visa-free for citizens of 68 countries for up to 90 days. Japan Tourist Tax of ¥1000 applies.",
      "days": 90
    },
    "emergency": {
      "police": "110",
      "ambulance": "119",
      "fire": "119",
      "tourist": "03-3503-4306"
    },
    "phrases": {
      "Hello": [
        "こんにちは (Konnichiwa)",
        "kon-ni-chi-wa"
      ],
      "Thank you": [
        "ありがとう (Arigatou)",
        "a-ri-ga-toh"
      ],
      "Excuse me": [
        "すみません (Sumimasen)",
        "su-mi-ma-sen"
      ],
      "Where is...": [
        "...はどこですか？",
        "...wa do-ko des-ka"
      ]
    },
    "drives": "left",
    "spots": [
      {
        "name": "Tokyo",
        "emoji": "🗼",
        "desc": "Neon-drenched mega-city of contrasts — temples, anime, sushi, and Robot Restaurant."
      },
      {
        "name": "Kyoto",
        "emoji": "⛩️",
        "desc": "Japan's cultural soul with 2,000 temples, geisha districts, and bamboo groves."
      },
      {
        "name": "Osaka",
        "emoji": "🍜",
        "desc": "Japan's kitchen — street food paradise, Dotonbori canal, and Osaka Castle."
      },
      {
        "name": "Hiroshima & Miyajima",
        "emoji": "🕊️",
        "desc": "Powerful Peace Memorial Park and the iconic floating torii gate of Itsukushima."
      },
      {
        "name": "Hakone",
        "emoji": "🗻",
        "desc": "Stunning views of Mount Fuji, volcanic hot springs, and ryokan experiences."
      },
      {
        "name": "Nara",
        "emoji": "🦌",
        "desc": "Friendly free-roaming deer and the giant bronze Buddha of Tōdai-ji temple."
      },
      {
        "name": "Hokkaido",
        "emoji": "❄️",
        "desc": "Japan's northern frontier — ski resorts, lavender fields, and fresh seafood."
      },
      {
        "name": "Okinawa",
        "emoji": "🌊",
        "desc": "Tropical islands with emerald waters, coral reefs, and unique Ryukyuan culture."
      }
    ]
  },
  {
    "code": "FR",
    "name": "France",
    "flag": "🇫🇷",
    "currency": "EUR",
    "symbol": "€",
    "tz": "Europe/Paris",
    "capital": "Paris",
    "lang": "French",
    "plug": "C/E",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "CDG",
    "visa": {
      "default": "free",
      "text": "Schengen Area. No visa required for EU/EEA + many others up to 90 days in 180. ETIAS required from 2025 (€7).",
      "days": 90
    },
    "emergency": {
      "police": "17",
      "ambulance": "15",
      "fire": "18",
      "tourist": "3975"
    },
    "phrases": {
      "Hello": [
        "Bonjour",
        "bon-zhoor"
      ],
      "Thank you": [
        "Merci",
        "mair-see"
      ],
      "Excuse me": [
        "Excusez-moi",
        "ex-koo-zay mwah"
      ],
      "Where is...": [
        "Où est...?",
        "oo-ay"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Paris",
        "emoji": "🗼",
        "desc": "City of Light — Eiffel Tower, Louvre, Notre-Dame, and unrivalled café culture."
      },
      {
        "name": "Provence",
        "emoji": "💜",
        "desc": "Lavender fields, Roman ruins, hilltop villages, and rosé wine in the sun."
      },
      {
        "name": "French Riviera",
        "emoji": "🏖️",
        "desc": "Glamorous Côte d'Azur with Nice, Cannes, Monaco, and azure Mediterranean waters."
      },
      {
        "name": "Mont Saint-Michel",
        "emoji": "🏰",
        "desc": "Tidal island abbey rising dramatically from the Normandy sea — a UNESCO wonder."
      },
      {
        "name": "Loire Valley",
        "emoji": "🍷",
        "desc": "Châteaux, vineyards, and Renaissance splendour along the \"Garden of France.\""
      },
      {
        "name": "Alsace",
        "emoji": "🎄",
        "desc": "Fairytale half-timbered villages, Christmas markets, and Germanic wine culture."
      },
      {
        "name": "Bordeaux",
        "emoji": "🍾",
        "desc": "World wine capital with elegant architecture and superb gastronomy."
      }
    ]
  },
  {
    "code": "DE",
    "name": "Germany",
    "flag": "🇩🇪",
    "currency": "EUR",
    "symbol": "€",
    "tz": "Europe/Berlin",
    "capital": "Berlin",
    "lang": "German",
    "plug": "C/F",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "FRA",
    "visa": {
      "default": "free",
      "text": "Schengen Area. Visa-free for many countries up to 90 days. ETIAS system launching soon.",
      "days": 90
    },
    "emergency": {
      "police": "110",
      "ambulance": "112",
      "fire": "112",
      "tourist": "030 25002333"
    },
    "phrases": {
      "Hello": [
        "Guten Tag",
        "goo-ten tahg"
      ],
      "Thank you": [
        "Danke",
        "dan-keh"
      ],
      "Excuse me": [
        "Entschuldigung",
        "ent-shool-dee-goong"
      ],
      "Where is...": [
        "Wo ist...?",
        "vo-ist"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Berlin",
        "emoji": "🏛️",
        "desc": "History, art, and nightlife — Brandenburg Gate, Berlin Wall remnants, and Museum Island."
      },
      {
        "name": "Neuschwanstein Castle",
        "emoji": "🏰",
        "desc": "The fairy-tale castle that inspired Disney — perched in the Bavarian Alps."
      },
      {
        "name": "Munich",
        "emoji": "🍺",
        "desc": "Oktoberfest, the Marienplatz, English Garden, and Bavaria's proud traditions."
      },
      {
        "name": "Black Forest",
        "emoji": "🌲",
        "desc": "Dense forest, cuckoo clocks, cakes, and charming spa towns like Baden-Baden."
      },
      {
        "name": "Cologne",
        "emoji": "⛪",
        "desc": "Soaring Gothic cathedral, Rhine riverfront, and the famous Cologne Carnival."
      },
      {
        "name": "Hamburg",
        "emoji": "⚓",
        "desc": "Maritime city with the famous Reeperbahn, Speicherstadt, and Miniatur Wunderland."
      },
      {
        "name": "Rhine Valley",
        "emoji": "🍇",
        "desc": "Castles, vineyards, and dramatic river scenery along Germany's most iconic waterway."
      }
    ]
  },
  {
    "code": "IT",
    "name": "Italy",
    "flag": "🇮🇹",
    "currency": "EUR",
    "symbol": "€",
    "tz": "Europe/Rome",
    "capital": "Rome",
    "lang": "Italian",
    "plug": "C/F/L",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "FCO",
    "visa": {
      "default": "free",
      "text": "Schengen Area. Visa-free for 90 days for most nationalities. ETIAS required from 2025.",
      "days": 90
    },
    "emergency": {
      "police": "113",
      "ambulance": "118",
      "fire": "115",
      "tourist": "06 0608"
    },
    "phrases": {
      "Hello": [
        "Ciao / Buongiorno",
        "chow / bwon-jor-no"
      ],
      "Thank you": [
        "Grazie",
        "gra-tsee-ay"
      ],
      "Excuse me": [
        "Scusi",
        "skoo-zee"
      ],
      "Where is...": [
        "Dov'è...?",
        "dov-eh"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Rome",
        "emoji": "🏛️",
        "desc": "The Eternal City — Colosseum, Vatican, Trevi Fountain, and 2,800 years of history."
      },
      {
        "name": "Venice",
        "emoji": "🚣",
        "desc": "Floating city of canals, gondolas, St. Mark's Basilica, and Carnival magic."
      },
      {
        "name": "Florence",
        "emoji": "🎨",
        "desc": "Birthplace of the Renaissance — Uffizi, Duomo, David, and Ponte Vecchio."
      },
      {
        "name": "Amalfi Coast",
        "emoji": "🌊",
        "desc": "Dramatic cliffside villages, turquoise sea, and lemon groves above the Tyrrhenian."
      },
      {
        "name": "Tuscany",
        "emoji": "🍷",
        "desc": "Rolling hills, cypress trees, Chianti wine, and medieval hill towns like Siena."
      },
      {
        "name": "Sicily",
        "emoji": "🌋",
        "desc": "Greece meets Italy — Mount Etna, Greek temples, and the best food in the country."
      },
      {
        "name": "Cinque Terre",
        "emoji": "🏘️",
        "desc": "Five pastel-coloured fishing villages clinging to dramatic Ligurian clifftops."
      },
      {
        "name": "Lake Como",
        "emoji": "⛵",
        "desc": "Aristocratic lakeside villas, Alpine scenery, and effortless Italian glamour."
      }
    ]
  },
  {
    "code": "ES",
    "name": "Spain",
    "flag": "🇪🇸",
    "currency": "EUR",
    "symbol": "€",
    "tz": "Europe/Madrid",
    "capital": "Madrid",
    "lang": "Spanish",
    "plug": "C/F",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "MAD",
    "visa": {
      "default": "free",
      "text": "Schengen Area. Visa-free for many nationalities for up to 90 days. ETIAS launching 2025.",
      "days": 90
    },
    "emergency": {
      "police": "091",
      "ambulance": "061",
      "fire": "080",
      "tourist": "010"
    },
    "phrases": {
      "Hello": [
        "Hola",
        "oh-lah"
      ],
      "Thank you": [
        "Gracias",
        "gra-see-as"
      ],
      "Excuse me": [
        "Perdón",
        "pair-don"
      ],
      "Where is...": [
        "¿Dónde está...?",
        "don-day es-ta"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Barcelona",
        "emoji": "🏗️",
        "desc": "Gaudí's masterpieces, Las Ramblas, Gothic Quarter, and vibrant beach culture."
      },
      {
        "name": "Madrid",
        "emoji": "🎨",
        "desc": "Royal Palace, Prado Museum, tapas bars, and pulsating nightlife of the capital."
      },
      {
        "name": "Seville",
        "emoji": "💃",
        "desc": "Flamenco heartland with the stunning Alcázar, Cathedral, and lively tapas scene."
      },
      {
        "name": "Granada",
        "emoji": "🕌",
        "desc": "The magnificent Alhambra palace overlooking the Sierra Nevada mountains."
      },
      {
        "name": "Ibiza",
        "emoji": "🎶",
        "desc": "World-famous for nightclubs, but also beautiful beaches and a historic old town."
      },
      {
        "name": "San Sebastián",
        "emoji": "🦞",
        "desc": "Pintxos capital of the world with Belle Époque architecture and La Concha beach."
      },
      {
        "name": "Toledo",
        "emoji": "⚔️",
        "desc": "Medieval walled city with El Greco masterworks and Christian-Moorish-Jewish heritage."
      }
    ]
  },
  {
    "code": "AU",
    "name": "Australia",
    "flag": "🇦🇺",
    "currency": "AUD",
    "symbol": "A$",
    "tz": "Australia/Sydney",
    "capital": "Canberra",
    "lang": "English",
    "plug": "I",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "SYD",
    "visa": {
      "default": "req",
      "text": "Electronic Travel Authority (ETA) required for most nationalities. Apply via Australian ETA app (~A$20). No ETA needed for NZ citizens.",
      "days": 90
    },
    "emergency": {
      "police": "000",
      "ambulance": "000",
      "fire": "000",
      "tourist": "1300 555 135"
    },
    "phrases": {},
    "drives": "left",
    "spots": [
      {
        "name": "Sydney",
        "emoji": "🦘",
        "desc": "Opera House, Harbour Bridge, Bondi Beach, and stunning harbour scenery."
      },
      {
        "name": "Great Barrier Reef",
        "emoji": "🐠",
        "desc": "World's largest coral reef system — snorkelling and diving in a UNESCO wonder."
      },
      {
        "name": "Uluru",
        "emoji": "🪨",
        "desc": "Sacred sandstone monolith rising from the red heart of the Australian outback."
      },
      {
        "name": "Melbourne",
        "emoji": "☕",
        "desc": "Coffee culture, street art, AFL football, and the world's most liveable city vibes."
      },
      {
        "name": "Daintree Rainforest",
        "emoji": "🌿",
        "desc": "World's oldest tropical rainforest meeting the Great Barrier Reef at Cape Tribulation."
      },
      {
        "name": "Whitsunday Islands",
        "emoji": "⛵",
        "desc": "74 islands of pure white beaches, turquoise lagoons, and sailing paradise."
      },
      {
        "name": "Tasmania",
        "emoji": "🌲",
        "desc": "Wilderness island with ancient forests, MONA museum, and dramatic coastlines."
      }
    ]
  },
  {
    "code": "CA",
    "name": "Canada",
    "flag": "🇨🇦",
    "currency": "CAD",
    "symbol": "C$",
    "tz": "America/Toronto",
    "capital": "Ottawa",
    "lang": "English/French",
    "plug": "A/B",
    "voltage": "120V / 60Hz",
    "plugIcon": "🔌",
    "airport": "YYZ",
    "visa": {
      "default": "voa",
      "text": "ETA required for visa-exempt foreign nationals flying to Canada (CAD $7). US citizens exempt. No visa for many countries.",
      "days": 180
    },
    "emergency": {
      "police": "911",
      "ambulance": "911",
      "fire": "911",
      "tourist": "1-800-267-8376"
    },
    "phrases": {},
    "drives": "right",
    "spots": [
      {
        "name": "Banff & Jasper",
        "emoji": "🏔️",
        "desc": "Turquoise glacier lakes, towering Rockies, and abundant wildlife in Alberta."
      },
      {
        "name": "Vancouver",
        "emoji": "🌲",
        "desc": "Mountains meet ocean — Stanley Park, ski resorts, and Pacific Rim cuisine."
      },
      {
        "name": "Niagara Falls",
        "emoji": "💧",
        "desc": "Thundering waterfalls straddling Ontario and New York — breathtaking up close."
      },
      {
        "name": "Québec City",
        "emoji": "⚜️",
        "desc": "Europe in North America — fortified walls, cobblestones, French language, and poutine."
      },
      {
        "name": "Toronto",
        "emoji": "🏙️",
        "desc": "CN Tower, diverse neighbourhoods, and one of the world's most multicultural cities."
      },
      {
        "name": "Northern Lights (Yukon)",
        "emoji": "🌌",
        "desc": "Chase the aurora borealis across dark wilderness skies in Canada's north."
      },
      {
        "name": "Prince Edward Island",
        "emoji": "🦞",
        "desc": "Red sand beaches, lobster suppers, and the home of Anne of Green Gables."
      }
    ]
  },
  {
    "code": "TH",
    "name": "Thailand",
    "flag": "🇹🇭",
    "currency": "THB",
    "symbol": "฿",
    "tz": "Asia/Bangkok",
    "capital": "Bangkok",
    "lang": "Thai",
    "plug": "A/B/C",
    "voltage": "220V / 50Hz",
    "plugIcon": "🔌",
    "airport": "BKK",
    "visa": {
      "default": "free",
      "text": "Visa Exemption for 93 countries for 60 days (extendable). Thailand has expanded its visa-free policy significantly in 2024-2025.",
      "days": 60
    },
    "emergency": {
      "police": "191",
      "ambulance": "1669",
      "fire": "199",
      "tourist": "1155"
    },
    "phrases": {
      "Hello": [
        "สวัสดี (Sawasdee)",
        "sa-wad-dee"
      ],
      "Thank you": [
        "ขอบคุณ (Khob Khun)",
        "kob-koon"
      ],
      "Excuse me": [
        "ขอโทษ (Kho Thot)",
        "kor-tot"
      ],
      "Where is...": [
        "...อยู่ที่ไหน?",
        "...yoo tee nai"
      ]
    },
    "drives": "left",
    "spots": [
      {
        "name": "Bangkok",
        "emoji": "🛕",
        "desc": "Grand Palace, floating markets, street food, and wild nightlife in the capital."
      },
      {
        "name": "Chiang Mai",
        "emoji": "🐘",
        "desc": "Northern temple city with elephant sanctuaries, night bazaars, and hill tribe culture."
      },
      {
        "name": "Phuket",
        "emoji": "🏝️",
        "desc": "Thailand's largest island with stunning beaches, clear waters, and lively resorts."
      },
      {
        "name": "Koh Samui",
        "emoji": "🌴",
        "desc": "Luxury resorts, Full Moon parties, and paradisiacal beaches in the Gulf of Thailand."
      },
      {
        "name": "Krabi",
        "emoji": "🧗",
        "desc": "Limestone karsts, sea kayaking, Railay Beach, and island-hopping adventures."
      },
      {
        "name": "Ayutthaya",
        "emoji": "🏛️",
        "desc": "Ancient ruined temples of the former Siamese capital — a UNESCO World Heritage Site."
      },
      {
        "name": "Pai",
        "emoji": "🌄",
        "desc": "Laid-back mountain town in Mae Hong Son with waterfalls, hot springs, and great vibes."
      }
    ]
  },
  {
    "code": "VN",
    "name": "Vietnam",
    "flag": "🇻🇳",
    "currency": "VND",
    "symbol": "₫",
    "tz": "Asia/Ho_Chi_Minh",
    "capital": "Hanoi",
    "lang": "Vietnamese",
    "plug": "A/C/F",
    "voltage": "220V / 50Hz",
    "plugIcon": "🔌",
    "airport": "SGN",
    "visa": {
      "default": "voa",
      "text": "E-visa ($25) available to 80+ nationalities for 90 days. Visa-free for 45 days for citizens of select countries including Germany, France, UK, Italy, Spain, Japan, South Korea.",
      "days": 90
    },
    "emergency": {
      "police": "113",
      "ambulance": "115",
      "fire": "114",
      "tourist": "024 3942 5678"
    },
    "phrases": {
      "Hello": [
        "Xin chào",
        "sin chow"
      ],
      "Thank you": [
        "Cảm ơn",
        "gam un"
      ],
      "Excuse me": [
        "Xin lỗi",
        "sin loy"
      ],
      "Where is...": [
        "...ở đâu?",
        "...uh dow"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Ha Long Bay",
        "emoji": "⛵",
        "desc": "Thousands of limestone karst islands rising from emerald waters — a UNESCO marvel."
      },
      {
        "name": "Hội An",
        "emoji": "🏮",
        "desc": "Lantern-lit ancient town, tailor shops, cycling through rice paddies, and Thu Bon River."
      },
      {
        "name": "Ho Chi Minh City",
        "emoji": "🛵",
        "desc": "Buzzing metropolis of motorbikes, war history, street food, and French colonial charm."
      },
      {
        "name": "Hanoi",
        "emoji": "🍜",
        "desc": "Capital of contrasts — Old Quarter, Hoan Kiem Lake, pho breakfasts, and opera house."
      },
      {
        "name": "Sapa",
        "emoji": "🌾",
        "desc": "Terraced rice fields and hill tribe villages in the misty mountains near the Chinese border."
      },
      {
        "name": "Da Nang & Đà Nẵng",
        "emoji": "🌉",
        "desc": "Dragon Bridge, My Khe Beach, Ba Na Hills, and gateway to Hội An and Mỹ Sơn."
      },
      {
        "name": "Phú Quốc",
        "emoji": "🏖️",
        "desc": "Rapidly developing island paradise with pristine beaches and spectacular sunsets."
      },
      {
        "name": "Ninh Bình",
        "emoji": "⛵",
        "desc": "\"Ha Long Bay on land\" — boat rides through karst landscapes and Tràng An grottoes."
      }
    ]
  },
  {
    "code": "SG",
    "name": "Singapore",
    "flag": "🇸🇬",
    "currency": "SGD",
    "symbol": "S$",
    "tz": "Asia/Singapore",
    "capital": "Singapore",
    "lang": "English/Mandarin/Malay/Tamil",
    "plug": "G",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "SIN",
    "visa": {
      "default": "free",
      "text": "Visa-free for most nationalities for 30-90 days. Singapore has mutual visa-free agreements with 165+ countries.",
      "days": 30
    },
    "emergency": {
      "police": "999",
      "ambulance": "995",
      "fire": "995",
      "tourist": "1800 736 2000"
    },
    "phrases": {
      "Hello": [
        "Hello / Eh!",
        "lah!"
      ],
      "Thank you": [
        "Thank you lah",
        "tank yoo lah"
      ],
      "Excuse me": [
        "Sorry leh",
        "sor-ree leh"
      ],
      "Where is...": [
        "Where got...?",
        "wair got"
      ]
    },
    "drives": "left",
    "spots": [
      {
        "name": "Marina Bay Sands",
        "emoji": "🏙️",
        "desc": "Iconic rooftop infinity pool, SkyPark observation deck, and ArtScience Museum."
      },
      {
        "name": "Gardens by the Bay",
        "emoji": "🌿",
        "desc": "Supertree Grove, Cloud Forest, and Flower Dome — futuristic urban nature at its best."
      },
      {
        "name": "Sentosa Island",
        "emoji": "🎢",
        "desc": "Universal Studios, beaches, cable car rides, and resort entertainment galore."
      },
      {
        "name": "Chinatown & Little India",
        "emoji": "🏮",
        "desc": "Colourful heritage districts with temples, street food, and vibrant bazaars."
      },
      {
        "name": "Hawker Centres",
        "emoji": "🍢",
        "desc": "Singapore's soul — Lau Pa Sat, Maxwell, Old Airport Road for world-class cheap eats."
      },
      {
        "name": "Singapore Zoo & Night Safari",
        "emoji": "🦁",
        "desc": "World-renowned open-concept zoo with nocturnal night safari experience."
      },
      {
        "name": "Orchard Road",
        "emoji": "🛍️",
        "desc": "Legendary shopping boulevard with luxury malls, street food, and neon lights."
      }
    ]
  },
  {
    "code": "MX",
    "name": "Mexico",
    "flag": "🇲🇽",
    "currency": "MXN",
    "symbol": "MX$",
    "tz": "America/Mexico_City",
    "capital": "Mexico City",
    "lang": "Spanish",
    "plug": "A/B",
    "voltage": "127V / 60Hz",
    "plugIcon": "🔌",
    "airport": "MEX",
    "visa": {
      "default": "free",
      "text": "No visa required for citizens of 68 countries. Electronic Authorization (AEM) may be required. US/EU/UK citizens: visa-free up to 180 days.",
      "days": 180
    },
    "emergency": {
      "police": "911",
      "ambulance": "911",
      "fire": "911",
      "tourist": "800 987 8224"
    },
    "phrases": {
      "Hello": [
        "¡Hola!",
        "oh-lah"
      ],
      "Thank you": [
        "Gracias",
        "gra-see-as"
      ],
      "Excuse me": [
        "Perdón",
        "pair-don"
      ],
      "Where is...": [
        "¿Dónde está...?",
        "don-day es-ta"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Mexico City",
        "emoji": "🏙️",
        "desc": "Zócalo, Frida Kahlo Museum, Teotihuacán pyramids nearby, and incredible food scene."
      },
      {
        "name": "Cancún & Riviera Maya",
        "emoji": "🏖️",
        "desc": "Caribbean beaches, cenotes, Tulum ruins, and vibrant resort nightlife."
      },
      {
        "name": "Oaxaca",
        "emoji": "🎨",
        "desc": "Indigenous culture, mole, mezcal, Day of the Dead traditions, and Monte Albán ruins."
      },
      {
        "name": "Chichen Itza",
        "emoji": "🏛️",
        "desc": "El Castillo pyramid — one of the New Seven Wonders of the World in the Yucatán."
      },
      {
        "name": "Guanajuato",
        "emoji": "🌈",
        "desc": "Colourful colonial city built into a ravine with underground roads and a famous mummy museum."
      },
      {
        "name": "San Miguel de Allende",
        "emoji": "💐",
        "desc": "UNESCO heritage city famous for its Baroque architecture and thriving arts scene."
      },
      {
        "name": "Copper Canyon",
        "emoji": "🏜️",
        "desc": "Larger and deeper than the Grand Canyon — epic train journey through the Sierra Madre."
      }
    ]
  },
  {
    "code": "IN",
    "name": "India",
    "flag": "🇮🇳",
    "currency": "INR",
    "symbol": "₹",
    "tz": "Asia/Kolkata",
    "capital": "New Delhi",
    "lang": "Hindi / English",
    "plug": "C/D/M",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "DEL",
    "visa": {
      "default": "voa",
      "text": "e-Visa required for most nationalities. Apply online ($25–$100). Valid for 30-365 days. Visa on Arrival at select airports.",
      "days": 60
    },
    "emergency": {
      "police": "100",
      "ambulance": "102",
      "fire": "101",
      "tourist": "1800 11 1363"
    },
    "phrases": {
      "Hello": [
        "नमस्ते (Namaste)",
        "na-mas-tay"
      ],
      "Thank you": [
        "धन्यवाद (Dhanyavaad)",
        "dhan-ya-vaad"
      ],
      "Excuse me": [
        "माफ़ करें (Maaf Karen)",
        "maaf ka-rain"
      ],
      "Where is...": [
        "...कहाँ है? (Kahan hai?)",
        "...ka-han hai"
      ]
    },
    "drives": "left",
    "spots": [
      {
        "name": "Taj Mahal, Agra",
        "emoji": "🕌",
        "desc": "The world's greatest monument to love — a UNESCO marble masterpiece at sunrise."
      },
      {
        "name": "Jaipur",
        "emoji": "🐪",
        "desc": "The Pink City — Amber Fort, Hawa Mahal, bazaars, and Rajasthani royal grandeur."
      },
      {
        "name": "Varanasi",
        "emoji": "🪔",
        "desc": "Oldest living city on earth — Ganges ghats, burning rituals, and spiritual intensity."
      },
      {
        "name": "Kerala Backwaters",
        "emoji": "🚢",
        "desc": "Houseboat cruises through tranquil palm-fringed canals, lagoons, and villages."
      },
      {
        "name": "Mumbai",
        "emoji": "🎬",
        "desc": "Bollywood, Gateway of India, Dharavi, street food, and colonial Victoria architecture."
      },
      {
        "name": "Ladakh",
        "emoji": "🏔️",
        "desc": "High-altitude Himalayan desert with Buddhist monasteries and starlit moonscapes."
      },
      {
        "name": "Goa",
        "emoji": "🏄",
        "desc": "Portuguese-flavoured beaches, seafood shacks, yoga retreats, and hippie markets."
      },
      {
        "name": "Hampi",
        "emoji": "🪨",
        "desc": "Surreal boulder landscape with ruins of the Vijayanagara Empire — a UNESCO site."
      }
    ]
  },
  {
    "code": "BR",
    "name": "Brazil",
    "flag": "🇧🇷",
    "currency": "BRL",
    "symbol": "R$",
    "tz": "America/Sao_Paulo",
    "capital": "Brasília",
    "lang": "Portuguese",
    "plug": "N",
    "voltage": "127/220V / 60Hz",
    "plugIcon": "🔌",
    "airport": "GRU",
    "visa": {
      "default": "free",
      "text": "Visa-free for US, EU, UK, and many others for up to 90 days. Brazil reinstated visa-free access for US citizens in 2024.",
      "days": 90
    },
    "emergency": {
      "police": "190",
      "ambulance": "192",
      "fire": "193",
      "tourist": "0800 023 0023"
    },
    "phrases": {
      "Hello": [
        "Olá",
        "oh-lah"
      ],
      "Thank you": [
        "Obrigado/a",
        "ob-ree-GAH-do"
      ],
      "Excuse me": [
        "Com licença",
        "com lee-SEN-sa"
      ],
      "Where is...": [
        "Onde fica...?",
        "on-jee FEE-ka"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Rio de Janeiro",
        "emoji": "🏖️",
        "desc": "Christ the Redeemer, Copacabana, Sugarloaf Mountain, and samba culture."
      },
      {
        "name": "Amazon Rainforest",
        "emoji": "🌿",
        "desc": "The lungs of the Earth — jungle lodges, river dolphins, and astonishing biodiversity."
      },
      {
        "name": "Iguaçu Falls",
        "emoji": "💧",
        "desc": "One of the world's great waterfalls — wider than Niagara with 275 separate cascades."
      },
      {
        "name": "Salvador",
        "emoji": "🥁",
        "desc": "Afro-Brazilian heartbeat — Pelourinho historic centre, capoeira, and candomblé."
      },
      {
        "name": "Fernando de Noronha",
        "emoji": "🐢",
        "desc": "Protected marine paradise with pristine beaches and some of the world's best diving."
      },
      {
        "name": "Pantanal",
        "emoji": "🐊",
        "desc": "World's largest tropical wetland — the best place on earth to spot jaguars."
      },
      {
        "name": "São Paulo",
        "emoji": "🌆",
        "desc": "Brazil's cultural powerhouse — food scene, museums, galleries, and nightlife."
      }
    ]
  },
  {
    "code": "AE",
    "name": "UAE",
    "flag": "🇦🇪",
    "currency": "AED",
    "symbol": "د.إ",
    "tz": "Asia/Dubai",
    "capital": "Abu Dhabi",
    "lang": "Arabic / English",
    "plug": "G",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "DXB",
    "visa": {
      "default": "voa",
      "text": "Visa on Arrival for 50+ nationalities for 30 days (extendable). Free Visa on Arrival for US, UK, EU, AU citizens and many more.",
      "days": 30
    },
    "emergency": {
      "police": "999",
      "ambulance": "998",
      "fire": "997",
      "tourist": "800 DUBAI"
    },
    "phrases": {
      "Hello": [
        "مرحبا (Marhaba)",
        "mar-ha-ba"
      ],
      "Thank you": [
        "شكراً (Shukran)",
        "shuk-ran"
      ],
      "Excuse me": [
        "عفواً (Afwan)",
        "af-wan"
      ],
      "Where is...": [
        "أين...؟ (Ayna?)",
        "ay-na"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Burj Khalifa & Dubai Mall",
        "emoji": "🏙️",
        "desc": "World's tallest building with stunning observation decks and the world's largest mall."
      },
      {
        "name": "Abu Dhabi",
        "emoji": "🕌",
        "desc": "Sheikh Zayed Grand Mosque, the Louvre Abu Dhabi, and Formula 1 at Yas Marina."
      },
      {
        "name": "Dubai Desert Safari",
        "emoji": "🏜️",
        "desc": "Dune bashing, camel riding, sandboarding, and Bedouin camp dining under the stars."
      },
      {
        "name": "Palm Jumeirah",
        "emoji": "🌴",
        "desc": "Iconic man-made palm island with luxury hotels, Atlantis, and The Pointe boardwalk."
      },
      {
        "name": "Dubai Creek & Old Souk",
        "emoji": "🛶",
        "desc": "Historic heart of Dubai — abra rides, gold souk, spice souk, and Al Fahidi district."
      },
      {
        "name": "Sharjah",
        "emoji": "🏺",
        "desc": "Cultural capital of the UAE with world-class museums, arts, and Islamic heritage."
      },
      {
        "name": "Ras Al Khaimah",
        "emoji": "⛰️",
        "desc": "Hajar Mountains, Jebel Jais zip line (world's longest), and quieter beaches."
      }
    ]
  },
  {
    "code": "KR",
    "name": "South Korea",
    "flag": "🇰🇷",
    "currency": "KRW",
    "symbol": "₩",
    "tz": "Asia/Seoul",
    "capital": "Seoul",
    "lang": "Korean",
    "plug": "C/F",
    "voltage": "220V / 60Hz",
    "plugIcon": "🔌",
    "airport": "ICN",
    "visa": {
      "default": "free",
      "text": "K-ETA required for visa-exempt countries (₩10,000). 90-day visa-free for 112 countries. K-ETA temporarily waived for many nationalities.",
      "days": 90
    },
    "emergency": {
      "police": "112",
      "ambulance": "119",
      "fire": "119",
      "tourist": "1330"
    },
    "phrases": {
      "Hello": [
        "안녕하세요 (Annyeonghaseyo)",
        "an-nyong-ha-se-yo"
      ],
      "Thank you": [
        "감사합니다 (Gamsahamnida)",
        "gam-sa-ham-ni-da"
      ],
      "Excuse me": [
        "저기요 (Jeogiyo)",
        "jeo-gi-yo"
      ],
      "Where is...": [
        "...어디예요?",
        "...eo-di-ye-yo"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Seoul",
        "emoji": "🏙️",
        "desc": "Gyeongbokgung Palace, K-pop, BBQ, Han River, and Dongdaemun Design Plaza."
      },
      {
        "name": "Jeju Island",
        "emoji": "🌋",
        "desc": "Volcanic island paradise with lava tubes, waterfalls, and Hallasan mountain."
      },
      {
        "name": "Busan",
        "emoji": "🎨",
        "desc": "Gamcheon Culture Village, Haeundae Beach, seafood markets, and temple by the sea."
      },
      {
        "name": "Gyeongju",
        "emoji": "⛩️",
        "desc": "Open-air museum of Silla dynasty — royal tombs, Bulguksa Temple, and Seokguram."
      },
      {
        "name": "DMZ",
        "emoji": "🪖",
        "desc": "Demilitarized Zone tour — one of the most surreal geopolitical sites on earth."
      },
      {
        "name": "Seoraksan National Park",
        "emoji": "🍂",
        "desc": "Dramatic granite peaks, Buddhist temples, and spectacular autumn foliage."
      },
      {
        "name": "Jeonju",
        "emoji": "🍱",
        "desc": "Hanok village of traditional architecture and the birthplace of bibimbap."
      }
    ]
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "flag": "🇳🇱",
    "currency": "EUR",
    "symbol": "€",
    "tz": "Europe/Amsterdam",
    "capital": "Amsterdam",
    "lang": "Dutch",
    "plug": "C/F",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "AMS",
    "visa": {
      "default": "free",
      "text": "Schengen Area. Visa-free for 90 days for most nationalities. ETIAS required from 2025 (€7).",
      "days": 90
    },
    "emergency": {
      "police": "112",
      "ambulance": "112",
      "fire": "112",
      "tourist": "0900 400 4040"
    },
    "phrases": {
      "Hello": [
        "Hallo",
        "hal-oh"
      ],
      "Thank you": [
        "Dank je",
        "dank yuh"
      ],
      "Excuse me": [
        "Pardon",
        "par-don"
      ],
      "Where is...": [
        "Waar is...?",
        "var is"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Amsterdam",
        "emoji": "🚲",
        "desc": "Canal rings, Anne Frank House, Rijksmuseum, and a city built for cyclists."
      },
      {
        "name": "Keukenhof Gardens",
        "emoji": "🌷",
        "desc": "World's largest tulip garden with 7 million blooming flowers each spring."
      },
      {
        "name": "Delft",
        "emoji": "🏺",
        "desc": "Charming canal town, birthplace of Vermeer, and home of iconic blue-and-white pottery."
      },
      {
        "name": "Rotterdam",
        "emoji": "🏗️",
        "desc": "Europe's largest port with bold modern architecture, Cube Houses, and Markthal."
      },
      {
        "name": "The Hague",
        "emoji": "⚖️",
        "desc": "Seat of government, International Court of Justice, and Mauritshuis museum."
      },
      {
        "name": "Kinderdijk Windmills",
        "emoji": "⚙️",
        "desc": "19 iconic windmills in a UNESCO-listed polder landscape near Rotterdam."
      },
      {
        "name": "Utrecht",
        "emoji": "🎻",
        "desc": "Vibrant student city with wharf-level cafés, a towering Dom tower, and canal charm."
      }
    ]
  },
  {
    "code": "CH",
    "name": "Switzerland",
    "flag": "🇨🇭",
    "currency": "CHF",
    "symbol": "Fr",
    "tz": "Europe/Zurich",
    "capital": "Bern",
    "lang": "German/French/Italian",
    "plug": "J",
    "voltage": "230V / 50Hz",
    "plugIcon": "🔌",
    "airport": "ZRH",
    "visa": {
      "default": "free",
      "text": "Schengen member. Visa-free for 90 days. Note: uses Swiss Franc (CHF), not Euro.",
      "days": 90
    },
    "emergency": {
      "police": "117",
      "ambulance": "144",
      "fire": "118",
      "tourist": "0800 100 200 30"
    },
    "phrases": {
      "Hello": [
        "Grüezi",
        "groo-et-zi"
      ],
      "Thank you": [
        "Merci / Danke",
        "mair-see / dan-keh"
      ],
      "Excuse me": [
        "Entschuldigung",
        "ent-shool-dee-goong"
      ],
      "Where is...": [
        "Wo ist...?",
        "vo ist"
      ]
    },
    "drives": "right",
    "spots": [
      {
        "name": "Jungfrau Region",
        "emoji": "🏔️",
        "desc": "Top of Europe — Eiger, Mönch, Jungfrau peaks with the famous cogwheel railway."
      },
      {
        "name": "Lucerne",
        "emoji": "🌉",
        "desc": "Chapel Bridge, Lion Monument, and lakeside views framed by Alpine peaks."
      },
      {
        "name": "Zermatt & Matterhorn",
        "emoji": "⛷️",
        "desc": "Car-free mountain village dominated by the iconic pyramid of the Matterhorn."
      },
      {
        "name": "Geneva",
        "emoji": "⌚",
        "desc": "Jet d'Eau fountain, luxury watches, CERN, and the United Nations European HQ."
      },
      {
        "name": "Interlaken",
        "emoji": "🪂",
        "desc": "Adventure capital between two lakes — skydiving, paragliding, and bungee jumping."
      },
      {
        "name": "Bern",
        "emoji": "🐻",
        "desc": "UNESCO old town of arcaded streets, clock towers, and the Swiss capital's bear pit."
      },
      {
        "name": "Swiss Riviera (Montreux)",
        "emoji": "🎵",
        "desc": "Freddie Mercury statue, Chillon Castle, and the famous Jazz Festival on Lake Geneva."
      }
    ]
  }
];

export const RATES_USD: Record<string, number> = {
  "USD": 1,
  "GBP": 0.79,
  "EUR": 0.92,
  "JPY": 149,
  "CAD": 1.36,
  "AUD": 1.53,
  "CHF": 0.89,
  "SGD": 1.35,
  "THB": 35,
  "VND": 24500,
  "INR": 83,
  "BRL": 4.97,
  "AED": 3.67,
  "KRW": 1320,
  "MXN": 17.1
};

export const CITY_COORDS: Record<string, CityCoords> = {
  "US": {
    "lat": 40.71,
    "lon": -74.01,
    "city": "New York"
  },
  "GB": {
    "lat": 51.51,
    "lon": -0.13,
    "city": "London"
  },
  "JP": {
    "lat": 35.68,
    "lon": 139.69,
    "city": "Tokyo"
  },
  "FR": {
    "lat": 48.85,
    "lon": 2.35,
    "city": "Paris"
  },
  "DE": {
    "lat": 52.52,
    "lon": 13.4,
    "city": "Berlin"
  },
  "IT": {
    "lat": 41.9,
    "lon": 12.5,
    "city": "Rome"
  },
  "ES": {
    "lat": 40.42,
    "lon": -3.7,
    "city": "Madrid"
  },
  "AU": {
    "lat": -33.87,
    "lon": 151.21,
    "city": "Sydney"
  },
  "CA": {
    "lat": 43.65,
    "lon": -79.38,
    "city": "Toronto"
  },
  "TH": {
    "lat": 13.76,
    "lon": 100.5,
    "city": "Bangkok"
  },
  "VN": {
    "lat": 10.82,
    "lon": 106.63,
    "city": "Ho Chi Minh City"
  },
  "SG": {
    "lat": 1.35,
    "lon": 103.82,
    "city": "Singapore"
  },
  "MX": {
    "lat": 19.43,
    "lon": -99.13,
    "city": "Mexico City"
  },
  "IN": {
    "lat": 28.61,
    "lon": 77.21,
    "city": "New Delhi"
  },
  "BR": {
    "lat": -23.55,
    "lon": -46.63,
    "city": "São Paulo"
  },
  "AE": {
    "lat": 25.2,
    "lon": 55.27,
    "city": "Dubai"
  },
  "KR": {
    "lat": 37.57,
    "lon": 126.98,
    "city": "Seoul"
  },
  "NL": {
    "lat": 52.37,
    "lon": 4.9,
    "city": "Amsterdam"
  },
  "CH": {
    "lat": 47.38,
    "lon": 8.54,
    "city": "Zurich"
  }
};

export const WMO_ICONS: Record<number, string> = {
  "0": "☀️",
  "1": "🌤",
  "2": "⛅",
  "3": "☁️",
  "45": "🌫",
  "48": "🌫",
  "51": "🌦",
  "53": "🌦",
  "55": "🌧",
  "61": "🌧",
  "63": "🌧",
  "65": "🌧",
  "71": "🌨",
  "73": "🌨",
  "75": "❄️",
  "80": "🌦",
  "81": "🌦",
  "82": "⛈",
  "95": "⛈",
  "96": "⛈",
  "99": "⛈"
};

export const WMO_DESC: Record<number, string> = {
  "0": "Clear sky",
  "1": "Mainly clear",
  "2": "Partly cloudy",
  "3": "Overcast",
  "45": "Foggy",
  "48": "Icy fog",
  "51": "Light drizzle",
  "53": "Drizzle",
  "55": "Heavy drizzle",
  "61": "Light rain",
  "63": "Rain",
  "65": "Heavy rain",
  "71": "Light snow",
  "73": "Snow",
  "75": "Heavy snow",
  "80": "Showers",
  "81": "Rain showers",
  "82": "Violent showers",
  "95": "Thunderstorm",
  "96": "Thunderstorm w/ hail",
  "99": "Thunderstorm w/ heavy hail"
};

export const LANG_CODES: Record<string, string> = {
  "US": "en",
  "GB": "en",
  "AU": "en",
  "CA": "en",
  "JP": "ja",
  "FR": "fr",
  "DE": "de",
  "IT": "it",
  "ES": "es",
  "TH": "th",
  "VN": "vi",
  "SG": "zh",
  "MX": "es",
  "IN": "hi",
  "BR": "pt",
  "AE": "ar",
  "KR": "ko",
  "NL": "nl",
  "CH": "de"
};
