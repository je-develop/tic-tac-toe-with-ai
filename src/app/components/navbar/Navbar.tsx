import Image from 'next/image'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const NavBar = () => {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className=" flex text-white  items-center">TIC TAC TOE </div>
                    <div className=" flex items-center pr-2">
                        <Menu as="div" className="relative ml-3">
                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <Image
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full"
                                    width={40}
                                    height={40}
                                />
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="/api/auth/logout" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};

export default NavBar;
