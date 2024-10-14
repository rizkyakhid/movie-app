export default function CardLoading() {
  return (
    <div className="shadow-lg rounded-lg p-4 flex flex-col gap-2 w-100 bg-background w-full flex-shrink-0 flex-grow">
      <div className="animate-pulse w-full h-80 bg-neutral-100 dark:bg-neutral-900 rounded-md" />
      <div className="animate-pulse h-6 bg-neutral-100 dark:bg-neutral-900 rounded-md" />
      <div className="animate-pulse h-6 bg-neutral-100 dark:bg-neutral-900 rounded-md" />
    </div>
  );
}
