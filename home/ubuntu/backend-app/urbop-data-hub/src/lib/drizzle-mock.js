// Mock implementation of drizzle-orm for D1
const drizzleMock = {
  // Mock table creation functions
  integer: () => ({ primaryKey: () => ({}) }),
  text: () => ({}),
  boolean: () => ({}),
  real: () => ({}),
  timestamp: () => ({}),
  
  // Mock schema definition
  sqliteTable: (name, columns) => ({ name, columns }),
  
  // Mock query builder
  eq: (field, value) => ({ field, op: 'eq', value }),
  ne: (field, value) => ({ field, op: 'ne', value }),
  gt: (field, value) => ({ field, op: 'gt', value }),
  lt: (field, value) => ({ field, op: 'lt', value }),
  gte: (field, value) => ({ field, op: 'gte', value }),
  lte: (field, value) => ({ field, op: 'lte', value }),
  like: (field, value) => ({ field, op: 'like', value }),
  
  // Mock database operations
  desc: (field) => ({ field, direction: 'desc' }),
  asc: (field) => ({ field, direction: 'asc' }),
  
  // Mock query execution functions
  db: (db) => {
    return {
      select: (fields) => {
        return {
          from: (table) => {
            return {
              where: (condition) => {
                return {
                  orderBy: (orderBy) => {
                    return {
                      limit: (limit) => {
                        return {
                          all: async () => {
                            return [];
                          },
                          get: async () => {
                            return null;
                          }
                        };
                      },
                      all: async () => {
                        return [];
                      },
                      get: async () => {
                        return null;
                      }
                    };
                  },
                  all: async () => {
                    return [];
                  },
                  get: async () => {
                    return null;
                  }
                };
              },
              all: async () => {
                return [];
              },
              get: async () => {
                return null;
              }
            };
          }
        };
      },
      
      insert: function(table) {
        return {
          values: function(data) {
            return {
              returning: function() {
                return {
                  get: async function() {
                    return { id: 1, ...data };
                  }
                };
              }
            };
          }
        };
      },
      
      update: function(table) {
        return {
          set: function(data) {
            return {
              where: function(condition) {
                return {
                  returning: function() {
                    return {
                      get: async function() {
                        return { id: 1, ...data };
                      }
                    };
                  }
                };
              }
            };
          }
        };
      },
      
      delete: function(table) {
        return {
          where: function(condition) {
            return {
              returning: function() {
                return {
                  get: async function() {
                    return { id: 1 };
                  }
                };
              }
            };
          }
        };
      }
    };
  }
};

module.exports = drizzleMock;
