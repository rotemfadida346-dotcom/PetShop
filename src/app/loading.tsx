import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="min-h-screen bg-card">
      <Container>
        <div className="py-20 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm text-muted">טוען...</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
