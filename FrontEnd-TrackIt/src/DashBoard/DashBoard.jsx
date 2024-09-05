import { useEffect, useState, useref } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./DashBoard.css";
import { Line } from "react-chartjs-2";

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
  const [count, setCount] = useState();
  const [allData, SetAllData] = useState();
  const [prevAllData, SetPrevAllData] = useState();
  const [countDiv, setCountDiv] = useState(false);
  const [lastSevenDates, setlastSevenDates] = useState([]);
  const [lastEightExerciseName, setLastEightExerciseName] = useState("");
  const [lastEightCounts, setLastSevenCounts] = useState([]);
  const [growth, setGrowth] = useState();

  const URL = "http://localhost:1111";

  const date = new Date();
  const day = date.getDate();
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
  const prevMonth = months[date.getMonth() - 1];
  // const month = months[date.getMonth()];
  const month = "May";

  const year = date.getFullYear();
  const perfectDate = month + " " + day + "," + year;

  let id = "";

  const inheritData = useLocation();
  id = inheritData.state.data._id;

  useEffect(() => {
    axios
      .get(`${URL}/exercise/getBlue/` + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
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

      axios
        .put(`${URL}/exercise/update/${id}`, updatedata)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));

      location.reload();
    }
  };

  const handleSave = () => {
    const updateDate = {
      ...data,
      date: { day: day, month: month, year: year },
    };
    console.log(updateDate)
    axios
      .post(`${URL}/fullData`, updateDate)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setCountDiv(!countDiv);

    location.reload();
  };

  useEffect(() => {
    let userName = inheritData.state.data.userName;
    
    axios
      .post(`${URL}/all`, { userName, month })
      .then((res) => {
        const reversedData = res.data.reverse();
        SetAllData(reversedData);
      })
      .catch((err) => console.log(err));

    axios
      .post(`${URL}/all`, { userName, prevMonth })
      .then((res) => {
        const reversedData = res.data.reverse();
        SetPrevAllData(reversedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddCount = () => {
    setCountDiv(!countDiv);
  };

  let prevDate = [];
  let prevCount = [];

  const handleChoose = (index) => {
    if (allData && allData.length > 0) {
      const lastEight = allData.slice(0, 7).reverse();

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
  }, [allData]);

  return (
    <div className="dashboard">
      <div className="header">TrackIt</div>

      <div className="top">
        <div className="greeting">Hey, {data && data.userName}</div>
        <div className="top-date">
          {month}&nbsp;{day},&nbsp;{year}
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

      <div className="addCountCon">
        <div className={countDiv ? "addCounts" : "addCountsClose"}>
          <p style={{ marginBottom: "20px" }}>
            {month}&nbsp;{day},&nbsp;{year}
          </p>

          {data &&
            data.exercises.map((exercise, index) => (
              <div className="input-exe" key={index}>
                <div>{exercise.exerciseName}</div>
                <div>
                  <input
                    type="number"
                    placeholder="count"
                    onChange={(e) => (exercise.count = e.target.valueAsNumber)}
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
      </div>

      <div className="twoMonths">
        <div className="oneMonthBlock">
          <div className="month-year">
            <span>{month}, </span>
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
                {allData == "" ? (
                  <div className="noData">Add Today's Sets 💪</div>
                ) : (
                  allData &&
                  allData.map((oneData, index) => (
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
            <span>{prevMonth}, </span>
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
