import { useEffect, useState } from "react";

const dogBreeds = [
  "Affenpinscher",
  "Afghan Hound",
  "Airedale Terrier",
  "Akita",
  "Alaskan Klee Kai",
  "Alaskan Malamute",
  "American Bulldog",
  "American English Coonhound",
  "American Eskimo Dog",
  "American Foxhound",
  "American Hairless Terrier",
  "American Leopard Hound",
  "American Staffordshire Terrier",
  "American Water Spaniel",
  "Anatolian Shepherd Dog",
  "Appenzeller Sennenhund",
  "Australian Cattle Dog",
  "Australian Kelpie",
  "Australian Shepherd",
  "Australian Terrier",
  "Azawakh",
  "Barbet",
  "Basenji",
  "Basset Fauve de Bretagne",
  "Basset Hound",
  "Bavarian Mountain Scent Hound",
  "Beagle",
  "Bearded Collie",
  "Beauceron",
  "Bedlington Terrier",
  "Belgian Laekenois",
  "Belgian Malinois",
  "Belgian Sheepdog",
  "Belgian Tervuren",
  "Bergamasco Sheepdog",
  "Berger Picard",
  "Bernese Mountain Dog",
  "Bichon Frise",
  "Biewer Terrier",
  "Black and Tan Coonhound",
  "Black Russian Terrier",
  "Bloodhound",
  "Blue Lacy",
  "Bluetick Coonhound",
  "Boerboel",
  "Bolognese",
  "Border Collie",
  "Border Terrier",
  "Borzoi",
  "Boston Terrier",
  "Bouvier des Flandres",
  "Boxer",
  "Boykin Spaniel",
  "Bracco Italiano",
  "Braque du Bourbonnais",
  "Braque Francais Pyrenean",
  "Briard",
  "Brittany",
  "Broholmer",
  "Brussels Griffon",
  "Bull Terrier",
  "Bulldog",
  "Bullmastiff",
  "Cairn Terrier",
  "Canaan Dog",
  "Cane Corso",
  "Cardigan Welsh Corgi",
  "Carolina Dog",
  "Catahoula Leopard Dog",
  "Caucasian Shepherd Dog",
  "Cavalier King Charles Spaniel",
  "Central Asian Shepherd Dog",
  "Cesky Terrier",
  "Chesapeake Bay Retriever",
  "Chihuahua",
  "Chinese Crested",
  "Chinese Shar-Pei",
  "Chinook",
  "Chow Chow",
  "Cirneco dell'Etna",
  "Clumber Spaniel",
  "Cocker Spaniel",
  "Collie",
  "Coton de Tulear",
  "Croatian Sheepdog",
  "Curly-Coated Retriever",
  "Czechoslovakian Vlcak",
  "Dachshund",
  "Dalmatian",
  "Dandie Dinmont Terrier",
  "Danish-Swedish Farmdog",
  "Deutscher Wachtelhund",
  "Doberman Pinscher",
  "Dogo Argentino",
  "Dogue de Bordeaux",
  "Drentsche Patrijshond",
  "Drever",
  "Dutch Shepherd",
  "English Cocker Spaniel",
  "English Foxhound",
  "English Setter",
  "English Springer Spaniel",
  "English Toy Spaniel",
  "Entlebucher Mountain Dog",
  "Estrela Mountain Dog",
  "Eurasier",
  "Field Spaniel",
  "Finnish Lapphund",
  "Finnish Spitz",
  "Flat-Coated Retriever",
  "French Bulldog",
  "German Longhaired Pointer",
  "German Pinscher",
  "German Shepherd Dog",
  "German Shorthaired Pointer",
  "German Spitz",
  "German Wirehaired Pointer",
  "Giant Schnauzer",
  "Glen of Imaal Terrier",
  "Golden Retriever",
  "Gordon Setter",
  "Grand Basset Griffon Vendeen",
  "Great Dane",
  "Great Pyrenees",
  "Greater Swiss Mountain Dog",
  "Greyhound",
  "Hamiltonstovare",
  "Hanoverian Scenthound",
  "Harrier",
  "Havanese",
  "Hokkaido",
  "Hovawart",
  "Ibizan Hound",
  "Icelandic Sheepdog",
  "Irish Red and White Setter",
  "Irish Setter",
  "Irish Terrier",
  "Irish Water Spaniel",
  "Irish Wolfhound",
  "Italian Greyhound",
  "Jagdterrier",
  "Japanese Akitainu",
  "Japanese Chin",
  "Japanese Spitz",
  "Jindo",
  "Kai Ken",
  "Karelian Bear Dog",
  "Keeshond",
  "Kerry Blue Terrier",
  "Kishu Ken",
  "Komondor",
  "Kromfohrlander",
  "Kuvasz",
  "Labrador Retriever",
  "Lagotto Romagnolo",
  "Lakeland Terrier",
  "Lancashire Heeler",
  "Lapponian Herder",
  "Leonberger",
  "Lhasa Apso",
  "Löwchen",
  "Maltese",
  "Manchester Terrier",
  "Mastiff",
  "Miniature American Shepherd",
  "Miniature Bull Terrier",
  "Miniature Pinscher",
  "Miniature Schnauzer",
  "Mountain Cur",
  "Mudi",
  "Neapolitan Mastiff",
  "Nederlandse Kooikerhondje",
  "Newfoundland",
  "Norfolk Terrier",
  "Norrbottenspets",
  "Norwegian Buhund",
  "Norwegian Elkhound",
  "Norwegian Lundehund",
  "Norwich Terrier",
  "Nova Scotia Duck Tolling Retriever",
  "Old English Sheepdog",
  "Otterhound",
  "Papillon",
  "Parson Russell Terrier",
  "Pekingese",
  "Pembroke Welsh Corgi",
  "Peruvian Inca Orchid",
  "Petit Basset Griffon Vendeen",
  "Pharaoh Hound",
  "Plott Hound",
  "Pointer",
  "Polish Lowland Sheepdog",
  "Pomeranian",
  "Poodle",
  "Porcelaine",
  "Portuguese Podengo",
  "Portuguese Pointer",
  "Portuguese Sheepdog",
  "Portuguese Water Dog",
  "Pudelpointer",
  "Pug",
  "Puli",
  "Pumi",
  "Pyrenean Mastiff",
  "Pyrenean Shepherd",
  "Rafeiro do Alentejo",
  "Rat Terrier",
  "Redbone Coonhound",
  "Rhodesian Ridgeback",
  "Romanian Carpathian Shepherd",
  "Romanian Mioritic Shepherd Dog",
  "Rottweiler",
  "Russell Terrier",
  "Russian Toy",
  "Saluki",
  "Samoyed",
  "Schapendoes",
  "Schipperke",
  "Scottish Deerhound",
  "Scottish Terrier",
  "Sealyham Terrier",
  "Segugio Italiano",
  "Shetland Sheepdog",
  "Shiba Inu",
  "Shih Tzu",
  "Siberian Husky",
  "Silky Terrier",
  "Skye Terrier",
  "Sloughi",
  "Slovakian Wirehaired Pointer",
  "Slovensky Cuvac",
  "Slovensky Kopov",
  "Small Munsterlander Pointer",
  "Soft Coated Wheaten Terrier",
  "Spanish Mastiff",
  "Spanish Water Dog",
  "Spinone Italiano",
  "St. Bernard",
  "Staffordshire Bull Terrier",
  "Standard Schnauzer",
  "Sussex Spaniel",
  "Swedish Lapphund",
  "Taiwan Dog",
  "Teddy Roosevelt Terrier",
  "Thai Bangkaew Dog",
  "Thai Ridgeback",
  "Tibetan Mastiff",
  "Tibetan Spaniel",
  "Tibetan Terrier",
  "Tornjak",
  "Tosa",
  "Toy Fox Terrier",
  "Treeing Tennessee Brindle",
  "Treeing Walker Coonhound",
  "Vizsla",
  "Weimaraner",
  "Welsh Springer Spaniel",
  "Welsh Terrier",
  "West Highland White Terrier",
  "Whippet",
  "Wire Fox Terrier",
  "Wirehaired Pointing Griffon",
  "Wirehaired Vizsla",
  "Working Kelpie",
  "Xoloitzcuintli",
  "Yakutian Laika",
  "Yorkshire Terrier",
  "Other / Mixed Breed",
];

