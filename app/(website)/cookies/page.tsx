export const metadata = {
  title: "Cookies | AnadjyTech",
  description: "How AnadjyTech uses cookies and similar technologies."
};
export default function CookiesPage() {
  return (
    <main className="prose mx-auto px-4 py-10">
      <h1>Cookies</h1>
      <p><strong>Last updated:</strong> {new Date().toISOString().split("T")[0]}</p>
      <p>We use strictly necessary cookies and may add privacy-friendly analytics later (aggregate only). You can block cookies in your browser settings.</p>
      <p><strong>Contact:</strong> <a href="mailto:contact@anadjytech.com">contact@anadjytech.com</a></p>
    </main>
  );
}
