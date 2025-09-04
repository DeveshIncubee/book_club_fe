import FeaturedBooks from "@/components/ui/featured-books";
import FeaturedResourcesHeading from "@/components/ui/featured-resources-heading";
import Greeting from "@/components/ui/greeting";

export default function Home() {
  return (
    <div>
      <Greeting />

      <FeaturedResourcesHeading resourceType="book" />
      <FeaturedBooks />
    </div>
  );
}
