import Section from "../UI/Section";
import TaskItem from "./TaskItem";
import classes from "./Tasks.module.css";

const Tasks = (props) => {
  let taskList = (
    <h2 className={classes.emptyMessage}>No tasks found. Start adding some!</h2>
  );

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem
            id={task.id}
            key={task.id}
            isCompleted={task.isCompleted}
            taskText={task.text}
          >
            {task.text}
          </TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = (
      <>
        <p className={classes.errorMessage}>{props.error}</p>
        <button className={classes.retryButton} onClick={props.onFetch}>
          Try again
        </button>
      </>
    );
  }

  if (props.loading) {
    content = <p className={classes.loadingMessage}>Loading tasks...</p>;
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
