import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types";

interface UserDetailsProps {
  data: UserData | null;
}

export default function UserDetails({ data }: UserDetailsProps) {
  if (!data) return null;

  return (
    <>
      {data.template === "minimal" && (
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-32 h-32 border-2">
            <AvatarImage alt={data.name} src={data.profilePicture ?? ""} />
            <AvatarFallback>{data.name[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-4 max-w-lg">
            <h1 className="text-2xl font-bold">Hi, I&apos;m {data.name} 👋</h1>
            <p className="text-sm text-foreground/95 mx-auto">
              {data.tagline}
              {data.tagline && data.tagline.endsWith(".") ? "" : "."} Based in{" "}
              {data.location}.
            </p>
            <p className="text-sm text-foreground/70 mx-auto">{data.bio}</p>

            {data.skills && data.skills.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {data.template === "pristine" && (
        <div className="bg-background/90 dark:bg-background/5 rounded-lg p-4 sm:p-6 backdrop-blur-sm border border-border">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 sm:justify-between text-center sm:text-left">
            <div className="space-y-4 w-full">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                I&apos;m{" "}
                <span className="bg-foreground text-background px-2 rounded-md">
                  {data.name.split(" ")[0]}.
                </span>{" "}
                👋
              </h1>
              <div className="space-y-2 text-sm max-w-xs sm:max-w-sm md:max-w-md mx-auto sm:mx-0">
                <p className="text-muted-foreground/90 text-lg">
                  {data.tagline}
                  {data.tagline && data.tagline.endsWith(".") ? "" : "."} Based in{" "}
                  {data.location}.
                </p>
                <p className="text-muted-foreground/70">{data.bio}</p>
              </div>
              {data.skills && data.skills.length > 0 && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {data.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-full bg-background/50 dark:bg-background/10 text-foreground/80 dark:text-foreground/70 border border-border"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-border">
              <AvatarImage src={data.profilePicture ?? ""} alt={data.name} />
              <AvatarFallback className="bg-background/50 dark:bg-background/20 text-foreground/80">{data.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
    </>
  );
}
