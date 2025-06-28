import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sin importarlos
    environment: 'node',
    coverage: {
      provider: 'v8', // o 'istanbul'
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/app.ts', 'src/config/*', 'src/routes/*','src/interfaces/**/*.ts','src/data/**'] // Excluir archivos que no requieren cobertura de tests unitarios
    },
    setupFiles: ['./src/database/setup.ts'], // Archivo para configuración global de tests
  },
});