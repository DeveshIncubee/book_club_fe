import { Box } from "@chakra-ui/react";
import AllEvents from "@/components/ui/all-events";
import AllResourcesHeading from "@/components/ui/all-resources-heading";
import Greeting from "@/components/ui/greeting";

export default function EventListPage() {
  return (
    <div>
      <Greeting />

      <AllResourcesHeading resourceType="event" />
      <AllEvents />

      <Box p={4} />
    </div>
  );
}
