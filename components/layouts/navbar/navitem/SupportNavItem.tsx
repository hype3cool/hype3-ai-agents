import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import PlainIconLinkButton from '@/components/elements/buttons/PlainIconLinkButton';

const menuItems = [
    {
        label: 'How It Works',
        link: 'https://hype3.gitbook.io/hype3/',
    },
];

export default function SupportNavItem() {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <MenuButton className={`hype3-dropdown-btn ${open ? ' text-blue-200' : 'text-white/70'}`}>Support</MenuButton>
                    <Transition
                        enter="duration-200 ease-out"
                        enterFrom="scale-95 opacity-0"
                        enterTo="scale-100 opacity-100"
                        leave="duration-300 ease-out"
                        leaveFrom="scale-100 opacity-100"
                        leaveTo="scale-95 opacity-0"
                    >
                        {/* <div className="w-[175px] h-[150px] bg-black rounded-[15px] shadow border border-white/20" /> */}
                        <MenuItems
                            anchor="bottom start"
                            className="relative origin-top transition mt-3 bg-black text-white min-w-[175px] rounded-[15px] shadow border border-white/20 z-50 pt-4 pb-7 px-7 space-y-4"
                        >
                            {menuItems.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link href={item.link} target="_blank">
                                        <h5 className="text-white/70 hover:text-blue-200 active:text-blue-200 font-semibold py-2.5">{item.label}</h5>
                                    </Link>
                                </MenuItem>
                            ))}

                            <MenuItem>
                                <div className="border-[0.5px] border-slate-400/50" />
                            </MenuItem>

                            <MenuItem>
                                <div className="-ml-2">
                                    <div className="flex flex-row space-x-2 items-center justify-start">
                                        <PlainIconLinkButton url="https://x.com/hype3trade" icon="twitter" />
                                        <PlainIconLinkButton url="https://t.me/HYPE3support" icon="telegram" />
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
