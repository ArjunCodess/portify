import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Float from "@/components/ui/float";
import { UserData } from "@/types";
import { Card } from "../ui/card";
import Socials from "./socials";
import ScrambleIn, { ScrambleInHandle } from "../ui/scramble-in";
import { useRef, useEffect } from "react";
import BlurFade from "../ui/blur-fade";

interface UserDetailsProps {
  data: UserData | null;
}

export default function UserDetails({ data }: UserDetailsProps) {
  const scrambleRef = useRef<ScrambleInHandle>(null);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        scrambleRef.current?.start();
      }, 500);
    }
  }, [data]);

  if (!data) return null;

  const fontHeadingClass = "font-" + data.font.heading;
  const fontContentClass = "font-" + data.font.content;

  return (
    <section className={fontContentClass}>
      {data.template === "minimal" && (
        <BlurFade delay={0.5}>
          <div className="flex flex-col items-center text-center space-y-4 px-4 sm:px-0">
            <Float amplitude={[10, 10, 10]} rotationRange={[10, 10, 10]}>
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-2 mb-4 mt-4 md:mt-0">
                <AvatarImage alt={data.name} src={data.profilePicture ?? ""} />
                <AvatarFallback>{data.name[0]}</AvatarFallback>
              </Avatar>
            </Float>

            <div className="space-y-4 max-w-sm sm:max-w-lg">
              <h1 className={`text-2xl sm:text-3xl font-bold ${fontHeadingClass} font-medium`}>
                Hi, I&apos;m{" "}
                <ScrambleIn
                  ref={scrambleRef}
                  text={data.name}
                  scrambleSpeed={70}
                  scrambledLetterCount={5}
                  autoStart={false}
                />
                . 👋
              </h1>
              <p className="text-sm text-foreground/95 mx-auto">
                {data.tagline && data.tagline}
                {data.tagline && !data.tagline.endsWith(".") && "."}
                {data.location && ` Based in ${data.location}.`}
              </p>
              <p className="text-sm text-foreground/70 mx-auto">{data.bio}</p>

              {data.skills && data.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 max-w-full overflow-hidden">
                  {data.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs whitespace-nowrap px-2 sm:px-3 py-0.5 sm:py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </BlurFade>
      )}

      {data.template === "pristine" && (
        <BlurFade delay={0.5}>
          <div className="bg-background/95 dark:bg-background/5 rounded-lg p-4 sm:p-8 md:p-10 backdrop-blur-sm sm:border border-border">
            <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start gap-4 sm:gap-6 sm:justify-between text-center sm:text-left">
              <div className="space-y-4 w-full">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${fontHeadingClass} font-medium`}
                >
                  I&apos;m{" "}
                  <span className="bg-muted-foreground dark:bg-white text-background px-2 rounded-md border border-border">
                    <ScrambleIn
                      ref={scrambleRef}
                      text={data.name.split(" ")[0]}
                      scrambleSpeed={100}
                      scrambledLetterCount={5}
                      autoStart={false}
                    />
                    .
                  </span>{" "}
                  👋
                </h1>
                <div className="space-y-2 text-sm max-w-full sm:max-w-sm md:max-w-md mx-auto sm:mx-0">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    {data.tagline && data.tagline}
                    {data.tagline && !data.tagline.endsWith(".") && "."}
                    {data.location && ` Based in ${data.location}.`}
                  </p>
                  <p className="text-sm text-muted-foreground/80">{data.bio}</p>
                </div>
                {data.skills && data.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-2 max-w-full overflow-hidden">
                    {data.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs rounded-full bg-muted hover:bg-muted/80 dark:bg-background/10 text-foreground/80 dark:text-foreground/70 border border-border whitespace-nowrap px-2 sm:px-3 py-0.5 sm:py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Float amplitude={[10, 10, 10]} rotationRange={[10, 10, 10]}>
                <div className="relative my-4 md:my-0">
                  <div className="absolute -top-1 -right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                  <div className="absolute -top-3 right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 animate-pulse" />
                  <div className="absolute top-4 -right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
                  <div className="absolute bottom-6 -left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-pulse" />
                  <div className="absolute -bottom-2 right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400 animate-pulse" />
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full transform transition-transform duration-300 mx-auto md:ml-auto">
                    <Avatar className="w-full h-full rounded-full border-[3px] border-border dark:border-border/10">
                      <AvatarImage
                        src={data.profilePicture ?? ""}
                        alt={data.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl sm:text-4xl">
                        {data.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Float>
            </div>
          </div>
        </BlurFade>
      )}

      {data.template === "vibrant" && (
        <BlurFade delay={0.5}>
          <div className="w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-center px-4 sm:px-6 py-4">
              <Float amplitude={[10, 10, 10]} rotationRange={[8, 8, 8]} className="order-first md:order-last lg:order-last md:col-span-1">
                <div className="relative mt-4 mb-8 md:my-0 mx-auto md:mx-8 max-w-[280px]">
                  <div className="absolute -top-2 -right-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse" />
                  <div className="absolute -top-6 right-5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 animate-pulse" />
                  <div className="absolute top-4 -right-6 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 animate-pulse" />
                  <div className="absolute bottom-6 -left-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-400 animate-pulse" />
                  <div className="absolute -bottom-2 right-5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-400 animate-pulse" />
                  <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] rounded-full transform transition-transform duration-300 mx-auto">
                    <Avatar className="w-full h-full rounded-full border-[3px] border-border dark:border-border/10">
                      <AvatarImage
                        src={data.profilePicture ?? ""}
                        alt={data.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl sm:text-4xl">
                        {data.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Float>

              <div className="space-y-6 text-center lg:text-left md:col-span-1 lg:col-span-2 order-last md:order-first lg:order-first">
                <div className="space-y-4">
                  <h1
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${fontHeadingClass} font-medium`}
                  >
                    Hey, I&apos;m{" "}
                    <span className="bg-muted-foreground dark:bg-white text-background px-2 rounded-md border border-border">
                      <ScrambleIn
                        ref={scrambleRef}
                        text={data.name.split(" ")[0]}
                        scrambleSpeed={100}
                        scrambledLetterCount={5}
                        autoStart={false}
                      />
                      .
                    </span>{" "}
                    👋
                  </h1>
                  <div className="space-y-2 text-sm max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0">
                    <p className="text-base sm:text-lg text-muted-foreground">
                      {data.tagline}
                      {data.tagline && !data.tagline.endsWith(".") && "."}
                      {data.location && ` Based in ${data.location}.`}
                    </p>
                    <p className="text-sm text-muted-foreground/80">{data.bio}</p>
                  </div>
                </div>

                {data.skills && data.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start max-w-full overflow-hidden">
                    {data.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-background/50 dark:bg-background/5 whitespace-nowrap"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </BlurFade>
      )}

      {data.template === "elegant" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-x-0 md:gap-x-4 min-h-[20rem] sm:min-h-[25rem] text-center md:text-left">
          <Card className="col-span-1 md:col-start-3 p-0 w-full">
            <Avatar className="w-full h-full rounded-lg">
              <AvatarImage
                src={data.profilePicture ?? ""}
                alt={data.name}
                className="object-cover w-auto h-full"
              />
              <AvatarFallback className="text-2xl sm:text-4xl">
                {data.name[0]}
              </AvatarFallback>
            </Avatar>
          </Card>
          <Card className="col-span-2 md:col-start-1 md:row-start-1 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-r from-accent/40 dark:from-accent/20 to-background">
            <div className="space-y-2 sm:space-y-3">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-medium leading-tight tracking-tight ${fontHeadingClass} font-medium`}
              >
                Hello, I&apos;m{" "}
                <ScrambleIn
                  ref={scrambleRef}
                  text={data.name}
                  scrambleSpeed={70}
                  scrambledLetterCount={5}
                  autoStart={false}
                />
                . 👋
              </h1>
              {data.tagline && (
                <p className="text-md sm:text-xl text-muted-foreground">
                  {data.tagline}
                </p>
              )}
            </div>
            {data.bio && (
              <p className="text-sm sm:text-md text-muted-foreground/80 mt-4 mb-6">
                {data.bio}
                {data.location && ` Based in ${data.location}.`}
              </p>
            )}
            {data.skills && data.skills.length > 0 && (
              <div className="flex flex-row sm:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 mb-6 max-w-full overflow-hidden">
                {data.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full bg-background/50 dark:bg-background/5 whitespace-nowrap"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            <Socials data={data} />
          </Card>
        </div>
      )}
    </section>
  );
}