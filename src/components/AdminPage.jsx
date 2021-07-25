import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.scss";
const AdminPage = () => {
  const [state, setState] = useState([]);
  const handelClick = (id) => {
    console.log(typeof id);
    axios({
      method: "post",
      url: "http://localhost:5000/api/dataremoving",
      data: { id },
    }).then((res) => console.log(res));
    setState((state) => state.filter((x) => x.pgid !== id));
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/verificationpg",
    }).then((res) => {
      setState(res.data.data);
    });
  }, []);
  return (
    <div>
      <div
        class="header"
        style={{ height: "100px", width: "100%", backgroundColor: "blue" }}
      ></div>
      <div className="main">
        {state.map((x) => {
          return (
            <div className="AdminPage--cover">
              <div className="AdminPage--container">
              <div className="AdminPage--P-v">
                <p className="AdminPage--property">Name : </p>
                <p className="AdminPage--value">{x.name1}</p>
              </div>
              <div className="AdminPage--P-v">
                <p className="AdminPage--property">Phone Number</p>
                <p className="AdminPage--value">{x.number1}</p>
              </div>
              <div className="AdminPage--P-v">
                <p className="AdminPage--property">PG Name :</p>
                <p className="AdminPage--value">{x.pgname}</p>
              </div>
              <div className="AdminPage--P-v">
                <p className="AdminPage--property">Address : </p>
                <p className="AdminPage--value">{x.address}</p>
              </div>
              </div>
              <div className="AdminPage--container--submit">
                {" "}
                <button
                  className="AdminPage--submit"
                  id={x.pgid}
                  onClick={({ target }) => {
                    handelClick(target.id);
                  }}
                >
                  verified
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
