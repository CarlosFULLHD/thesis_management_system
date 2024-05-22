interface TitleComponentProps {
    studentName: string,
}
const TitleComponent = ( { studentName } : TitleComponentProps) => {
    return(
        <>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-6">
                Historial de Tareas de {studentName}
            </h1>
        </>
    );
}

export default TitleComponent;