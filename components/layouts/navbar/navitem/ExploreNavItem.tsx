import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

const menuItems = [
    {
        label: 'Agents + Tokens',
        link: '#',
    },
    {
        label: 'Creators',
        link: '#',
    },
];

export default function ExploreNavItem() {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <MenuButton className={`hype3-dropdown-btn ${open ? ' text-blue-200' : 'text-white/70'}`}>
                        Explore
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
                            className="relative origin-top transition mt-3 bg-black text-white min-w-[175px] rounded-[15px] shadow border border-white/20 z-50 pt-4 pb-7 px-7 space-y-4"
                        >
                            {menuItems.map((item, index) => (
                                <MenuItem key={index}>
                                    <Link href={item.link} target="_blank">
                                        <h5 className="text-white/70 hover:text-blue-200 active:text-blue-200 font-semibold  py-2.5">{item.label}</h5>
                                    </Link>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
