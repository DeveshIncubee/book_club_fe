"use client";

import { useMutation } from "@apollo/client/react";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_BOOK } from "@/lib/queries";

export default function BookForm() {
  const router = useRouter();
  const [createBook, { loading, data }] = useMutation(CREATE_BOOK);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((formData) => {
    createBook({
      variables: {
        title: formData?.title,
        author: formData?.author,
        genre: formData?.genre,
        publishedYear: Number(formData?.publishedYear),
      },
    });
  });

  useEffect(() => {
    if (data?.createBook?.errors?.length === 0) {
      router.push(`/books/${data?.createBook?.book?.id}`);
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

        <Field.Root invalid={!!errors.author}>
          <Input
            placeholder="Enter author"
            width="full"
            {...register("author")}
            required
          />
          <Field.ErrorText>{errors.author?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.genre}>
          <Input
            placeholder="Enter genre"
            width="full"
            {...register("genre")}
          />
          <Field.ErrorText>{errors.genre?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.publishedYear}>
          <Input
            type="number"
            placeholder="Enter published year"
            width="full"
            {...register("publishedYear")}
          />
          <Field.ErrorText>{errors.publishedYear?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
