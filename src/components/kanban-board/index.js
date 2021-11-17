import React, { useState, useEffect } from "react";
import "./index.css";

export default function KanbanBoard (props) {
  // constructor(props) {
  //   super(props);
  //   // Each task is uniquely identified by its name. 
  //   // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
  //   this.state = {
  //       tasks: this.props.tasks
  //   };
  //   this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  // }

  const [tasks, setTasks] = useState(props.tasks);
  const [stagesTasks, setStagesTasks] = useState([]);
  const stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];

  useEffect(() => {
    updateStages()
  }, [])

  const updateStages = () => {
    let auxStagesTasks = [];
    for (let i = 0; i < stagesNames.length; ++i) {
      auxStagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      auxStagesTasks[stageId].push(task);
    }

    setStagesTasks(auxStagesTasks)
  }

  const handleMoveTaskButton = (task, direction) => {
    let auxTasks = tasks;
    const taskIndex = auxTasks.indexOf(task)
    auxTasks[taskIndex].stage += direction;
    setTasks(auxTasks);
    updateStages()
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
              return (
                  <div className="card outlined ml-20 mt-0" key={`${i}`}>
                      <div className="card-text">
                          <h4>{stagesNames[i]}</h4>
                          <ul className="styled mt-50" data-testid={`stage-${i}`}>
                              {tasks.map((task, index) => {
                                  return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                    <div className="li-content layout-row justify-content-between align-items-center">
                                      <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                      <div className="icons">
                                        <button
                                          className="icon-only x-small mx-2"
                                          data-testid={`${task.name.split(' ').join('-')}-back`}
                                          disabled={task.stage <= 0}
                                          onClick={()=> handleMoveTaskButton(task, -1)}
                                        >
                                          <i className="material-icons">arrow_back</i>
                                        </button>
                                        <button
                                          className="icon-only x-small mx-2"
                                          data-testid={`${task.name.split(' ').join('-')}-forward`}
                                          disabled={task.stage >= 3}
                                          onClick={()=> handleMoveTaskButton(task, 1)}
                                        >
                                          <i className="material-icons">arrow_forward</i>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                              })}
                          </ul>
                      </div>
                  </div>
              )
          })}
      </div>
    </div>
  );
}