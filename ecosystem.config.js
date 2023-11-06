module.exports = {
  apps: [
    {
      name: "PM2_ss_apps_api_cron",
      script: "server_cron.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch_delay: 1000,
      watch: ["app"],
      ignore_watch: ["node_modules", "public"],
      watch_options: {
        followSymlinks: false,
      },
    },
    {
      name: "PM2_ss_apps_api",
      script: "server.js",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch_delay: 1000,
      watch: ["app"],
      ignore_watch: ["node_modules", "public"],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
