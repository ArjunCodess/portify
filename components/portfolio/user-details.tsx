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
        <div className="bg-background/95 dark:bg-background/5 rounded-lg p-6 sm:p-8 md:p-10 backdrop-blur-sm border border-border">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-6 sm:justify-between text-center sm:text-left">
            <div className="space-y-4 w-full">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                I&apos;m{" "}
                <span className="bg-muted-foreground dark:bg-white text-background px-2 rounded-md border border-border">
                  {data.name.split(" ")[0]}.
                </span>{" "}
                👋
              </h1>
              <div className="space-y-2 text-sm max-w-full sm:max-w-sm md:max-w-md mx-auto sm:mx-0">
                <p className="text-muted-foreground text-lg">
                  {data.tagline}
                  {data.tagline && data.tagline.endsWith(".") ? "" : "."} Based
                  in {data.location}.
                </p>
                <p className="text-muted-foreground/80">{data.bio}</p>
              </div>
              {data.skills && data.skills.length > 0 && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {data.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-full bg-muted hover:bg-muted/80 dark:bg-background/10 text-foreground/80 dark:text-foreground/70 border border-border"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-border">
              <AvatarImage src={data.profilePicture ?? ""} alt={data.name} />
              <AvatarFallback className="bg-muted dark:bg-background/20 text-foreground/80">
                {data.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}

      {data.template === "vibrant" && (
        <div className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center px-4 sm:px-6 py-4">
            <div className="space-y-6 text-center lg:text-left md:col-span-1 lg:col-span-2">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Hey, I&apos;m{" "}
                  <span className="bg-muted-foreground dark:bg-white text-background px-2 rounded-md border border-border">
                    {data.name.split(" ")[0]}.
                  </span>{" "}
                  👋
                  <span className="block text-xl sm:text-2xl mt-4 text-muted-foreground font-normal max-w-xl">
                    {data.tagline}
                  </span>
                </h1>
                <p className="text-md text-muted-foreground/80 max-w-xl mx-auto lg:mx-0">
                  {data.bio}{" "}
                  <span className="inline">Based in {data.location}.</span>
                </p>
              </div>

              {data.skills && data.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {data.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="px-4 py-1.5 text-xs rounded-full bg-background/50 dark:bg-background/5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute -top-2 -right-4 w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div className="absolute -top-6 right-5 w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <div className="absolute top-8 -right-8 w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
              <div className="absolute bottom-12 -left-4 w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
              <div className="absolute -bottom-4 right-5 w-3 h-3 rounded-full bg-pink-400 animate-pulse" />

              <div className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-full transform rotate-6 hover:rotate-0 transition-transform duration-300 mx-auto md:ml-auto">
                <Avatar className="w-full h-full rounded-full border-[3px] border-background dark:border-background/10">
                  <AvatarImage
                    src={data.profilePicture ?? ""}
                    alt={data.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl">
                    {data.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}