# Gestor de Usuarios de Prueba

Aplicación móvil desarrollada con React Native y Expo que permite listar y crear usuarios consumiendo la API de reqres.in. Incluye persistencia local de datos, paginación y gestión de estado con Redux Toolkit.

## 🚀 Tecnologías Utilizadas

### Core
- **React Native** (v0.81.5) - Framework para desarrollo móvil multiplataforma
- **React** (v19.1.0) - Biblioteca para construir interfaces de usuario
- **Expo** (v54.0.25) - Plataforma y herramientas para desarrollo React Native

### Gestión de Estado
- **Redux Toolkit** (v2.11.0) - Herramientas oficiales para Redux
- **React Redux** (v9.2.0) - Bindings de React para Redux

### Persistencia de Datos
- **@react-native-async-storage/async-storage** (v2.2.0) - Almacenamiento local asíncrono

### Variables de Entorno
- **react-native-dotenv** (v3.4.11) - Carga de variables de entorno desde archivo .env

### API Externa
- **reqres.in** - API REST de prueba para obtener y crear usuarios

### Instalación de Expo CLI (opcional)

```bash
npm install -g expo-cli
```

O puedes usar `npx expo` sin instalarlo globalmente.

## 📦 Instalación

1. Clona el repositorio o navega al directorio del proyecto:
```bash
cd gestorUsuariosReqres
```

2. Instala las dependencias en la raíz del proyecto:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```env
API_KEY='reqres-free-v1'
```

### Iniciar el servidor de desarrollo

```bash
npm start
```

O directamente con Expo:

```bash
npx expo start
```

**Android:**
```bash
npm run android
# o
npx expo start --android
```

**iOS:**
```bash
npm run ios
# o
npx expo start --ios
```

**Web:**
```bash
npm run web
# o
npx expo start --web
```

1. Ejecuta `npm start`
2. Escanea el código QR con:
   - **iOS**: Cámara nativa o app Expo Go
   - **Android**: App Expo Go

## 📁 Estructura del Proyecto

```
gestorUsuariosReqres/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/         # Componentes comunes (Loading, Error, Success)
│   │   └── users/          # Componentes relacionados con usuarios
│   │       ├── UserCard.js              # Tarjeta de usuario individual
│   │       ├── UserForm.js              # Formulario de creación de usuario
│   │       └── PaginationControls.js    # Controles de paginación
│   ├── constants/          # Constantes y configuración
│   │   ├── api.js         # Endpoints y configuración de API
│   │   └── validation.js  # Reglas y mensajes de validación
│   ├── features/          # Features de Redux (slices)
│   │   └── users/         # Slice y selectores de usuarios
│   │       ├── usersSlice.js            # Redux slice con thunks
│   │       └── usersSelectors.js        # Selectores memoizados
│   ├── hooks/             # Custom hooks
│   │   └── useUserForm.js # Hook para gestión del formulario
│   ├── middleware/        # Middleware de Redux
│   │   └── persistenceMiddleware.js # Persistencia automática
│   ├── screens/           # Pantallas de la aplicación
│   │   └── HomeScreen.js  # Pantalla principal
│   ├── services/          # Servicios de API
│   │   └── api.js         # Llamadas a la API de reqres.in
│   ├── store/             # Configuración de Redux
│   │   └── store.js       # Store principal
│   └── utils/             # Utilidades
│       ├── storage.js     # Funciones de AsyncStorage
│       └── validators.js  # Funciones de validación
├── App.js                 # Componente raíz
├── index.js               # Punto de entrada
├── app.json               # Configuración de Expo
├── babel.config.js        # Configuración de Babel (incluye react-native-dotenv)
├── .env                   # Variables de entorno (no versionado)
└── package.json           # Dependencias del proyecto
```

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS
- `npm run web` - Ejecuta la app en el navegador

## 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en features con separación de responsabilidades:

- **Redux Toolkit**: Gestión de estado global con thunks asíncronos
- **Custom Hooks**: Lógica reutilizable para formularios
- **Services**: Abstracción de llamadas API
- **Components**: Componentes presentacionales y contenedores
- **Middleware**: Persistencia automática de usuarios creados localmente
- **Selectors**: Selectores memoizados para optimización de rendimiento

## ✨ Funcionalidades

### Pantalla Principal
- **Listado de usuarios**: Muestra nombre y email de cada usuario
- **Estados de carga**: Indicador visual durante la carga de datos
- **Manejo de errores**: Mensajes de error con opción de reintento
- **Paginación**: Navegación entre páginas de usuarios
- **Pull to refresh**: Actualización manual de la lista

### Formulario de Creación
- **Campos validados**: Nombre y Job con validación en tiempo real
- **Feedback visual**: Indicadores de éxito/error en los campos
- **Creación asíncrona**: Envío de datos a la API con estados de carga
- **Persistencia local**: Los usuarios creados se guardan en AsyncStorage

### Gestión de Estado
- **Estado global**: Manejo centralizado con Redux Toolkit
- **Thunks asíncronos**: `fetchUsers` y `createUser` para operaciones API
- **Selectores optimizados**: Uso de `createSelector` para mejor rendimiento
- **Separación de datos**: Usuarios de API y usuarios creados localmente

## 📝 Notas Adicionales

- Los usuarios creados se persisten localmente usando AsyncStorage
- La API utilizada es reqres.in (API de prueba)
- El formulario incluye validación en tiempo real con feedback visual
- Los nuevos usuarios aparecen al inicio de la lista (solo en la primera página)
- La paginación solo afecta a los usuarios de la API, los creados localmente siempre se muestran en la página 1
- Se utiliza un archivo `.env` para almacenar la API key de forma segura
- Los componentes están optimizados con `React.memo` y hooks memoizados para mejor rendimiento

## 🔐 Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz con:

```env
API_KEY='reqres-free-v1'
```

Este archivo no debe versionarse (está incluido en `.gitignore`).

## 👤 Autor

Desarrollado como trabajo práctico individual para UADE por Marcos Cavicchia

## 🤖 Uso de IA

Se utilizó IA para la documentación completa de la app, implementación de AsyncStorage, y checkeos automaticos de robustez en la arquitectura de la app.
