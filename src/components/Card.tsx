import { ReactNode } from 'react';

//basic card component (from the User Individual Assignemnt)

interface CardProps {
    className?: string;
    children: ReactNode; //Content Inside the card
}

const Card: React.FC<CardProps> = ({ className = '', children }) => {
    const classes = `"@apply shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounder-[10px]" ${className}`; //Combine card class with additional classes

    return <div className={classes}>{children}</div>;
};
export default Card;