module.exports = {
  production: {
    db: {
      host: 'postgres',
      user: 'hmwwlxiugbwpdq',
      password: '7f5e9d2479bd777e3b6fd9c9c18c7c8e36ef20d7ed24e2e8323608c3610521fe',
      port: '5432',
      database: 'd825tu54f9bjbu'
    },
    port: 3030,
    security: {
      secret: "Secr@"
    }
  },
  development: {
    db: {
      host: 'localhost',
      user: 'admin',
      password: 'p@ass',
      port: '54320',
      database: 'ecommerce'
    },
    port: 3030,
    security: {
      secret: "Secr@"
    }
  }
};
