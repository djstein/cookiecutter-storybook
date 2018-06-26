import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import css from 'rollup-plugin-css-only'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  external: [
    'react',
    'styled-components',
    'react-dom',
    'react-dates',
    'react-router-dom'
  ],
  output: {
    format: 'es',
    name: '{{cookiecutter.project_slug}}',
    globals: {
      react: 'React',
      'styled-components': 'styled',
      'react-dom': 'react-dom',
      'react-dates': 'react-dates',
      'react-router-dom': 'react-router-dom'
    }
  },
  plugins: [
    css({ output: '{{cookiecutter.project_slug}}.css' }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers', 'babel-plugin-styled-components']
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
