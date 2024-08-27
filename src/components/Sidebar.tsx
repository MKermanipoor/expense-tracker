import React, { act, useState } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { CiBoxList, CiSettings } from "react-icons/ci";
import { Label } from './ui/label';

interface SidebarItem {
  title: string,
  path: string,
  icon: IconType,
}

const items: SidebarItem[] = [
  {
    title: "Expenses",
    path: "/",
    icon: CiBoxList,
  },
  {
    title: "Setting",
    path: "/setting",
    icon: CiSettings,
  }
]

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>(items[0].title);

  return (
    <div className='fixed top-0 left-0 h-screen w-48 bg-blue-400 z-10'>
      <Label className='w-full text-center text-xl font-bold h-12 flex items-center justify-center'>Expense Traker</Label>
      <nav>
        <ul className='list-none'>
          {items.map((item: SidebarItem) => (
            <li className={'text-lg mb-0.5 ' + (activeItem === item.title ? 'bg-blue-500' : 'hover:bg-blue-500')}>
              <Link to={item.path} className='p-3 w-full flex items-center' onClick={() => setActiveItem(item.title)}>
                <item.icon className='mr-2' />{item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};




export default Sidebar;
