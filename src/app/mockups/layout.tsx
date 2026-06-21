import MockupNav from "@/components/MockupNav";

export default function MockupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MockupNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
