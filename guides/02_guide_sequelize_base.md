# Tutorial para la implementación de Sequelize con TypeScript

## Introducción

En este tutorial, aprenderás cómo implementar Sequelize en un proyecto TypeScript. Sequelize es un ORM (Object-Relational Mapping) para Node.js que facilita la interacción con bases de datos relacionales. TypeScript es un superset de JavaScript que añade tipado estático y características avanzadas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm (Node Package Manager)
- MySQL (o el gestor de base de datos de tu elección)

## Instalar dependencias

```bash
npm i sequelize sequelize-cli mysql2 dotenv
npm i -D @types/sequelize 
```

## Configurar Sequelize

1. Para configurar Sequelize, primero debemos crear un archivo de configuración llamado ```.sequelizerc``` en la raíz de nuestro proyecto. Con el siguiente contenido:

    ```js
   const path = require('path');

    module.exports = {
    'config': path.resolve('src', 'database', 'config.js'),
    'models-path': path.resolve('src', 'database', 'models'),
    'seeders-path': path.resolve('src', 'database', 'seeders'),
    'migrations-path': path.resolve('src', 'database', 'migrations'),
    };
    ```

2. Ejecutar desde la terminal ```npx sequelize init```. Esto creará el directorio ```src/database``` que contendrá los directorios para modelos, migraciones y semillas. Además, también contendrá el archivo ```config.js```.

    ```bash
    npx sequelize-cli init
    ```

3. Crear los entornos de desarrollo, producción y pruebas:

    - Crear el archivo `.env.dev` en la carpeta `./src/environments` con las variables de entorno. Estas variables se usarán para levantar el servidor en desarrollo.

    ```env
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_DIALECT=mysql
    ```

    - Crear el archivo `.env.production` en la carpeta `./src/environments` con las variables de entorno. Eventualmente se puede usar para levantar el servidor en producción.

    ```env
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_DIALECT=mysql
    ```

    - Crear el archivo `.env.test` en la carpeta `./src/environments` con las variables de entorno. Estas variables se usarán para levantar el servidor en pruebas.

    ```env
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_DIALECT=mysql
    ```

4. Editamos el archivo ```src/database/env.ts``` agregando las variables de entorno necesarias para la conexión a la base de datos.:

    ```ts
    // exportamos las variables de entorno para que puedan ser usadas en otros módulos
    export const {
        DB_HOST,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_DIALECT,
    } = process.env;

    // exportamos el objeto de configuración de la base de datos
    export default {
        db : {
            host: DB_HOST || 'localhost',
            port: DB_PORT || 3306,
            username: DB_USERNAME || 'root',
            password: DB_PASSWORD || '',
            name: DB_NAME || 'test',
            dialect: DB_DIALECT || 'mysql'
        }
    }
    ```

5. Reemplazar el contenido de ```config.js``` con el siguiente:

    ```js
    // Aseguramos que el CLI de Sequelize entienda TypeScript al ejecutar migraciones o semillas.
    require('ts-node/register');

    // Obtenemos las variables de entorno desde el archivo .env
    const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = require('../env')

    // Exportamos la configuración de la base de datos para que el CLI de Sequelize pueda leerla.
    module.exports = {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT
    };
    ```

6. Agrear los siguientes scripts en el archivo ```package.json```:

    ```json
    "scripts": {
        "db:create": "sequelize db:create && sequelize db:migrate && sequelize db:seed:all",
        "db:reset": "sequelize db:drop && npm run db:create"
    }
    ```

7. Crear los modelos y migraciones usando Sequelize CLI. Aquí va un ejemplo:

    ```bash
    npx sequelize-cli model:generate --name Test --attributes name:string
    ```

    - Esto nos creará dos archivos de javascript: `/src/database/models/test.js` y `/src/database/migrations/#########-test.js`.

        - Modelo:

        ```js
        // src/database/models/test.js
        'use strict';
        const {
        Model
        } = require('sequelize');
        module.exports = (sequelize, DataTypes) => {
        class Test extends Model {
            /**
            * Helper method for defining associations.
            * This method is not a part of Sequelize lifecycle.
            * The `models/index` file will call this method automatically.
            */
            static associate(models) {
            // define association here
            }
        }
        Test.init({
            name: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Test',
        });
        return Test;
        };
        ```

        - Migración:

        ```js
        // src/database/migrations/#########-test.js
        'use strict';
        /** @type {import('sequelize-cli').Migration} */
        module.exports = {
        async up(queryInterface, Sequelize) {
            await queryInterface.createTable('Tests', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
            });
        },
        async down(queryInterface, Sequelize) {
            await queryInterface.dropTable('Tests');
        }
        };
        ```

