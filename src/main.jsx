import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  BusFront,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Share2,
  Gem,
  HeartHandshake,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TentTree,
  UsersRound,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

const image = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const phone = '+91 99999 99999';
const whatsappUrl = 'https://wa.me/919999999999';

const pages = [
  ['home', 'Home'],
  ['fleet', 'Fleet'],
  ['tours', 'Tours'],
  ['services', 'Services'],
  ['about', 'About'],
  ['gallery', 'Gallery'],
  ['reviews', 'Reviews'],
  ['contact', 'Contact'],
];

const fleet = [
  {
    title: 'Private Cars',
    capacity: '4-7 Seats',
    climate: 'AC Sedan / SUV',
    use: 'Airport, family and local travel',
    image: image('photo-1549317661-bd32c8ce0db2', 900),
    icon: CarFront,
  },
  {
    title: 'Tempo Travellers',
    capacity: '9-26 Seats',
    climate: 'AC / Non AC',
    use: 'Pilgrimage, wedding and group tours',
    image: image('photo-1500530855697-b586d89ba3ee', 900),
    icon: UsersRound,
  },
  {
    title: 'Tourist Buses',
    capacity: '32-56 Seats',
    climate: 'Luxury coach options',
    use: 'Corporate, school and long routes',
    image: image('photo-1544620347-c4fd4a3d5957', 900),
    icon: BusFront,
  },
  {
    title: 'Wedding Transport',
    capacity: 'Custom fleet',
    climate: 'Guest pickup planning',
    use: 'Baraat, family and event transfers',
    image: image('photo-1511285560929-80b456fea0bc', 900),
    icon: HeartHandshake,
  },
];

const destinations = [
  {
    name: 'Khatu Shyam Ji',
    route: 'Farrukhnagar to Rajasthan',
    image: image('photo-1599661046289-e31897846e41', 900),
    days: '1-2 Days',
  },
  {
    name: 'Salasar Balaji',
    route: 'Family pilgrimage tours',
    image: image('photo-1623745493572-737d7f9ef9f2', 900),
    days: '1 Day',
  },
  {
    name: 'Manali',
    route: 'Himachal hill station trips',
    image: image('photo-1626621341517-bbf3d9990a23', 900),
    days: '3-5 Days',
  },
  {
    name: 'Rohtang Pass',
    route: 'Snow and mountain travel',
    image: image('photo-1605649487212-47bdab064df7', 900),
    days: '4-6 Days',
  },
  {
    name: 'Haridwar Rishikesh',
    route: 'Ganga darshan and group trips',
    image: image('photo-1581793745862-99fde7fa73d2', 900),
    days: '2-3 Days',
  },
  {
    name: 'Shimla Kufri',
    route: 'Weekend hill station package',
    image: image('photo-1597074866923-dc0589150358', 900),
    days: '3-4 Days',
  },
];

const services = [
  ['Bus Rental', 'Luxury and standard tourist buses for group travel, schools, offices and functions.', BusFront],
  ['Tempo Traveller Booking', 'Clean tempo travellers with experienced drivers for family and pilgrimage journeys.', UsersRound],
  ['Pilgrimage Tours', 'Khatu Shyam Ji, Salasar Balaji, Haridwar, Mathura, Vrindavan and custom religious routes.', Sparkles],
  ['Hill Station Tours', 'Manali, Shimla, Mussoorie, Rohtang Pass and North India mountain itineraries.', Mountain],
  ['Wedding Booking', 'Coordinated guest pickup, multiple vehicles and reliable route planning for events.', HeartHandshake],
  ['Corporate Travel', 'Professional fleet support for company trips, staff movement and conference travel.', BriefcaseBusiness],
];

const stats = [
  ['26+', 'Years Experience', ShieldCheck],
  ['24/7', 'Booking Support', Clock3],
  ['100%', 'Verified Drivers', CheckCircle2],
  ['Best', 'Affordable Pricing', Gem],
  ['Group', 'Tours Ready', UsersRound],
  ['Event', 'Wedding Booking', HeartHandshake],
];

