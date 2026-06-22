import aboutPhoto from "../assets/about-photo.png";
import heroImg from "../assets/hero-three-dogs.png";
import kelseyPhoto from "../assets/kelsey-photo.JPG";
import logoImg from "../assets/littlelogo-clean.png";
import reviewAvatar1 from "../assets/review-avatar-1.png";
import reviewAvatar2 from "../assets/review-avatar-2.png";
import reviewAvatar3 from "../assets/review-avatar-3.png";


const navItems = [
  { label: "Home", href: "#home", active: true },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasCaret: true },
  { label: "Gallery", href: "#kelsey" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Boarding",
    description:
      "Cozy suites, supervised play, and loving attention so your dog feels relaxed and cared for while you are away.",
    accent: "purple",
    Icon: BoardingIcon,
  },
  {
    title: "Grooming",
    description:
      "Baths, tidy-ups, and fresh looks that keep coats healthy, clean, and ready for extra cuddles.",
    accent: "teal",
    Icon: GroomingIcon,
  },
  {
    title: "Day Play",
    description:
      "Safe daytime fun with structure, exercise, and plenty of social time to keep your pup happy.",
    accent: "orange",
    Icon: DayPlayIcon,
  },
];

const reviews = [
  {
    name: "Melissa R.",
    quote:
      "Kelsey's is our go-to. Our dog comes home happy, clean, and tired in the best way.",
    image: reviewAvatar1,
  },
  {
    name: "James T.",
    quote:
      "The staff is so loving and attentive. I never worry when my pup is staying here.",
    image: reviewAvatar2,
  },
  {
    name: "Sarah K.",
    quote:
      "Best grooming and boarding place around. Friendly, dependable, and easy to recommend.",
    image: reviewAvatar3,
  },
];

const socialLinks = [
  { label: "Facebook", href: "#contact", Icon: FacebookIcon },
  { label: "Instagram", href: "#contact", Icon: InstagramIcon },
  { label: "TikTok", href: "#contact", Icon: TikTokIcon },
  { label: "Location", href: "#contact", Icon: LocationIcon },
];

