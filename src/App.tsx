import { Toaster } from '@/components/ui/sonner';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Blog from './sections/Blog';  // Import the Blog section
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blog />        {/* Add Blog section */}
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
