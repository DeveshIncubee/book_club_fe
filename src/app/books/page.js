import { Box } from "@chakra-ui/react";
import AllBooks from "@/components/ui/all-books";
import AllResourcesHeading from "@/components/ui/all-resources-heading";
import Greeting from "@/components/ui/greeting";

export default function BookListPage() {
  return (
    <div>
      <Greeting />

      <AllResourcesHeading resourceType="book" />
      <AllBooks />

      <Box p={4} />
    </div>
  );
}
