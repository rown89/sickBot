module.exports = {
  apps : [
      {
        name: "sickBot",
        script: "./index.ts",
        watch: true,
        watch_delay: 1000,
        ignore_watch : ["backend/charts/images"],
        watch_options: {
          "followSymlinks": false
        }
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}
