
# TuMejorPrecio 📱

**TuMejorPrecio** es una aplicación móvil desarrollada en React Native como parte del curso de React Native de CODERHOUSE. El objetivo principal de la aplicación es proporcionar una experiencia de usuario fluida para gestionar productos, realizar búsquedas, y administrar funcionalidades como recibos, carrito de compras, perfil de usuario, y más.

---

## **Tabla de Contenidos**

1. [Características](#características)  
2. [Requisitos](#requisitos)  
3. [Instalación](#instalación)  
4. [Estructura del Proyecto](#estructura-del-proyecto)  
5. [Descripción de Archivos Clave](#descripción-de-archivos-clave)  
6. [Dependencias](#dependencias)  
7. [Contribución](#contribución)
8. [APK](#apk)

---

## **Características**

- **Navegación Múltiple**: Uso de `React Navigation` para implementar una navegación por pestañas y pilas.
- **Gestión Global de Estado**: Integración de `Redux Toolkit` para manejar estados como el carrito y las sesiones de usuario.
- **Base de Datos Local**: Uso de SQLite para almacenar datos localmente.
- **Pantallas Dinámicas**: Diseño modular para características como perfil, carrito, y lugares personalizados.
- **Carga Personalizada**: Fuentes personalizadas y una pantalla de carga implementada con `expo-font` y `expo-splash-screen`.

---

## **Requisitos**

- **Node.js**: v14 o superior  
- **Expo CLI**: Instalado globalmente

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/tumejorprecio.git
   cd tumejorprecio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npx expo start
   ```

4. Abre la app en tu dispositivo móvil con **Expo Go** o en un emulador.

---

## **Estructura del Proyecto**

### Nivel Raíz:

```plaintext
.
├── .expo/              # Configuración interna de Expo
├── assets/             # Recursos estáticos como imágenes, fuentes, etc.
├── node_modules/       # Dependencias instaladas
├── src/                # Código fuente principal de la aplicación
├── .env                # Variables de entorno (no incluidas en el repositorio)
├── .gitignore          # Archivos y carpetas ignorados por Git
├── App.js              # Punto de entrada de la aplicación
├── babel.config.js     # Configuración de Babel
├── eas.json            # Configuración para EAS (Expo Application Services)
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del proyecto
```

### Contenido de `src/`:

```plaintext
src/
├── app/                 # Configuración global de Redux
├── components/          # Componentes reutilizables
├── data/                # Datos estáticos o configuraciones
├── db/                  # Configuración de SQLite
├── features/            # Funcionalidades específicas de la app
├── firebase/            # Integración con Firebase
├── global/              # Estilos o variables globales
├── navigation/          # Configuración de navegaciones
├── screens/             # Pantallas principales
├── services/            # Servicios como API calls
├── utils/               # Utilidades o helpers
├── validations/         # Reglas de validación
```

---

## **Descripción de Archivos Clave**

### Archivos Principales:

- **`App.js`**: Punto de entrada de la aplicación que inicializa Redux, SQLite y fuentes personalizadas.
- **`MainNavigator.jsx`**: Configura la navegación principal.
- **`ReceiptsNavigator.jsx`**, **`CartNavigator.jsx`**, **`MyPlacesNavigator.jsx`**: Subnavegadores específicos para diferentes secciones.

### Carpeta `screens`:

Contiene las pantallas principales, como:
- **CartScreen**: Manejo del carrito.
- **ProfileScreen**: Configuración del perfil.
- **ReceiptsScreen**: Listado de recibos.

### Carpeta `db`:

- **`index.js`**: Contiene operaciones para:
  - Crear la tabla `sessions`.
  - Insertar, obtener y limpiar sesiones.

### Carpeta `services`:

Contiene servicios para la comunicación API:
- **`authService.js`**: Gestión de autenticación.
- **`shopService.js`**: Gestión de productos y categorías.

### Carpeta `features`:

Implementa los *slices* de Redux:
- **`authSlice.js`**: Estado global para autenticación.
- **`cartSlice.js`**: Estado del carrito.
- **`shopSlice.js`**: Estado para productos y categorías.

---

## **Dependencias**

Listado de dependencias clave utilizadas en el proyecto:

```json
"dependencies": {
  "@react-navigation/native": "^6.1.18",
  "@reduxjs/toolkit": "^2.3.0",
  "expo": "^52.0.7",
  "expo-font": "~13.0.1",
  "expo-sqlite": "~15.0.3",
  "react": "18.3.1",
  "react-native": "0.76.2",
  "react-native-maps": "1.18.0",
  "react-native-toast-message": "^2.2.1",
  "react-redux": "^9.1.2",
  "yup": "^1.4.0"
}
```

---

## **Contribución**

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork del proyecto.  
2. Crea una rama nueva para tu funcionalidad (`git checkout -b nueva-funcionalidad`).  
3. Realiza un pull request con una descripción detallada de los cambios.

---

## **APK**

En el archivo de extensión .apk application-54134e70-01c0-48c3-b9bf-fa3799a1be1f se encuentra esta app compilada con ExpoDev.

https://drive.google.com/file/d/1cxZ6DXHeheGiOHWCgoobOH20Zrs2s-aG/view?usp=sharing


---
Muchas gracias a ti por leer. Muchas gracias a los maestros que estuvieron con nosotros durante este recorrido.
Si necesitas agregar o modificar algo en este README, no dudes en indicármelo. 😊
