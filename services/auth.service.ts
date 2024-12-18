import { User } from 'types/types';
import { BaseService } from './base.service';
const ENDPOINT = '/user';

export class AuthService extends BaseService<User> {
    constructor() {
        super(ENDPOINT);
    }

    async getMe() {
        const response = await this.axios.get(`/me`);
        return response.data;
    }

    async removeTwitter(id: string) {
        const response = await this.axios.delete(`${this.endpoint}/${id}/twitter`);
        return response.data;
    }

    async signup() {
        const response = await this.axios.post(`/auth/signup/privy`);
        return response.data;
    }

    async skipTwitterNotification(id: string) {
        const response = await this.axios.put(`${this.endpoint}/${id}/skip-twitter-notification`);
        return response.data;
    }
}
