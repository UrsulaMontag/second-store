module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}", './**/*.js'
            ],
            "parserOptions": {
                "sourceType": "script"
            },
            "extends": ['plugin:@typescript-eslint/disable-type-checked'],
        }
    ],
    "parser": '@typescript-eslint/parser',
    "plugins": ['@typescript-eslint'],
  "root": true,
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": true,
    "tsconfigRootDir": "second-store",
    },
    "rules": {
    }
}
