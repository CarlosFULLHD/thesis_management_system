import React from 'react';
import TitleComponent from "./titleComponent";
import DataComponents from "./dataComponent";

interface FrameComponentProps {
    userId: number;
}

const FrameComponent = ({ userId }: FrameComponentProps) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <TitleComponent />
            <DataComponents userId={userId} />
        </div>
    );
}

export default FrameComponent;
