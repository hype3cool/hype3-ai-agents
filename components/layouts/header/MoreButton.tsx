import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

const menuItems = [
    {
        label: 'How It Works',
        link: 'https://hype3.gitbook.io/hype3/',
    },
    {
        label: 'Support',
        link: 'https://t.me/HYPE3support',
    },
];

export default function MoreButton() {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <MenuButton className={`hype3-dropdown-btn ${open ? ' text-blue-200' : 'text-white/70'}`}>
                        <span className={`icon-arrow-down ${open && 'text-blue-200 rotate-180 transition-all'}`} />
                    </MenuButton>
                    <Transition
                        enter="duration-200 ease-out"
                        enterFrom="scale-95 opacity-0"
                        enterTo="scale-100 opacity-100"
                        leave="duration-300 ease-out"
                        leaveFrom="scale-100 opacity-100"
                        leaveTo="scale-95 opacity-0"
                    >
                        <MenuItems
                            anchor="bottom start"
                            className="relative origin-top transition mt-3 bg-black text-white min-w-[220px] rounded-[15px] shadow border border-white/20 z-50 pt-4 pb-7 space-y-4"
                            
                        >
                            {menuItems.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link href={item.link} target="_blank">
                                        <h5 className="text-white/70 hover:text-blue-200 active:text-blue-200 font-semibold px-7 py-2.5">{item.label}</h5>
                                    </Link>
                                </MenuItem>
                            ))}

                            <MenuItem>
                                <div className="text-white/70 active:text-blue-200 font-semibold h5 px-4">
                                    <div className="flex flex-row space-x-2 items-center">
                                        <Link type="button" href="https://x.com/hype3trade" target="_blank" className="hype3-btn-primary-ghost">
                                            <span className="icon-x-twitter"></span>
                                        </Link>

                                        <Link type="button" href="https://t.me/HYPE3support" target="_blank" className="hype3-btn-primary-ghost">
                                            <span className="icon-telegram-no-bg"></span>
                                        </Link>
                                    </div>
                                </div>
                            </MenuItem>
                        </MenuItems>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
