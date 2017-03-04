module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "standard",
        "standard-react"
    ],
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
        "react-native"
    ],
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "key-spacing"          : 0,
        "jsx-quotes"           : [2, "prefer-single"],
        "max-len"              : [2, 120, 2],
        "object-curly-spacing" : [2, "always"]
    },
    "globals": {
        "__DEV__"      : false,
        "__TEST__"     : false,
        "__PROD__"     : false,
        "__COVERAGE__" : false
    }
};