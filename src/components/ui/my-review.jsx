"use client";

import {
  HStack,
  RatingGroup,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useCurrentUser } from "@/context/CurrentUserContext";
import ReviewForm from "./review-form";

export default function MyReview({ bookId, reviews }) {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [myReview, setMyReview] = useState(null);

  useLayoutEffect(() => {
    let timeout;
    if (reviews) {
      const review = reviews?.find(
        (review) => review?.user?.id === currentUser?.id,
      );

      setMyReview(review);

      timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [reviews, currentUser]);

  return (
    <>
      {loading ? (
        <VStack
          alignItems="stretch"
          gap="4"
          data-testid={`my-review-skeleton`}
          width="full"
        >
          <SkeletonText noOfLines={3} />
          <Skeleton height="140px" />
        </VStack>
      ) : myReview ? (
        <VStack alignItems="stretch" gap="4" width="full">
          <HStack alignItems="center" gap="4">
            <h3 style={{ fontSize: 24 }}>My Review</h3>

            <RatingGroup.Root
              count={5}
              defaultValue={myReview?.rating}
              size="lg"
              disabled={true}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </HStack>
          <Text>{myReview?.comment}</Text>
        </VStack>
      ) : (
        <VStack alignItems="stretch" gap="4" width="full">
          <h3 style={{ fontSize: 24 }}>Leave a Review</h3>
          <ReviewForm
            userId={currentUser?.id}
            bookId={bookId}
            setMyReview={setMyReview}
          />
        </VStack>
      )}
    </>
  );
}
