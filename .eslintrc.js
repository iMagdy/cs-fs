module.exports = {
    root: true,
    plugins: [ 'react', 'jsx-control-statements', 'unicorn' ],
    extends: [ 'airbnb-base', 'plugin:react/recommended', 'plugin:jsx-control-statements/recommended', 'plugin:unicorn/recommended' ],
    env: {
        es6: true,
        browser: true,
        node: true,
        mocha: true,
        meteor: true,
        'jsx-control-statements/jsx-control-statements': true
    },
    "parserOptions": {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            globalReturn: true,
            jsx: true
        },
    },
    /**
     * Rules
     * @param {Number} 0 allow
     * @param {Number} 1 warning
     * @param {Number} 2 error
     * @type {Object}
     */
    rules: {
        'comma-dangle': [2, 'never'],
        'no-cond-assign': 2,
        'no-constant-condition': 2,
        'no-control-regex': 2,
        'no-debugger': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty': [2, { allowEmptyCatch: true }],
        'no-ex-assign': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-semi': 2,
        'no-func-assign': 2,
        'no-inner-declarations': 2,
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-obj-calls': 2,
        'no-prototype-builtins': 2,
        'no-regex-spaces': 2,
        'no-sparse-arrays': 2,
        'no-template-curly-in-string': 2,
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unsafe-negation': 2,
        'valid-typeof': [2, {requireStringLiterals: true}],
        'use-isnan': 2,
        'no-unexpected-multiline': 2,
        'dot-notation': 2,
        'eqeqeq': 2,
        'guard-for-in': 2,
        'no-alert': 2,
        'max-params': [1, { max: 4 }],
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': [2, { before: true, after: true }],
        'generator-star-spacing': [2, 'both'],
        'no-const-assign': 2,
        'no-dupe-class-members': 2,
            'no-duplicate-imports': [2, { includeExports: true }],
        'unicorn/catch-error-name': [1, {'name': 'err'}],
        // 'unicorn/explicit-length-check': 2,
        'unicorn/filename-case': 0,
        'unicorn/no-abusive-eslint-disable': 1,
        // 'unicorn/no-process-exit': 2,
        // 'unicorn/throw-new-error': 2,
        // 'unicorn/number-literal-case': 0,
        // 'unicorn/escape-case': 0,
        // 'unicorn/no-array-instanceof': 2,
        // 'unicorn/no-new-buffer': 2,
        // 'unicorn/no-hex-escape': 2,
        // 'unicorn/custom-error-definition': 2,
        'import/no-absolute-path': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/no-extraneous-dependencies': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-unused-vars': [ 2, { vars: 'all', args: 'none' } ],
        'indent': [ 2, 2 ],
        'linebreak-style': [ 2, 'unix' ],
        'quotes': [ 2, 'single' ],
        'quote-props': [ 2, 'as-needed' ],
        'array-bracket-spacing': [ 2, 'always', { objectsInArrays: false, arraysInArrays: false } ],
        'object-curly-spacing': [ 2, 'always' ],
        'semi': [ 2, 'always' ],
        'comma-style': [ 2, 'last' ],
        'no-restricted-syntax': [0, "ForOfStatement"],
        'camelcase': 2,
        'no-console': 1,
        'wrap-regex': 0,
        'vars-on-top': 0,
        'valid-jsdoc': 0,
        'no-useless-constructor': 1,
        'no-var': 2,
            'object-shorthand': [2, 'always'],
            'prefer-arrow-callback': 2,
            'prefer-const': [2, { destructuring: 'all' }],
            'prefer-numeric-literals': 2,
        // React rules:
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
        'react/no-render-return-value': 0,
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        "jsx-control-statements/jsx-choose-not-empty": 2,
        "jsx-control-statements/jsx-for-require-each": 1,
        "jsx-control-statements/jsx-for-require-of": 1,
        "jsx-control-statements/jsx-if-require-condition": 2,
        "jsx-control-statements/jsx-otherwise-once-last": 2,
        "jsx-control-statements/jsx-use-if-tag": 1,
        "jsx-control-statements/jsx-when-require-condition": 2,
        "jsx-control-statements/jsx-jcs-no-undef": 2,
        'no-undef': 0,
        complexity: 1
    }
}
