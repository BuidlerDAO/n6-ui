import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM', // 指定 react 和 react-dom 的全局变量
      },
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM', // 指定 react 和 react-dom 的全局变量
      },
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'n6-ui',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM', // 指定 react 和 react-dom 的全局变量
      },
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    postcss({
      modules: true, // 启用 CSS 模块
      extract: true, // 单独生成 CSS 文件
      minimize: true, // 压缩 CSS
    }), // 支持 CSS Modules
    terser(), // 压缩输出
  ],
  external: ['react', 'react-dom'], // 不打包 React 和 ReactDOM
};
