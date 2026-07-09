import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Upload,
  FileText,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Moon,
} from "lucide-react";
import { mockDocuments } from "@/lib/mock-data";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    onOpenChange(false);
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => go("/upload")}>
            <Upload className="mr-2 h-4 w-4" /> Upload document
          </CommandItem>
          <CommandItem onSelect={() => go("/documents")}>
            <FileText className="mr-2 h-4 w-4" /> Search documents
          </CommandItem>
          <CommandItem onSelect={toggleDark}>
            <Moon className="mr-2 h-4 w-4" /> Toggle dark mode
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Go to dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Go to settings
          </CommandItem>
          <CommandItem onSelect={() => go("/documents/product-requirements")}>
            <MessageSquare className="mr-2 h-4 w-4" /> Ask current document
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documents">
          {mockDocuments.slice(0, 5).map((d) => (
            <CommandItem key={d.id} onSelect={() => go(`/documents/${d.slug}`)}>
              <FileText className="mr-2 h-4 w-4" /> {d.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
