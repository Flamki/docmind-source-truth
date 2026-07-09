"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FileText, Settings, MessageSquare, Moon } from "lucide-react";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const go = (to: string) => {
    onOpenChange(false);
    router.push(to);
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
          <CommandItem onSelect={() => go("/documents")}>
            <FileText className="mr-2 h-4 w-4" /> Search documents
          </CommandItem>
          <CommandItem onSelect={toggleDark}>
            <Moon className="mr-2 h-4 w-4" /> Toggle dark mode
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go("/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Go to settings
          </CommandItem>
          <CommandItem onSelect={() => go("/documents")}>
            <MessageSquare className="mr-2 h-4 w-4" /> Open document workspace
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
