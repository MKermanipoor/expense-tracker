import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface ContentProps {
    children?: ReactNode; // Optional children prop to support any React elements
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div className='ml-48 mt-12 p-2'>
            {children}
            <Outlet />
        </div>
    );
};

export default Content;
