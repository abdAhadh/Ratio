export default function BrandPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <img
          src="/logo.svg"
          alt="Ratio"
          className="w-16 h-16 mx-auto mb-5"
        />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy tracking-tight mb-4">
          Ratio
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-md mx-auto">
          AI-native bookkeeping, tax, and compliance firm for Indian MSMEs.
        </p>
      </div>
    </div>
  );
}
