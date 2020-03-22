module.exports = {
  apps : [
      {
        name: "sickBot",
        script: "./index.ts",
        watch: true,
        env: {
            "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}