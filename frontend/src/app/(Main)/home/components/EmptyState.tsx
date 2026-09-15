// app/home/components/EmptyState.tsx
type Props = {
  icon: React.ReactNode;
  title: string;
  message: string;
};

export default function EmptyState({ icon, title, message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        {icon}
      </div>
      <h3 className="mt-5 text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">{message}</p>
    </div>
  );
}