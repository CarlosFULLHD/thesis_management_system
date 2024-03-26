import React, {useState, FormEvent} from "react";

type Props = {
    showModal: boolean;
    className?: string;
    closeModal: () => void;
    children: React.ReactNode;

};

export default function acceptStudentModal( props: Props ) {
/*    const [observarions, setObservations] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/acceptStudentEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ observarions }),
        });

        const data = await response.json();
        console.log(data);
    }*/

    return props.showModal ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-black w-full p-4 max-w- overflow-hidden rounded-lg shadow-lg border-[1px] max-w-lg">
                {props.children}
            </div>
        </div>
    ) : null ;
}
