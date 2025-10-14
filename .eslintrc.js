module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import', 'unused-imports'],
  settings: {
    // allow eslint-plugin-import to resolve TypeScript path aliases (e.g. @/*)
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        // standard group names only; custom alias ordering belongs in pathGroups
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'react-native', group: 'external', position: 'before' },
          { pattern: '@/store/**', group: 'internal', position: 'after' },
          { pattern: '@/services/**', group: 'internal', position: 'after' },
          { pattern: '@/types/**', group: 'internal', position: 'after' },
          { pattern: '@/helpers/**', group: 'internal', position: 'after' },
          { pattern: '@/utils/**', group: 'internal', position: 'after' },
          { pattern: '@/constants/**', group: 'internal', position: 'after' },
          { pattern: '@/hooks/**', group: 'internal', position: 'after' },
          { pattern: '@/screens/**', group: 'internal', position: 'after' },
          { pattern: '@/components/**', group: 'internal', position: 'after' },
        ],
        // exclude builtin react imports from being treated as internal by pathGroups
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // allow CommonJS in this config file and avoid the n/no-commonjs rule error
    'n/no-commonjs': 'off',
  },
}