function Home({ onOpenBooking, onOpenAdmin }) {
  return (
    <div className="site-page">
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="header-logo"
            href="#home"
            aria-label="Kelsey's Lazy Bonez home"
          >
            <img src={logoImg} alt="Kelsey's Lazy Bonez logo" />
          </a>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={item.active ? "is-active" : ""}
              >
                {item.label}
                {item.hasCaret ? <span className="nav-caret">▾</span> : null}
              </a>
            ))}
          </nav>

          <button type="button" className="book-btn" onClick={onOpenBooking}>
            Book Dog
            <span className="book-btn-icon">
              <PawIcon />
            </span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <img
            className="hero-background-image"
            src={heroImg}
            alt="Dogs relaxing in front of the Kelsey's Lazy Bonez sunset mural"
          />

          <div className="hero-overlay">
            <div className="container hero-inner">
              <div className="hero-copy">
                <h1>Loving Care for Your Dogs While You&apos;re Away</h1>
                <p>
                  Safe, comfortable, and fun stays with the personal attention
                  every pup deserves.
                </p>

                <div className="hero-actions">
                  <button
                    type="button"
                    className="book-btn hero-primary"
                    onClick={onOpenBooking}
                  >
                    Book Dog
                    <span className="book-btn-icon">
                      <PawIcon />
                    </span>
                  </button>

                  <a className="hero-secondary" href="#about">
                    Learn More
                    <span className="hero-secondary-icon">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-inner">
            <div className="about-media">
              <span className="about-decor about-decor-left">
                <PawIcon />
              </span>
              <span className="about-decor about-decor-bottom">
                <PawIcon />
              </span>

              <div className="about-photo-ring">
                <img
                  src={aboutPhoto}
                  alt="Dog enjoying time at Kelsey's Lazy Bonez"
                  className="about-photo"
                />
              </div>

              <div className="about-badge">
                <PawIcon />
              </div>
            </div>

            <div className="about-copy">
              <p className="script-label">About Kelsey&apos;s Lazy Bonez</p>
              <h2>A Home Away From Home</h2>
              <p>
                At Kelsey&apos;s Lazy Bonez, every dog is treated like family.
                We provide clean, comfortable spaces, supervised play, and
                thoughtful routines that help pups feel safe, relaxed, and
                genuinely cared for from drop-off to pick-up.
              </p>

              <a className="purple-btn" href="#kelsey">
                Learn More About Us
                <span className="button-paw">
                  <PawIcon />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="kelsey-section" id="kelsey">
          <div className="container kelsey-inner">
            <div className="kelsey-photo-card">
              <img
                src={kelseyPhoto}
                alt="Kelsey with one of the dogs she cares for"
                className="kelsey-photo"
              />
            </div>

            <div className="kelsey-copy">
              <p className="script-label">Meet Kelsey</p>
              <h2>13 Years of Professional Experience With Dogs</h2>
              <p>
                Kelsey brings 13 years of professional hands-on experience with
                dogs of different breeds, ages, temperaments, and care needs.
                Her approach is calm, attentive, and built around making each
                dog feel secure and understood.
              </p>
              <p>
                Whether your pup is staying overnight, coming in for grooming,
                or joining for daytime play, Kelsey focuses on safe routines,
                close supervision, and the kind of one-on-one care that gives
                pet parents real peace of mind.
              </p>

              <div className="kelsey-experience">
                <strong>13 Years</strong>
                <span>Professional dog care experience</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="script-label centered">Our Services</p>
              <h2>Tail-Wagging Care</h2>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <div className={`service-icon service-icon-${service.accent}`}>
                    <service.Icon />
                  </div>

                  <div className="service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href="#contact" className="service-link">
                      Learn More
                      <span>
                        <ArrowIcon />
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="container">
            <div className="section-heading">
              <p className="script-label centered">Why Choose Us</p>
              <h2>Trusted by Dog Parents</h2>
            </div>

            <div className="review-grid">
              {reviews.map((review) => (
                <article key={review.name} className="review-card">
                  <div className="review-text">
                    <p className="review-stars">★★★★★</p>
                    <p className="review-quote">&quot;{review.quote}&quot;</p>
                    <strong>{review.name}</strong>
                  </div>

                  <div className="review-avatar">
                    <img src={review.image} alt={`${review.name} dog`} />
                  </div>
                </article>
              ))}
            </div>

            <div
              className="cta-banner"
              id="booking"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(38, 10, 70, 0.92) 0%, rgba(97, 37, 151, 0.76) 55%, rgba(255, 114, 26, 0.84) 100%), url(${heroImg})`,
              }}
            >
              <div className="cta-badge">
                <PawIcon />
              </div>

              <div className="cta-copy">
                <h3>Ready to Book Your Dog&apos;s Stay?</h3>
                <p>Spots fill up fast. Reserve your pup&apos;s stay today.</p>
              </div>

              <button
                type="button"
                className="book-btn cta-book-btn"
                onClick={onOpenBooking}
              >
                Book Dog
                <span className="book-btn-icon">
                  <PawIcon />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-lockup">
              <div className="footer-brand-badge">
                <PawIcon />
              </div>

              <div className="footer-brand-text">
                <h3>Kelsey&apos;s Lazy Bonez</h3>
                <p>Boarding &amp; Grooming</p>
              </div>
            </div>

            <p className="footer-brand-copy">
              Professional, personalized care for dogs who deserve comfort,
              structure, and lots of love while you are away.
            </p>
          </div>

          <div className="footer-column">
            <h4>Contact Us</h4>
            <p>(555) 123-4567</p>
            <p>kelsey@lazybonez.com</p>
            <p>123 Pawsome Lane</p>
            <p>Happy Tails, ST 12345</p>
          </div>

          <div className="footer-column">
            <h4>Hours</h4>
            <p>Mon - Fri 7:00am - 6:00pm</p>
            <p>Saturday 8:00am - 5:00pm</p>
            <p>Sunday 10:00am - 4:00pm</p>
            <p>Holiday hours may vary.</p>
          </div>

          <div className="footer-column footer-column-social">
            <h4>Follow Us</h4>
            <div className="social-row">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="social-link"
                  aria-label={item.label}
                >
                  <item.Icon />
                </a>
              ))}
            </div>
            <p className="footer-script">We can&apos;t wait to meet you!</p>
          </div>
        </div>

        <div className="container footer-bottom">
          <p className="copyright">
            © 2025 Kelsey&apos;s Lazy Bonez Boarding &amp; Grooming. All rights
            reserved.
          </p>

          <div className="footer-legal">
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms of Service</a>
            <button type="button" className="admin-btn" onClick={onOpenAdmin}>
              Admin Login
            </button>
          </div>
          
          
        </div>
      </footer>
    </div>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">
      <circle cx="17" cy="20" r="7" />
      <circle cx="30" cy="14" r="7" />
      <circle cx="45" cy="20" r="7" />
      <circle cx="51" cy="34" r="7" />
      <path d="M31.8 29.2c-8.4 0-16.9 7.4-16.9 15.6 0 5 4.1 8.2 8.6 8.2 2.7 0 4.8-1 6.7-2 1.8-.9 3.4-1.7 5.3-1.7s3.5.8 5.3 1.7c1.9 1 4.1 2 6.8 2 4.5 0 8.5-3.2 8.5-8.2 0-8.1-8.2-15.6-16.6-15.6-2.8 0-5.5 1-7.7 2.8-2.2-1.8-4.8-2.8-7.8-2.8Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoardingIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="none">
      <path
        d="M10 29 32 12l22 17"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 28v17h28V28"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 49c4.5-4.8 10.3-7.2 12-7.2S39.5 44.2 44 49"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="26" cy="46" r="3" fill="currentColor" />
      <circle cx="38" cy="46" r="3" fill="currentColor" />
    </svg>
  );
}

function GroomingIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="none">
      <path
        d="M18 20h18c8.8 0 16 7.2 16 16v2"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M42 18h10v10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 29c3.6 0 6.5 2.9 6.5 6.5S27.6 42 24 42s-6.5-2.9-6.5-6.5S20.4 29 24 29Z"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M42 39v10M50 36v13M34 37v12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DayPlayIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" fill="none">
      <path
        d="M12 41c0-7.7 6.3-14 14-14h4.5l5.8-5.4a5.6 5.6 0 0 1 3.8-1.6H44c4.4 0 8 3.6 8 8v2.7a7 7 0 0 1-4 6.3l-4 1.9V45a7 7 0 0 1-7 7H26c-7.7 0-14-6.3-14-14Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46.5" cy="22.5" r="5.5" fill="currentColor" />
      <path
        d="M20 48v4M30 48v4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.4 21v-7h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.3 1.4-1.3H16V5.4c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3v2.6H9V14h2.3v7h2.1Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14.8 4c.5 1.7 1.7 3 3.2 3.7.6.3 1.3.5 2 .5v2.7c-1.6 0-3.2-.5-4.6-1.4V15a5 5 0 1 1-5-5c.4 0 .7 0 1.1.1v2.8a2.6 2.6 0 1 0 1.7 2.4V4h2.6Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M12 21s6-5.8 6-11a6 6 0 1 0-12 0c0 5.2 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" fill="currentColor" />
    </svg>
  );
}

export default Home;
