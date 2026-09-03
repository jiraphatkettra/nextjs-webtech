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
    <main className="page">
      <div style={{ marginBottom: "1rem" }}>
        <Link
          href="/brand"
          style={{
            color: "#1d4ed8",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← ย้อนกลับไปหน้า Favorites Brands
        </Link>
      </div>

      <h1>
        {band.name} <span style={{ fontSize: "1.25rem", color: "#6b7280" }}>({band.thaiName})</span>
      </h1>
      <p style={{ color: "#4b5563", marginTop: "0.25rem" }}>{band.description}</p>

      {/* รูปภาพประจำวง */}
      <section style={{ marginBlock: "1.5rem" }}>
        <Image
          src={band.image}
          alt={`รูปภาพวง ${band.name}`}
          width={550}
          height={350}
          style={{
            maxWidth: "100%",
            width: "550px",
            height: "auto",
            display: "block",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
          }}
        />
      </section>

      {/* รายชื่อสมาชิกในวง */}
      <section className="courseCard" style={{ marginTop: "1rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>รายชื่อสมาชิกในวง</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {band.members.map((member) => (
            <li key={member.id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {member.image && (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={210}
                  style={{
                    width: "160px",
                    height: "210px",
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                    objectPosition: "top center",
                    border: "1px solid #d1d5db",
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <strong style={{ fontSize: "1.8rem", display: "block" }}>
                  {member.name || "____________________"}
                </strong>
                {member.role && (
                  <span style={{ color: "#4b5563", fontSize: "1.2rem" }}>
                    {member.role}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
