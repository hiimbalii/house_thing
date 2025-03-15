"use client";

import { changeInfo } from "@/sdk/data";
import { Button, Field, Input, Stack, StickyProps } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  pin: string;
}

export const RoomForm = ({
  email,
  name,
}: {
  email?: string;
  name?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { email, name } });
  const { roomNumber } = useParams();

  if (!roomNumber) throw new Error(`Expected roomnr: `);
  const onSubmit = handleSubmit((data) =>
    changeInfo(roomNumber as string, data)
  );

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Name</Field.Label>
          <Input {...register("name")} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          <Field.HelperText>Just to display who is on duty</Field.HelperText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          <Field.HelperText>
            Only share if you are comfortable with it. We'll send you reminder
            emails (about 3 over 2 weeks if you are on duty)
          </Field.HelperText>
        </Field.Root>
        <Field.Root invalid={!!errors.pin}>
          <Field.Label>Change pin</Field.Label>
          <Input {...register("pin")} />
          <Field.ErrorText>{errors.pin?.message}</Field.ErrorText>
        </Field.Root>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
