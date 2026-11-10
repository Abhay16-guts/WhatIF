import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import Home from './pages/Home';
import Create from './pages/Create';
import ScenarioDetail from './pages/ScenarioDetail';
import History from './pages/History';
import Compare from './pages/Compare';
import NotFound from './pages/NotFound';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-paper-100 text-ink">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/scenario/:id" element={<ScenarioDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
