export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** 이미지 자리 설명 — ImagePlaceholder로 렌더링 (imageSrc 있으면 무시) */
  image?: string;
  /** 실제 이미지 (R2 경로) — 지정 시 플레이스홀더 대신 렌더링 */
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** 작은 그림 나열 (공식 표지판 도안 등) — 그리드로 렌더링 */
  figures?: { src: string; alt: string; caption: string }[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  lastVerified: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: "navigation-apps",
    title: "Maps & navigation: why Google Maps won't work",
    description:
      "Korean law blocks Google Maps routing. Here's how to navigate with Naver, Kakao, OsmAnd and Komoot instead.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "South Korea restricts the export of map data, so Google Maps can search businesses but cannot route you anywhere. Every rider hits this on day one. The good news: the Cross-Country Route has a blue line painted on the tarmac the whole way, so you need apps mainly for food, motels, and city sections.",
        ],
      },
      {
        heading: "Which app",
        list: [
          "Naver Map — best English UI (menus translate; business names stay in Korean). Good bike routing.",
          "KakaoMap — shows elevation profiles for bike routes; English support thinner than Naver's.",
          "Komoot — riders report better in-city bike routing than Kakao; works with our GPX files.",
          "OsmAnd — the offline fallback if you don't read Korean at all.",
        ],
      },
      {
        heading: "Show the bike lanes on the map",
        list: [
          "Naver Map: tap the layers button and enable the 자전거 (bicycle) layer — dedicated paths and bike lanes get drawn over the base map. Route search also has a bicycle mode with time estimates.",
          "KakaoMap: same idea — the bicycle layer marks bike paths in color and bike-mode routing shows the elevation profile before you commit.",
          "The Cross-Country Route itself appears on both apps as a continuous marked path, which is handy for finding your way back after a detour to food or a motel.",
        ],
        imageSrc: "/images/navermap.jpg",
        imageAlt:
          "Naver Map screenshots: map view, Street View of a bike path, the map-type panel with the Biking layer selected, and the language setting switched to English",
        imageCaption:
          "Naver Map in practice — English language setting, the Biking map layer, and Street View to scout the path ahead.",
      },
      {
        heading: "Street View: scout before you ride",
        paragraphs: [
          "Both apps include street-level imagery — Kakao calls it Road View, Naver calls it Street View (거리뷰). Drag the little person icon onto a road to preview it. Use it to scout anything you're unsure about: the motel's actual entrance, whether a bridge has a bike lane, or what a construction detour looks like. Korean street imagery covers even small rural roads and is usually fresher than Google's.",
        ],
      },
      {
        heading: "Do this before you fly",
        list: [
          "Install Naver Map and switch it to English.",
          "Load our GPX (with stamp-booth waypoints) into Komoot or your GPS unit.",
          "Download offline maps for the corridor in OsmAnd as a backup — rural sections have dead zones.",
        ],
      },
    ],
  },
  {
    slug: "korean-terms",
    title: "Decode the signs: place-name words every rider should know",
    description:
      "강, 천, 령, 재, 보, 교 — Korean place names tell you what's coming: a river, a bridge, or a climb. Learn 20 syllables and the map starts talking.",
    lastVerified: "2026-07-19",
    sections: [
      {
        heading: "Why this is worth 10 minutes",
        paragraphs: [
          "Korean place names are built from reusable syllables, and the route's signs use them constantly. You don't need to speak Korean — if you can recognize twenty word-endings, every sign becomes a terrain report. The one that matters most: if a name ends in -ryeong (령) or -jae (재), you are about to climb.",
        ],
      },
      {
        heading: "Water words (you'll follow these for 600 km)",
        list: [
          "강 gang — river. Hangang (한강) = Han River; Nakdonggang (낙동강) = Nakdong River. The route is basically four of these.",
          "천 cheon — stream, small river. Ocheon (오천) bike path = 'five streams'.",
          "호 ho — lake. Chungjuho (충주호) = Chungju Lake.",
          "보 bo — weir. Ipobo (이포보), Gangjeong-Goryeongbo (강정고령보) — the big river barrages where stamp booths and staffed centers cluster.",
          "댐 daem — dam. Chungjudaem (충주댐), Andongdaem (안동댐) — path termini beyond the cross-country line.",
          "하굿둑 hagutduk — estuary barrage. Nakdonggang Hagutduk is the finish line in Busan.",
          "갑문 gapmun — canal lock. Ara West Sea Lock (아라서해갑문) is where your passport journey starts.",
          "나루 naru — old ferry landing. Gwangnaru (광나루) in Seoul keeps the name.",
        ],
      },
      {
        heading: "Terrain words (the ones that hurt)",
        list: [
          "령 ryeong — high mountain pass (Sino-Korean). Ihwaryeong (이화령) — the route's one serious climb. See this ending? Eat first.",
          "재 jae — pass (native Korean, same warning). The Saejae (새재) bike path is named for the historic Mungyeong Saejae pass.",
          "고개 gogae — hill, smaller pass. Short but often steep.",
          "산 san — mountain. Useful for orientation, not something the path usually crosses.",
          "섬 seom / 도 do — island. Binaeseom (비내섬); Eulsukdo (을숙도) at the Busan finish.",
        ],
      },
      {
        heading: "Road and route words",
        list: [
          "길 gil — way, path. Jajeongeo-gil (자전거길) = bike path. The magic word on every route sign.",
          "로 ro — road (usually for cars). A sign pointing to a -ro means you're leaving the bike path.",
          "교 gyo — bridge. Sangpunggyo (상풍교), Paldanggyo (팔당대교) — 대교 daegyo is a big/grand bridge.",
          "터널 teoneol — tunnel. The Saejae and Nakdong sections have several; lights on.",
          "역 yeok — station. Neungnae-yeok (능내역) is a disused rail station turned rest stop.",
          "공원 gongwon — park. Riverside parks host many stamp booths.",
          "쉼터 swimteo — rest stop/shelter. Yangpyeong Bike Rest Stop (양평자전거쉼터) is a certification center.",
          "온천 oncheon — hot spring. Suanbo Oncheon (수안보온천): stamp, soak, sleep, climb at dawn.",
          "삼거리 samgeori / 사거리 sageori — three-way / four-way junction. Common in detour directions.",
        ],
      },
      {
        heading: "Certification words",
        list: [
          "종주 jongju — end-to-end traversal. Gukto Jongju (국토종주) = crossing the whole country; the word on your medal.",
          "인증센터 injeung-senteo — certification center, i.e. the red stamp booth.",
          "인증수첩 injeung-sucheop — the Bike Passport you stamp.",
          "무인 muin / 유인 yuin — unstaffed / staffed. You'll see these on center listings (our center list marks them for you).",
        ],
      },
      {
        heading: "Read a real sign",
        paragraphs: [
          "Break a few real signs into their parts and the trick becomes obvious:",
        ],
        list: [
          "이화령휴게소 인증센터 = Ihwa-ryeong (pass) + hyugeso (rest area) + certification center → 'stamp booth at the top of the Ihwaryeong pass'.",
          "남한강자전거길 = Nam (south) + Han-gang (Han River) + jajeongeo-gil (bike path) → 'South Han River bike path'.",
          "상주상풍교 = Sangju (city) + Sangpung-gyo (bridge) → 'Sangpung Bridge in Sangju'.",
          "That's the whole trick — twenty syllables, and the route map reads itself.",
        ],
        image:
          "A real route signpost photo with each name-part color-underlined and translated in overlay (e.g. 남한강/자전거길 split and labeled). One annotated sign teaches the whole system visually.",
      },
    ],
  },
  {
    slug: "roads-safety",
    title: "Korean roads, construction detours and riding after dark",
    description:
      "How Korea's bike infrastructure actually works, what to do when the path is dug up, and why you don't want to be out there after sunset.",
    lastVerified: "2026-07-17",
    sections: [
      {
        heading: "How Korean bike infrastructure works",
        paragraphs: [
          "Korean law (Bicycle Use Activation Act, Article 3) defines exactly four kinds of bike road. Learn the four signs/markings and you always know who you're sharing with — and note that e-scooters (개인형이동장치) are legally allowed on all of them, so expect them near cities.",
        ],
        list: [
          "자전거 전용도로 (bike-only road): physically separated from cars AND sidewalks. Blue circular sign with a bicycle. The best stretches of the Cross-Country Route are this.",
          "자전거·보행자 겸용도로 (shared bike/pedestrian path): the most common type, including most riverside parks — blue circle with pedestrians + bicycle. On split versions the surface is divided into a walking half and a riding half: keep to the bike side, it's an actual traffic rule, not a suggestion.",
          "자전거 전용차로 (bike-only lane on the roadway): a lane carved out of the car road by lines/color, marked with a rectangular blue sign. Cars may not drive in it — but check over your shoulder anyway.",
          "자전거 우선도로 (bicycle priority road): low-traffic country roads shared with cars. No separate lane — just bike-and-chevron stencils painted on the tarmac. This is what the 'quiet road' connecting sections of the route mostly are.",
          "Crossings: at big intersections look for the 자전거횡단도 (bicycle crossing) — a marked strip beside the pedestrian crosswalk that you may ride across. If there's only a crosswalk, dismount and walk.",
          "Rules that surprise visitors: helmets are legally required, and you ride on the right.",
        ],
        figures: [
          {
            src: "/signs/sign-302-bike-only-road.png",
            alt: "Korean road sign 302: blue circle with white bicycle and 자전거전용",
            caption: "302 · Bike-only road (자전거 전용도로)",
          },
          {
            src: "/signs/sign-303-shared-path.png",
            alt: "Korean road sign 303: blue circle with pedestrians and bicycle",
            caption: "303 · Shared bike/pedestrian path (자전거·보행자 겸용도로)",
          },
          {
            src: "/signs/sign-318-bike-lane.png",
            alt: "Korean road sign 318: blue rectangle with bicycle, lane lines and arrow",
            caption: "318 · Bike-only lane (자전거 전용차로)",
          },
        ],
        image:
          "Real-world photo of each road type in the wild (bike-only riverside road, split shared path, on-road bike lane, priority-road pavement stencil) to pair with the official sign graphics above.",
      },
      {
        heading: "Construction zones: don't panic",
        paragraphs: [
          "On a 633 km route, some section is always being repaired. Detours are almost always signposted with a marked bypass — but in Korean.",
          "The drill: stop, open your camera translation app (Google Lens or Papago) and point it at the sign — the detour map usually becomes obvious. If not, show a Korean rider your phone with a translated question. Cyclists on this route help each other constantly; a fellow jongju rider will often just say 'follow me'.",
        ],
        image:
          "A real construction detour sign on a bike path (Korean text visible) photographed next to a phone running camera translation showing the English overlay — demonstrates the exact technique in one image.",
      },
      {
        heading: "Riding after dark",
        list: [
          "City sections are deceptive: the Han River parks in Seoul are lit late into the night and full of riders at 10pm.",
          "Rural sections are NOT lit at all. Once you leave the metropolitan parks there are long stretches with no streetlights, no buildings and sometimes no phone signal. After sunset you're riding by your own lights next to a river.",
          "Plan stages to finish before dusk (check sunset times — winter days are short). If you're caught out: front and rear lights on, slow down, and take the next town's motel rather than pushing on.",
          "Carry real lights from day one, not just reflectors — tunnels on the Saejae and Nakdong sections are dark even at noon.",
        ],
        image:
          "Dusk shot on an unlit rural stretch of the path: a rider's headlight beam as the only light source, river barely visible. Should feel slightly uncomfortable — that's the point of the warning.",
      },
    ],
  },
  {
    slug: "transport",
    title: "Trains, buses and ferries with a bike",
    description:
      "Getting your bike to the start and back from Busan: KTX rules, intercity buses, and the Fukuoka ferry.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "The short version",
        list: [
          "KTX high-speed trains: full-size bikes are generally NOT allowed — folding bikes in a bag are.",
          "Intercity/express buses: the standard answer. Bikes go in the luggage bay; buy a normal ticket. Terminals line the whole route, so you can also bail out mid-ride.",
          "Busan→Fukuoka ferry: popular way to combine Korea with Japan; many riders start in Busan for this reason.",
          "Some slower Mugunghwa/ITX trains have limited bike space on weekends — rules change, check locally.",
        ],
        image:
          "A touring bike being loaded into the open luggage bay of a Korean express bus at a terminal — the exact maneuver first-timers are nervous about. Bonus second frame: a bagged folding bike on a KTX rack.",
      },
      {
        heading: "Back from Busan",
        paragraphs: [
          "Most riders bus back to Seoul (about 4.5 hours). Arrive at the terminal early, take the front wheel off if the bay is crowded, and expect zero English — pointing and smiling works.",
        ],
      },
    ],
  },
  {
    slug: "accommodation",
    title: "Motels, jjimjilbangs and camping",
    description:
      "You don't need camping gear: Korea's motel network makes credit-card touring easy at $45–65 a night.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "Motels are the default",
        paragraphs: [
          "Every town on the route has motels ('love motels' included — they're clean, cheap and used to cyclists) at roughly $45–65 per night (₩60,000–90,000) depending on town and season. No booking needed outside holiday weekends; find them on Naver Map. Some towns near the route run cyclist-oriented 'bike-tels'.",
        ],
        image:
          "A typical Korean motel: neon-signed exterior at dusk + clean room interior with a bike leaning inside. Kills the 'love motel' hesitation better than any paragraph. Include a jjimjilbang sleeping-hall shot if doing a second image.",
      },
      {
        heading: "Other options",
        list: [
          "Jjimjilbang (Korean sauna): ~₩10,000–15,000 to sleep on a heated floor. An experience; not great rest before a pass day.",
          "Camping: riverside parks and trail-side platforms are widely tolerated and low-risk, but avoid spots locals use in the evening.",
          "Guesthouses/Airbnb in Seoul and Busan for the bookends.",
        ],
      },
    ],
  },
  {
    slug: "packing",
    title: "What to pack (and what not to)",
    description:
      "Cash, a spare ink pad, and less clothing than you think. Korea's convenience stores carry the rest.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "Route-specific essentials",
        list: [
          "Korean won in cash — passport (₩4,000), some motels and country restaurants are cash-first; foreign cards fail at odd moments.",
          "A spare stamp-pad — booths run dry, and a photo-at-the-booth backup costs you the satisfying stamp.",
          "Helmet — legally required when cycling in Korea.",
          "eSIM/SIM with data — navigation and translation depend on it.",
          "Sunscreen and gloves; the riverside paths have long shadeless stretches.",
        ],
        image:
          "Flat-lay of the route-specific kit on a table: Korean won notes, spare ink pad, helmet, eSIM card/phone, vinyl passport cover, sunscreen. Label each item — visual packing checklist that works in any language.",
      },
      {
        heading: "You need less than you think",
        paragraphs: [
          "GS25/CU/7-Eleven convenience stores appear every few kilometers on most of the route with food, water, batteries and even basic tools. Tap water is safe. Isobutane gas canisters (for campers) are easy to find. Pack for 2–3 days, not 7 — you can resupply constantly.",
        ],
      },
    ],
  },
  {
    slug: "seasons",
    title: "When to ride: seasons and weather",
    description:
      "September–November is prime. Summer is a sweaty gamble, winter is genuinely cold.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "Month by month",
        list: [
          "Sep–Nov: the consensus best window — dry, cool, autumn colors. Book Chuseok holiday dates carefully.",
          "Apr–May: second best; cherry blossoms in early April, warm by May.",
          "Jun–Aug: hot (35°C+), humid, and the jangma monsoon front brings multi-day rain. Doable with dawn starts; not fun.",
          "Dec–Feb: -10°C mornings inland; paths stay open but booths freeze and daylight is short.",
        ],
        image:
          "Four-season grid of the same path (or comparable riverside spots): cherry blossoms in April, green summer haze, red-gold October foliage, snow-dusted winter. Communicates the Sep–Nov recommendation instantly.",
      },
    ],
  },
  {
    slug: "bike-rental",
    title: "Renting a bicycle in South Korea (one-way included)",
    description:
      "No need to fly your bike over: Seoul shops rent tourers from ~$25/day, and one-way Seoul→Busan drop-off exists.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "What's available",
        list: [
          "Touring/hybrid rentals in Seoul from roughly $25/day, often with panniers, GPX files and route advice included.",
          "One-way rental exists: riders report renting in Seoul and returning in Busan (around ₩150,000/week plus a ₩50,000 one-way fee — confirm current terms with the shop).",
          "Jeju has its own rental scene (road/MTB/e-bikes, ~₩14,000–39,000/day) if you add the island loop.",
        ],
        image:
          "A rental touring bike fully set up outside a Seoul shop: rear rack, panniers, lights, pump — 'what $25/day actually gets you'. Shoot it as delivered to a customer, not a showroom bike.",
      },
      {
        heading: "Before you commit",
        paragraphs: [
          "Ask explicitly about: one-way drop-off, pannier racks, included spares, and what happens if the bike breaks mid-route. Reserve ahead for Sep–Oct weekends.",
        ],
      },
    ],
  },
  {
    slug: "repairs",
    title: "Flats, breakdowns and bike shops in Korea",
    description:
      "What to do when you puncture 40 km from anywhere: the fix-it kit, finding a bike shop, and the escape hatches when it can't be fixed roadside.",
    lastVerified: "2026-07-21",
    sections: [
      {
        heading: "Carry this, fix most things",
        list: [
          "A spare tube in YOUR size — check before you fly. Rural shops stock common sizes and lean toward Schrader valves; if you run something exotic (or Presta-only rims), bring two tubes.",
          "Tire levers + a mini pump or CO2. The riverside benches every few km make decent workshops.",
          "A multitool with a chain breaker, plus one quick-link for your chain speed.",
          "Zip ties and a strip of duct tape — the universal Korean farm-road fix.",
        ],
      },
      {
        heading: "The puncture drill",
        paragraphs: [
          "Convenience stores do NOT sell tubes — don't count on GS25 for anything beyond snacks and zip ties. Fix it yourself or roll/walk to a shop. Asking for help needs zero Korean: point at the flat tire and mime a pump — it works every time. And remember you're never really alone out there: fellow Gukto Jongju tourers are famously quick to stop for one of their own.",
        ],
        list: [
          "To find help on the map, paste 자전거 수리 (bicycle repair) into Naver Map — no pronunciation required.",
          "Some major riverside parks and weir plazas have free self-service stands (셀프 정비대) with pumps and basic tools bolted to them.",
        ],
      },
      {
        heading: "Finding a bike shop",
        list: [
          "Search 자전거 (bicycle) in Naver Map — results with 수리 (repair) in reviews are what you want.",
          "삼천리자전거 (Samchully) — Korea's oldest homegrown bike brand, a household name for over 70 years — has dealers in almost every town on the route: basic parts, tubes and repairs. Pointing works fine.",
          "Real service shops (Giant, Trek, Specialized dealers) cluster in the cities: Seoul, Chungju, Gumi, Daegu, Busan.",
          "Small-town shops often close Sundays — if something feels wrong on a Saturday, deal with it that day.",
        ],
      },
      {
        heading: "When it can't be fixed roadside",
        list: [
          "Bus bail-out: intercity terminals line the route — bike goes in the luggage bay, and you restart from a city with a real shop. This is the standard escape hatch.",
          "Kakao T (taxi app): a 'Venti' / van-class taxi takes a bike with the front wheel off for shorter hops. Card-friendly, English UI.",
          "Worst case, motels will happily store your bike for a day while you fetch parts from the nearest city by bus.",
        ],
      },
    ],
  },
  {
    slug: "city-riding",
    title: "Surviving the cities: leaving Seoul, arriving in Busan",
    description:
      "The route's most dangerous kilometers are its first and last. How to get in and out of the big cities intact.",
    lastVerified: "2026-07-16",
    sections: [
      {
        heading: "The problem",
        paragraphs: [
          "Korea's bike paths are world-class; its city streets are not. Rider after rider describes the final approach into Busan — 3.5 million people, multi-lane arterials, bridges — as the sketchiest part of the whole trip. Seoul is gentler thanks to the Han River parks, but leaving the river corridor gets hairy fast.",
        ],
        image:
          "Contrast pair: serene empty riverside path vs. a Busan multi-lane arterial with buses at rush hour, from a cyclist's eye level. The whole guide's warning in one image.",
      },
      {
        heading: "Busan arrival tactics",
        list: [
          "Finish at the Nakdong Estuary Bank and STOP — get your passport verified there before dealing with the city.",
          "Don't ride to your hotel in central Busan with loaded panniers unless you must; the subway allows bikes on weekends/holidays (first/last car), and taxis with folding seats work for short hops.",
          "If you must ride, stay on the river paths as long as possible and cross the Nakdong on bike-legal bridges — plan this leg on Naver Map the night before, not on the fly.",
        ],
        image:
          "Annotated map crop of the Busan finish area: Nakdong Estuary center, nearest subway station, and the recommended riding line into the city marked with arrows. This is the map riders screenshot the night before.",
      },
      {
        heading: "Leaving Incheon/Seoul",
        list: [
          "The Ara path start is easy to reach: Incheon Subway Line 2 or a taxi from the airport (the airport does NOT sell the passport — buy it at Ara West Sea Lock).",
          "Eastbound out of Seoul, just stay on the Han River path — it's grade-separated almost to Paldang.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
