import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'index.ts',
    'enums/index.ts',
    'entities/index.ts', 
    'routes/index.ts',
    'common/index.ts',
    'route-metadata/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  splitting: false,
  minify: false,
  treeshake: true
});