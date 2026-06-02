import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useGetUserItineraries } from "@/hooks/users/useGetUserItineraries";

const User = () => {
  const { user } = useAuth();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetUserItineraries(user.id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error</p>;

  return (
    <div className="flex w-80 flex-col items-center gap-3">
      <h1 className="text-lg font-bold">
        Itineraries of {`@${user.username}`}
      </h1>
      {data.pages.map((page, pageIndex) => (
        <div
          className="w-60 rounded-sm border border-black p-4 text-center"
          key={pageIndex}
        >
          {page.data.itineraries.map((itinerary) => (
            <div key={itinerary.id}>{itinerary.title}</div>
          ))}
        </div>
      ))}
      <Button
        className="w-60"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load more"
            : "Nothing more to load"}
      </Button>
      {isFetching && !isFetchingNextPage && <Loader />}
    </div>
  );
};

export default User;
