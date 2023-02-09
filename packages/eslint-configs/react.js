/* eslint-disable no-undef */
module.exports = {
  extends: ['plugin:react-hooks/recommended'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-fragments': ['warn', 'element'],
    'react-hooks/rules-of-hooks': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
