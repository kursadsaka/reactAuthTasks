import useFirebaseRealtime from "../../hooks/use-firebase-realtime";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const {
    isLoading,
    error,
    sendRequest: sendTaskRequest,
  } = useFirebaseRealtime();

  const enterTaskHandler = (taskText) => {
    const createTask = (taskData) => {
      const generatedId = taskData.key; // firebase-specific => "key" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    sendTaskRequest(
      {
        endpoint: "userTasks/",
        method: "push",
        body: { text: taskText },
      },
      createTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
