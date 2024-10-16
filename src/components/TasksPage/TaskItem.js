import React from "react";
import useFirebaseRealtime from "../../hooks/use-firebase-realtime";
import classes from "./TaskItem.module.css";

const TaskItem = (props) => {
  const {
    isLoading,
    error,
    sendRequest: sendDeleteTaskRequest,
  } = useFirebaseRealtime();
  const {
    isLoadingCheck,
    errorCheck,
    sendRequest: sendCheckTaskRequest,
  } = useFirebaseRealtime();

  const deleteTaskHandler = (key) => {
    sendDeleteTaskRequest({
      endpoint: "userTasks/",
      method: "remove",
      key,
    });
  };

  const checkboxHandler = (isCompleted, key) => {
    sendCheckTaskRequest({
      endpoint: "userTasks/",
      method: "update",
      body: { text: props.taskText, isCompleted: isCompleted },
      key,
    });
  };

  return (
    <li className={classes.task}>
      {error && <p className={classes.error}>{error}</p>}
      {errorCheck && <p className={classes.error}>{errorCheck}</p>}
      <div className={classes.taskContent}>
        <label className={classes.checkboxContainer}>
          <input
            type="checkbox"
            checked={props.isCompleted}
            onChange={(event) =>
              checkboxHandler(event.target.checked, props.id)
            }
            disabled={isLoadingCheck}
          />
          <span className={classes.checkmark}></span>
        </label>
        <span
          className={`${classes.taskText} ${
            props.isCompleted ? classes.completed : ""
          }`}
        >
          {props.children}
        </span>
      </div>
      <button
        className={classes.deleteButton}
        onClick={() => deleteTaskHandler(props.id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className={classes.loader}></span>
        ) : (
          <span className={classes.deleteIcon}>&times;</span>
        )}
      </button>
    </li>
  );
};

export default TaskItem;
