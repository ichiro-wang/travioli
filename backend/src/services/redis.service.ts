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

  async set(key: string, value: any, ttl: number = this.DEFAULT_EXPIRATION): Promise<void> {
    await this.client.setEx(key, ttl, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async blackListToken(jti: string, ttl: number): Promise<void> {
    await this.client.setEx(jti, ttl, "");
  }

  async checkIfTokenBlacklisted(jti: string): Promise<boolean> {
    const blacklisted = await this.client.get(jti);
    return blacklisted !== null ? true : false;
  }
}
