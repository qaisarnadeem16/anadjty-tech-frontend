export const metadata = {
  title: "Terms of Service | AnadjyTech",
  description: "Terms and conditions for using AnadjyTech.",
};

export default function TermsPage() {
  return (
    <main className="prose mx-auto px-4 py-10">
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> {new Date().toISOString().split("T")[0]}</p>
      <h2>1. Who we are</h2>
      <p>AnadjyTech provides product guides and recommendations. We link to retailers and may earn commissions from qualifying purchases.</p>
      <h2>2. No warranties</h2>
      <p>Content is provided “as is”. We do not guarantee availability, prices, or retailer policies.</p>
      <h2>3. External links</h2>
      <p>Links to third-party sites are provided for convenience. Their shipping/returns/privacy policies apply on their sites.</p>
      <h2>4. Contact</h2>
      <p>contact@anadjytech.com</p>
    </main>
  );
}
