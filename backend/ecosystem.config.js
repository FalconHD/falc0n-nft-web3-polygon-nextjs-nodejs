module.exports = {
  apps : [{
    name: "app",
    script: "build/src/server.js",
    instances: "2",
    max_restarts: 2,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}