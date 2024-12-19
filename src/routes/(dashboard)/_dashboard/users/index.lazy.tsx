import DataTableWrapper from "@/modules/dashboard/components/DataTableWrapper";
import { columns } from "@/modules/dashboard/users/users-columns";
import { getUsers } from "@/modules/dashboard/users/users.api";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(dashboard)/_dashboard/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DataTableWrapper queryKey={["users"]} queryFn={getUsers} columns={columns} createLink="/users/create" />;
}
