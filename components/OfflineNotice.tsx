import { WifiOff } from "lucide-react";

export function OfflineNotice({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
      <WifiOff className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500" aria-hidden />
      <p>{message}</p>
    </div>
  );
}
