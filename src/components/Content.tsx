import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface ContentProps {
    children?: ReactNode; // Optional children prop to support any React elements
}

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <div style={styles.content}>
            {children}
            <Outlet />
        </div>
    );
};

const styles = {
    content: {
        marginLeft: '220px', // Offset for the sidebar
        padding: '20px',
        height: '100vh',
    },
};

export default Content;
