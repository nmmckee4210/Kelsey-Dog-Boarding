import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [dogs, setDogs] = useState([]);
  const [dogRequests, setDogRequests] = useState([]);
  

function handleDogRequest(event) {
  event.preventDefault();

  const form = event.target;

  const newRequest = {
    id: Date.now(),
    dogName: form.dogName.value,
    ownerName: form.ownerName.value,
    ownerEmail: form.ownerEmail.value,
    ownerPhone: form.ownerPhone.value,
    breed: form.breed.value,
    age: form.age.value,
    notes: form.notes.value,
    status: "Pending",
  };

  setDogRequests([...dogRequests, newRequest]);
  form.reset();
  setPage("requestSent");
}


  function handleAddDog(event) {
  event.preventDefault();

  const form = event.target;

  const newDog = {
    id: Date.now(),
    dogName: form.dogName.value,
    ownerName: form.ownerName.value,
    ownerPhone: form.ownerPhone.value,
    ownerAddress: form.ownerAddress.value,
    breed: form.breed.value,
    kennelNumber: form.kennelNumber.value,
    notes: form.notes.value,
  };

  setDogs([...dogs, newDog]);

  form.reset();

  setPage("dogList");
}
  if (page === "login") {
    return (
      <div className="login-page">
        <button className="back-btn" onClick={() => setPage("home")}>
          Back Home
        </button>

        <section className="login-box">
          <h2>Login</h2>

          <form>
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </section>
      </div>
    );
  }

  if (page === "create") {
    return (
      <div className="create-page">
        <button className="back-btn" onClick={() => setPage("home")}>
          Back Home
        </button>

        <section className="create-box">
          <h2>Create Account</h2>

          <p>
            Create an account and submit your dog’s information for Kelsey to
            review.
          </p>

          <form onSubmit={handleCreateAccount}>
            <input name="ownerName" type="text" placeholder="Your Full Name" required />
            <input name="ownerEmail" type="email" placeholder="Email Address" required />
            <input name="password" type="password" placeholder="Create Password" required />
            <input name="ownerPhone" type="tel" placeholder="Phone Number" required />

            <h3>Dog Information</h3>

            <input name="dogName" type="text" placeholder="Dog's Name" required />
            <input name="breed" type="text" placeholder="Dog's Breed" />
            <input name="age" type="number" placeholder="Dog's Age" />

            <textarea
              name="notes"
              placeholder="Tell Kelsey about your dog, behavior, feeding needs, medical needs, or anything important"
            ></textarea>

          <button type="submit">Submit Account for Approval</button>
        </form>
      </section>
    </div>
  );
}

if (page === "accountRequestSent") {
  return (
    <div className="create-page">
      <section className="create-box">
        <h2>Request Sent!</h2>

        <p>
          Your account and dog information have been submitted. Kelsey will
          review your request and decide whether to accept your dog.
        </p>

        <button onClick={() => setPage("home")}>Back Home</button>
      </section>
    </div>
  );
}

  if (page === "admin") {
    return (
      <div className="admin-page">
        <button className="back-btn" onClick={() => setPage("home")}>
          Back Home
        </button>

        <h1 className="admin-title">Lazy Bones Admin Dashboard</h1>

        <section className="dashboard-cards">
          <div className="dashboard-card">
            <h2>Dogs Checked In</h2>
            <p>0</p>
          </div>

          <div className="dashboard-card">
            <h2>Available Kennels</h2>
            <p>0</p>
          </div>

          <div className="dashboard-card">
            <h2>Daily Logs</h2>
            <p>0</p>
          </div>
        </section>

        <section className="admin-buttons">
          <button className="add-new-dog" onClick={() => setPage("addDog")}>Add New Dog</button>
          <button className="dog-profile" onClick={() => setPage("dogList")}>View Dog Profiles</button>
          <button>Kennel Map</button>
          <button>Daily Logs</button>
          <button>Check In Dog</button>
          <button>Check Out Dog</button>
        </section>
      </div>
    );
  }

  if (page === "addDog") {
  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => setPage("admin")}>
        Back to Dashboard
      </button>

      <section className="dog-form-box">
        <h2>Add New Dog</h2>

        <form onSubmit={handleAddDog}>
          <input name="dogName" type="text" placeholder="Dog's Name" required />
          <input name="ownerName" type="text" placeholder="Owner's Name" required />
          <input name="ownerPhone" type="tel" placeholder="Owner's Phone Number" />
          <input name="breed" type="text" placeholder="Breed" />
          <input name="kennelNumber" type="text" placeholder="Kennel Number" />

          <textarea name="notes" placeholder="Notes about the dog"></textarea>

          <button type="submit">Save Dog</button>
        </form>
      </section>
    </div>
  );
}

