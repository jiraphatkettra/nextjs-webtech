import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bands } from "../bands-data";

export function generateStaticParams() {
  return bands.map((band) => ({
    id: band.id,
  }));
}

export default async function BandDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const band = bands.find((b) => b.id.toLowerCase() === id.toLowerCase());

  if (!band) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-16">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/brand"
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-text-muted transition-all duration-200 hover:bg-white/[0.08] hover:text-text-primary"
        >
          <span>←</span>
          <span>ย้อนกลับไปหน้า Favorites Brands</span>
        </Link>
      </div>

      <div className="border-b border-white/[0.06] pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient-apple">
          {band.name}{" "}
          <span className="text-xl sm:text-2xl text-text-muted font-normal">({band.thaiName})</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
          {band.description}
        </p>
      </div>

      {/* รูปภาพประจำวง (Apple Bento Showcase) */}
      <section className="my-8 apple-card rounded-3xl p-4 sm:p-6 overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] max-w-[640px]">
          <Image
            src={band.image}
            alt={`รูปภาพวง ${band.name}`}
            width={640}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-102"
          />
        </div>
      </section>

      {/* รายชื่อสมาชิกในวง (Apple Bento Member Grid) */}
      <section className="apple-card rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">รายชื่อสมาชิกในวง</h2>
          <span className="text-xs font-mono text-text-muted">{band.members.length} Members</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {band.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3.5 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.12]"
            >
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={90}
                  height={110}
                  className="w-[72px] h-[90px] rounded-xl border border-white/[0.08] object-cover object-top shrink-0 shadow-md"
                />
              )}
              <div className="min-w-0 flex-1">
                <strong className="text-base sm:text-lg block text-text-primary truncate">
                  {member.name || "____________________"}
                </strong>
                {member.role && (
                  <span className="text-xs text-accent font-medium mt-0.5 block">{member.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
