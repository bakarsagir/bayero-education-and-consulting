import { config } from './config';
import { HttpsProxyAgent } from 'https-proxy-agent';

export class ProxyManager {
  private static currentIndex = 0;
  private static proxyServers = config.proxy.servers;

  static getNextProxy(): HttpsProxyAgent | undefined {
    if (!this.proxyServers.length) return undefined;

    this.currentIndex = (this.currentIndex + 1) % this.proxyServers.length;
    const server = this.proxyServers[this.currentIndex];
    
    const auth = config.proxy.username && config.proxy.password
      ? `${config.proxy.username}:${config.proxy.password}@`
      : '';
    
    return new HttpsProxyAgent(`http://${auth}${server}`);
  }
}