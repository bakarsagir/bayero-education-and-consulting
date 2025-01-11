import { config } from './config';
import { Agent, AgentOptions } from 'https';

export class ProxyManager {
  private static currentIndex = 0;
  private static proxyServers = config.proxy.servers;

  static getNextProxy(): Agent | undefined {
    if (!this.proxyServers.length) return undefined;

    this.currentIndex = (this.currentIndex + 1) % this.proxyServers.length;
    
    const options: AgentOptions = {
      rejectUnauthorized: false
    };

    return new Agent(options);
  }
}