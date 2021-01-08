module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver", {
        extensions: [
          '.tsx',
          '.android.tsx',
          '.ios.tsx'
        ],
        root: ['.']
      }
    ]
  ]
};
