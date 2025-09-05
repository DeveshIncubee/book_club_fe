"use client";

import { useMutation } from "@apollo/client/react";
import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { CREATE_EVENT } from "@/lib/queries";

export default function EventForm() {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const [createEvent, { loading, data }] = useMutation(CREATE_EVENT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((formData) => {
    createEvent({
      variables: {
        title: formData?.title,
        description: formData?.description,
        location: formData?.location,
        userId: currentUser?.id,
        startsAt: formatISO(formData?.startsAt),
        endsAt: formatISO(formData?.endsAt),
      },
    });
  });

  useEffect(() => {
    if (data?.createEvent?.errors?.length === 0) {
      router.push(`/events/${data?.createEvent?.event?.id}`);
    }
  }, [data, router]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxWidth={{ base: "full", md: "3/4" }}>
        <Field.Root invalid={!!errors.title}>
          <Input
            placeholder="Enter title"
            width="full"
            {...register("title")}
            required
          />
          <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.description}>
          <Textarea
            placeholder="Enter description"
            size="lg"
            width="full"
            height="44"
            {...register("description")}
            required
          />
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.location}>
          <Input
            placeholder="Enter location"
            width="full"
            {...register("location")}
            required
          />
          <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.startsAt}>
          <Input
            type="datetime-local"
            placeholder="Enter starts at"
            width="full"
            {...register("startsAt")}
            required
          />
          <Field.ErrorText>{errors.startsAt?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.endsAt}>
          <Input
            type="datetime-local"
            placeholder="Enter ends at"
            width="full"
            {...register("endsAt")}
            required
          />
          <Field.ErrorText>{errors.endsAt?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" loading={loading} disabled={!currentUser?.id}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
