import { AccentColorProvider } from './context/AccentColorContext';
import { IntroProvider } from './context/IntroContext';
import { ToastProvider } from './components/Toast';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { guestFromPath } from './lib/guest';
import CoverScreen from './components/CoverScreen';
import BgMusic from './components/BgMusic';
import BgVideo from './components/BgVideo';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Quote from './sections/Quote';
import BrideGroom from './sections/BrideGroom';
import LoveStory from './sections/LoveStory';
import Countdown from './sections/Countdown';
import EventDetails from './sections/EventDetails';
import LiveStream from './sections/LiveStream';
import DressCode from './sections/DressCode';
import Gallery from './sections/Gallery';
import Rsvp from './sections/Rsvp';
import Gift from './sections/Gift';
import Closing from './sections/Closing';
import Footer from './sections/Footer';

export default function App() {
  const guest = guestFromPath();
  useDocumentTitle(
    guest === 'Guest'
      ? 'The Wedding of Qahhar & Risma'
      : `Qahhar & Risma • Invitation for ${guest}`,
  );

  return (
    <AccentColorProvider>
      <IntroProvider>
        <ToastProvider>
          <BgVideo />
          <CoverScreen />
          <Navbar />
          <main>
            <Hero />
            <Quote />
            <BrideGroom />
            <LoveStory />
            <Countdown />
            <EventDetails />
            <LiveStream />
            <DressCode />
            <Gallery />
            <Rsvp />
            <Gift />
            <Closing />
          </main>
          <Footer />
          <BgMusic />
        </ToastProvider>
      </IntroProvider>
    </AccentColorProvider>
  );
}
