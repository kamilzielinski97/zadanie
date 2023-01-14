import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [listApp, setListApp] = useState();
  const [details, setDetails] = useState();

  useEffect(() => {
    fetch("https://api.recruitment.4soft.tech/list")
      .then((response) => response.json())
      .then((data) => setListApp(data));
  }, []);

  // useEffect(() => {
  //   if (listApp) {
  //     listApp.map((item) =>
  //       fetch(`https://api.recruitment.4soft.tech/details/${item.id}`)
  //         .then((response) => response.json())
  //         .then((details) => setListApp(listApp[item.id].push(details)))
  //     );
  //   }
  // }, [listApp]);

  const handleClick = (id) => {
    fetch(`https://api.recruitment.4soft.tech/details/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  return (
    <div className="App">
      {listApp &&
        !details &&
        listApp.map((item) => (
          <div style={{ display: "grid" }}>
            <p>{item.name}</p>
            <p>{item.company}</p>
            <button onClick={() => handleClick(item.id)}>
              KLIK ABY DOSTAĆ SZCZEGÓŁY
            </button>
          </div>
        ))}
      {details && (
        <div>
          <p>{details.admin.email}</p>
          <p>{details.admin.first_name}</p>
          <p>{details.admin.last_name}</p>
          <p>{details.company}</p>
          <p>{details.id}</p>
          <img width={"50px"} height={"50px"} src={details.logo}></img>
          <p>{details.name}</p>
          <p>{details.number_of_active_users}</p>
          <p>{details.number_of_users}</p>
          <p>{details.server_address}</p>
          <button onClick={() => handleClick(details.id)}>
            KLIK ABY ODSWIEZYC DANE
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
