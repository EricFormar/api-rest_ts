# Sugerencias de Mejoras

## 1. Tipado más estricto para `process.env` y las variables exportadas

Actualmente, las variables exportadas individualmente son string | undefined. Sería mejor tipar el objeto de configuración final para que TypeScript sepa exactamente qué esperar.

```TypeScript

// 1. Define una interfaz para tus variables de entorno esperadas
interface EnvConfig {
    PORT: number; // Podría ser string, pero si siempre es un puerto, number es mejor
    NODE_ENV: TypeMode;
    BASE_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_DIALECT: Dialect; // Importa Dialect de Sequelize
}

// 2. Define una interfaz para la configuración de la DB por defecto
interface DbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    dialect: string; // O Dialect si quieres ser más estricto
}

// 3. Modifica la exportación para tiparla
const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || '3000', 10), // Convertir a número y dar un valor por defecto numérico
    NODE_ENV: mode, // Ya validado
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000', // Valor por defecto
    DB_HOST: DB_HOST || 'localhost',
    DB_PORT: parseInt(DB_PORT || '3306', 10), // Convertir a número
    DB_USERNAME: DB_USERNAME || 'root',
    DB_PASSWORD: DB_PASSWORD || '',
    DB_NAME: DB_NAME || 'test',
    DB_DIALECT: DB_DIALECT as Dialect || 'mysql', // Con as Dialect y valor por defecto
};

export const {
    PORT,
    NODE_ENV,
    BASE_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
} = env; // Exporta desde el objeto tipado

export default {
    db: {
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        name: DB_NAME,
        dialect: DB_DIALECT
    } as DbConfig // Asegúrate de que coincida con DbConfig
};
```

- Ventaja: Cuando importes PORT o DB_PORT, TypeScript sabrá que son de tipo number, y para NODE_ENV sabrá que es TypeMode. Esto evita tener que hacer aserciones de tipo as string o as number cada vez que los uses.

    _Nota: parseInt es crucial para convertir los valores de cadena de process.env (como PORT o DB_PORT) a números._

## 2. Manejo de Errores más específico para valores requeridos

- Los valores por defecto (|| 'some_value') son útiles para la mayoría de los casos. Sin embargo, para variables que son absolutamente críticas (como la contraseña de la base de datos en producción), quisieramos que la aplicación falle explícitamente si no se encuentran.

```TypeScript

// Dentro de la interfaz EnvConfig, puedes marcar algunas como opcionales
// pero al construir el objeto env, si son críticas, puedes lanzar un error.

if (!process.env.DB_PASSWORD && mode === 'production') {
    throw new Error('DB_PASSWORD is required in production mode.');
}
```

## 3. Encapsulamiento de la Lógica de Carga

Encapsular la lógica de carga de `dotenv` en una función o clase para tener un control más granular, especialmente en aplicaciones más grandes.

```TypeScript

// config/env.ts
import { config } from 'dotenv';
import path from 'path';

type TypeMode = 'development' | 'production' | 'test';

interface DbConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    dialect: string;
}

interface EnvConfig {
    PORT: number;
    NODE_ENV: TypeMode;
    BASE_URL: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_DIALECT: string;
    db: DbConfig; // Añade la configuración de la DB aquí
}

class Environment {
    private _config: EnvConfig;

    constructor() {
        const mode: TypeMode = process.env.NODE_ENV as TypeMode || 'development';
        if (!['development', 'production', 'test'].includes(mode)) {
            throw new Error(`Invalid NODE_ENV mode: ${mode}`);
        }

        const envFile = `.env.${mode}`;
        config({ path: path.join(__dirname, 'environments', envFile) });

        this._config = this.loadConfig(mode);
    }

    private loadConfig(mode: TypeMode): EnvConfig {
        const port = parseInt(process.env.PORT || '3000', 10);
        const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

        // Validaciones específicas para producción
        if (mode === 'production') {
            if (!process.env.DB_PASSWORD) {
                throw new Error('DB_PASSWORD is required in production environment.');
            }
            // Añadir más validaciones si es necesario
        }

        return {
            PORT: port,
            NODE_ENV: mode,
            BASE_URL: process.env.BASE_URL || `http://localhost:${port}`,
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_PORT: dbPort,
            DB_USERNAME: process.env.DB_USERNAME || 'root',
            DB_PASSWORD: process.env.DB_PASSWORD || '',
            DB_NAME: process.env.DB_NAME || 'test',
            DB_DIALECT: process.env.DB_DIALECT || 'mysql',
            INIT_PASSWORD: process.env.INIT_PASSWORD || 'default_init_password',
            db: {
                host: process.env.DB_HOST || 'localhost',
                port: dbPort,
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                name: process.env.DB_NAME || 'test',
                dialect: process.env.DB_DIALECT || 'mysql',
            }
        };
    }

    public get config(): EnvConfig {
        return this._config;
    }
}

const envInstance = new Environment();

export default envInstance.config; // Exporta el objeto de configuración completo
export const {
    PORT,
    NODE_ENV,
    BASE_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_DIALECT,
    INIT_PASSWORD
} = envInstance.config; // Exporta las variables individuales también
```

- Ventaja: Mayor control, posibilidad de añadir métodos de validación más complejos, y una única fuente de verdad para la configuración.
