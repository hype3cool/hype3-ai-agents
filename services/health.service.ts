import { BaseService } from './base.service';
const ENDPOINT = '/health';

export class HealthService extends BaseService<any> {
    constructor() {
        super(ENDPOINT);
    }

    async getVersion() {
        const response = await this.axios.get(`${this.endpoint}/version`);
        return response.data;
    }

    async getSolanaMarketData() {
        const response = await this.axios.get(`${this.endpoint}/solana`);
        return response.data;
    }
}
