import Link from "next/link";
import { bands } from "./bands-data";

export default function BrandPage() {
    return (
        <main className="page">
            <h1>Favorites Brands</h1>
            <p>เลือกวงดนตรีวงโปรดเพื่อดูรูปภาพและรายชื่อสมาชิกทั้งหมดในวง</p>

            <section className="courseGrid" style={{ marginTop: "1.5rem" }}>
                {bands.map((band) => (
                    <article key={band.id} className="courseCard">
                        <h2>
                            {band.name} <span style={{ fontSize: "1rem", color: "#6b7280" }}>({band.thaiName})</span>
                        </h2>
                        <p>{band.description}</p>
                        <p style={{ color: "#4b5563" }}>
                            สมาชิก: {band.members.length} คน
                        </p>
                        <div style={{ marginTop: "1rem" }}>
                            <Link
                                href={`/brand/${band.id}`}
                                style={{
                                    display: "inline-block",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#1d4ed8",
                                    color: "#ffffff",
                                    borderRadius: "0.375rem",
                                    textDecoration: "none",
                                    fontSize: "0.95rem",
                                }}
                            >
                                ดูสมาชิกในวง →
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
