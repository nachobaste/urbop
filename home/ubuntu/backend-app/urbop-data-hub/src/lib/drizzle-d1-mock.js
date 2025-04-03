// Mock implementation for drizzle-orm/d1
const drizzleD1Mock = {
  // Mock database connection
  drizzle: (db) => {
    return {
      // Mock query execution
      query: {
        execute: async (sql, params) => {
          return { results: [] };
        }
      },
      
      // Mock table operations
      select: () => ({
        from: () => ({
          where: () => ({
            all: async () => [],
            get: async () => null
          }),
          all: async () => [],
          get: async () => null
        })
      }),
      
      insert: (table) => ({
        values: (data) => ({
          returning: () => ({
            get: async () => ({ id: 1, ...data })
          })
        })
      }),
      
      update: (table) => ({
        set: (data) => ({
          where: () => ({
            returning: () => ({
              get: async () => ({ id: 1, ...data })
            })
          })
        })
      }),
      
      delete: (table) => ({
        where: () => ({
          returning: () => ({
            get: async () => ({ id: 1 })
          })
        })
      })
    };
  }
};

module.exports = drizzleD1Mock;