const initialBookingForm = {
  ownerName: "",
  email: "",
  phone: "",
  ownerAddress: "",
  emergencyContact: "",
  emergencyPhone: "",
  dogName: "",
  dogBreed: "",
  dogAge: "",
  dogWeight: "",
  dogSex: "",
  spayedNeutered: "",
  colorMarkings: "",
  service: "Boarding",
  startDate: "",
  endDate: "",
  veterinarianName: "",
  veterinarianPhone: "",
  vaccinationStatus: "",
  feedingInstructions: "",
  medications: "",
  medicalConditions: "",
  allergies: "",
  behaviorNotes: "",
  biteHistory: "",
  specialHandling: "",
  belongings: "",
  notes: "",
};

function Booking({ onClose, onSubmitRequest }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState(initialBookingForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSubmitError("");
    setBookingForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (onSubmitRequest) {
        await onSubmitRequest(bookingForm);
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error.message ||
          "Your booking request could not be sent right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartAnotherRequest = () => {
    setBookingForm(initialBookingForm);
    setIsSubmitted(false);
    setSubmitError("");
  };

  return (
    <div
      className="booking-screen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <button
        type="button"
        className="booking-screen-backdrop"
        onClick={onClose}
        aria-label="Close booking form"
      />

      <div className="booking-screen-panel">
        <button
          type="button"
          className="booking-close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ×
        </button>

        {isSubmitted ? (
          <div className="booking-success">
            <p className="script-label">Request Received</p>
            <h2 id="booking-title">
              Thanks, {bookingForm.ownerName || "friend"}.
            </h2>
            <p>
              Your booking request for {bookingForm.dogName || "your dog"} has
              been captured. Kelsey can now review and approve it from the
              admin dashboard with your dog&apos;s medical, behavior, and care
              details before deciding whether to approve the stay.
            </p>
            <p>
              Kelsey will use the contact information you provided and be in
              touch shortly.
            </p>

            <div className="booking-summary">
              <div>
                <span>Owner</span>
                <strong>{bookingForm.ownerName || "Not provided"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{bookingForm.email || "Not provided"}</strong>
              </div>
              <div>
                <span>Phone</span>
                <strong>{bookingForm.phone || "Not provided"}</strong>
              </div>
              <div>
                <span>Service</span>
                <strong>{bookingForm.service}</strong>
              </div>
              <div>
                <span>Dog</span>
                <strong>{bookingForm.dogName || "Not provided"}</strong>
              </div>
              <div>
                <span>Stay dates</span>
                <strong>
                  {bookingForm.startDate || "Start date"} to{" "}
                  {bookingForm.endDate || "End date"}
                </strong>
              </div>
            </div>

            <div className="booking-success-actions">
              <button
                type="button"
                className="book-btn"
                onClick={handleStartAnotherRequest}
              >
                Start Another Request
              </button>
              <button
                type="button"
                className="booking-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="booking-layout">
            <aside className="booking-sidebar">
              <p className="script-label">Book Your Dog</p>
              <h2 id="booking-title">Tell us about you and your dog.</h2>
              <p>
                Fill out the request below and Kelsey will follow up to confirm
                availability, timing, and the best fit for your stay or service.
              </p>

              <div className="booking-sidebar-card">
                <strong>What to include</strong>
                <ul className="booking-checklist">
                  <li>Your contact information</li>
                  <li>Emergency contact and veterinarian details</li>
                  <li>Your dog&apos;s breed, age, weight, and profile</li>
                  <li>Medical notes, medications, allergies, and feeding routine</li>
                  <li>Behavior, bite history, special handling, and stay dates</li>
                </ul>
              </div>
            </aside>

            <form className="booking-form" onSubmit={handleSubmit}>
              <section className="booking-form-section">
                <h3>Owner Information</h3>
                <div className="booking-field-grid">
                  <label className="booking-field">
                    <span>Full name</span>
                    <input
                      type="text"
                      name="ownerName"
                      value={bookingForm.ownerName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Emergency contact</span>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={bookingForm.emergencyContact}
                      onChange={handleChange}
                      placeholder="Emergency contact name"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Emergency phone</span>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={bookingForm.emergencyPhone}
                      onChange={handleChange}
                      placeholder="Emergency contact phone"
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Home address</span>
                    <input
                      type="text"
                      name="ownerAddress"
                      value={bookingForm.ownerAddress}
                      onChange={handleChange}
                      placeholder="Street, city, state, ZIP"
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="booking-form-section">
                <h3>Stay Request</h3>
                <div className="booking-field-grid">
                  <label className="booking-field">
                    <span>Service requested</span>
                    <select
                      name="service"
                      value={bookingForm.service}
                      onChange={handleChange}
                    >
                      <option>Boarding</option>
                      <option>Grooming</option>
                      <option>Day Play</option>
                    </select>
                  </label>

                  <label className="booking-field">
                    <span>Start date</span>
                    <input
                      type="date"
                      name="startDate"
                      value={bookingForm.startDate}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>End date</span>
                    <input
                      type="date"
                      name="endDate"
                      value={bookingForm.endDate}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="booking-form-section">
                <h3>Dog Profile</h3>
                <div className="booking-field-grid">
                  <label className="booking-field">
                    <span>Dog&apos;s name</span>
                    <input
                      type="text"
                      name="dogName"
                      value={bookingForm.dogName}
                      onChange={handleChange}
                      placeholder="Your dog's name"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Breed</span>
                    <input
                      type="text"
                      name="dogBreed"
                      list="dog-breed-options"
                      value={bookingForm.dogBreed}
                      onChange={handleChange}
                      placeholder="Search your dog's breed"
                      autoComplete="off"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Age</span>
                    <input
                      type="text"
                      name="dogAge"
                      value={bookingForm.dogAge}
                      onChange={handleChange}
                      placeholder="Example: 4 years"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Weight</span>
                    <input
                      type="text"
                      name="dogWeight"
                      value={bookingForm.dogWeight}
                      onChange={handleChange}
                      placeholder="Example: 62 lbs"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Sex</span>
                    <select
                      name="dogSex"
                      value={bookingForm.dogSex}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>

                  <label className="booking-field">
                    <span>Spayed / neutered</span>
                    <select
                      name="spayedNeutered"
                      value={bookingForm.spayedNeutered}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Color / markings</span>
                    <input
                      type="text"
                      name="colorMarkings"
                      value={bookingForm.colorMarkings}
                      onChange={handleChange}
                      placeholder="Distinct coloring, markings, or identifying details"
                      required
                    />
                  </label>
                </div>
              </section>

              <datalist id="dog-breed-options">
                {dogBreeds.map((breed) => (
                  <option key={breed} value={breed} />
                ))}
              </datalist>

              <section className="booking-form-section">
                <h3>Veterinary and Medical Information</h3>
                <div className="booking-field-grid">
                  <label className="booking-field">
                    <span>Veterinarian</span>
                    <input
                      type="text"
                      name="veterinarianName"
                      value={bookingForm.veterinarianName}
                      onChange={handleChange}
                      placeholder="Vet clinic or veterinarian name"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Veterinarian phone</span>
                    <input
                      type="tel"
                      name="veterinarianPhone"
                      value={bookingForm.veterinarianPhone}
                      onChange={handleChange}
                      placeholder="Vet phone number"
                      required
                    />
                  </label>

                  <label className="booking-field">
                    <span>Vaccination status</span>
                    <select
                      name="vaccinationStatus"
                      value={bookingForm.vaccinationStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select one</option>
                      <option>Up to date</option>
                      <option>Needs update</option>
                      <option>Medical waiver / discuss with Kelsey</option>
                    </select>
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Medications</span>
                    <textarea
                      name="medications"
                      value={bookingForm.medications}
                      onChange={handleChange}
                      rows="4"
                      placeholder="List every medication, dose, timing, and instructions. Type None if none."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Medical conditions</span>
                    <textarea
                      name="medicalConditions"
                      value={bookingForm.medicalConditions}
                      onChange={handleChange}
                      rows="4"
                      placeholder="List injuries, surgeries, chronic conditions, mobility issues, or other health concerns. Type None if none."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Allergies</span>
                    <textarea
                      name="allergies"
                      value={bookingForm.allergies}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Food, medication, seasonal, or environmental allergies. Type None if none."
                      required
                    />
                  </label>
                </div>
              </section>

              <section className="booking-form-section">
                <h3>Care and Behavior Notes</h3>
                <div className="booking-field-grid">
                  <label className="booking-field booking-field-full">
                    <span>Feeding instructions</span>
                    <textarea
                      name="feedingInstructions"
                      value={bookingForm.feedingInstructions}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Food type, meal times, portions, treats, and any feeding restrictions."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Behavior notes</span>
                    <textarea
                      name="behaviorNotes"
                      value={bookingForm.behaviorNotes}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Temperament, crate comfort, triggers, reactivity, separation anxiety, or social notes."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Bite history</span>
                    <textarea
                      name="biteHistory"
                      value={bookingForm.biteHistory}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Describe any bite history or type None if none."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Special handling notes</span>
                    <textarea
                      name="specialHandling"
                      value={bookingForm.specialHandling}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Handling needs, mobility help, gate manners, grooming sensitivity, or anything Kelsey should know. Type None if none."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Belongings sent with dog</span>
                    <textarea
                      name="belongings"
                      value={bookingForm.belongings}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Food, leash, bedding, medications, comfort items, or type None if none."
                      required
                    />
                  </label>

                  <label className="booking-field booking-field-full">
                    <span>Additional notes</span>
                    <textarea
                      name="notes"
                      value={bookingForm.notes}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Anything else Kelsey should review before deciding whether to approve this stay."
                    />
                  </label>
                </div>
              </section>

              {submitError ? (
                <p className="admin-login-error" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="booking-actions">
                <button type="submit" className="book-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Request..." : "Send Booking Request"}
                </button>
                <button
                  type="button"
                  className="booking-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
