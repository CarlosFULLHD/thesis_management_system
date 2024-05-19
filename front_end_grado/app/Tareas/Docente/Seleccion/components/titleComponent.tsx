interface TitleComponentProps {
    studentName: string,
    gradeTitle: string,
}

const TitleComponent = ( { studentName, gradeTitle } : TitleComponentProps) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                <div className="px-6 py-8">
                    <div className="font-bold text-xl mb-4 text-gray-800">Estudiante</div>
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11h-3v3h-2v-3H5v-2h5V5h2v4h3v2z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">Estudiante: </span>
                        <span className="text-gray-900 ml-2">{ studentName }</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm5 11h-3v3h-2v-3H5v-2h5V5h2v4h3v2z" />
                            </svg>
                        </div>
                        <span className="text-gray-700">Título proyecto: </span>
                        <span className="text-gray-900 ml-2">{gradeTitle }</span>
                    </div>
                </div>
            </div>
        </>

    );

}

export default TitleComponent;