import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

