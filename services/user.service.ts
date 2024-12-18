import { User } from 'types/types';
import { BaseService } from './base.service';
const ENDPOINT = '/user';

export class UserService extends BaseService<User> {
    constructor() {
        super(ENDPOINT);
    }

    async getProfile(userIdOrUsername: string) {
        const response = await this.axios.get(`${this.endpoint}/getProfile/${userIdOrUsername}`);
        return response.data;
    }

    async getRTCToken(roomName: string) {
        const response = await this.axios.post(`${this.endpoint}/agora_rtc_token/`, { channelName: roomName });
        return response.data;
    }

    async findByTwitterUsername(text: string) {         
        const response = await this.list({ fields: 'walletAddresses,twitter', twitterName: text });
        return response.data;
    }
}
