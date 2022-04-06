module.exports = {
    "plugins": [
        "eslint-comments"
    ],
    "extends": [
        "plugin:eslint-comments/recommended"
    ],
    "rules": {
        "eslint-comments/no-unused-disable": "error",
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                "alphabetize": {
                    "order": "asc"
                }
            }
        ],
        "sort-imports": [
            "error",
            {
                "ignoreDeclarationSort": true,
                "ignoreCase": true
            }
        ]
    }
}