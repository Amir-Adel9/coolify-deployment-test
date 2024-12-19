import { Button } from "@/components/ui/shadcn/button";
import UserForm from "@/modules/dashboard/users/userForm";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(dashboard)/_dashboard/users/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="w-[770px] my-12 bg-white bg-opacity-60 p-8 rounded-xl shadow-lg">
          <UserForm />
        </div>
        <Button variant="outline">
          <Link to="/users">Back</Link>
        </Button>
      </div>
    </>
  );
}
