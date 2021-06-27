import typescript from 'rollup-plugin-typescript2'

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
      typescript({ rollupCommonJSResolveHack: true })
    ],
    external: ['react', 'react-dom']
  }