8. Crear el archivo `connection.ts` en la carpeta ```src/database``` para conectar con la base de datos:

    ```ts
    import { Dialect, Sequelize } from 'sequelize';
    /*
    import { Dialect, Sequelize } from 'sequelize';: Aquí importamos dos cosas clave de la librería sequelize:
            
        Sequelize: Esta es la clase principal de Sequelize. Es la que usaremos para crear una nueva instancia de conexión a la base de datos.
            
        Dialect: Este es un tipo de TypeScript que representa los distintos tipos de bases de datos que Sequelize puede conectar (por ejemplo, 'mysql', 'postgres', 'sqlite', 'mssql'). Nos ayuda a asegurar la seguridad de tipos cuando especificamos el dialecto de la base de datos.
     */
    import env from '../env';
    /*
    import env from '../env';: Esto importa un módulo env desde un archivo relativo (probablemente ../env.ts o ../env.js). Este archivo env (de "environment", entorno) suele contener variables de configuración sensibles, como las credenciales de la base de datos, para mantenerlas separadas del código principal y que no queden expuestas directamente en el repositorio de código.
     */

    const {db : {name,username,password,host, dialect, port}} = env;
    /*
    Asumiendo que env tiene una estructura como env.db.name, env.db.username, etc., esta sintaxis te permite acceder a name, username, password, host, dialect y port de forma directa sin tener que escribir env.db. cada vez.
     */

    const sequelizeConnection: Sequelize = new Sequelize(name, username, password, {
        host,
        dialect: dialect as Dialect,
        port : +port, 
    });
    /*
    const sequelizeConnection: Sequelize = ...: Aquí declaramos una variable llamada sequelizeConnection y le asignamos el tipo Sequelize.
        
        new Sequelize(name, username, password, { ... }): Este es el constructor de la clase Sequelize. Es el encargado de establecer la conexión.
        
        Los primeros tres argumentos son las credenciales básicas: el nombre de la base de datos, el nombre de usuario y la contraseña. El cuarto argumento es un objeto de opciones de configuración:
        
            host: Toma el valor de la variable host que desestructuramos de env.
            
            dialect: dialect as Dialect: Aquí se especifica el tipo de base de datos. El dialect viene de env, y as Dialect es un type assertion (aserción de tipo) de TypeScript. Le estamos diciendo al compilador: "Sé que la variable dialect (que es de tipo string) realmente contiene uno de los tipos de dialecto válidos que espera Sequelize, así que tráta este string como un Dialect." Esto proporciona seguridad de tipos.
            
            port : +port: Toma el valor de la variable port de env. El operador + antes de port es un atajo para convertir la cadena de texto (string) del puerto en un número (number), lo cual es necesario porque la configuración del archivo env a menudo se lee como cadenas.
    */

    export default sequelizeConnection;
    ```

