import { ModeToggle } from "@/components/mode-toggler";

interface TopBarProps {
  username: string;
}

export default function TopBar({ username }: TopBarProps) {
  return (
    <div className="z-50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-sm font-medium">@{username}</span>
        <ModeToggle />
      </div>
    </div>
  );
}