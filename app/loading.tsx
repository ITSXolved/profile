export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center flex-col gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
      </div>
      <p className="text-white/40 font-space-grotesk text-sm tracking-widest uppercase animate-pulse">
        Initializing Intelligence
      </p>
    </div>
  );
}
