import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types";

interface UserDetailsProps {
  data: UserData;
}

export default function UserDetails({ data }: UserDetailsProps) {
  if (!data) return null;

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <Avatar className="w-32 h-32 border-2">
        <AvatarImage alt={data.name} src={data.profilePicture ?? ""} />
        <AvatarFallback>{data.name[0]}</AvatarFallback>
      </Avatar>

      <div className="space-y-4 max-w-lg">
        <h1 className="text-2xl font-bold">Hi, I&apos;m {data.name} 👋</h1>
        <p className="text-sm text-foreground/95 mx-auto">
          I&apos;m a {data.tagline} from {data.location}.
        </p>
        <p className="text-sm text-foreground/70 mx-auto">{data.bio}</p>
      </div>
    </div>
  );
}