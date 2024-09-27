import { useEffect, useState, useref } from "react";
import axios from "axios";
import "./DashBoard.css";
import { Line } from "react-chartjs-2";
import { useUserContext } from "../context/UserContext.jsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [data, setData] = useState();
  const [newExercise, setNewExercise] = useState("");
  const [allExerciseData, SetAllExerciseData] = useState();
  const [prevAllData, SetPrevAllData] = useState();
  const [countDiv, setCountDiv] = useState(false);
  const [lastSevenDates, setlastSevenDates] = useState([]);
  const [lastEightExerciseName, setLastEightExerciseName] = useState("");
  const [lastEightCounts, setLastSevenCounts] = useState([]);
  const [growth, setGrowth] = useState();
  const [count, setCount] = useState([])

  const URL = "http://localhost:1111";

  const date = new Date();
  const day = date.getDate();

  const month = date.getMonth() + 1;
  console.log(month);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = months[date.getMonth()];
  const prevMonthName = months[date.getMonth() - 1];

  const year = date.getFullYear();
  const perfectDate = monthName + " " + day + "," + year;

  const { user, setUser } = useUserContext();
  console.log(user);

  let id = user._id;

  useEffect(() => {
    const fetchBluePrintOfExercices = async () => {
      try {
        console.log(id);
        console.log(user._id);

        const response = await axios.get(
          `${URL}/exercise/getBlue/` + user._id,
          { withCredentials: true }
        );
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBluePrintOfExercices();
  }, []);

  const handleAdd = () => {
    if (newExercise !== "") {
      const updatedExercise = [
        ...data.exercises,
        { exerciseName: newExercise, count: 0 },
      ];

      const updatedata = {
        ...data,
        exercises: updatedExercise,
      };

      const addNewExercice = async () => {
        try {
          const response = await axios.put(
            `${URL}/exercise/update/${id}`,
            updatedata,
            { withCredentials: true }
          );
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      addNewExercice();
    }
  };

  const handleSave = () => {
    const updateDate = {
      ...data,
      date: { day: day, month: month, year: year },
    };
    const updateCounts = async () => {
      try {
        const response = await axios.put(`${URL}/exercise/updateCounts`, updateDate, {
          withCredentials: true,
        });
        const newArray = [...allExerciseData];
        newArray[0] = response.data;

        SetAllExerciseData(newArray);
      } catch (error) {
        console.log(error);
      }
    };

    updateCounts();

    setCountDiv(!countDiv);
  };

  useEffect(() => {
    let userName = user.userName;

    const fetchExercicesData = async () => {
      try {
        const response = await axios.post(
          `${URL}/exercise/exerciseCounts`,
          { month },
          { withCredentials: true }
        );

        const reversedExerciseData = response.data.exercises.reverse();
        const previosReversedExerciseData =
          response.data.previousMonthExercises.reverse();
        SetAllExerciseData(reversedExerciseData);
        SetPrevAllData(previosReversedExerciseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercicesData();
  }, []);

  const handleAddCount = () => {
    setCountDiv(!countDiv);
  };

  let prevDate = [];
  let prevCount = [];

  const handleChoose = (index) => {
    if (allExerciseData && allExerciseData.length > 0) {
      const lastEight = allExerciseData.slice(0, 7).reverse();

      lastEight.map((each) => {
        if (each.exercises[index] !== undefined) {
          prevDate.push(each.date.day);
          setlastSevenDates(prevDate);

          setLastEightExerciseName(each.exercises[index].exerciseName);

          prevCount.push(each.exercises[index].count);
          setLastSevenCounts(prevCount);
        }
      });
    }
  };

  useEffect(() => {
    if (lastEightCounts.length > 0) {
      handeleGrowth();
    }
  }, [lastEightCounts]);

  const handeleGrowth = () => {
    setGrowth((g) => {
      const newGrowth =
        ((lastEightCounts[lastEightCounts.length - 1] - lastEightCounts[0]) /
          lastEightCounts[0]) *
        100;
      return Math.round(newGrowth, 0);
    });
  };

  let option = {
    plugins: {
      tooltip: {
        enabled: true, // Enable tooltips
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Counts",
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  let datas = {
    labels: lastSevenDates,
    datasets: [
      {
        label: lastEightExerciseName,
        data: lastEightCounts,
        borderColor: "white",
        pointRadius: 5,
        lineTension: 0.5,
        pointBorderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    handleChoose(0);
  }, [allExerciseData]);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        `${URL}/auth/logOut`,
        {},
        { withCredentials: true }
      );

      if (response.data) {
        localStorage.clear("TrackIt-User");
        setUser("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <button class="logout" onClick={handleLogOut}>
        log out
      </button>
      <div className="header">TrackIt</div>
      <div className="top">
        <div className="greeting">Hey, {data && data.userName}</div>
        <div className="top-date">
          {monthName}&nbsp;{day},&nbsp;{year}
        </div>
      </div>

      <div className="graphAndStates">
        <div className="titleAndGraph">
          <div className="graphName">
            {data &&
              data.exercises.map((exercise, index) => (
                <div key={index} onClick={() => handleChoose(index)}>
                  <p className="text">{exercise.exerciseName}</p>
                </div>
              ))}
          </div>

          <div className="graph">
            <Line options={option} data={datas} />

            <div className="states">
              {!isNaN(growth) ? `${growth}` : "0"}% &nbsp;
              <i className="fa-solid fa-arrow-up-long"></i>
            </div>
          </div>
        </div>
      </div>

      <div className={countDiv ? "addCounts" : "addCountsClose"}>
        <p style={{ marginBottom: "20px" }}>
          {monthName}&nbsp;{day},&nbsp;{year}
        </p>

        {data &&
          data.exercises.map((exercise, index) => (
            <div className="input-exe" key={index}>
              <div>{exercise.exerciseName}</div>
              <div>
                <input
                  type="number"
                  placeholder="count"
                  onChange={(e) => {
                    exercise.count = e.target.valueAsNumber;
                    const newCount = [...count]; // Create a copy of the count array
                    newCount[index] = e.target.valueAsNumber || 0; // Update the corresponding index
                    setCount(newCount); // Set the new count array using the setter function
                  }}
                  value={count[index] || ''}
                />
              </div>
            </div>
          ))}
        <button className="save" onClick={handleSave}>
          SAVE
        </button>
        <button className="close" onClick={handleAddCount}>
          <i className="fa-solid fa-circle-left"></i>
        </button>
      </div>

      <div className="twoMonths">
        <div className="oneMonthBlock">
          <div className="month-year">
            <span>{monthName}, </span>
            <span>{year}</span>
          </div>
          <br></br>
          <hr></hr>
          <div className="bottom">
            <div className="left">
              <div className="datesTitle">Dates</div>
              {data &&
                data.exercises.map((exercise, index) => (
                  <div className="exerciseName" key={index}>
                    {exercise.exerciseName}
                  </div>
                ))}
              <div className="newExercise">
                <input
                  type="text"
                  placeholder="New exercise"
                  onChange={(e) => setNewExercise(e.target.value)}
                />

                <button onClick={handleAdd}>Add</button>
              </div>
            </div>

            <div className="flexRight">
              <div className="right">
                <div className="btns">
                  <button onClick={handleAddCount}>
                    <i className="fa-solid fa-square-plus"></i>
                  </button>
                </div>
                {allExerciseData == "" ? (
                  <div className="noData">Add Today's Sets 💪</div>
                ) : (
                  allExerciseData &&
                  allExerciseData.map((oneData, index) => (
                    <div key={index}>
                      <div className="dates">{oneData.date.day}</div>
                      <div className="counts">
                        {oneData.exercises.map((exercise, index) => (
                          <div className="count" key={index}>
                            {exercise.count}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="oneMonthBlock">
          <div className="month-year">
            <span>{prevMonthName}, </span>
            <span>{year}</span>
            <span>&nbsp;(Last Month)</span>
          </div>
          <br></br>
          <hr></hr>
          <div className="bottom">
            <div className="left">
              <div className="datesTitle">Dates</div>
              {data &&
                data.exercises.map((exercise, index) => (
                  <div className="exerciseName" key={index}>
                    {exercise.exerciseName}
                  </div>
                ))}
            </div>

            <div className="flexRight">
              <div className="right">
                {prevAllData == "" ? (
                  <div className="noData">No Data Found</div>
                ) : (
                  prevAllData &&
                  prevAllData.map((oneData, index) => (
                    <div key={index}>
                      <div className="dates">{oneData.date.day}</div>
                      <div className="counts">
                        {oneData.exercises.map((exercise, index) => (
                          <div className="count" key={index}>
                            {exercise.count}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
