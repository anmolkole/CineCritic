import Main from "./dashboard/Main";
import Sidebar from "./dashboard/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
};

export default AdminDashboard;
