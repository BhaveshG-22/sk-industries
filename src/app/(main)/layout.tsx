import Navbar from "@/components/Navbar";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
