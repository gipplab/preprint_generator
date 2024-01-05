// Card.tsx

import React, { ReactNode } from 'react';
import './Card.css';

type CardProps = {
    title: string;
    children: ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Card;
