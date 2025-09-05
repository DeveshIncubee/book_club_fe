"use client";

import { useMutation } from "@apollo/client/react";
import { Button, Field, RatingGroup, Stack, Textarea } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CREATE_REVIEW } from "@/lib/queries";

export default function ReviewForm({ userId, bookId, setMyReview }) {
  const [createReview, { loading, data }] = useMutation(CREATE_REVIEW);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((formData) => {
    createReview({
      variables: {
        rating: Number(formData?.rating),
        comment: formData?.comment,
        userId: userId,
        bookId: bookId,
      },
    });
  });

  useEffect(() => {
    setMyReview(data?.createReview?.review);
  }, [data, setMyReview]);

  return (
    <form onSubmit={onSubmit} data-testid="review-form">
      <Stack gap="4" align="flex-start" maxWidth={{ base: "full", md: "3/4" }}>
        <Field.Root invalid={!!errors.rating}>
          <RatingGroup.Root
            count={5}
            size="lg"
            {...register("rating")}
            required
          >
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.comment}>
          <Textarea
            placeholder="Enter your comment"
            size="lg"
            width="full"
            height="44"
            {...register("comment")}
            required
          />
          <Field.ErrorText>{errors.comment?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
}
