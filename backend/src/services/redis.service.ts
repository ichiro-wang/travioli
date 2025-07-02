import { createClient, RedisClientType } from "redis";

export class RedisService {
  private client: RedisClientType;
  private DEFAULT_EXPIRATION = 300;

  constructor() {
    const redisUrl = process.env.REDIS_URL || "redis://redis:6379";
    this.client = createClient({ url: redisUrl });

    this.client.on("error", (error) => console.log("Redis Client Error", error));
  }

  async connect() {
    if (this.client.isOpen) return;

    await this.client.connect();
    console.log("Redis connected successfully");
  }

  async disconnect() {
    if (!this.client.isOpen) return;

    await this.client.destroy();
    console.log("Redis disconnected successfully");
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, ttl: number = this.DEFAULT_EXPIRATION, value: any): Promise<void> {
    this.client.setEx(key, ttl, value);
  }

  async del(key: string) {
    this.client.del(key);
  }
}
