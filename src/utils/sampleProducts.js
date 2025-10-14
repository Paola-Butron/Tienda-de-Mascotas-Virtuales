const sample = [
  {
    "id": 1,
    "nombre": "Neuro",
    "descripcion": {
      "personalidad": "Curiosa y lista",
      "funcion": "Ayuda a aprender jugando",
      "poderEspecial": "Revela trucos secretos y desbloquea mini retos educativos",
      "beneficio": "Desarrolla tu lógica y creatividad"
    },
    "imagenUrl": "/images/BR01.png",
    "imagenUrlCartoon": "/images/BR01C.png",
    "precio": 28.50,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 120
  },
  {
    "id": 2,
    "nombre": "Quizzy",
    "descripcion": {
      "personalidad": "Astuta y juguetona",
      "funcion": "Hace preguntas y acertijos",
      "poderEspecial": "Crea quizzes instantáneos",
      "beneficio": "Mejora la memoria y aprendizaje"
    },
    "imagenUrl": "/images/BR02.png",
    "imagenUrlCartoon": "/images/BR02C.png",
    "precio": 31.75,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 98
  },
  {
    "id": 3,
    "nombre": "Logicat",
    "descripcion": {
      "personalidad": "Analítica y paciente",
      "funcion": "Resuelve problemas lógicos",
      "poderEspecial": "Da pistas en acertijos complejos",
      "beneficio": "Desarrolla pensamiento crítico"
    },
    "imagenUrl": "/images/BR03.png",
    "imagenUrlCartoon": "/images/BR03C.png",
    "precio": 33.20,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 110
  },
  {
    "id": 4,
    "nombre": "Matho",
    "descripcion": {
      "personalidad": "Precisa y ordenada",
      "funcion": "Enseña matemáticas con juegos",
      "poderEspecial": "Genera problemas personalizados",
      "beneficio": "Refuerza habilidades numéricas"
    },
    "imagenUrl": "/images/BR04.png",
    "imagenUrlCartoon": "/images/BR04C.png",
    "precio": 29.90,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 105
  },
  {
    "id": 5,
    "nombre": "Lexi",
    "descripcion": {
      "personalidad": "Curiosa y sociable",
      "funcion": "Enseña vocabulario y lectura",
      "poderEspecial": "Sugiere palabras mágicas para juegos",
      "beneficio": "Mejora lenguaje y lectura"
    },
    "imagenUrl": "/images/BR05.png",
    "imagenUrlCartoon": "/images/BR05C.png",
    "precio": 34.60,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 95
  },
  {
    "id": 6,
    "nombre": "Sciro",
    "descripcion": {
      "personalidad": "Observadora y científica",
      "funcion": "Introduce experimentos virtuales",
      "poderEspecial": "Simula reacciones científicas",
      "beneficio": "Fomenta curiosidad científica"
    },
    "imagenUrl": "/images/BR06.png",
    "imagenUrlCartoon": "/images/BR06C.png",
    "precio": 30.40,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 100
  },
  {
    "id": 7,
    "nombre": "Histy",
    "descripcion": {
      "personalidad": "Aventurera y sabia",
      "funcion": "Narra historias históricas",
      "poderEspecial": "Desbloquea momentos secretos del pasado",
      "beneficio": "Aprende historia de forma divertida"
    },
    "imagenUrl": "/images/BR07.png",
    "imagenUrlCartoon": "/images/BR07C.png",
    "precio": 32.80,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 102
  },
  {
    "id": 8,
    "nombre": "Geo",
    "descripcion": {
      "personalidad": "Explora mapas y culturas",
      "funcion": "Enseña geografía",
      "poderEspecial": "Crea rutas de exploración virtual",
      "beneficio": "Descubre lugares del mundo"
    },
    "imagenUrl": "/images/BR08.png",
    "imagenUrlCartoon": "/images/BR08C.png",
    "precio": 27.90,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 97
  },
  {
    "id": 9,
    "nombre": "Codey",
    "descripcion": {
      "personalidad": "Creativa y lógica",
      "funcion": "Introduce programación básica",
      "poderEspecial": "Genera mini-códigos y puzzles",
      "beneficio": "Aprende lógica computacional"
    },
    "imagenUrl": "/images/BR09.png",
    "precio": 36.20,
    "categoria": "Brainy",
    "activo": true,
    "ventasMes": 108
  },
  {
    "id": 10,
    "nombre": "Techno",
    "descripcion": {
      "personalidad": "Ingenioso y curioso",
      "funcion": "Enseña sobre tecnología y gadgets",
      "poderEspecial": "Puede hackear mini retos digitales y crear inventos virtuales",
      "beneficio": "Aprende tecnología jugando"
    },
    "imagenUrl": "/images/TE01.png",
    "precio": 38.50,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 110
  },
  {
    "id": 11,
    "nombre": "Circuit",
    "descripcion": {
      "personalidad": "Preciso y meticuloso",
      "funcion": "Explica circuitos y electrónica básica",
      "poderEspecial": "Puede encender y apagar dispositivos virtuales",
      "beneficio": "Refuerza conocimientos en electrónica"
    },
    "imagenUrl": "/images/TE02.png",
    "precio": 36.20,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 95
  },
  {
    "id": 12,
    "nombre": "Botly",
    "descripcion": {
      "personalidad": "Divertido y amistoso",
      "funcion": "Enseña robótica y automatización",
      "poderEspecial": "Puede construir robots virtuales",
      "beneficio": "Aprende programación y robótica"
    },
    "imagenUrl": "/images/TE03.png",
    "precio": 37.80,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 100
  },
  {
    "id": 13,
    "nombre": "Pixel",
    "descripcion": {
      "personalidad": "Creativo y observador",
      "funcion": "Enseña diseño digital y gráficos",
      "poderEspecial": "Puede generar animaciones y efectos",
      "beneficio": "Desarrolla creatividad digital"
    },
    "imagenUrl": "/images/TE04.png",
    "precio": 36.90,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 105
  },
  {
    "id": 14,
    "nombre": "Gizmo",
    "descripcion": {
      "personalidad": "Curioso y explorador",
      "funcion": "Muestra gadgets y dispositivos futuristas",
      "poderEspecial": "Puede activar inventos virtuales",
      "beneficio": "Aprende sobre innovación tecnológica"
    },
    "imagenUrl": "/images/TE05.png",
    "precio": 39.50,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 97
  },
  {
    "id": 15,
    "nombre": "Nano",
    "descripcion": {
      "personalidad": "Inteligente y rápido",
      "funcion": "Enseña sobre microchips y nanotecnología",
      "poderEspecial": "Puede miniaturizar objetos virtuales",
      "beneficio": "Conoce ciencia avanzada jugando"
    },
    "imagenUrl": "/images/TE06.png",
    "precio": 41.00,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 90
  },
  {
    "id": 16,
    "nombre": "Codix",
    "descripcion": {
      "personalidad": "Analítico y lógico",
      "funcion": "Introduce programación y resolución de problemas",
      "poderEspecial": "Puede crear mini-códigos interactivos",
      "beneficio": "Refuerza pensamiento computacional"
    },
    "imagenUrl": "/images/TE07.png",
    "precio": 38.20,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 102
  },
  {
    "id": 17,
    "nombre": "Volt",
    "descripcion": {
      "personalidad": "Energético y valiente",
      "funcion": "Enseña electricidad y energía",
      "poderEspecial": "Puede iluminar o encender objetos virtuales",
      "beneficio": "Comprende conceptos de energía y fuerza"
    },
    "imagenUrl": "/images/TE08.png",
    "precio": 37.40,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 98
  },
  {
    "id": 18,
    "nombre": "Appsy",
    "descripcion": {
      "personalidad": "Sociable y curiosa",
      "funcion": "Enseña desarrollo de apps y software",
      "poderEspecial": "Puede crear aplicaciones virtuales sencillas",
      "beneficio": "Aprende a desarrollar tecnología útil"
    },
    "imagenUrl": "/images/TE09.png",
    "precio": 36.80,
    "categoria": "Techy",
    "activo": true,
    "ventasMes": 95
  },
  {
    "id": 19,
    "nombre": "Tender",
    "descripcion": {
      "personalidad": "Cariñosa y juguetona",
      "funcion": "Brinda compañía y alegría",
      "poderEspecial": "Puede enviar 'abrazos virtuales' que mejoran tu ánimo",
      "beneficio": "Siente ternura y diversión"
    },
    "imagenUrl": "/images/CU01.png",
    "precio": 26.90,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 120
  },
  {
    "id": 20,
    "nombre": "Snuggles",
    "descripcion": {
      "personalidad": "Dulce y tranquila",
      "funcion": "Acompaña en momentos de descanso",
      "poderEspecial": "Puede arrullar y relajar al usuario",
      "beneficio": "Genera calma y confort"
    },
    "imagenUrl": "/images/CU02.png",
    "precio": 25.80,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 100
  },
  {
    "id": 21,
    "nombre": "Fluffy",
    "descripcion": {
      "personalidad": "Alegre y saltarina",
      "funcion": "Juega y divierte con movimientos graciosos",
      "poderEspecial": "Puede lanzar burbujas de alegría",
      "beneficio": "Provoca risas y diversión"
    },
    "imagenUrl": "/images/CU03.png",
    "precio": 27.40,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 108
  },
  {
    "id": 22,
    "nombre": "Puff",
    "descripcion": {
      "personalidad": "Tierno y suave",
      "funcion": "Enseña cuidado y afecto",
      "poderEspecial": "Puede dar 'mimos virtuales' que aumentan la felicidad",
      "beneficio": "Promueve cariño y empatía"
    },
    "imagenUrl": "/images/CU04.png",
    "precio": 26.50,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 99
  },
  {
    "id": 23,
    "nombre": "Bunny",
    "descripcion": {
      "personalidad": "Inquieto y curioso",
      "funcion": "Explora y descubre junto al usuario",
      "poderEspecial": "Puede encontrar objetos escondidos",
      "beneficio": "Fomenta la curiosidad mientras divierte"
    },
    "imagenUrl": "/images/CU05.png",
    "precio": 39.90,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 115
  },
  {
    "id": 24,
    "nombre": "Peppy",
    "descripcion": {
      "personalidad": "Optimista y risueño",
      "funcion": "Motiva al usuario a interactuar",
      "poderEspecial": "Puede contagiar energía positiva",
      "beneficio": "Aumenta el buen ánimo y la motivación"
    },
    "imagenUrl": "/images/CU06.png",
    "precio": 29.10,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 103
  },
  {
    "id": 25,
    "nombre": "Sniffy",
    "descripcion": {
      "personalidad": "Travieso y curioso",
      "funcion": "Busca y encuentra tesoros pequeños",
      "poderEspecial": "Puede olfatear secretos virtuales",
      "beneficio": "Incentiva la exploración y el juego"
    },
    "imagenUrl": "/images/CU07.png",
    "precio": 25.60,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 96
  },
  {
    "id": 26,
    "nombre": "Muffin",
    "descripcion": {
      "personalidad": "Cariñoso y obediente",
      "funcion": "Acompaña en mini-juegos interactivos",
      "poderEspecial": "Puede dar premios virtuales",
      "beneficio": "Refuerza la recompensa y la diversión"
    },
    "imagenUrl": "/images/CU08.png",
    "precio": 109.90,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 105
  },
  {
    "id": 27,
    "nombre": "Bubbles",
    "descripcion": {
      "personalidad": "Espontáneo y juguetón",
      "funcion": "Crea burbujas y efectos divertidos",
      "poderEspecial": "Puede hacer reír con trucos graciosos",
      "beneficio": "Desarrolla alegría y entretenimiento"
    },
    "imagenUrl": "/images/CU09.png",
    "precio": 28.30,
    "categoria": "Cuddly",
    "activo": true,
    "ventasMes": 112
  },

  {
    "id": 28,
    "nombre": "Trail",
    "descripcion": {
      "personalidad": "Aventurera y valiente",
      "funcion": "Explora nuevos mundos y entornos virtuales",
      "poderEspecial": "Puede descubrir rutas secretas y tesoros escondidos",
      "beneficio": "Fomenta la curiosidad y el espíritu aventurero"
    },
    "imagenUrl": "/images/QS01.png",
    "precio": 30.40,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 118
  },
  {
    "id": 29,
    "nombre": "Maply",
    "descripcion": {
      "personalidad": "Organizada y exploradora",
      "funcion": "Guía con mapas y pistas interactivas",
      "poderEspecial": "Puede mostrar caminos ocultos y misiones secretas",
      "beneficio": "Desarrolla la orientación y la resolución de problemas"
    },
    "imagenUrl": "/images/QS02.png",
    "precio": 29.70,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 102
  },
  {
    "id": 30,
    "nombre": "Scouta",
    "descripcion": {
      "personalidad": "Curiosa y observadora",
      "funcion": "Busca elementos en escenarios misteriosos",
      "poderEspecial": "Puede rastrear objetos o personajes ocultos",
      "beneficio": "Estimula la observación y la atención al detalle"
    },
    "imagenUrl": "/images/QS03.png",
    "precio": 31.20,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 110
  },
  {
    "id": 31,
    "nombre": "Rover",
    "descripcion": {
      "personalidad": "Intrépido y curioso",
      "funcion": "Explora terrenos difíciles y zonas inexploradas",
      "poderEspecial": "Puede detectar señales o anomalías ocultas",
      "beneficio": "Fomenta el descubrimiento y la perseverancia"
    },
    "imagenUrl": "/images/QS04.png",
    "precio": 30.90,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 99
  },
  {
    "id": 32,
    "nombre": "Luna",
    "descripcion": {
      "personalidad": "Soñadora y aventurera",
      "funcion": "Guía por misiones espaciales o mágicas",
      "poderEspecial": "Puede activar portales a mundos secretos",
      "beneficio": "Despierta la imaginación y la exploración creativa"
    },
    "imagenUrl": "/images/QS05.png",
    "precio": 124.90,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 120
  },
  {
    "id": 33,
    "nombre": "Compass",
    "descripcion": {
      "personalidad": "Segura y sabia",
      "funcion": "Orienta y da pistas sobre el rumbo correcto",
      "poderEspecial": "Puede detectar el mejor camino en los desafíos",
      "beneficio": "Fortalece el pensamiento estratégico y la dirección"
    },
    "imagenUrl": "/images/QS06.png",
    "precio": 29.50,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 97
  },
  {
    "id": 34,
    "nombre": "Terra",
    "descripcion": {
      "personalidad": "Natural y observadora",
      "funcion": "Explora entornos naturales y ecosistemas",
      "poderEspecial": "Puede identificar plantas y animales virtuales",
      "beneficio": "Promueve el amor por la naturaleza y el conocimiento ecológico"
    },
    "imagenUrl": "/images/QS07.png",
    "precio": 30.70,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 106
  },
  {
    "id": 35,
    "nombre": "Questin",
    "descripcion": {
      "personalidad": "Entusiasta y audaz",
      "funcion": "Acompaña en misiones con retos y acertijos",
      "poderEspecial": "Puede desbloquear niveles secretos y logros especiales",
      "beneficio": "Fomenta la superación personal y la exploración activa"
    },
    "imagenUrl": "/images/QS08.png",
    "precio": 31.50,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 113
  },
  {
    "id": 36,
    "nombre": "Navi",
    "descripcion": {
      "personalidad": "Guía y amigable",
      "funcion": "Ayuda al usuario a no perderse en los mundos virtuales",
      "poderEspecial": "Puede mostrar rutas seguras y atajos secretos",
      "beneficio": "Refuerza la orientación y la toma de decisiones"
    },
    "imagenUrl": "/images/QS09.png",
    "precio": 30.20,
    "categoria": "Questy",
    "activo": true,
    "ventasMes": 108
  },

  {
    "id": 37,
    "nombre": "Canva",
    "descripcion": {
      "personalidad": "Creativa y soñadora",
      "funcion": "Crea obras de arte junto al usuario",
      "poderEspecial": "Puede transformar ideas en dibujos y animaciones virtuales",
      "beneficio": "Desarrolla imaginación y creatividad"
    },
    "imagenUrl": "/images/AR01.png",
    "precio": 31.50,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 118
  },
  {
    "id": 38,
    "nombre": "Sketch",
    "descripcion": {
      "personalidad": "Curiosa y detallista",
      "funcion": "Enseña técnicas de dibujo",
      "poderEspecial": "Puede generar bocetos mágicos",
      "beneficio": "Mejora habilidades artísticas"
    },
    "imagenUrl": "/images/AR02.png",
    "precio": 29.90,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 110
  },
  {
    "id": 39,
    "nombre": "Coloro",
    "descripcion": {
      "personalidad": "Alegre y expresivo",
      "funcion": "Juega con colores y patrones",
      "poderEspecial": "Puede cambiar paletas de colores a voluntad",
      "beneficio": "Fomenta expresión y creatividad"
    },
    "imagenUrl": "/images/AR03.png",
    "precio": 30.80,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 115
  },
  {
    "id": 40,
    "nombre": "Brushy",
    "descripcion": {
      "personalidad": "Paciente y delicada",
      "funcion": "Enseña pintura y mezcla de colores",
      "poderEspecial": "Puede pintar escenas completas en segundos",
      "beneficio": "Desarrolla habilidades manuales y visuales"
    },
    "imagenUrl": "/images/AR04.png",
    "precio": 33.40,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 104
  },
  {
    "id": 41,
    "nombre": "Melody",
    "descripcion": {
      "personalidad": "Musical y armoniosa",
      "funcion": "Crea sonidos y música",
      "poderEspecial": "Puede componer melodías virtuales",
      "beneficio": "Incentiva sentido musical y ritmo"
    },
    "imagenUrl": "/images/AR05.png",
    "precio": 32.10,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 99
  },
  {
    "id": 42,
    "nombre": "Dancey",
    "descripcion": {
      "personalidad": "Energética y rítmica",
      "funcion": "Baila y enseña movimientos",
      "poderEspecial": "Puede crear coreografías virtuales",
      "beneficio": "Desarrolla coordinación y expresión corporal"
    },
    "imagenUrl": "/images/AR06.png",
    "precio": 30.70,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 108
  },
  {
    "id": 43,
    "nombre": "Crafty",
    "descripcion": {
      "personalidad": "Ingeniosa y hábil",
      "funcion": "Diseña manualidades y esculturas",
      "poderEspecial": "Puede crear objetos únicos",
      "beneficio": "Fomenta creatividad práctica"
    },
    "imagenUrl": "/images/AR07.png",
    "precio": 29.60,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 102
  },
  {
    "id": 44,
    "nombre": "Imago",
    "descripcion": {
      "personalidad": "Observadora y imaginativa",
      "funcion": "Combina imágenes y efectos",
      "poderEspecial": "Puede generar collages mágicos",
      "beneficio": "Estimula creatividad y experimentación visual"
    },
    "imagenUrl": "/images/AR08.png",
    "precio": 34.00,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 121
  },
  {
    "id": 45,
    "nombre": "Pattern",
    "descripcion": {
      "personalidad": "Meticulosa y ordenada",
      "funcion": "Diseña patrones y formas",
      "poderEspecial": "Puede crear mandalas y figuras geométricas",
      "beneficio": "Mejora concentración y apreciación artística"
    },
    "imagenUrl": "/images/AR09.png",
    "precio": 31.80,
    "categoria": "Arty",
    "activo": true,
    "ventasMes": 109
  },
  {
    "id": 46,
    "nombre": "Herina",
    "descripcion": {
      "personalidad": "Sabia y curiosa",
      "funcion": "Enseña sobre historia, música y tradiciones",
      "poderEspecial": "Puede contar historias interactivas y revelar curiosidades culturales",
      "beneficio": "Aprende sobre el mundo de forma divertida"
    },
    "imagenUrl": "/images/HE01.png",
    "precio": 33.20,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 115
  },
  {
    "id": 47,
    "nombre": "Historio",
    "descripcion": {
      "personalidad": "Aventurero y observador",
      "funcion": "Narra hechos históricos",
      "poderEspecial": "Puede viajar virtualmente a épocas antiguas",
      "beneficio": "Conoce la historia mientras juegas"
    },
    "imagenUrl": "/images/HE02.png",
    "precio": 31.70,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 109
  },
  {
    "id": 48,
    "nombre": "Magikuy",
    "descripcion": {
      "personalidad": "Curioso y alegre, con espíritu festivo peruano",
      "funcion": "Guía en tradiciones, danzas y leyendas del Perú",
      "poderEspecial": "Puede invocar música y colores de festivales peruanos",
      "beneficio": "Aprende y celebra la cultura peruana mientras se divierte"
    },
    "imagenUrl": "/images/HE03.png",
    "precio": 129.90,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 103
  },
  {
    "id": 49,
    "nombre": "Tradito",
    "descripcion": {
      "personalidad": "Alegre y sociable",
      "funcion": "Explica costumbres y festividades",
      "poderEspecial": "Puede recrear celebraciones culturales",
      "beneficio": "Aprende tradiciones de forma divertida"
    },
    "imagenUrl": "/images/HE04.png",
    "precio": 29.80,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 117
  },
  {
    "id": 50,
    "nombre": "Lingo",
    "descripcion": {
      "personalidad": "Curioso y comunicativo",
      "funcion": "Enseña idiomas y palabras únicas",
      "poderEspecial": "Puede traducir frases mágicas",
      "beneficio": "Aprende idiomas y comunicación cultural"
    },
    "imagenUrl": "/images/HE05.png",
    "precio": 32.10,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 100
  },
  {
    "id": 51,
    "nombre": "Melodio",
    "descripcion": {
      "personalidad": "Musical y emotivo",
      "funcion": "Comparte música de distintas culturas",
      "poderEspecial": "Puede tocar instrumentos virtuales",
      "beneficio": "Descubre ritmos y canciones del mundo"
    },
    "imagenUrl": "/images/HE06.png",
    "precio": 34.00,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 122
  },
  {
    "id": 52,
    "nombre": "Archeo",
    "descripcion": {
      "personalidad": "Intrépido y analítico",
      "funcion": "Explora ruinas y tesoros históricos",
      "poderEspecial": "Puede revelar secretos del pasado",
      "beneficio": "Desarrolla curiosidad histórica y arqueológica"
    },
    "imagenUrl": "/images/HE07.png",
    "precio": 30.60,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 112
  },
  {
    "id": 53,
    "nombre": "Folkie",
    "descripcion": {
      "personalidad": "Creativo y expresivo",
      "funcion": "Enseña danzas y artes populares",
      "poderEspecial": "Puede mostrar bailes tradicionales",
      "beneficio": "Aprende sobre cultura popular y expresiva"
    },
    "imagenUrl": "/images/HE08.png",
    "precio": 109.90,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 108
  },
  {
    "id": 54,
    "nombre": "Story",
    "descripcion": {
      "personalidad": "Narrador y empático",
      "funcion": "Cuenta cuentos y leyendas",
      "poderEspecial": "Puede recrear historias interactivas",
      "beneficio": "Disfruta del aprendizaje cultural a través de narrativas"
    },
    "imagenUrl": "/images/HE09.png",
    "precio": 31.50,
    "categoria": "Herity",
    "activo": true,
    "ventasMes": 106
  }

];
export default sample;