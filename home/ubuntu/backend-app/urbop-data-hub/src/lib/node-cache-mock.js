// Mock implementation of node-cache
export class NodeCache {
  constructor(options = {}) {
    this.cache = new Map();
    this.options = {
      stdTTL: 0,
      checkperiod: 600,
      ...options
    };
  }

  set(key, value, ttl = this.options.stdTTL) {
    console.log(`Setting cache key: ${key} with TTL: ${ttl}`);
    this.cache.set(key, {
      value,
      expires: ttl > 0 ? Date.now() + (ttl * 1000) : 0
    });
    return true;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return undefined;
    
    if (item.expires > 0 && item.expires < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    
    return item.value;
  }

  del(key) {
    return this.cache.delete(key);
  }

  flush() {
    this.cache.clear();
    return true;
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  getStats() {
    return {
      keys: this.cache.size,
      hits: 0,
      misses: 0,
      ksize: 0,
      vsize: 0
    };
  }
}

export default NodeCache;
