import { CoinCreateForm } from 'types/types';
import { BaseService } from './base.service';
const ENDPOINT = '/coin';

export class CoinService extends BaseService<CoinCreateForm> {
  constructor() {
    super(ENDPOINT);
  }

  async createCoin(data: any) { 
    const response = await this.axios.post(`${this.endpoint}/create`, data);
    return response.data;
  }

  async getCoinByMintAddress(mint: string) {
    const response = await this.axios.get(`${this.endpoint}?mint=${mint}`);
    return response.data;
  } 
}