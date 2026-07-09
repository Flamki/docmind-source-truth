import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — DocMind" }] }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell breadcrumb={[{ label: "Settings" }]}>
      <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-text-secondary">Manage your profile, workspace, and appearance.</p>

        <div className="mt-8 space-y-5">
          <Section title="Profile" description="Your personal details.">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input defaultValue="Ayush Singh" />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input defaultValue="ayush@docmind.app" />
              </div>
            </div>
            <div className="mt-4 flex justify-end"><Button size="sm">Save</Button></div>
          </Section>

          <Section title="Workspace" description="Defaults for new documents.">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Workspace name</Label>
                <Input defaultValue="Personal" />
              </div>
              <div className="space-y-1.5">
                <Label>Default visibility</Label>
                <RadioGroup defaultValue="private" className="grid grid-cols-2 gap-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm">
                    <RadioGroupItem value="private" /> Private
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm">
                    <RadioGroupItem value="workspace" /> Workspace
                  </label>
                </RadioGroup>
              </div>
            </div>
          </Section>

          <Section title="Appearance" description="Choose your theme.">
            <div className="grid grid-cols-3 gap-2">
              {["Light", "Dark", "System"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    if (t === "Dark") document.documentElement.classList.add("dark");
                    if (t === "Light") document.documentElement.classList.remove("dark");
                  }}
                  className="rounded-md border border-border bg-background p-4 text-sm font-medium hover:border-text-muted"
                >
                  {t}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Danger zone" description="Irreversible actions." destructive>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">Delete workspace</div>
                <div className="mt-0.5 text-xs text-text-secondary">Removes all documents, chats, and citations.</div>
              </div>
              <Button variant="destructive" size="sm">Delete workspace</Button>
            </div>
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, description, children, destructive }: { title: string; description: string; children: React.ReactNode; destructive?: boolean }) {
  return (
    <section className={`rounded-xl border ${destructive ? "border-destructive/30" : "border-border"} bg-surface p-6`}>
      <div className="mb-4">
        <h2 className={`text-base font-semibold ${destructive ? "text-destructive" : ""}`}>{title}</h2>
        <p className="mt-0.5 text-xs text-text-secondary">{description}</p>
      </div>
      {children}
    </section>
  );
}
