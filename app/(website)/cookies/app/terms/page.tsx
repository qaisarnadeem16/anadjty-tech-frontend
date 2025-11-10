export const metadata = {
  title: "Terms of Service | AnadjyTech",
  description: "Terms and conditions for using AnadjyTech."
};
export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-10 prose prose-invert">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toISOString().split("T")[0]}</p>
      <h2>Who we are</h2>
      <p>AnadjyTech publishes guides and recommendations. We link to retailers and may earn commissions from qualifying purchases.</p>
      <h2>No warranties</h2>
      <p>Content is provided “as is”. Prices/availability can change. Retailer policies apply on their sites.</p>
      <h2>Contact</h2>
      <p>contact@anadjytech.com</p>
    </main>
  );
}
