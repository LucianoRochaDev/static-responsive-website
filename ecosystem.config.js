module.exports = {
  apps: [
    {
      name: 'static-responsive-web',
      script: './server.prod.js',
      exec_mode: 'cluster',
      instances: 0,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
