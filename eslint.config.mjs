import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/self-closing-comp': 'warn',
      // React 19's stricter rule fires on common, intentional SSR-hydration
      // patterns (mounted flags, typewriter resets). Treat as warning.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  prettier,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
