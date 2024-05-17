import React from 'react';
import TitleComponent from "./titleComponent";
import DataComponents from "./dataComponent";

interface FrameComponentProps {
    userId: number;
}

const FrameComponent = ({ userId }: FrameComponentProps) => {
    return (
        <>
            <TitleComponent />
            <DataComponents userId={userId} />
        </>
    );
}

export default FrameComponent;
