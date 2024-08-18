export const LibroListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse group relative rounded-lg border p-4 shadow-md bg-white border-gray-300"
        >
          <div className="flex h-40 items-center justify-center bg-gray-200 rounded-md">
            <div
              className="h-full w-full bg-gray-300 rounded-md"
              style={{ aspectRatio: "160/240", objectFit: "cover" }}
            ></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
