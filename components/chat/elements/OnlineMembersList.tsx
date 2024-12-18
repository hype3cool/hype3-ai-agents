import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { dispatch } from '@/store';
import { openSidePanel } from '@/store/slices/menu';
import { User } from '@/types/types';

export default function OnlineMembersList(users: User[]) {
    const handleOpenUserProfile = (user: any) => {
        dispatch(openSidePanel({ type: 'profile', data: user }));
    };

    return (
        <Menu as="div" className="relative">
            <MenuButton className="flex flex-col items-center w-full">
                <span className="icon-users text-blue-200" />
                <h6 className="text-blue-200 font-semibold">{users.length} online</h6>
            </MenuButton>
            <Transition
                enter="duration-200 ease-out"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="duration-300 ease-out"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
            >
                <MenuItems anchor="right end" className="relative origin-top transition bg-black text-white min-w-[220px] rounded-[15px] shadow border border-white/20 z-50 py-3 space-y-4">
                    <MenuItem>
                        <div className="flex items-center justify-between px-4.5 ">
                            <h5 className="text-white font-semibold">Online ({users.length})</h5>

                            <button className="text-gray-500 hover:text-gray-700" onClick={() => {}}>
                                <span className="icon-close2 text-white text-[10px]" />
                            </button>
                        </div>
                    </MenuItem>

                    <div className="h-[215px] max-h-[215px] overflow-y-auto space-y-4">
                        {users.map((user, index) => (
                            <MenuItem key={index}>
                                <button key={index} className="flex items-center px-4.5 gap-x-1" onClick={() => handleOpenUserProfile(user)}>
                                    <img src={user?.image || '/assets/images/frog-avatar.png'} alt="img" className="h-5 w-5 rounded-full border border-black object-cover mr-1" />
                                    <h6 className="text-white font-semibold">{user?.username}</h6>
                                </button>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}
