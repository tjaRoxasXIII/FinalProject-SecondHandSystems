export default {
  server: {
    proxy: {
      "/send-email": "http://localhost:3001",
      "/search-part": "http://localhost:3001"
      }
  }
};