const gallery = [
  image('photo-1544620347-c4fd4a3d5957', 800),
  image('photo-1519003722824-194d4455a60c', 800),
  image('photo-1500530855697-b586d89ba3ee', 800),
  image('photo-1544735716-392fe2489ffa', 800),
  image('photo-1626621341517-bbf3d9990a23', 800),
  image('photo-1488646953014-85cb44e25828', 800),
  image('photo-1511285560929-80b456fea0bc', 800),
  image('photo-1597074866923-dc0589150358', 800),
];

const reviews = [
  ['Rajesh Yadav', 'Best tempo traveller service for our family Khatu Shyam Ji trip. Clean vehicle and polite driver.', 'Farrukhnagar'],
  ['Pooja Sharma', 'Booked a tourist bus for wedding guests. Timing, comfort and coordination were excellent.', 'Gurugram'],
  ['Amit Chauhan', 'Reliable agency for Manali tour. Transparent price and very smooth journey.', 'Jhajjar'],
  ['Neeraj Rao', 'The driver knew every halt and route. Our Salasar Balaji trip felt organized from start to finish.', 'Pataudi'],
];

function useScrollReveal(activePage) {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.16 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activePage]);
}

function useCursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (event) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
}

function SectionHead({ icon: Icon, label, title, text }) {
  return (
    <motion.div 
      className="section-head" 
      data-reveal
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p 
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {Icon && <Icon size={16} />} {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p 
          className="section-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}

function FleetCards({ compact = false }) {
  return (
    <motion.div className={`fleet-grid ${compact ? 'compact-grid' : ''}`}>
      {fleet.map(({ title, capacity, climate, use, image: src, icon: Icon }, index) => (
        <motion.article 
          className="fleet-card" 
          key={title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            y: -12,
            transition: { duration: 0.3 }
          }}
        >
          <img src={src} alt={`${title} for RAO Bus Service`} />
          <motion.div 
            className="fleet-overlay"
            initial={{ background: 'linear-gradient(180deg, transparent 20%, rgba(3,7,18,0.22) 45%, rgba(3,7,18,0.95) 100%)' }}
            whileHover={{ 
              background: 'linear-gradient(180deg, rgba(255,122,26,0.05) 20%, rgba(3,7,18,0.35) 45%, rgba(3,7,18,0.98) 100%)',
              transition: { duration: 0.4 }
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.12 + 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Icon size={28} />
            </motion.div>
            <h3>{title}</h3>
            <p>{use}</p>
            <div className="specs">
              <span>{capacity}</span>
              <span>{climate}</span>
              <span>Driver Included</span>
            </div>
            <motion.button 
              type="button" 
              onClick={() => window.dispatchEvent(new CustomEvent('go-page', { detail: 'contact' }))}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(255,122,26,0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Vehicle <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
}

function DestinationCards() {
  return (
    <motion.div className="destination-grid">
      {destinations.map((destination, index) => (
        <motion.article 
          className="destination-card" 
          key={destination.name}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.3 }
          }}
        >
          <motion.img 
            src={destination.image} 
            alt={destination.name}
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>{destination.route}</span>
            <h3>{destination.name}</h3>
            <small>{destination.days}</small>
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
}

function StatsGrid() {
  return (
    <motion.div className="feature-grid">
      {stats.map(([value, label, Icon], index) => (
        <motion.article 
          className="feature-card" 
          key={label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ 
            y: -8,
            background: 'rgba(255,122,26,0.14)',
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={26} />
          </motion.div>
          <motion.strong
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.1, duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {value}
          </motion.strong>
          <span>{label}</span>
        </motion.article>
      ))}
    </motion.div>
  );
}

function BookingForm() {
  return (
    <motion.form 
      className="booking-form" 
      data-reveal 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.3 }}
      onSubmit={(event) => event.preventDefault()}
    >
      <motion.input 
        type="text" 
        placeholder="Name" 
        aria-label="Name"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.input 
        type="tel" 
        placeholder="Mobile" 
        aria-label="Mobile"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.input 
        type="text" 
        placeholder="Pickup" 
        aria-label="Pickup"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.input 
        type="text" 
        placeholder="Destination" 
        aria-label="Destination"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.input 
        type="date" 
        aria-label="Date"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.select 
        aria-label="Vehicle Type" 
        defaultValue=""
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      >
        <option value="" disabled>Vehicle Type</option>
        <option>Private Car</option>
        <option>Tempo Traveller</option>
        <option>Tourist Bus</option>
        <option>Wedding Fleet</option>
      </motion.select>
      <motion.input 
        type="number" 
        min="1" 
        placeholder="Number of Travelers" 
        aria-label="Number of Travelers"
        whileFocus={{ 
          boxShadow: '0 0 0 4px rgba(255,122,26,0.2)',
          scale: 1.02
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.button 
        type="submit"
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 20px 50px rgba(255,122,26,0.4)'
        }}
        whileTap={{ scale: 0.98 }}
      >
        Submit Inquiry <ArrowRight size={18} />
      </motion.button>
    </motion.form>
  );
}

function Hero({ setPage }) {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-noise" />
      <div className="hero-road" />
      <div className="floating-lights"><span /><span /><span /></div>
      <motion.div className="hero-content">
        <motion.p 
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <MapPin size={16} /> Farrukhnagar, Gurugram, Haryana
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          26+ Years Trusted Travel Partner
        </motion.h1>
        <motion.p 
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Bus rental, tempo traveller booking, pilgrimage tours, hill station tours and private travel services with dependable local route expertise.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <motion.button 
            className="btn primary" 
            onClick={() => setPage('contact')}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 50px rgba(255,122,26,0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Book Now <ArrowRight size={18} />
          </motion.button>
          <motion.button 
            className="btn secondary" 
            onClick={() => setPage('contact')}
            whileHover={{ 
              scale: 1.05,
              background: 'rgba(255,255,255,0.15)',
              boxShadow: '0 20px 40px rgba(255,122,26,0.2)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Quote
          </motion.button>
          <motion.a 
            className="btn whatsapp"
            href={whatsappUrl}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(37,211,102,0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={18} /> WhatsApp Inquiry
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.div 
        className="hero-bus"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="bus-shell">
          <span className="window w1" />
          <span className="window w2" />
          <span className="window w3" />
          <span className="bus-light" />
          <span className="wheel left" />
          <span className="wheel right" />
        </div>
      </motion.div>
      <motion.div className="hero-cards">
        {[
          ['Tempo Traveller Available', UsersRound],
          ['24/7 Booking', CalendarCheck],
          ['Wedding Tours', Sparkles],
        ].map(([text, Icon], index) => (
          <motion.article 
            className="float-card" 
            key={text}
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.8 + index * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.08,
              y: -4,
              boxShadow: '0 20px 40px rgba(255,122,26,0.2)',
              background: 'rgba(8, 33, 74, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={20} />
            <span>{text}</span>
          </motion.article>
        ))}
      </motion.div>
      <div className="wave" />
    </section>
  );
}

function PageHero({ icon: Icon, label, title, text, imageId }) {
  return (
    <motion.section 
      className="page-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-hero-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,5,16,0.94), rgba(2,5,16,0.5)), url(${image(imageId, 1800)})` }} />
      <motion.div className="page-hero-content">
        <motion.p 
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Icon size={16} /> {label}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

function HomePage({ setPage, setLightbox }) {
  return (
    <>
      <Hero setPage={setPage} />
      <section className="section">
        <SectionHead icon={BusFront} label="Premium Fleet" title="Clean, comfortable vehicles for every journey" />
        <FleetCards compact />
      </section>
      <section className="section destinations">
        <div className="route-map" aria-hidden="true" />
        <SectionHead icon={Mountain} label="Popular Tours" title="Pilgrimage routes, hill stations and group escapes" />
        <DestinationCards />
      </section>
      <section className="section why">
        <SectionHead icon={ShieldCheck} label="Why Choose Us" title="Built on trust, comfort and local route expertise" />
        <StatsGrid />
      </section>
      <GallerySection setLightbox={setLightbox} compact />
      <ReviewsSection />
      <BookingSection />
    </>
  );
}

function FleetPage() {
  return (
    <>
      <PageHero icon={BusFront} label="Fleet" title="Vehicles for private, group and event travel" text="Choose the right vehicle for your route, group size and budget, with driver support included." imageId="photo-1544620347-c4fd4a3d5957" />
      <section className="section"><FleetCards /></section>
      <section className="section split-showcase">
        <div data-reveal>
          <p className="eyebrow"><Award size={16} /> Comfort Standards</p>
          <h2>Every booking is planned around timing, route and passenger comfort.</h2>
        </div>
        <div className="check-list" data-reveal>
          {['Clean interiors', 'Experienced local drivers', 'AC and Non AC options', 'Wedding and group coordination', 'Outstation route support'].map((item) => (
            <span key={item}><CheckCircle2 size={18} /> {item}</span>
          ))}
        </div>
      </section>
    </>
  );
}

function ToursPage() {
  return (
    <>
      <PageHero icon={TentTree} label="Tours" title="North India travel packages for families and groups" text="Pilgrimage, mountain, weekend and custom private tours from Farrukhnagar and Gurugram." imageId="photo-1626621341517-bbf3d9990a23" />
      <section className="section destinations">
        <div className="route-map" aria-hidden="true" />
        <DestinationCards />
      </section>
      <section className="section itinerary-grid">
        {['Pickup planning', 'Route halts', 'Driver coordination', 'Flexible return'].map((item, index) => (
          <article className="mini-card" data-reveal style={{ '--delay': `${index * 0.08}s` }} key={item}>
            <Map size={24} />
            <strong>{item}</strong>
            <p>Designed for smooth family and group journeys.</p>
          </article>
        ))}
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero icon={BriefcaseBusiness} label="Services" title="Transport services for every important journey" text="From private cars to full wedding fleets, RAO BUS Service handles vehicle planning with a premium local approach." imageId="photo-1519003722824-194d4455a60c" />
      <section className="section services-grid">
        {services.map(([title, text, Icon], index) => (
          <motion.article 
            className="service-card" 
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
              y: -8,
              background: 'rgba(255,122,26,0.08)',
              boxShadow: '0 20px 50px rgba(255,122,26,0.15)',
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
            >
              <Icon size={30} />
            </motion.div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero icon={ShieldCheck} label="About RAO" title="A trusted local travel partner since 26+ years" text="Serving Farrukhnagar, Gurugram and nearby Haryana routes with reliable vehicles, experienced drivers and practical travel planning." imageId="photo-1544735716-392fe2489ffa" />
      <section className="section about-panel">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p 
            className="eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <MapPin size={16} /> Local Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Premium service, grounded in everyday Indian travel needs.
          </motion.h2>
          <motion.p 
            className="section-copy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            RAO BUS Service / Rao Tour and Travel focuses on clean vehicles, honest pricing, route confidence and dependable coordination for families, companies, schools, wedding groups and pilgrimage travelers.
          </motion.p>
        </motion.div>
        <StatsGrid />
      </section>
    </>
  );
}

function GallerySection({ setLightbox, compact = false }) {
  const visible = compact ? gallery.slice(0, 6) : gallery;
  return (
    <section className="section gallery-section">
      <SectionHead icon={Sparkles} label="Travel Gallery" title="Real road-trip energy, presented with a premium finish" />
      <motion.div className="gallery">
        {visible.map((src, index) => (
          <motion.button 
            className="gallery-item" 
            key={src}
            onClick={() => setLightbox(src)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <motion.img 
              src={src} 
              alt="RAO travel service gallery"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              View Journey
            </motion.span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}

function GalleryPage({ setLightbox }) {
  return (
    <>
      <PageHero icon={Sparkles} label="Gallery" title="Buses, tours, weddings and mountain journeys" text="A premium visual gallery inspired by Indian tourist transport, group travel and scenic North India routes." imageId="photo-1488646953014-85cb44e25828" />
      <GallerySection setLightbox={setLightbox} />
    </>
  );
}

function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActiveReview((current) => (current + 1) % reviews.length), 3800);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="section reviews">
      <SectionHead icon={Star} label="Customer Reviews" title="Families, groups and events travel with confidence" />
      <motion.div className="review-stage">
        {reviews.map(([name, text, city], index) => (
          <motion.article 
            className={`review-card ${activeReview === index ? 'active' : ''}`} 
            key={name}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={activeReview === index ? 
              { opacity: 1, x: 0, scale: 1 } : 
              { opacity: 0, x: 40, scale: 0.96 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ pointerEvents: activeReview === index ? 'auto' : 'none' }}
          >
            <motion.div 
              className="avatar"
              initial={{ scale: 0 }}
              animate={activeReview === index ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.1, duration: 0.4, type: 'spring' }}
            >
              {name.split(' ').map((part) => part[0]).join('')}
            </motion.div>
            <motion.div 
              className="stars"
              initial={{ opacity: 0 }}
              animate={activeReview === index ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {Array.from({ length: 5 }).map((_, star) => (
                <motion.div
                  key={star}
                  animate={activeReview === index ? { y: [0, -2, 0] } : {}}
                  transition={{ delay: star * 0.1 + 0.2, duration: 0.6, repeat: Infinity }}
                >
                  <Star size={17} fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={activeReview === index ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {text}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={activeReview === index ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {name}
            </motion.h3>
            <motion.span
              initial={{ opacity: 0 }}
              animate={activeReview === index ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {city}
            </motion.span>
          </motion.article>
        ))}
      </motion.div>
      <motion.div className="carousel-controls">
        <motion.button 
          onClick={() => setActiveReview((activeReview + reviews.length - 1) % reviews.length)} 
          aria-label="Previous review"
          whileHover={{ scale: 1.1, background: 'rgba(255,122,26,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button 
          onClick={() => setActiveReview((activeReview + 1) % reviews.length)} 
          aria-label="Next review"
          whileHover={{ scale: 1.1, background: 'rgba(255,122,26,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}

function ReviewsPage() {
  return (
    <>
      <PageHero icon={Star} label="Reviews" title="Trusted by families, wedding hosts and local groups" text="A polished testimonial experience with auto-sliding review cards and animated star ratings." imageId="photo-1511285560929-80b456fea0bc" />
      <ReviewsSection />
    </>
  );
}

function BookingSection() {
  return (
    <section className="section booking">
      <motion.div 
        className="booking-copy"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p 
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <MessageCircle size={16} /> Quick Inquiry
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Tell us your route. We will arrange the right vehicle.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          For pilgrimage tours, wedding guest transport, school trips, office travel and private family journeys from Farrukhnagar and Gurugram.
        </motion.p>
        <motion.div 
          className="contact-strip"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.a 
            href={`tel:${phone.replaceAll(' ', '')}`}
            whileHover={{ x: 4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={18} /> {phone}
          </motion.a>
          <motion.a 
            href={whatsappUrl}
            whileHover={{ x: 4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={18} /> WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
      <BookingForm />
    </section>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero icon={Phone} label="Contact" title="Book your vehicle or request a quote" text="Share your pickup, destination, date and group size. The team can arrange cars, tempo travellers, buses and wedding fleets." imageId="photo-1544620347-c4fd4a3d5957" />
      <BookingSection />
      <section className="section contact-page-grid">
        {[
          [Phone, 'Phone', `tel:${phone.replaceAll(' ', '')}`, phone],
          [MessageCircle, 'WhatsApp', whatsappUrl, 'Instant inquiry'],
          [MapPin, 'Location', 'https://maps.google.com/?q=Farrukhnagar%20Gurugram%20Haryana', 'Farrukhnagar, Gurugram, Haryana'],
          [Mail, 'Email', 'mailto:booking@raobusservice.in', 'booking@raobusservice.in'],
        ].map(([Icon, title, link, text], index) => (
          <motion.article 
            className="contact-card" 
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 50px rgba(255,122,26,0.2)',
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
            >
              <Icon size={24} />
            </motion.div>
            <h3>{title}</h3>
            <motion.a 
              href={link}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {text}
            </motion.a>
          </motion.article>
        ))}
      </section>
    </>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  useScrollReveal(page);
  useCursorGlow();

  useEffect(() => {
    const go = (event) => setPage(event.detail);
    window.addEventListener('go-page', go);
    return () => window.removeEventListener('go-page', go);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, [page]);

  const pageMap = {
    home: <HomePage setPage={setPage} setLightbox={setLightbox} />,
    fleet: <FleetPage />,
    tours: <ToursPage />,
    services: <ServicesPage />,
    about: <AboutPage />,
    gallery: <GalleryPage setLightbox={setLightbox} />,
    reviews: <ReviewsPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      <motion.div 
        className="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, visibility: 'hidden' }}
        transition={{ duration: 0.6, delay: 1.35 }}
      >
        <motion.div 
          className="loader-mark"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <BusFront size={34} />
        </motion.div>
      </motion.div>
      <div className="cursor-glow" />

      <motion.header 
        className="site-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button 
          className="brand brand-button" 
          onClick={() => setPage('home')} 
          aria-label="RAO BUS Service home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="brand-icon"><BusFront size={22} /></span>
          <span><strong>RAO BUS Service</strong><small>Rao Tour and Travel</small></span>
        </motion.button>
        <nav className={menuOpen ? 'open' : ''}>
          {pages.map(([id, label]) => (
            <motion.button 
              className={page === id ? 'active' : ''} 
              key={id} 
              onClick={() => setPage(id)}
              whileHover={{ color: '#ffbd59' }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.button>
          ))}
        </nav>
        <motion.a 
          className="nav-call" 
          href={`tel:${phone.replaceAll(' ', '')}`}
          whileHover={{ 
            scale: 1.05,
            background: 'rgba(255,122,26,0.28)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone size={17} /> Call Now
        </motion.a>
        <motion.button 
          className="menu-toggle" 
          onClick={() => setMenuOpen((open) => !open)} 
          aria-label="Toggle navigation"
          animate={{ rotate: menuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </motion.header>

      <AnimatePresence mode="wait">
        <motion.main 
          className="page-shell" 
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {pageMap[page]}
        </motion.main>
      </AnimatePresence>

      <motion.footer 
        className="footer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="brand brand-button" 
            onClick={() => setPage('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="brand-icon"><BusFront size={22} /></span>
            <span><strong>RAO BUS Service</strong><small>Rao Tour and Travel</small></span>
          </motion.button>
          <p>Premium transport and travel services from Farrukhnagar, Gurugram, Haryana.</p>
        </motion.div>
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href={`tel:${phone.replaceAll(' ', '')}`}
            whileHover={{ x: 4, color: '#ffbd59' }}
          >
            <Phone size={17} /> {phone}
          </motion.a>
          <motion.a 
            href={whatsappUrl}
            whileHover={{ x: 4, color: '#ffbd59' }}
          >
            <MessageCircle size={17} /> WhatsApp Booking
          </motion.a>
          <motion.a 
            href="https://maps.google.com/?q=Farrukhnagar%20Gurugram%20Haryana"
            whileHover={{ x: 4, color: '#ffbd59' }}
          >
            <MapPin size={17} /> Map Preview
          </motion.a>
        </motion.div>
        <motion.div 
          className="social"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#" 
            aria-label="Facebook"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={19} />
          </motion.a>
          <motion.a 
            href="#" 
            aria-label="Instagram"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={19} />
          </motion.a>
        </motion.div>
        <small>(c) {year} RAO BUS Service. Premium local travel booking UI.</small>
      </motion.footer>

      <AnimatePresence>
        {lightbox && (
          <motion.button 
            className="lightbox" 
            onClick={() => setLightbox(null)} 
            aria-label="Close gallery image"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.img 
              src={lightbox} 
              alt="Expanded travel gallery"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
