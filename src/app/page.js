import { Box } from "@chakra-ui/react";
import FeaturedBooks from "@/components/ui/featured-books";
import FeaturedEvents from "@/components/ui/featured-events";
import FeaturedResourcesHeading from "@/components/ui/featured-resources-heading";
import Greeting from "@/components/ui/greeting";

export default function Home() {
  return (
    <div>
      <Greeting />
      <FeaturedResourcesHeading resourceType="book" />
      <FeaturedBooks />

      <Box p={4} />

      <FeaturedResourcesHeading resourceType="event" />
      <FeaturedEvents />

      <Box p={4} />
    </div>
  );
}
