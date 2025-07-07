import { createClient, RedisClientType } from "redis";

export class RedisService {
  private client: RedisClientType;
  private DEFAULT_EXPIRATION = 300;

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

    await this.client.destroy();
    console.log("Redis disconnected successfully");
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: any, ttl: number = this.DEFAULT_EXPIRATION): Promise<"OK" | null> {
    try {
      return await this.client.setEx(key, ttl, value);
    } catch (error) {
      return null;
    }
  }

  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      return 0;
    }
  }

  async blacklistToken(jti: string, exp: number | undefined): Promise<{ blacklistStatus: "success" | "fail" }> {
    const ttl = this.getTokenTtl(exp);

    if (!ttl) {
      return { blacklistStatus: "fail" };
    }

    try {
      await this.client.setEx(jti, ttl, "blacklisted");
      return { blacklistStatus: "success" };
    } catch (error) {
      return { blacklistStatus: "fail" };
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
