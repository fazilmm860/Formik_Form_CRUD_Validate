import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const validate = (values) => {
    const errors = {};

    if (!values.title.trim()) {
      errors.title = 'Title is required';
    }

    return errors;
  };

  const handleAddTask = (values, { resetForm }) => {
    setTasks([...tasks, values]);
    resetForm();
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
  };

  const handleUpdateTask = (index, values) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = values;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-md">
      <h1 className="text-2xl mb-4">Task List</h1>
      <Formik
        initialValues={{ title: '', description: '' }}
        validate={validate}
        onSubmit={editingTask !== null ? (values) => handleUpdateTask(editingTask, values) : handleAddTask}
      >
        <Form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <Field type="text" id="title" name="title" className="mt-1 p-2 w-full border rounded-md" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <Field type="text" id="description" name="description" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">{editingTask !== null ? 'Update Task' : 'Add Task'}</button>
          </div>
        </Form>
      </Formik>
      <ul className="mt-4 space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="border p-4 rounded flex justify-between items-center">
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleEditTask(index)}
                className="bg-blue-500 text-white py-1 px-2 p-3 rounded hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>

            </div>
            <div>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-700 text-black py-1 px-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default App;
