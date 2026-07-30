export default {
  server: {
    proxy: {
      "/send-email": "http://localhost:3001"
      }
  }
};