/*
 * @Author: YourName
 * @Date: 2024-06-03 11:43:04
 * @LastEditTime: 2024-06-18 10:39:10
 * @LastEditors: YourName
 * @Description:
 * @FilePath: \video_community_web\src\utils\websocket.ts
 * 版权声明
 */
import { useMessageStore } from '@/stores/modules/message';
export default class Socket {
  // cb: 存储回调函数
  constructor(url: string, cb: (data: any) => void) {
    this.url = url;
    this.cb = cb;
    this.connect();
  }

  private readonly url: string = '';
  private cb?: (data: any) => void;
  // 和服务端连接的socket对象
  private ws?: WebSocket;
  private remainPayload: any[] = [];

  public connect() {
    return new Promise<void>((resolve) => {
      const ws = new WebSocket(this.url);

      ws.onopen = (e) => {
        console.info('ws open 连接成功', e);
        this.remainPayload.forEach((payload) => {
          ws.send(payload);
        });
        resolve();
      };

      // 得到服务端发送过来的数据
      ws.onmessage = (e) => {
        if (this.cb) {
          this.cb(e.data);
          const useMessage = useMessageStore();
          useMessage.handleWsMessage(e.data);
        }
      };

      ws.onerror = (e) => {
        console.error('ws error', e);
      };

      ws.onclose = (e) => {
        console.info('ws close', e);
      };
      this.ws = ws;
    });
  }

  public async send(payload: any) {
    if (!payload || !this.ws) {
      if (!this.ws) {
        this.remainPayload.push(JSON.stringify(payload));
      }
      return;
    }
    if (this.isConnected) {
      this.ws.send(JSON.stringify(payload));
    } else {
      // 后端主动断开 前端发起请求 需要在连接一次
      await this.connect();
      this.ws.send(JSON.stringify(payload));
    }
  }

  private get isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  public close() {
    if (this.ws) {
      this.ws.close();
      this.ws = undefined;
    }
  }
}
