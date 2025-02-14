const SecondaryCard = ({ pill, content }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl text-center w-full">
      <div className="text-gray-500 text-2xl font-semibold">{pill}</div>
      <div className="text-3xl font-bold mt-8">{content}</div>
    </div>
  );
};

export default SecondaryCard;
