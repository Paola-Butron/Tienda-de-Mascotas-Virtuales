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
  }

];
export default sample;