import type { Guide } from "../guides";

// Guías en español — topónimos en romanización + hangul (coinciden con las señales reales)
const guides: Guide[] = [
  {
    slug: "navigation-apps",
    title: "Mapas y navegación: por qué Google Maps no funciona",
    description: "La ley coreana bloquea la navegación de Google Maps. Cómo apañarse con Naver, Kakao, OsmAnd y Komoot.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "El problema", paragraphs: ["Corea restringe la exportación de datos cartográficos: Google Maps busca negocios pero no puede guiarte. Todo el mundo choca con esto el primer día. La buena noticia: la ruta lleva una línea azul pintada de principio a fin, así que las apps hacen falta sobre todo para comida, moteles y tramos urbanos."] },
      { heading: "Qué app usar", list: [
        "Naver Map — la mejor interfaz en inglés (los menús se traducen; los nombres de negocios siguen en hangul). Buen enrutado ciclista.",
        "KakaoMap — muestra el perfil de altitud de las rutas en bici; su inglés es más flojo que el de Naver.",
        "Komoot — muchos ciclistas lo prefieren a Kakao en ciudad, y funciona perfecto con nuestros GPX.",
        "OsmAnd — el respaldo offline si no lees nada de hangul.",
      ] },
      { heading: "Mostrar los carriles bici en el mapa", list: [
        "Naver Map: botón de capas → activa la capa 자전거 (bicicleta) y las vías ciclistas se dibujan sobre el mapa. El modo bici de la búsqueda de rutas estima tiempos.",
        "KakaoMap: misma idea — su capa ciclista colorea las vías y el modo bici te enseña el desnivel antes de salir.",
        "La propia ruta transnacional aparece en ambas apps como un trazado continuo: útil para volver a la línea tras desviarte a comer o dormir.",
      ], imageSrc: "/images/navermap.jpg", imageAlt: "Capturas de Naver Map: mapa, Street View, capa ciclista y ajuste de idioma en inglés", imageCaption: "Naver Map en la práctica: idioma en inglés, capa Biking y Street View para explorar el camino." },
      { heading: "Street View: explora antes de pedalear", paragraphs: ["Ambas apps tienen imágenes a pie de calle (Kakao lo llama Road View; Naver, 거리뷰). Arrastra el muñeco a la carretera y listo. Úsalo para comprobar la entrada real del motel, si un puente tiene carril bici o qué pinta tiene un desvío de obras. La cobertura coreana llega hasta caminos rurales y suele estar más actualizada que la de Google."] },
      { heading: "Antes de volar", list: [
        "Instala Naver Map y cámbialo a inglés.",
        "Carga nuestro GPX (con las casetas de sellos como waypoints) en Komoot o en tu GPS.",
        "Descarga en OsmAnd los mapas offline del corredor: hay zonas rurales sin cobertura.",
      ] },
    ],
  },
  {
    slug: "korean-terms",
    title: "Descifra las señales: las palabras de los topónimos",
    description: "강·천·령·재·보·교 — los nombres de lugar coreanos te avisan de lo que viene: un río, un puente o una subida. Veinte sílabas y el mapa habla solo.",
    lastVerified: "2026-07-19",
    sections: [
      { heading: "Por qué merece 10 minutos", paragraphs: ["Los topónimos coreanos se construyen con sílabas reutilizables que las señales de la ruta repiten sin parar. No necesitas hablar coreano: reconoce veinte terminaciones y cada señal se convierte en un parte del terreno. La más importante: si un nombre termina en -ryeong (령) o -jae (재), vas a subir."] },
      { heading: "Palabras de agua (te acompañan 600 km)", list: [
        "강 gang — río. Hangang (한강) = río Han; Nakdonggang (낙동강) = río Nakdong. La ruta son básicamente cuatro de estos.",
        "천 cheon — arroyo. La vía Ocheon (오천) = «cinco arroyos».",
        "호 ho — lago. Chungjuho (충주호).",
        "보 bo — presa/azud. Ipobo (이포보), Gangjeong-Goryeongbo (강정고령보): los grandes azudes donde se agrupan casetas y centros atendidos.",
        "댐 daem — presa grande. Chungjudaem (충주댐), Andongdaem (안동댐): extremos de vías fuera de la línea transnacional.",
        "하굿둑 hagutduk — dique de estuario. El Nakdonggang Hagutduk es la meta en Busan.",
        "갑문 gapmun — esclusa. Ara West Sea Lock (아라서해갑문): donde empieza el viaje de tu pasaporte.",
        "나루 naru — antiguo embarcadero. Gwangnaru (광나루) en Seúl conserva el nombre.",
      ] },
      { heading: "Palabras de terreno (las que duelen)", list: [
        "령 ryeong — puerto de montaña (sino-coreano). Ihwaryeong (이화령): la única subida seria. ¿Ves esta terminación? Come primero.",
        "재 jae — puerto (coreano nativo, mismo aviso). La vía Saejae (새재) debe su nombre al paso histórico de Mungyeong.",
        "고개 gogae — cuesta, collado. Cortas pero a menudo empinadas.",
        "산 san — montaña. Para orientarte.",
        "섬 seom / 도 do — isla. Binaeseom (비내섬); Eulsukdo (을숙도) en la meta de Busan.",
      ] },
      { heading: "Palabras de vía y ruta", list: [
        "길 gil — camino. Jajeongeo-gil (자전거길) = vía ciclista. La palabra mágica de cada señal.",
        "로 ro — carretera (de coches). Una señal hacia un -ro avisa de que dejas la vía ciclista.",
        "교 gyo — puente. Sangpunggyo (상풍교); 대교 daegyo es un gran puente.",
        "터널 teoneol — túnel. Hay varios en Saejae y Nakdong; luces encendidas.",
        "역 yeok — estación. Neungnae-yeok (능내역), estación abandonada convertida en área de descanso.",
        "공원 gongwon — parque. Los parques fluviales albergan muchas casetas.",
        "쉼터 swimteo — refugio/área de descanso. El Yangpyeong Bike Rest Stop (양평자전거쉼터) es un centro de certificación.",
        "온천 oncheon — termas. Suanbo Oncheon (수안보온천): sella, remoja, duerme y sube al alba.",
        "삼거리 samgeori / 사거리 sageori — cruce de tres / cuatro. Frecuentes en los desvíos.",
      ] },
      { heading: "Palabras de certificación", list: [
        "종주 jongju — travesía completa. Gukto Jongju (국토종주) = cruzar todo el país; la palabra de tu medalla.",
        "인증센터 injeung-senteo — centro de certificación, o sea, la caseta roja.",
        "인증수첩 injeung-sucheop — el Bike Passport que vas sellando.",
        "무인 muin / 유인 yuin — sin/con personal. Aparecen en los listados (el nuestro ya lo marca).",
      ] },
      { heading: "Lee una señal de verdad", paragraphs: ["Descompón un par de señales reales y el truco se hace evidente:"], list: [
        "이화령휴게소 인증센터 = Ihwa-ryeong (puerto) + hyugeso (área de descanso) + centro de certificación → «caseta de sellos en lo alto del Ihwaryeong».",
        "남한강자전거길 = Nam (sur) + Han-gang (río Han) + vía ciclista → «vía ciclista del Han del Sur».",
        "상주상풍교 = Sangju (ciudad) + Sangpung-gyo (puente) → «puente Sangpung, en Sangju».",
        "Ese es todo el truco: veinte sílabas y el mapa de la ruta se lee solo.",
      ] },
    ],
  },
  {
    slug: "roads-safety",
    title: "Carreteras coreanas, desvíos de obras y pedalear de noche",
    description: "Cómo funciona de verdad la infraestructura ciclista coreana, qué hacer cuando levantan la vía y por qué no quieres estar fuera tras la puesta de sol.",
    lastVerified: "2026-07-17",
    sections: [
      { heading: "Cómo funciona la infraestructura ciclista", paragraphs: ["La ley coreana (Ley de Fomento del Uso de la Bicicleta, art. 3) define exactamente cuatro tipos de vía ciclista. Aprende las cuatro señales/marcas y sabrás siempre con quién compartes el asfalto. Además, los patinetes eléctricos (개인형이동장치) pueden circular legalmente por todas ellas: cuenta con ellos cerca de las ciudades."], list: [
        "자전거 전용도로 (vía solo-bici): separada físicamente de coches Y aceras. Señal circular azul con bicicleta. Los mejores tramos de la ruta son esto.",
        "자전거·보행자 겸용도로 (vía compartida bici/peatón): el tipo más común, incluidos casi todos los parques fluviales — círculo azul con peatones + bicicleta. En las versiones divididas el firme separa mitad peatonal y mitad ciclista: mantenerte en tu lado es norma de tráfico, no una sugerencia.",
        "자전거 전용차로 (carril solo-bici en calzada): un carril segregado con líneas/color, señal azul rectangular. Los coches no pueden entrar — mira por encima del hombro igualmente.",
        "자전거 우선도로 (carretera con prioridad ciclista): carreteras rurales de poco tráfico compartidas con coches. Sin carril propio: solo plantillas de bici y cheurones pintadas en el asfalto. Los «tramos tranquilos de enlace» de la ruta son casi todos esto.",
        "Cruces: en las intersecciones grandes busca el 자전거횡단도 (paso ciclista), una franja marcada junto al paso de cebra que puedes cruzar montado. Si solo hay paso de peatones, desmonta y cruza andando.",
        "Normas que sorprenden: el casco es obligatorio por ley y se circula por la derecha.",
      ], figures: [
        { src: "/signs/sign-302-bike-only-road.png", alt: "Señal coreana 302: círculo azul con bicicleta blanca", caption: "302 · Vía solo-bici" },
        { src: "/signs/sign-303-shared-path.png", alt: "Señal coreana 303: círculo azul con peatones y bicicleta", caption: "303 · Vía compartida bici/peatón" },
        { src: "/signs/sign-318-bike-lane.png", alt: "Señal coreana 318: rectángulo azul con bicicleta y flecha", caption: "318 · Carril solo-bici" },
      ] },
      { heading: "Zonas de obras: sin pánico", paragraphs: ["En 633 km siempre hay algún tramo en reparación. Los desvíos casi siempre están señalizados con un bypass marcado… en coreano.", "La rutina: para, abre la traducción por cámara (Google Lens o Papago), apunta a la señal y el esquema del desvío suele quedar claro. Si no, enseña a un ciclista coreano tu pregunta traducida en pantalla. En esta ruta los ciclistas se ayudan constantemente; un compañero de jongju muchas veces resuelve con un «sígueme»."] },
      { heading: "Pedalear tras el anochecer", list: [
        "Los tramos urbanos engañan: los parques del Han en Seúl están iluminados hasta tarde y llenos de ciclistas a las 22:00.",
        "Los tramos rurales NO tienen luz alguna. Fuera del área metropolitana hay largos tramos sin farolas, sin edificios y a veces sin cobertura. Tras la puesta de sol pedaleas solo con tus luces junto a un río.",
        "Planifica las etapas para llegar antes del anochecer (mira la hora de puesta: en invierno los días son cortos). Si te pilla: luces delante y detrás, reduce, y quédate en el motel del siguiente pueblo en vez de forzar.",
        "Lleva luces de verdad desde el día uno, no solo reflectantes: los túneles de Saejae y del Nakdong están oscuros incluso a mediodía.",
      ] },
    ],
  },
  {
    slug: "transport",
    title: "Trenes, buses y ferris con la bici",
    description: "Llevar la bici al inicio y volver desde Busan: normas del KTX, buses interurbanos y el ferri de Fukuoka.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "La versión corta", list: [
        "KTX (alta velocidad): las bicis completas en general NO — las plegables enfundadas sí.",
        "Buses interurbanos/exprés: la respuesta estándar. La bici va en la bodega y compras un billete normal. Hay terminales por toda la ruta, así que también puedes abandonar a mitad.",
        "Ferri Busan→Fukuoka: la forma popular de combinar Corea con Japón; muchos empiezan en Busan por esto.",
        "Algunos trenes lentos (Mugunghwa/ITX) llevan espacio para bicis los fines de semana — las normas cambian, confirma in situ.",
      ] },
      { heading: "La vuelta desde Busan", paragraphs: ["La mayoría vuelve a Seúl en bus (~4,5 horas). Llega con margen a la terminal, quita la rueda delantera si la bodega va llena y no esperes inglés: señalar y sonreír funciona."] },
    ],
  },
  {
    slug: "accommodation",
    title: "Moteles, jjimjilbang y acampada",
    description: "No necesitas equipo de acampada: la red de moteles coreana permite viajar con tarjeta por $45–65 la noche.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "El motel es la opción por defecto", paragraphs: ["Cada pueblo de la ruta tiene moteles (incluidos los «love motels»: limpios, baratos y acostumbrados a ciclistas) por unos $45–65 la noche (₩60.000–90.000). Fuera de puentes festivos no hace falta reservar; búscalos en Naver Map. Algunos pueblos cercanos a la ruta tienen «bike-tels» orientados a ciclistas."] },
      { heading: "Otras opciones", list: [
        "Jjimjilbang (sauna coreana): ₩10.000–15.000 por dormir sobre suelo radiante. Toda una experiencia; mal descanso antes del día del puerto.",
        "Acampada: los parques fluviales y las plataformas junto a la vía se toleran y el riesgo es bajo, pero evita los rincones que los vecinos usan al atardecer.",
        "Guesthouses/Airbnb en Seúl y Busan para las noches de los extremos.",
      ] },
    ],
  },
  {
    slug: "packing",
    title: "Qué llevar (y qué no)",
    description: "Efectivo, un tampón de tinta de repuesto y menos ropa de la que crees. El resto lo ponen las tiendas 24h coreanas.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "Imprescindibles específicos de la ruta", list: [
        "Wones en efectivo — el pasaporte (₩4.000), algunos moteles y restaurantes rurales van primero a efectivo; las tarjetas extranjeras fallan cuando menos lo esperas.",
        "Tampón de tinta de repuesto — los de las casetas se secan; la foto-ante-la-caseta vale como respaldo, pero te quedas sin el gustazo del sello.",
        "Casco — obligatorio por ley en Corea.",
        "eSIM/SIM con datos — navegación y traducción dependen de ello.",
        "Protector solar y guantes; la ribera tiene tramos larguísimos sin sombra.",
      ] },
      { heading: "Necesitas menos de lo que crees", paragraphs: ["Las GS25/CU/7-Eleven aparecen cada pocos kilómetros en casi toda la ruta con comida, agua, pilas y hasta herramientas básicas. El agua del grifo es potable. Los cartuchos de gas isobutano (para acampada) se encuentran fácil. Empaca para 2–3 días, no para 7: puedes reabastecerte constantemente."] },
    ],
  },
  {
    slug: "seasons",
    title: "Cuándo pedalear: estaciones y clima",
    description: "Septiembre–noviembre es lo mejor. El verano es una apuesta sudorosa y el invierno, frío de verdad.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "Mes a mes", list: [
        "Sep–Nov: la ventana que todos recomiendan — seco, fresco y con colores de otoño. Solo vigila las fechas del festivo de Chuseok.",
        "Abr–May: segunda mejor; cerezos a principios de abril, calorcito en mayo.",
        "Jun–Ago: calor (35°C+), humedad y el frente monzónico jangma con lluvias de varios días. Se puede saliendo al alba; divertido no es.",
        "Dic–Feb: mañanas de -10°C en el interior; las vías siguen abiertas pero las casetas se congelan y los días son cortos.",
      ] },
    ],
  },
  {
    slug: "bike-rental",
    title: "Alquilar bici (incluso solo ida)",
    description: "No hace falta facturar tu bici: en Seúl alquilan touring desde ~$25/día, y existe la devolución Seúl→Busan.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "Qué hay disponible", list: [
        "Touring/híbridas en Seúl desde ~$25/día, a menudo con alforjas, GPX y consejos de ruta incluidos.",
        "El alquiler solo-ida existe: hay ciclistas que alquilaron en Seúl y devolvieron en Busan (~₩150.000/semana más ₩50.000 de tasa de ida — confirma condiciones actuales con la tienda).",
        "Jeju tiene su propia escena de alquiler (carretera/MTB/eléctricas, ~₩14.000–39.000/día) por si añades la vuelta a la isla.",
      ] },
      { heading: "Antes de comprometerte", paragraphs: ["Pregunta explícitamente por: devolución en otra ciudad, portaequipajes, repuestos incluidos y qué pasa si la bici se avería a mitad de ruta. Reserva con antelación los fines de semana de septiembre–octubre."] },
    ],
  },
  {
    slug: "repairs",
    title: "Pinchazos, averías y tiendas de bici en Corea",
    description: "Qué hacer cuando pinchas a 40 km de todo: el kit de arreglos, cómo encontrar una tienda y las vías de escape cuando no se puede arreglar en el arcén.",
    lastVerified: "2026-07-21",
    sections: [
      { heading: "Lleva esto y arreglarás casi todo", list: [
        "Una cámara de repuesto de TU medida — compruébalo antes de volar. Las tiendas rurales tienen tallas comunes y tiran a válvula Schrader; si usas algo exótico (o llantas solo-Presta), lleva dos.",
        "Desmontables + minibomba o CO2. Los bancos de la ribera, cada pocos kilómetros, son buenos talleres.",
        "Multiherramienta con tronchacadenas y un quick-link de tu número de velocidades.",
        "Bridas y un trozo de cinta americana: el arreglo universal de los caminos rurales coreanos.",
      ] },
      { heading: "El protocolo del pinchazo", paragraphs: ["Las tiendas 24h NO venden cámaras: de un GS25 no esperes más que snacks y bridas. Arréglalo tú o empuja hasta una tienda. Pedir ayuda no requiere nada de coreano: señala la rueda pinchada y haz el gesto de bombear — funciona siempre. Y recuerda que ahí fuera nunca estás solo: los cicloturistas del Gukto Jongju tienen fama de parar enseguida por uno de los suyos."], list: [
        "Para buscar ayuda en el mapa, pega 자전거 수리 (reparación de bicicletas) en Naver Map — sin pronunciar nada.",
        "Algunos parques fluviales grandes y plazas de azud tienen estaciones gratuitas de autoservicio (셀프 정비대) con bomba y herramientas básicas.",
      ] },
      { heading: "Encontrar una tienda de bicis", list: [
        "Busca 자전거 (bicicleta) en Naver Map: las que mencionan 수리 (reparación) en las reseñas son las buenas.",
        "삼천리자전거 (Samchully) — la marca de bicicletas local más antigua de Corea, un nombre de toda la vida desde hace más de 70 años — tiene concesionarios en casi cada pueblo de la ruta: piezas básicas, cámaras y arreglos. Señalar funciona.",
        "Las tiendas serias (Giant, Trek, etc.) se concentran en las ciudades: Seúl, Chungju, Gumi, Daegu, Busan.",
        "Las tiendas de pueblo suelen cerrar los domingos: si algo suena raro un sábado, resuélvelo ese mismo día.",
      ] },
      { heading: "Cuando no se puede arreglar en el arcén", list: [
        "Escape en bus: las terminales interurbanas jalonan la ruta — la bici va en la bodega y reinicias desde una ciudad con tienda de verdad. Es la vía de escape estándar.",
        "Kakao T (app de taxi): un taxi tipo furgoneta (Venti) lleva la bici con la rueda delantera quitada para trayectos cortos. Acepta tarjeta y tiene interfaz en inglés.",
        "En el peor caso, los moteles te guardan la bici encantados un día mientras vas en bus a por piezas.",
      ] },
    ],
  },
  {
    slug: "city-riding",
    title: "Sobrevivir a las ciudades: salir de Seúl, llegar a Busan",
    description: "Los kilómetros más peligrosos de la ruta son los primeros y los últimos. Cómo entrar y salir de las grandes ciudades de una pieza.",
    lastVerified: "2026-07-16",
    sections: [
      { heading: "El problema", paragraphs: ["Las vías ciclistas coreanas son de primer nivel; sus calles urbanas, no. Ciclista tras ciclista describe la aproximación final a Busan — 3,5 millones de habitantes, avenidas multicarril, puentes — como el tramo más delicado del viaje. Seúl es más amable gracias a los parques del Han, pero en cuanto dejas el corredor del río la cosa se pone fea rápido."] },
      { heading: "Tácticas de llegada a Busan", list: [
        "Termina en el Nakdong Estuary Bank y PARA: valida allí tu pasaporte antes de pelearte con la ciudad.",
        "Evita pedalear hasta tu hotel del centro con las alforjas cargadas si puedes; el metro admite bicis los fines de semana y festivos (primer/último vagón) y los taxis sirven para trayectos cortos.",
        "Si tienes que pedalear, quédate en las vías fluviales todo lo posible y cruza el Nakdong por puentes aptos para bicis — planifica este tramo en Naver Map la noche anterior, no sobre la marcha.",
      ] },
      { heading: "Salir de Incheon/Seúl", list: [
        "El inicio de la vía Ara es fácil de alcanzar: línea 2 del metro de Incheon o taxi desde el aeropuerto (el aeropuerto NO vende el pasaporte: cómpralo en Ara West Sea Lock).",
        "Hacia el este desde Seúl, simplemente sigue la vía del Han: va segregada casi hasta Paldang.",
      ] },
    ],
  },
];

export default guides;
