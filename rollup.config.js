import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import { readFileSync } from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';
import esbuild from 'rollup-plugin-esbuild';
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
    // Add UMD build
    {
      file: pkg.browser,
      format: 'umd',
      name: 'styled',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
      },
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    PeerDepsExternalPlugin(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      outputToFilesystem: true,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    esbuild({
      minify: true,
    }),
    visualizer({ open: true, filename: 'bundle-analysis.html' }),
  ],
  external: ['react', 'react-dom'],
};
