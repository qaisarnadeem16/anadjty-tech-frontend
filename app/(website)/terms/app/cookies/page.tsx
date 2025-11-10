export const metadata = {
  title: "Cookies | AnadjyTech",
  description: "How AnadjyTech uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <main className="container mx-auto px-4 py-10 prose prose-invert">
      <h1>Cookies</h1>
      <p>Last updated: {new Date().toISOString().split("T")[0]}</p>
      <p>We use strictly necessary cookies for basic site features and may use analytics to understand aggregate usage. You can block cookies in your browser settings.</p>
      <h2>Analytics</h2>
      <p>If enabled in the future (e.g., Plausible or GA4), analytics cookies will help us measure visits and improve content. No personal profiles are created.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:contact@anadjytech.com">contact@anadjytech.com</a>.</p>
    </main>
  );
}
