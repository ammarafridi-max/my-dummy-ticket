import { createElement } from 'react';
import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiArrowRightOnRectangle,
  HiOutlineUser,
  HiOutlineRss,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HiOutlineHome,
    accessTo: ['admin', 'agent', 'blog-manager'],
  },
  {
    name: 'Orders',
    href: '/dummy-tickets',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Insurance',
    href: '/insurance',
    icon: HiOutlineShieldCheck,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Blogs',
    href: '/blogs',
    icon: HiOutlineRss,
    accessTo: ['admin', 'blog-manager'],
  },
  {
    name: 'Affiliates',
    href: '/affiliates',
    icon: HiOutlineUserGroup,
    accessTo: ['admin'],
  },
  { name: 'Users', href: '/users', icon: HiOutlineUsers, accessTo: ['admin'] },
  {
    name: 'My Account',
    href: '/account',
    icon: HiOutlineUser,
    accessTo: ['admin', 'agent', 'blog-manager'],
  },
  {
    name: 'Log Out',
    icon: HiArrowRightOnRectangle,
    action: 'logout',
  },
];

export default function AdminNavigation() {
  const { user } = useAuth();
  const navLinks = links.filter((link) => !link.action);
  const actionLinks = links.filter((link) => link.action);

  return (
    <aside className="h-full bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 p-4 border-r border-white/10 shadow-2xl">
      <div className="h-full flex flex-col">
        <nav className="space-y-1.5">
          {navLinks.map((link) => (
            <SidebarLink
              key={link.name}
              name={link.name}
              href={link.href}
              Icon={link.icon}
              accessTo={link.accessTo}
              action={link.action}
            />
          ))}
        </nav>

        <div className="mt-auto">
          <div className="mb-2 px-1">
            <p className="text-[11px] tracking-[0.14em] uppercase text-primary-200/80">Account</p>
          </div>
          <div className="space-y-1.5">
            {actionLinks.map((link) => (
              <SidebarLink
                key={link.name}
                name={link.name}
                href={link.href}
                Icon={link.icon}
                accessTo={link.accessTo}
                action={link.action}
              />
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5">
            <p className="text-[13px] text-white mt-1 truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[11px] text-primary-100/80 mt-0.5 capitalize">
              {user?.role || 'admin'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);

  if (action === 'logout') {
    return (
      <button
        type="button"
        onClick={() => logout()}
        className="w-full flex items-center justify-between rounded-xl px-2 py-2 cursor-pointer text-primary-100 hover:text-white bg-white/0 hover:bg-white/10 border border-transparent hover:border-white/15 transition-all duration-200"
      >
        <div className="flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-lg bg-white/10 grid place-items-center">
            {createElement(Icon, { className: 'w-4 h-4' })}
          </span>
          <span className="text-[14px]">{name}</span>
        </div>
      </button>
    );
  }

  if (!accessTo?.includes(user?.role)) return null;

  return (
    <NavLink
      to={href}
      className={`group flex items-center justify-between rounded-xl px-2 py-2 border transition-all duration-200 ${
        isActive
          ? 'bg-white text-primary-900 border-white shadow-[0_8px_25px_rgba(0,0,0,0.18)]'
          : 'bg-white/0 text-primary-100 border-transparent hover:bg-white/10 hover:text-white hover:border-white/15'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`h-8 w-8 rounded-lg grid place-items-center transition-colors duration-200 ${
            isActive
              ? 'bg-primary-100 text-primary-800'
              : 'bg-white/10 text-primary-100 group-hover:bg-white/15'
          }`}
        >
          {createElement(Icon, { className: 'w-4 h-4' })}
        </span>
        <span className="text-[14px]">{name}</span>
      </div>
    </NavLink>
  );
}
