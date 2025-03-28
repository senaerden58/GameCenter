const path = require('path');

module.exports = {
  entry: './src/index.js', // Uygulamanın giriş dosyası
  output: {
    path: path.resolve(__dirname, 'dist'), // Çıktı dosyasının dizini
    filename: 'bundle.js', // Çıktı dosyasının adı
  },
  mode: 'development', // Geliştirme modu
  module: {
    rules: [
      {
        test: /\.js$/, // .js uzantılı dosyaları işle
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel kullanıyoruz
          options: {
            presets: [
              '@babel/preset-env', // ES6+ için preset
              '@babel/preset-react', // React için preset
            ],
            sourceType: 'module', // 'import' ve 'export' için module desteği
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // .js ve .jsx uzantılı dosyaları çözümle
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
  },
};
