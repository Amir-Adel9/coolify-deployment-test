import { Button } from "@/components/ui/shadcn/button";
import UserForm from "@/modules/dashboard/users/userForm";
import { getUser } from "@/modules/dashboard/users/users.api";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(dashboard)/_dashboard/users/edit/$userID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userID } = Route.useParams();
  const {
    data: userData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userID],
    queryFn: () => getUser(userID),
  });

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="w-[770px] my-12 bg-white bg-opacity-60 p-8 rounded-xl shadow-lg">
          <UserForm isEdit={true} userData={userData} />
        </div>
        <Button variant="outline">
          <Link to="/users">Back</Link>
        </Button>
      </div>
    </>
  );
}
