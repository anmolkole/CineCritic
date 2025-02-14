import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
