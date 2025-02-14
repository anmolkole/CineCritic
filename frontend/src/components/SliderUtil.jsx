import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No movies available.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Corrected the typo
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: { slidesToShow: 3, slidesToScroll: 2 },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Slider
      {...settings}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {data.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
};

export default SliderUtil;
