import { useEffect, useMemo, useState } from "react";

const formatShortDate = (value) => {
  if (!value) {
    return "Not scheduled";
  }

  const parsedDate = new Date(`${value}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const safeText = (value, fallback = "Not provided") => value || fallback;

function Admin({
  onBackHome,
  onLogout,
  pendingRequests,
  approvedBoardings,
  deniedRequests,
  onApproveRequest,
  onDenyRequest,
  onOpenApprovedAgreement,
  isLoading = false,
  errorMessage = "",
}) {
  const boardingRequests = useMemo(
    () => pendingRequests.filter((request) => request.service === "Boarding"),
    [pendingRequests],
  );
  const [selectedRequestId, setSelectedRequestId] = useState("");

  useEffect(() => {
    if (!boardingRequests.length) {
      setSelectedRequestId("");
      return;
    }

    const currentSelectionStillExists = boardingRequests.some(
      (request) => request.id === selectedRequestId,
    );

    if (!currentSelectionStillExists) {
      setSelectedRequestId(boardingRequests[0].id);
    }
  }, [boardingRequests, selectedRequestId]);

  const selectedRequest =
    boardingRequests.find((request) => request.id === selectedRequestId) || null;

  const detailGroups = selectedRequest
    ? [
        {
          title: "Owner Information",
          rows: [
            ["Owner", selectedRequest.ownerName],
            ["Email", selectedRequest.email],
            ["Phone", selectedRequest.phone],
            ["Address", selectedRequest.ownerAddress],
            ["Emergency Contact", selectedRequest.emergencyContact],
            ["Emergency Phone", selectedRequest.emergencyPhone],
          ],
        },
        {
          title: "Stay Details",
          rows: [
            ["Service", selectedRequest.service],
            ["Start Date", formatShortDate(selectedRequest.startDate)],
            ["End Date", formatShortDate(selectedRequest.endDate)],
            ["Submitted", formatShortDate(selectedRequest.submittedAt?.slice(0, 10))],
          ],
        },
        {
          title: "Dog Profile",
          rows: [
            ["Dog Name", selectedRequest.dogName],
            ["Breed", selectedRequest.dogBreed],
            ["Age", selectedRequest.dogAge],
            ["Weight", selectedRequest.dogWeight],
            ["Sex", selectedRequest.dogSex],
            ["Spayed / Neutered", selectedRequest.spayedNeutered],
            ["Color / Markings", selectedRequest.colorMarkings],
            ["Vaccination Status", selectedRequest.vaccinationStatus],
          ],
        },
        {
          title: "Veterinary and Medical Notes",
          rows: [
            ["Veterinarian", selectedRequest.veterinarianName],
            ["Veterinarian Phone", selectedRequest.veterinarianPhone],
            ["Medications", selectedRequest.medications],
            ["Medical Conditions", selectedRequest.medicalConditions],
            ["Allergies", selectedRequest.allergies],
          ],
        },
        {
          title: "Care and Behavior Notes",
          rows: [
            ["Feeding Instructions", selectedRequest.feedingInstructions],
            ["Behavior Notes", selectedRequest.behaviorNotes],
            ["Bite History", selectedRequest.biteHistory],
            ["Special Handling", selectedRequest.specialHandling],
            ["Belongings", selectedRequest.belongings],
            ["Additional Notes", selectedRequest.notes],
          ],
        },
      ]
    : [];

  return (
    <main className="admin-page">
      <div className="container admin-shell">
        <div className="admin-header">
          <div>
            <p className="script-label">Admin Dashboard</p>
            <h1>Kelsey&apos;s Lazy Bonez Admin</h1>
            <p className="admin-lead">
              Review complete boarding requests, open a dog&apos;s full profile,
              and decide whether to approve or deny the stay before the
              printable agreement is created.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              type="button"
              className="booking-secondary admin-back-btn"
              onClick={onBackHome}
            >
              Back to Home
            </button>
            <button type="button" className="book-btn" onClick={onLogout}>
              Log Out
            </button>
          </div>
        </div>

        <section className="admin-cards">
          <article className="admin-card">
            <h2>Pending Dog Requests</h2>
            <p>{boardingRequests.length} request(s) waiting for review.</p>
          </article>

          <article className="admin-card">
            <h2>Approved Agreements</h2>
            <p>{approvedBoardings.length} printable agreement(s) created.</p>
          </article>

          <article className="admin-card">
            <h2>Denied Requests</h2>
            <p>{deniedRequests.length} request(s) were declined.</p>
          </article>
        </section>

        <section className="admin-list-section">
          <div className="admin-section-heading">
            <div>
              <p className="script-label">Pending Requests</p>
              <h2>Review Each Dog Before You Decide</h2>
            </div>
          </div>

          {errorMessage ? (
            <p className="admin-login-error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {isLoading ? (
            <div className="admin-empty-state">
              <h3>Loading booking requests...</h3>
              <p>Supabase is syncing the latest customer requests now.</p>
            </div>
          ) : boardingRequests.length ? (
            <div className="admin-review-shell">
              <div className="pending-request-list">
                {boardingRequests.map((request) => {
                  const isActive = request.id === selectedRequestId;

                  return (
                    <button
                      key={request.id}
                      type="button"
                      className={`pending-request-button${
                        isActive ? " pending-request-button-active" : ""
                      }`}
                      onClick={() => setSelectedRequestId(request.id)}
                    >
                      <div className="pending-request-button-top">
                        <strong>{request.dogName}</strong>
                        <span>{formatShortDate(request.startDate)}</span>
                      </div>
                      <p>
                        {request.ownerName} | {safeText(request.dogBreed, "Breed not provided")}
                      </p>
                      <small>
                        Medical and behavior notes included for Kelsey&apos;s review
                      </small>
                    </button>
                  );
                })}
              </div>

              {selectedRequest ? (
                <article className="request-detail-card">
                  <div className="request-card-header">
                    <div>
                      <h3>{selectedRequest.dogName}</h3>
                      <p>
                        {selectedRequest.ownerName} | {selectedRequest.service}
                      </p>
                    </div>
                    <span className="request-badge">Pending Review</span>
                  </div>

                  <div className="request-detail-grid">
                    {detailGroups.map((group) => (
                      <section key={group.title} className="request-detail-block">
                        <h4>{group.title}</h4>
                        {group.rows.map(([label, value]) => (
                          <p key={label}>
                            <strong>{label}:</strong> {safeText(value)}
                          </p>
                        ))}
                      </section>
                    ))}
                  </div>

                  <div className="request-detail-actions">
                    <button
                      type="button"
                      className="book-btn"
                      onClick={() => onApproveRequest(selectedRequest.id)}
                    >
                      Approve & Open Printable PDF
                    </button>
                    <button
                      type="button"
                      className="booking-secondary request-deny-btn"
                      onClick={() => onDenyRequest(selectedRequest.id)}
                    >
                      Deny Request
                    </button>
                  </div>
                </article>
              ) : null}
            </div>
          ) : (
            <div className="admin-empty-state">
              <h3>No boarding requests yet.</h3>
              <p>
                When a customer submits a boarding request from the home screen,
                the dog&apos;s full care profile will appear here for Kelsey to
                approve or deny.
              </p>
            </div>
          )}
        </section>

        <section className="admin-list-section">
          <div className="admin-section-heading">
            <div>
              <p className="script-label">Approved</p>
              <h2>Recent Agreement Activity</h2>
            </div>
          </div>

          {approvedBoardings.length ? (
            <div className="approved-list">
              {approvedBoardings.map((agreement) => (
                <article key={agreement.requestId} className="approved-card">
                  <h3>{agreement.dogName}</h3>
                  <p>
                    Owner: {agreement.ownerName} | Stay:{" "}
                    {formatShortDate(agreement.arrivalDate)} to{" "}
                    {formatShortDate(agreement.pickupDate)}
                  </p>
                  <p>PDF: {agreement.fileName}</p>
                  <button
                    type="button"
                    className="booking-secondary"
                    onClick={() => onOpenApprovedAgreement(agreement.requestId)}
                  >
                    Open Printable Agreement
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <h3>No agreements generated yet.</h3>
              <p>
                Approved boarding requests will move here after the printable
                PDF agreement is created.
              </p>
            </div>
          )}
        </section>

        <section className="admin-list-section">
          <div className="admin-section-heading">
            <div>
              <p className="script-label">Denied</p>
              <h2>Recently Denied Requests</h2>
            </div>
          </div>

          {deniedRequests.length ? (
            <div className="approved-list">
              {deniedRequests.map((request) => (
                <article key={request.id} className="approved-card denied-card">
                  <h3>{request.dogName}</h3>
                  <p>
                    Owner: {request.ownerName} | Breed:{" "}
                    {safeText(request.dogBreed, "Breed not provided")}
                  </p>
                  <p>Denied: {formatShortDate(request.deniedAt?.slice(0, 10))}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <h3>No denied requests.</h3>
              <p>
                Any request Kelsey declines will be listed here for quick
                reference.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Admin;
