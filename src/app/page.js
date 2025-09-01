import FeaturedResourcesHeading from "@/components/ui/featured-resources-heading";

export default function Home() {
  return (
    <div>
      <h1 className="mb-4 text-4xl">Hello, user!</h1>

      <FeaturedResourcesHeading resourceType="book" />
    </div>
  );
}
