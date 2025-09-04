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

export default function BookReviews({ reviews }) {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useLayoutEffect(() => {
    let timeout;
    if (reviews && reviews?.length > 0) {
      setFilteredReviews(
        reviews?.filter((review) => review?.user?.id !== currentUser?.id),
      );

      timeout = setTimeout(() => setLoading(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [reviews, currentUser]);

  if (loading) {
    return (
      <VStack
        alignItems="stretch"
        gap="4"
        data-testid={`my-review-skeleton`}
        width="full"
      >
        <SkeletonText noOfLines={3} />
        <Skeleton height="140px" />
      </VStack>
    );
  }

  return (
    <VStack alignItems="start" gap="4">
      <h3 style={{ fontSize: 24 }}>Other Users' Reviews</h3>
      {filteredReviews?.map((review, index) => (
        <VStack key={`review-${index + 1}`} alignItems="start" gap="4">
          <HStack alignItems="center" gap="4">
            <Text style={{ fontSize: 18 }}>{review?.user?.name}</Text>
            <RatingGroup.Root
              count={5}
              defaultValue={review?.rating}
              size="md"
              disabled={true}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </HStack>
          <Text>{review?.comment}</Text>
        </VStack>
      ))}
    </VStack>
  );
}
