import { useListUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useListUsersQuery();

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full">
      <h2 className="text-lg font-bold">Real Time</h2>
      <p className="text-gray-500">Update Live</p>
      <h2 className="text-2xl font-bold">{visitors?.length}</h2>
      <p className="text-gray-500">Subscribe</p>
      <hr className="my-2" />
      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
