import VideoCard from "./components/VideoCard";
import SecondaryCard from "./components/SecondaryCard";
import RealTimeCard from "./components/RealTimeCard";

import {
  useListMoviesQuery,
  useTopMoviesQuery,
} from "../../../redux/api/movies.js";
import { useListUsersQuery } from "../../../redux/api/users.js";

const Main = () => {
  const { data: topMovies } = useTopMoviesQuery();
  const { data: allMovies } = useListMoviesQuery();
  const { data: visitors } = useListUsersQuery();

  const totalCommentsCount = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsCount?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
      <section className="space-y-6">
        {/* Cards in One Row */}
        <div className="grid grid-cols-4 gap-4">
          <SecondaryCard pill="Users" content={visitors?.length} />
          <SecondaryCard pill="Comments" content={sumOfCommentsLength} />
          <SecondaryCard pill="Movies" content={allMovies?.length} />
          <RealTimeCard />
        </div>

        {/* Top Movies Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg ml-18 font-semibold">Top Content</p>
            <p className="text-lg mr-12 font-semibold">Comments</p>
          </div>

          <div className="">
            {topMovies?.map((movie) => (
              <VideoCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
        <div className="h-18"></div>
      </section>
    </div>
  );
};

export default Main;
