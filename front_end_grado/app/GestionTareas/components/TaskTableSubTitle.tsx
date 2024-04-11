type TaskTableSubtitleProps = {
    text: string;
}
const TaskTableSubtitle = ({text} : TaskTableSubtitleProps) => (
    <h2 className="text-center text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
      {text}
    </h2>
  );
  
  export default TaskTableSubtitle;