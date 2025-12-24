const { defineConfig, loadEnv } = require("@medusajs/framework/utils")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    },
  },
  admin: {
    backendUrl: process.env.BACKEND_URL,
  },
  // ✅ CONFIGURAZIONE REDIS - QUESTA È LA PARTE NUOVA!
  modules: [
    {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
        // Disabilita TLS se necessario
        ttl: 30,
      },
    },
    {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },
  ],
})
