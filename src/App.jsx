import "./App.css"

import { useState, useEffect } from "react"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts"

import {
  FaChartPie,
  FaBriefcase,
  FaFolder,
  FaChartLine,
  FaCalendar,
  FaCog
} from "react-icons/fa"

import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import "axios"

import profileImg from "./assets/myphoto.jpg.jpeg";

function App() {

  const data = [

    {
      name: "Applied",
      value: 60
    },

    {
      name: "Shortlisted",
      value: 25
    },

    {
      name: "Rejected",
      value: 15
    }

  ]

  const COLORS = [
    "#8b5cf6",
    "#22c55e",
    "#ef4444"
  ]

  const [job, setJob] = useState("")

  const [search, setSearch] = useState("")

  const [editIndex, setEditIndex] = useState(null)

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "dark";
         });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
});
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [date, setDate] = useState(new Date())

  const [apiJobs, setApiJobs] = useState([])

  const [jobs, setJobs] = useState(() => {

    const savedJobs = localStorage.getItem("jobs")

    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          "Frontend Developer",
          "UI/UX Designer"
        ]

  })

  const fetchJobs = async () => {

    const latestJobs = [

      {
        title:"Frontend Developer at Google"
      },

      {
        title:"React Developer at Microsoft"
      },

      {
        title:"UI Designer at Amazon"
      },

      {
        title:"Software Engineer at Infosys"
      },

      {
        title:"Web Developer at TCS"
      }

    ]

    setApiJobs(latestJobs)

  }

  useEffect(() => {

    localStorage.setItem(
      "jobs",
      JSON.stringify(jobs)
    )

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs()

  }, [jobs])

  const addJob = () => {

    if(job !== ""){

      if(editIndex !== null){

        const updatedJobs = [...jobs]

        updatedJobs[editIndex] = job

        setJobs(updatedJobs)

        setEditIndex(null)

      }

      else{

        setJobs([...jobs, job])

      }

      setJob("")

    }

  }

  const editJob = (index) => {

    setJob(jobs[index])

    setEditIndex(index)

  }

  const deleteJob = (id) => {

    const updatedJobs = jobs.filter(
      (item,index) => index !== id
    )

    setJobs(updatedJobs)

  }

  if(!isLoggedIn){

    return(

      <div className="login-page">

        <div className="login-box">

          <h1>Career Dashboard</h1>

          <p>Login to Continue</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
  onClick={() => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }

    if (password.length < 4) {
      alert("Password too short");
      return;
    }

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  }}
>
  Login
