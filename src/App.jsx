import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderFab from "./components/OrderFab";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import OtherPackaging from "./pages/OtherPackaging";
import NotFound from "./pages/NotFound";

/**
 * Komponen pembantu untuk menggulir halaman ke atas setiap kali rute berpindah
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-fade flex-1 flex flex-col">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/produk" element={<Products />} />
        <Route path="/kemasan-lainnya" element={<OtherPackaging />} />
        <Route path="/produk/kemasan-lainnya" element={<OtherPackaging />} />
        <Route path="/pesan" element={<Order />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/galeri" element={<Gallery />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-keju text-tua selection:bg-mentega selection:text-tua relative">
        <Header />
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
        <OrderFab />
      </div>
    </BrowserRouter>
  );
}
