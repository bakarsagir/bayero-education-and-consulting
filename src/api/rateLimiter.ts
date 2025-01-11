import { config } from './config';

export class RateLimiter {
  private lastRequestTime: number = 0;
  private readonly delayMs: number;

  constructor() {
    this.delayMs = config.rateLimiting.crawlDelayMs;
  }

  async wait(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.delayMs) {
      await new Promise(resolve => 
        setTimeout(resolve, this.delayMs - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }
}