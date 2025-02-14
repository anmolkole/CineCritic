const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#1E88E5] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-[#64B5F6] border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Loader;