if (page === "dogList") {
  return (
    <div className="admin-page">
      <button className="back-btn" onClick={() => setPage("admin")}>
        Back to Dashboard
      </button>

      <h1 className="admin-title">Dog Profiles</h1>

      <div className="dog-list">
        {dogs.length === 0 ? (
          <p className="empty-message">No dogs have been added yet.</p>
        ) : (
          dogs.map((dog) => (
            <div className="dog-card" key={dog.id}>
              <h2>{dog.dogName}</h2>
              <p><strong>Owner:</strong> {dog.ownerName}</p>
              <p><strong>Phone:</strong> {dog.ownerPhone}</p>
              <p><strong>Breed:</strong> {dog.breed}</p>
              <p><strong>Kennel:</strong> {dog.kennelNumber}</p>
              <p><strong>Notes:</strong> {dog.notes}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

  return (
    <div className="app">
      <header className="hero">
        <nav className="navbar">
          <h1 className="title">Lazy Bones</h1>

          <div className="nav-buttons">
            <button className="login-btn" onClick={() => setPage("login")}>
              Login
            </button>

            <button className="create-btn" onClick={() => setPage("create")}>
              Create Account
            </button>

            <button className="admin-test-btn" onClick={() => setPage("admin")}>
              Admin Dashboard
            </button>
          </div>
        </nav>

        <section className="hero-text">
          <h2 className="about-lazy-bones">About Lazy Bones</h2>

          <div className="about-lazy-bones-p">
            <p>
              At Lazy Bones, we believe every dog deserves a safe, cozy, and
              loving place to stay while their family is away. Whether your pup
              loves to play, nap, or just relax by your side, we make sure they
              feel right at home.
            </p>

            <p>
              Our goal is to give each dog personal attention, a comfortable
              environment, and plenty of care throughout their visit. We treat
              every dog like family, because we know how much they mean to you.
            </p>

            <p>
              From lazy loungers to playful pups, Lazy Bones is a place where
              tails wag, naps are encouraged, and your dog’s comfort comes
              first.
            </p>
          </div>
        </section>
      </header>

      <main>
        <section id="about-me" className="section">
          <h2 className="about-me">About Kelsey</h2>

          <div className="kelsey-pic-and-text">
            <p className="about-me-text">
              Hi, I’m Kelsey! I started Lazy Bones because I love giving dogs a
              safe, comfortable, and loving place to stay while their owners are
              away.
              <br />
              <br />
              I know how important it is to leave your dog with someone you can
              trust. That’s why I treat every dog like they are part of my own
              family. Whether your pup loves to play, cuddle, nap, or just
              relax, I make sure they feel right at home.
              <br />
              <br />
              Lazy Bones is all about comfort, care, and peace of mind. My goal
              is for every dog to feel safe, loved, and happy during their stay.
            </p>

            <img
              className="kelsey-pic"
              src="/Kelsey-and-dog.JPG"
              alt="Kelsey with a dog"
            />
          </div>
        </section>

        <section className="services">
          <h2 className="services-title">Our Services</h2>

          <div className="service-cards">
            <div className="card">
              <h3>Daily Care</h3>

              <p>
                Daily care gives your dog a safe and comfortable place to spend
                the day while you are at work, running errands, or away from
                home. During their stay, dogs can enjoy potty breaks, playtime,
                rest time, fresh water, feeding if needed, and plenty of
                attention.
              </p>

              <img
                className="service-img"
                src="/Carolynandthedog.JPG"
                alt="Carolyn holding a dog"
              />
            </div>

            <div className="card">
              <h3>Overnight Boarding</h3>

              <p>
                A safe, cozy place for your dog to stay overnight while you are
                away. Dogs are cared for like family and given plenty of
                comfort, attention, and love.
              </p>
            </div>

            <div className="card">
              <h3>Real-Time Video</h3>

              <p>
                Cameras throughout the facility allow you to check in on your
                pooch anytime, day or night, so you can feel comfortable knowing
                they are safe.
              </p>
            </div>

            <div className="card">
              <h3>Potty Breaks</h3>

              <p>
                Dogs will have regular potty breaks throughout the day to keep
                them comfortable, relaxed, and on their normal routine.
              </p>
            </div>

            <div className="card">
              <h3>Photo Updates</h3>

              <p>
                Owners can receive photo updates so they know their dog is
                happy, safe, and being loved while they are away.
              </p>
            </div>

            <div className="card">
              <h3>Personalized Care</h3>

              <p>
                Every dog is different. Lazy Bones works with your dog’s needs,
                whether they love to play, cuddle, nap, or just relax.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;