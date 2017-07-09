module.exports = {
  verbose: true,
  globals: {
    API_URL: '9999',
    ENV: 'TEST',
    window: {
      environ: 'TEST'
    },
    localStorage: {
      getItem() {
        return 'token';
      },
      setItem() {
        return 'token';
      }
    }
  }
};
