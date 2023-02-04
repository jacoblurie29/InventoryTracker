import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddItemView from "./features/AddItemView/AddItemView";
import TabView from "./features/TabView/TabView";

function App() {
  const [isAddItem, setIsAddItem] = useState(false);

  const closeDialog = () => {
    setIsAddItem(false);
  };

  const openDialog = () => {
    setIsAddItem(true);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <div className="navbar">
          <ul>
            <li className="navBar-title-main">
              <h1 className="navBar-title-name">Inventory&nbsp;&#128230;</h1>
            </li>
            <li>
              <a href="login">Login</a>
            </li>
            <li>
              <a href="about">About</a>
            </li>
            <li>
              <a href="home">Inventory</a>
            </li>
          </ul>
        </div>
        <div className="mainContent">
          <TabView isAddItem={isAddItem} openDialog={openDialog} />
        </div>
      </div>
      {isAddItem && <AddItemView closeDialog={closeDialog} />}
    </>
  );
}

export default App;
