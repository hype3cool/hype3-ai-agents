// import { CoinCreateForm } from 'types/types';
import { BaseService } from './base.service';
const ENDPOINT = '/transaction';

export class TransactionService extends BaseService<any> {
  constructor() {
    super(ENDPOINT);
  }

  async create(data: any) { 
    const response = await this.axios.post(`${this.endpoint}`, data);
    return response.data;
  }

  async presaleList(address: string) {
    const response = await this.axios.get(`${this.endpoint}/${address}/presale`);
    return response.data;
  }

  async checkPresalePaid(address: string) {
    const response = await this.axios.get(`${this.endpoint}/${address}/checkPresalePaid`);
    return response.data;
  }
}