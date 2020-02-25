module.exports = {
  production: {
    db: {
      host: 'postgres',
      user: 'admin',
      password: 'p@ass',
      port: '5432',
      database: 'ecommerce'
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
