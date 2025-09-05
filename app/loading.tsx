export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading KnowYourRights</h2>
          <p className="text-gray-300">Preparing your legal toolkit...</p>
        </div>
      </div>
    </div>
  );
}