</button>

        </div>

      </div>

    )

  }

  return (

    <div className={theme}>

      <nav className="navbar">

        <h2>Career Dashboard</h2>

        <ul>

          <li>Home</li>

          <li>Jobs</li>

          <li
            onClick={() => {
  setIsLoggedIn(false);
  localStorage.removeItem("isLoggedIn");
}}
          >
            Logout
          </li>

        </ul>

      </nav>

      <div className="main-layout">

        <div className="sidebar">

          <h2 className="logo">
            Career Admin
          </h2>

          <div className="menu">

            <p>
              <FaChartPie />
              Dashboard
            </p>

            <p>
              <FaBriefcase />
              Jobs
            </p>

            <p>
              <FaFolder />
              Applications
            </p>

            <p>
              <FaChartLine />
              Analytics
            </p>

            <p>
              <FaCalendar />
              Calendar
            </p>

            <p>
              <FaCog />
              Settings
            </p>

          </div>

          <div className="theme-section">

            <h3>Themes</h3>

            <div className="theme-buttons">

              <button
                onClick={() => {
                  setTheme("dark");
                   localStorage.setItem("theme", "dark");
                }}
              >
                Dark
              </button>

              <button
                onClick={() => {
                 setTheme("light");
                  localStorage.setItem("theme", "light");
                }}
              >
                Light
              </button>

              <button
                onClick={() => {
                 setTheme("blue");
                  localStorage.setItem("theme", "blue");
                }}
              >
                Blue
              </button>

              <button
                onClick={() => {
                 setTheme("purple");
                  localStorage.setItem("theme", "purple");
                }}
              >
                Purple
              </button>

            </div>

          </div>

        </div>

        <div className="container">

          <h1>Career Dashboard</h1>

          <p>Frontend Developer Project</p>

          <div className="top-section">

            <div className="welcome-box">

              <h2>
                Welcome Back, Priya 👋
              </h2>

              <p>
                You applied for 12 new jobs today.
              </p>

            </div>

            <div className="notification-box">

              <h3>Notifications</h3>

              <div className="notification-item">

                <p>
                  Google shortlisted your profile
                </p>

              </div>

              <div className="notification-item">

                <p>
                  Microsoft interview tomorrow
                </p>

              </div>

              <div className="notification-item">

                <p>
                  New frontend jobs available
                </p>

              </div>

            </div>

          </div>

          <div className="cards">

            <div className="card">

              <h3>Applications</h3>

              <h1>132K</h1>

              <p>↑ 24.5% this month</p>

            </div>

            <div className="card">

              <h3>Shortlisted</h3>

              <h1>10.9K</h1>

              <p>↑ 18.2% this month</p>

            </div>

            <div className="card">

              <h3>On Hold</h3>

              <h1>03.1K</h1>

              <p>↓ 5.6% this month</p>

            </div>

            <div className="card">

              <h3>Interviews</h3>

              <h1>1.2K</h1>

              <p>↑ 12.7% this month</p>

            </div>

          </div>

          <div className="dashboard-grid">

            <div className="chart-box">

              <h2>
                Applications Overview
              </h2>

              <p>
                Monthly Analytics
              </p>

              <PieChart
                width={400}
                height={300}
              >

                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {

                    data.map(
                      (entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </div>

            <div className="stats-panel">

              <div className="profile-card">

                <img
                  src={profileImg}
                  alt="profile"
                />

                <h3>Priya Kumari</h3>

                <p>
                  Frontend Developer
                </p>

                <span>
                  Active Now
                </span>

              </div>

              <h2>Total Applications</h2>

              <div className="progress-item">

                <p>Applications</p>

                <span>50%</span>

              </div>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

              <div className="progress-item">

                <p>Shortlisted</p>

                <span>22%</span>

              </div>

              <div className="progress-bar">

                <div className="progress-fill second"></div>

              </div>

              <div className="progress-item">

                <p>Rejected</p>

                <span>10%</span>

              </div>

              <div className="progress-bar">

                <div className="progress-fill third"></div>

              </div>

            </div>

          </div>

          <div className="extra-grid">

            <div className="calendar-box">

              <h2>
                Interview Calendar
              </h2>

              <Calendar
                onChange={setDate}
                value={date}
                view="month"

                formatShortWeekday={
                  (locale, date) =>

                  date.toLocaleDateString(
                    "en-US",
                    {
                      weekday:"short"
                    }
                  )
                }

                formatMonthYear={
                  (locale, date) =>

                  date.toLocaleDateString(
                    "en-US",
                    {
                      month:"long",
                      year:"numeric"
                    }
                  )
                }

              />

            </div>

            <div className="api-box">

              <h2>
                Latest Job Updates
              </h2>

              {

                apiJobs.map(
                  (item,index) => (

                  <div
                    className="api-job"
                    key={index}
                  >

                    <h3>
                      {item.title}
                    </h3>

                  </div>

                ))

              }

            </div>

          </div>

          <div className="jobs-section">

            <h2>
              Recent Applications
            </h2>

            <input
              type="text"
              placeholder="Search Jobs"
              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Enter Job Role"
              value={job}

              onChange={(e) =>
                setJob(
                  e.target.value
                )
              }
            />

            <button
              onClick={addJob}
            >

              {

                editIndex !== null

                ? "Update Job"

                : "Add New Job"

              }

            </button>

            {

              jobs

              .filter((item) =>

                item
                .toLowerCase()

                .includes(
                  search.toLowerCase()
                )

              )

              .map((item,index) => (

                <div
                  className="job-card"
                  key={index}
                >

                  <h3>
                    {item}
                  </h3>

                  <p>
                    Company: Google
                  </p>

                  <p>
                    Status: Applied
                  </p>

                  <button
                    onClick={() =>
                      editJob(index)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteJob(index)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))

            }

          </div>

        </div>

      </div>

    </div>

  )

}

export default App