9. Crear el archivo ```src/database/seeders/001-test.ts``` para crear un registro en la base de datos:

    ```ts
    import { QueryInterface, Sequelize } from 'sequelize';
    import Test from '../models/test';

10. Cambiar la extensión de los archivos de migración de `.js` a `.ts` y agregar el tipado correspondiente.

    - Modelo:

        ```ts
        // src/database/models/test.js
        
        // importamos el modelo y el tipo de datos
        import { Model, DataTypes } from 'sequelize';
        // importamos la conexión a la base de datos
        import connection from '../connection';

        // creamos la interfaz para el modelo Test
        interface TestAttributes{
            id: number;
            name: string;

            updatedAt?: Date;
            deletedAt?: Date;
            createdAt?: Date;
        }

        // clase para el modelo Test
        class Test extends Model<TestAttributes> implements TestAttributes {
        /* 
            class Test: Simplemente declara una nueva clase llamada Test. Esta clase representará una entidad "Test", que se corresponde con una tabla en una base de datos (por ejemplo, una tabla llamada Tests).

            extends Model<TestAttributes>: Significa que tu clase Test está heredando de una clase genérica Model.
                
                Model: La clase Model (provista por Sequelize) proporciona una gran cantidad de funcionalidad ya hecha para interactuar con una base de datos. 

                <TestAttributes>: Esto es un parámetro de tipo genérico. Le dice a la clase Model qué tipo de atributos (propiedades o columnas) tendrá tu modelo Test. En esencia, está definiendo la "forma" de los datos que este Model va a gestionar. 
            
            implements TestAttributes: Esto indica que tu clase Test promete cumplir con la interfaz TestAttributes.

                implements: Cuando una clase implementa una interfaz, significa que la clase debe tener todas las propiedades y métodos definidos en esa interfaz. Esto asegura que la clase Test realmente tiene los atributos que TestAttributes dice que debería tener, lo que proporciona seguridad de tipos.
        */
        
        // atributos del modelo        
            public id!: number;
            public name!: string;
        /* 
            Estas líneas declaran las propiedades de la clase Test.

            public: Este modificador de acceso significa que estas propiedades pueden ser accedidas desde cualquier lugar (dentro o fuera de la clase).

            : Denota la anotación de tipo.
                number: El tipo de la propiedad id, lo que significa que contendrá valores numéricos.
            ! (Definite Assignment Assertion / Asignación Definitiva Afirmada): Este es un operador específico de TypeScript. Le dice al compilador de TypeScript: "Confía en mí, esta propiedad tendrá un valor asignado en tiempo de ejecución, aunque no esté inicializada en el constructor". Esto es muy común en contextos de ORM porque el ORM es el que típicamente llena estas propiedades cuando obtienes un registro de la base de datos. Sin esto, TypeScript se quejaría de que la propiedad podría no estar asignado.
        */
        
        // timestamps
            public readonly updatedAt!: Date;
            public readonly createdAt!: Date;
            public readonly deletedAt!: Date;
        }

        /*
            readonly: Significa que una vez que a estas propiedades se les asigna un valor (típicamente por el ORM cuando se crea o actualiza un registro), sus valores no pueden ser cambiados directamente a través de la instancia de Test.
            
            Date: El tipo de estas propiedades, lo que significa que contendrán objetos Date.
        */

        Test.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.NUMBER,
            },
                name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
                createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
                updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
                deletedAt: {
                allowNull: true,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize: connection,
            modelName: 'Test',
        }
        );

        // associates

        export default Test;
        ```

    - Migración:

        ```ts
        // src/database/migrations/#########-test.ts

        import { DataTypes, QueryInterface, Sequelize } from "sequelize";

        /*
            import { DataTypes, QueryInterface, Sequelize } from "sequelize";: Aquí se importan los módulos necesarios de la librería sequelize.

                DataTypes: Es un objeto que contiene los tipos de datos disponibles para las columnas de la base de datos (como STRING, INTEGER, DATE, etc.).

                QueryInterface: Es una interfaz que proporciona métodos para interactuar directamente con la base de datos (por ejemplo, createTable, addColumn, removeColumn, dropTable, etc.). La obtendrás como un argumento en tus funciones up y down.

                Sequelize: Aunque también se importa, en este contexto de migración de sequelize-cli, a menudo se usa para el tipo de DataTypes pasado al up (aunque el nombre de la variable Sequelize para typeof DataTypes podría ser un poco confuso, se refiere a las propiedades estáticas de tipos de datos, no a una instancia de Sequelize).
        */

        export = {
            async up(queryInterface : QueryInterface, Sequelize : typeof DataTypes) {
                /*
                    queryInterface : QueryInterface: Este es el primer argumento. Es una instancia de QueryInterface que te permite realizar operaciones directas en el esquema de la base de datos.
                
                    Sequelize : typeof DataTypes: Este es el segundo argumento. Aquí, Sequelize se usa como un alias para DataTypes (contiene los tipos de datos que usarás para las columnas, como INTEGER, STRING, etc.). Podría usarse un alias más descriptivo, por ejemplo dataTypes, pero Sequelize es un nombre estándar que se utiliza en la comunidad de Sequelize.
                */
                await queryInterface.createTable('Tests', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    name: {
                        type: Sequelize.STRING
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                });
            },
                async down(queryInterface : QueryInterface, Sequelize : Sequelize) {
                    await queryInterface.dropTable('Tests');
            }
        };
        ````

11. Correr el script para crear la base de datos y correr las migraciones:

    ```bash
    npm run db:create
    ```
