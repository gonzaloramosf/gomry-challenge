"use client"

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVertical, X, CircleUser } from "lucide-react";
import { logoutSession } from "@/services/Users";
import { useToast } from "@/stores/ToastContext";

const NAVIGATION = [
  { name: "Account", path: "/account" },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  async function handleLogout() {
    try {
      await logoutSession();
      router.push("/");
    } catch (err) {
      toast.show({
        type: "error",
        title: "Logout failed",
        message: "Please verify your connection and try again.",
      })
      console.error(err);
    }
  }

  return (
    <Disclosure as="nav" className="w-full bg-gray-800 absolute top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5"/>
              <span className="sr-only">Open main menu</span>
              <EllipsisVertical aria-hidden="true" className="block size-6 group-data-open:hidden"/>
              <X aria-hidden="true" className="hidden size-6 group-data-open:block"/>
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                alt="Wallet app logo"
                src="/logo.png"
                height={56}
                width={56}
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <div className="flex space-x-4">
                {NAVIGATION.map((item) => {
                  const isCurrent = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      aria-current={isCurrent ? "page" : undefined}
                      className={classNames(
                        isCurrent ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium cursor-pointer",
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <CircleUser size={32} className="text-gray-400 hover:text-white cursor-pointer" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-start text-gray-700 cursor-pointer data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {NAVIGATION.map((item) => {
            const isCurrent = pathname === item.path;
            return (
              <DisclosureButton as={Link} key={item.name} href={item.path}>
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={classNames(
                    isCurrent
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                >
                  {item.name}
                </span>
              </DisclosureButton>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default NavBar;
