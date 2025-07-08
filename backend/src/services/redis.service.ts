import { createClient, RedisClientType } from "redis";

export class RedisService {
  private client: RedisClientType;
  private DEFAULT_CACHE_EXPIRATION = 300;

  constructor() {
    const redisUrl = process.env.REDIS_URL || "redis://redis:6379";
    this.client = createClient({ url: redisUrl });

    this.client.on("error", (error) => console.log("Redis Client Error", error));
  }

  async connect(): Promise<void> {
    if (this.client.isOpen) return;

    await this.client.connect();
    console.log("Redis connected successfully");
  }

  async disconnect(): Promise<void> {
    if (!this.client.isOpen) return;

    this.client.destroy();
    console.log("Redis disconnected successfully");
  }

  /**
   * returns parsed value from redis cache. 
   * specify type, otherwise you receive the value as an unknown type. 
   */
  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  /**
   * pass in value without stringifying. 
   * centralizing stringify logic inside redis service class. 
   */
  async setEx<T>(key: string, value: T, ttl: number = this.DEFAULT_CACHE_EXPIRATION): Promise<boolean> {
    try {
      const stringifiedValue = JSON.stringify(value);
      return (await this.client.setEx(key, ttl, stringifiedValue)) === "OK";
    } catch (error) {
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      return (await this.client.del(key)) === 1;
    } catch (error) {
      return false;
    }
  }

  async expire(key: string, ttl: number = this.DEFAULT_CACHE_EXPIRATION): Promise<boolean> {
    try {
      return (await this.client.expire(key, ttl)) === 1;
    } catch (error) {
      return false;
    }
  }

  async blacklistToken(jti: string, exp: number | undefined): Promise<boolean> {
    const ttl = this.getTokenTtl(exp);

    if (!ttl) {
      return false;
    }

    try {
      await this.client.setEx(jti, ttl, "blacklisted");
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkIfTokenBlacklisted(jti: string): Promise<boolean> {
    const blacklisted = await this.client.get(jti);
    return blacklisted !== null;
  }

  /**
   * check the time-to-live of a given jwt token in seconds.
   * returns null if invalid or no expiry
   */
  private getTokenTtl(expiryTime: number | undefined): number | null {
    try {
      // if expiry is undefined, no valid ttl
      if (expiryTime === undefined) {
        return null;
      }

      const now = Math.floor(Date.now() / 1000);
      const ttl = expiryTime - now;

      // if *now* has passed the expiryTime, then there is no ttl
      return ttl > 0 ? ttl : null;
    } catch (error: unknown) {
      return null;
    }
  }
}
