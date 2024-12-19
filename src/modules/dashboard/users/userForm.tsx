"use client";

import FormComponent from "@/components/form-component/FormComponent";
import { appRouter } from "@/main";
import { createUsers, getRoles, updateUser } from "@/modules/dashboard/users/users.api";
import { adminCreateSchema, adminEditSchema } from "@/modules/dashboard/users/users.schema";
import { TFormField } from "@/types/form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const userFields: TFormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    className: "col-span-12 md:col-span-6",
    custom: {
      inputMode: "email",
      placeholder: "Enter your email",
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    className: "col-span-12 md:col-span-6",
  },
  {
    name: "password_confirmation",
    label: "Confirm Password",
    type: "password",
    className: "col-span-12 md:col-span-6",
  },
  {
    name: "role_id",
    label: "Role",
    type: "select",
    className: "col-span-12 md:col-span-6",
    custom: {
      placeholder: "Select Role",
      options: [],
    },
  },
];

const UserForm = ({ isEdit = false, userData = {} }: { isEdit?: boolean; userData?: any }) => {
  const schema = isEdit ? adminEditSchema : adminCreateSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      password: "",
      password_confirmation: "",
      role_id: userData.role_id || "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        const options = response.data.map((role: { id: number; name: string }) => ({
          value: role.id.toString(),
          label: role.name,
        }));

        const roleField = userFields.find((field) => field.name === "role_id");
        if (roleField) {
          roleField.custom = { ...roleField.custom, options };
        }
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const apiFunction = isEdit ? updateUser : createUsers;
      await apiFunction(data);
      toast.success(`User ${isEdit ? "updated" : "created"} successfully!`);
      appRouter.navigate({ to: "/users" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Failed to ${isEdit ? "update" : "create"} user.`);
    }
  };

  return (
    <FormComponent
      fields={userFields}
      handleSubmit={form.handleSubmit(onSubmit)}
      formData={form}
      buttonClassName="ml-auto"
      buttonText={isEdit ? "Edit User" : "Create User"}
      formTitle={isEdit ? "Edit User" : "Create User"}
    />
  );
};

export default UserForm;
