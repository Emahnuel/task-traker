import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import AboutUs from "./views/AboutUs";
import Footer from "./views/Footer";

function App() {
  const [displayAddTask, setDisplayAddTask] = useState(false);

  const server = "http://localhost:3500/tasks";

  // Alpha numeric string
  const alphaNum =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Generate unique UUID mimic
  const randomString = (length, alphaNum) => {
    var result = "";
    for (var i = length; i > 0; --i)
      result += alphaNum[Math.floor(Math.random() * alphaNum.length)];
    return result;
  };

  const [tasks, setTasks] = useState([]);

  // const [tasks, setTasks] = useState([
  //   {
  //     id: "376d6479-264f-48ce-a61c-d40b3c013f6a",
  //     title: "Doctors Appointment",
  //     day: "Feb 5th at 2:20 pm",
  //     reminder: true,
  //   },
  //   {
  //     id: "bc5bf4e4-d1f8-4d70-8dbc-53bd873d10d2",
  //     title: "Group Study at School",
  //     day: "Feb 6th at 9:00 am",
  //     reminder: false,
  //   },
  //   {
  //     id: "24bbda9e-f2c5-47f2-b7e5-875ede989beb",
  //     title: "Dinner Reservation with Funsho",
  //     day: "Feb 7th at 8:00 pm",
  //     reminder: true,
  //   },
  //   {
  //     id: "02cbe749-9d6d-4a9b-9d5d-94a21aaf88d4",
  //     title: "Project Review at the Office",
  //     day: "Feb 8th at 10:15 am",
  //     reminder: true,
  //   },
  //   {
  //     id: "3fc6d41a-5837-4331-87fb-380c68e1a7e2",
  //     title: "Soccer Practice",
  //     day: "Feb 9th at 6:30 pm",
  //     reminder: false,
  //   },
  // ]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch tasks from mock server
  const fetchTasks = async () => {
    const res = await fetch(server);
    const data = await res.json();
    return data;
  };

  // Fetch a single task
  const fetchTask = async (id) => {
    const res = await fetch(`${server}/${id}`);
    const data = await res.json();
    return data;
  };

  // Add tasks
  const addTask = async (task) => {
    const id =
      randomString(8, alphaNum) +
      "-" +
      randomString(4, alphaNum) +
      "-" +
      randomString(4, alphaNum) +
      "-" +
      randomString(12, alphaNum);
    const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch(server, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${server}/${id}`, {
      method: "DELETE",
    });
    // console.log('Delete => ', id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder task
  const toggleReminder = async (id) => {
    // console.log("Toggled => ", id);

    const taskToToggle = await fetchTask(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`${server}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task Tracker"
          onAdd={() => setDisplayAddTask(!displayAddTask)}
          toggleButtonText={displayAddTask}
        />

        {/* {displayAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    'No tasks available. Click the "Add More" button to add tasks.'
                  )} */}

        <Routes>
          <Route
            path="/"
            exact={true}
            element={
              <>
                {displayAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No tasks available. Click the "Add More" button to add tasks.'
                )}
              </>
            }
          />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Class styles for React
// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         {/* <Header /> */}

//         <h3 className="App-header">Returning a view from a class.</h3>
//       </div>
//     );
//   }
// }

export default App;
