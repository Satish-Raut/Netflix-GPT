import { useGetTrailer } from "../../Hooks/useGetTrailer";

export const BackgroundTrailer = ({
  movieId,
  posterUrl,
  backdropUrl,
  title,
}) => {
  const trailerVideo = useGetTrailer(movieId);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {trailerVideo ? (
        <iframe
          className="
            absolute inset-0 
            w-screen h-full
            object-cover
            transition-opacity duration-700 ease-in-out
            opacity-100
          "
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      ) : (
        <picture
          className="
            absolute inset-0 -z-10 block w-full h-full
            transition-opacity duration-700 ease-in-out
          "
        >
          {/* Use poster on narrow screens for better composition */}
          <source media="(max-width:640px)" srcSet={posterUrl} />
          {/* Default: backdrop */}
          <img
            src={backdropUrl}
            alt={title}
            className="
              w-full h-full object-cover
              object-right sm:object-center
              opacity-0 animate-fadeIn
            "
            loading="lazy"
          />
        </picture>
      )}

      {/* ✅ Gradient overlay is now part of Background */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
    </div>
  );
};
