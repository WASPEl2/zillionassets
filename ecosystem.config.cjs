module.exports = {
  apps: [
    {
      name: "Zillionassets",
      script: "serve",
      watch: true,
      env: {
        PM2_SERVE_PATH: "./dist",
        PM2_SERVE_PORT: 5173,
        PM2_SERVE_SPA: "true",
        NODE_ENV: "production",
        NODE_ENV: "development",
        PORT: 5173,
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "127.0.0.1",
      ref: "origin/main",
      repo: "git@github.com:WASPEl2/zillionassets.git",
      path: "./",
      "pre-deploy-local": 'echo "Running pre-deploy tasks..."',
      "post-deploy":
        "yarn install && yarn build && pm2 startOrRestart ecosystem.config.cjs --env production",
    },
  },
};
