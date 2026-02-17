import Container from "@/components/ui/Container";

export default function ProductLoading() {
  return (
    <div className="bg-white">
      <Container>
        <div className="py-8 md:py-12">
          <div className="animate-pulse mb-8">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div>
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
