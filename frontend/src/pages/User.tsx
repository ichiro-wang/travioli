import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useGetUserItineraries } from "@/hooks/users/useGetUserItineraries";
import { Link } from "react-router-dom";

const User = () => {
  const { user } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetUserItineraries(user.id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading itineraries.</p>;

  const itineraries =
    data?.pages.flatMap((page) => page.data.itineraries) ?? [];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          @{user.username}
        </h1>
        <p className="text-sm text-muted-foreground">
          {itineraries.length} itinerar
          {itineraries.length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {itineraries.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            No itineraries yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {itineraries.map((itinerary) => (
            <Link
              key={itinerary.id}
              to={`/i/${itinerary.id}`}
              className="rounded-lg border p-4 transition hover:bg-slate-50 hover:shadow-sm"
            >
              <h2 className="font-medium">{itinerary.title}</h2>
            </Link>
          ))}
        </div>
      )}

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="self-center"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}

      {isFetching && !isFetchingNextPage && <Loader />}
    </div>
  );
};

export default User;