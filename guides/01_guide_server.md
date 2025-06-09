# Levantar un proyecto con TypeScript en Express

Este proyecto utiliza TypeScript y Express para crear un servidor web.

## 1. Instalar dependencias

Una vez inicializado un proyecto de Node.js con el comando `npm init -y`, instalar las dependencias necesarias:

```bash
npm install express dotenv bcrypt
npm install -D @types/express @types/bcrypt ts-node typescript
```

## 2. Configurar TypeScript

Para un proyecto basado en TypeScript, necesitamos tener un archivo ```tsconfig.json``` en el directorio raíz, que contiene la configuración relacionada con TypeScript. Para este proyecto, usaremos la siguiente configuración:

- `"allowJs": true`: Permite incluir archivos JavaScript en la compilación.
- `"baseUrl": "./src"`: Establece la raíz base para resolver módulos relativos.
- `"noFallthroughCasesInSwitch": true`: Previene que casos en `switch` caigan al siguiente por error.
- `"allowSyntheticDefaultImports": true`: Permite importar módulos sin exportación por defecto.
- `"downlevelIteration": true`: Mejora la compatibilidad con bucles y iteradores en versiones antiguas de JavaScript.
- `"esModuleInterop": true`: Facilita la interoperabilidad con módulos ES.
- `"forceConsistentCasingInFileNames": true`: Asegura que los nombres de archivos tengan el mismo uso de mayúsculas/minúsculas.
- `"module": "Node16"`: Usa el sistema de módulos de Node.js versión 16.
- `"noImplicitAny": true`: Requiere declarar tipos explícitamente en variables sin tipo.
- `"resolveJsonModule": true`: Permite importar archivos JSON como módulos.
- `"noImplicitReturns": false`: No obliga a que todas las funciones tengan retornos explícitos.
- `"noImplicitThis": true`: Detecta uso implícito de `this` con tipos desconocidos.
- `"sourceMap": true`: Genera mapas de origen para depuración.
- `"strictNullChecks": true`: La verificación estricta de `null` y `undefined`.
- `"strict": true`: Activa todas las comprobaciones estrictas.
- `"target": "es6"`: Compila a JavaScript ES6.
- `"typeRoots"`: Define las rutas para buscar tipos personalizados.
- `"outDir": "build"`: Carpeta donde se guarda el código compilado.

### Inclusión y exclusión

- Incluye todos los archivos `.ts` en el proyecto.
- Excluye las carpetas `node_modules`, `build` y `dist`.

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": "./src",
    "allowUnreachableCode": false,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "downlevelIteration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "module": "Node16",
    "noImplicitAny": true,
    "resolveJsonModule": true,
    "noImplicitReturns": false,
    "noImplicitThis": true,
    "noUnusedLocals": false,
    "sourceMap": true,
    "strictNullChecks": true,
    "strict": true,
    "pretty": true,
    "target": "es6",
    "typeRoots": ["./src/typings", "../../node_modules/@types"],
    "outDir": "build"
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules", "build", "dist"]
}
```

Se recomienda consultar la documentación para más detalles sobre cómo ajustar el archivo tsconfig según tus necesidades. También puedes comenzar con ```npx tsc --init```, lo cual creará un tsconfig básico con casi todas las opciones posibles comentadas.

## 3. Configurar las variables de entorno

- Creamos el archivo `.env` en la carpeta `./src/environments` con las variables de entorno necesarias para levantar el servidor. Este archivo no se subirá a GitHub.

```env
NODE_ENV=

# server
PORT=3000
BASE_URL=http://localhost:3000/api
```

_NOTA: el valor de `NODE_ENV` puede ser `development`, `production` o `test`._

- Creamos el archivo `.env.example` en la carpeta `./src/environments` con las variables de entorno. Este archivo se usará para documentar las variables de entorno.

```env
NODE_ENV=

# server
PORT=
BASE_URL=
```

## 4. Simplifar el acceso a las variables de entorno

- Creamos el archivo `env.ts` en la carpeta raíz del proyecto. Este archivo se usará para administrar las variables de entorno.

```ts
import {config} from 'dotenv';
import path from 'path';

type TypeMode = 'development' | 'production' | 'test';
/*
type TypeMode = 'development' | 'production' | 'test';: Define un tipo de TypeScript llamado TypeMode. Este es un "union type" que especifica que la variable mode solo puede tomar uno de estos tres valores de cadena: 'development', 'production' o 'test'. Esto proporciona una fuerte seguridad de tipos y evita errores por modos mal escritos.
*/

const mode : TypeMode = process.env.NODE_ENV as TypeMode || 'development';
/*
 const mode : TypeMode = process.env.NODE_ENV as TypeMode || 'development';:

process.env.NODE_ENV: Esta es una variable de entorno estándar en aplicaciones Node.js que indica el entorno en el que se está ejecutando la aplicación.

as TypeMode: Es una aserción de tipo de TypeScript. Le dice al compilador que trate el valor de process.env.NODE_ENV como si fuera del tipo TypeMode. Esto es necesario porque process.env siempre devuelve string | undefined, y TypeScript no sabe inherentemente que será uno de tus modos definidos.

|| 'development': Si process.env.NODE_ENV no está definido (es undefined o una cadena vacía), la variable mode por defecto será 'development'. Esto es una buena práctica para que tu aplicación siempre tenga un modo predeterminado.
 */

if(!['development', 'production', 'test'].includes(mode)) {
    throw new Error('Invalid mode');
};
/*
Si mode es algo diferente a 'development', 'production' o 'test', lanza un Error deteniendo la ejecución de la aplicación. Esto previene que la aplicación se inicie con una configuración de entorno desconocida o incorrecta.
*/

const envFile = `.env.${mode}`;
/*
 const envFile =.env.${mode};: Construye el nombre del archivo .env específico para el modo actual. Por ejemplo, si mode es 'development', envFile será ".env.development". Si es 'production', será ".env.production", etc.
 */

config({ path: path.join(__dirname,'environments', envFile) });
/*
 Esta línea hace que las variables definidas en ese archivo .env sean accesibles a través de process.env. 
 */

export const {
    PORT,
    NODE_ENV,
    BASE_URL
} = process.env;
/*
Al hacer export const { ... } = process.env;, estás exportando cada una de estas variables individualmente, lo que permite importarlas directamente en otros módulos.
 */
```

## 5. Crear el archivo `app.ts` en la carpeta raíz del proyecto. Este archivo se usará para crear el servidor

```ts
import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "./environments/.env"),
});

import { NODE_ENV, PORT } from "./env";

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json("¡Hola, mundo!!!!");
});

try {
  app.listen(PORT, () => {
    console.log(
      `Servidor corriendo en el puerto ${PORT} | MODO: ${
        NODE_ENV ? NODE_ENV.toUpperCase() : "DEVELOPMENT (default)"
      }`
    );
  });
} catch (error) {
  console.error("\n ERROR: Error al iniciar la aplicación:", error);
  process.exit(1);
}

```
