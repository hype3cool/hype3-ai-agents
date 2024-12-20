import { useAuth } from '@/components/auth/AuthProvider';
import { PAGE_LINKS } from '@/constants/constants';
import { usePrivy } from '@privy-io/react-auth';

export const useCreateAgentClick = () => {
    const { ready, authenticated } = usePrivy();
    const { login } = useAuth();

    const handleClick = async () => {
        if (ready && !authenticated) {
            await login();
            return;
        }

        window.location.href = PAGE_LINKS['TOKEN_CREATE'];
    };

    return handleClick;
};