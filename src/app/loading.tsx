import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Container>
        <div className="py-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-stone-500">Loading...</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
