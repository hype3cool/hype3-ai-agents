import { BaseService } from './base.service';
const ENDPOINT = '/app-config';

export class AppConfigService extends BaseService<any> {
    constructor() {
        super(ENDPOINT);
    }
    
    async get(): Promise<any> {
        const response = await this.list();
        return response.data; 
    }
}
