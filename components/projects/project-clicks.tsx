interface ProjectLinkProps {
  href: string | null;
  projectId: string;
  children: React.ReactNode;
}

export function ProjectLink({ href, projectId, children }: ProjectLinkProps) {
  if (!href) return null;

  const trackClick = async () => {
    try {
      await fetch("/api/projects/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackClick();
    window.open(href, "_blank");
  };

  return (
    <a href={href} onClick={handleClick} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}