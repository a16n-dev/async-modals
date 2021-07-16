import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-only'
import pkg from './package.json'

// to be continued
// continued
export default {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false
      }
    ],
    plugins: [
      css({output: 'style.css'}),
      typescript({ rollupCommonJSResolveHack: true }),
      
    ],
    external: ['react', 'react-dom']
  }