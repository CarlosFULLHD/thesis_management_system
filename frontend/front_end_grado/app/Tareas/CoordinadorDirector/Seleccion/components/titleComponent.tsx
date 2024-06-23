interface TitleComponentProps {
  studentName: string;
}
const TitleComponent = ({ studentName }: TitleComponentProps) => {
  return (
    <>
      <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
        Historial de Tareas de {studentName}
      </h1>
    </>
  );
};

export default TitleComponent;
