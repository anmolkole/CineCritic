import { useListUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
  const { data: visitors } = useListUsersQuery();

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-lg font-bold">
        You have {visitors?.length} visitors
      </h2>
    </div>
  );
};

export default PrimaryCard;
