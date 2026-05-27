import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import our new components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Navbar appears at the top of every page */}
      <Navbar />

      {/* minHeight ensures the footer stays at the bottom even if the page has little content */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<div className="text-center mt-60"><h1>TechTown is Alive!</h1><p>Wait until you see the new React UI.</p></div>} />
        </Routes>
      </main>

      {/* Footer appears at the bottom of every page */}
      <Footer />
    </>
  );
}

export default App;