import React, {useState} from 'react';

//styles
import styles from './App.module.css'

//components
import Footer from './components/Footer';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

import { ITask } from "./interfaces/Task"


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [tasktoUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal')

    if(display){
      modal!.classList.remove('hide')
    }else{
      modal!.classList.add('hide')
    }
  }

  const editTask = (task: ITask):void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)

  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = {id, title, difficulty}

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false);
  }

  return (
    <div>
      <Modal children={<TaskForm btnText='Editar Tarefa' task={tasktoUpdate} handleUpdate={updateTask} taskList={taskList}/>}/>
      <Header/>
        <main className={styles.main}>
          <div>
            <h2>O que voce vai fazer?</h2>
            <TaskForm btnText='criar Tarefa' taskList={taskList}  setTaskList={setTaskList}/>
          </div>
          <div>
            <h2>Suas tarefas:</h2>
            <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
          </div>
        </main>
      <Footer/>
    </div>
  );
}

export default App;
