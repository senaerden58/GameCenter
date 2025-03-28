module.exports = {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // JSX veya TSX dosyalarını Babel ile dönüştür
    },
    testEnvironment: 'jsdom', // Jest'in tarayıcı ortamını simüle etmesi için
  };
  