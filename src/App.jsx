import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import BoardingAgreement from "./pages/BoardingAgreement";
import {
  createBookingRequest,
  fetchBookingRequests,
  markBookingApproved,
  markBookingDenied,
} from "./lib/bookings";
import {
  isAdminEmail,
  isSupabaseConfigured,
  supabase,
} from "./lib/supabase";

const isAdminSession = (session) =>
  Boolean(session?.user?.email && isAdminEmail(session.user.email));

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [adminSession, setAdminSession] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(isSupabaseConfigured);
  const [isBookingsLoading, setIsBookingsLoading] = useState(false);
  const [adminDataError, setAdminDataError] = useState("");

  const pendingRequests = useMemo(
    () => bookingRequests.filter((request) => request.status === "pending"),
    [bookingRequests],
  );
  const approvedBoardings = useMemo(
    () => bookingRequests.filter((request) => request.status === "approved"),
    [bookingRequests],
  );
  const deniedRequests = useMemo(
    () => bookingRequests.filter((request) => request.status === "denied"),
    [bookingRequests],
  );
  const isAdminAuthenticated = isAdminSession(adminSession);

  const loadBookingRequests = async (sessionOverride = adminSession) => {
    if (!isAdminSession(sessionOverride)) {
      setBookingRequests([]);
      return;
    }

    setIsBookingsLoading(true);
    setAdminDataError("");

    try {
      const nextRequests = await fetchBookingRequests();
      setBookingRequests(nextRequests);
    } catch (error) {
      setAdminDataError(
        error.message ||
          "The booking requests could not be loaded from Supabase.",
      );
    } finally {
      setIsBookingsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsAuthLoading(false);
      return undefined;
    }

    let isActive = true;

    const bootstrapAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      if (error) {
        setAdminDataError(
          error.message ||
            "Supabase authentication could not be initialized.",
        );
      }

      setAdminSession(data.session || null);
      setIsAuthLoading(false);

      if (isAdminSession(data.session)) {
        await loadBookingRequests(data.session);
      } else {
        setBookingRequests([]);
      }
    };

    bootstrapAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isActive) {
        return;
      }

      setAdminSession(session || null);

      if (isAdminSession(session)) {
        await loadBookingRequests(session);
        return;
      }

      setBookingRequests([]);
      setSelectedRequest(null);
      setAdminDataError("");

      if (event === "SIGNED_OUT") {
        setCurrentScreen((screen) =>
          screen === "admin" || screen === "boardingAgreement"
            ? "adminLogin"
            : screen,
        );
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateRequest = async (requestData) => {
    const createdRequest = await createBookingRequest(requestData);

    if (isAdminAuthenticated) {
      setBookingRequests((currentRequests) => [createdRequest, ...currentRequests]);
    }

    return createdRequest;
  };

  const handleApproveRequest = (requestId) => {
    const approvedRequest = pendingRequests.find(
      (request) => request.id === requestId,
    );

    if (!approvedRequest) {
      return;
    }

    setSelectedRequest(approvedRequest);
    setCurrentScreen("boardingAgreement");
  };

  const handleOpenApprovedAgreement = (requestId) => {
    const approvedRequest = approvedBoardings.find(
      (request) => request.requestId === requestId || request.id === requestId,
    );

    if (!approvedRequest) {
      return;
    }

    setSelectedRequest(approvedRequest);
    setCurrentScreen("boardingAgreement");
  };

  const handleDenyRequest = async (requestId) => {
    try {
      setAdminDataError("");

      const deniedRequest = await markBookingDenied(requestId);

      setBookingRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === deniedRequest.id ? deniedRequest : request,
        ),
      );
    } catch (error) {
      setAdminDataError(
        error.message || "This booking request could not be denied.",
      );
    }
  };

  const handleAgreementGenerated = async (agreementSummary) => {
    setAdminDataError("");

    const approvedRequest = await markBookingApproved(
      agreementSummary.requestId,
      agreementSummary.fileName,
    );

    setBookingRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === approvedRequest.id ? approvedRequest : request,
      ),
    );
    setSelectedRequest(approvedRequest);
  };

  const handleLogout = async () => {
    if (!supabase) {
      setCurrentScreen("adminLogin");
      return;
    }

    try {
      await supabase.auth.signOut({ scope: "local" });
      setCurrentScreen("adminLogin");
    } catch (error) {
      setAdminDataError(
        error.message || "The admin session could not be signed out cleanly.",
      );
    }
  };

  return (
    <div className="app">
      {currentScreen === "home" ? (
        <Home
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenAdmin={() => {
            setIsBookingOpen(false);
            setCurrentScreen("adminLogin");
          }}
        />
      ) : currentScreen === "boardingAgreement" ? (
        isAdminAuthenticated ? (
          <BoardingAgreement
            requestData={selectedRequest}
            onBackAdmin={() => {
              setSelectedRequest(null);
              setCurrentScreen("admin");
            }}
            onAgreementGenerated={handleAgreementGenerated}
          />
        ) : (
          <AdminLogin
            onBackHome={() => setCurrentScreen("home")}
            onLoginSuccess={() => setCurrentScreen("admin")}
          />
        )
      ) : currentScreen === "adminLogin" || currentScreen === "admin" ? (
        isAdminAuthenticated ? (
          <Admin
            onBackHome={() => setCurrentScreen("home")}
            onLogout={handleLogout}
            pendingRequests={pendingRequests}
            approvedBoardings={approvedBoardings}
            deniedRequests={deniedRequests}
            onApproveRequest={handleApproveRequest}
            onDenyRequest={handleDenyRequest}
            onOpenApprovedAgreement={handleOpenApprovedAgreement}
            isLoading={isBookingsLoading}
            errorMessage={adminDataError}
          />
        ) : (
          <AdminLogin
            onBackHome={() => setCurrentScreen("home")}
            onLoginSuccess={() => setCurrentScreen("admin")}
            isAuthLoading={isAuthLoading}
          />
        )
      ) : null}

      {currentScreen === "home" && isBookingOpen ? (
        <Booking
          onClose={() => setIsBookingOpen(false)}
          onSubmitRequest={handleCreateRequest}
        />
      ) : null}
    </div>
  );
}

export default App;
