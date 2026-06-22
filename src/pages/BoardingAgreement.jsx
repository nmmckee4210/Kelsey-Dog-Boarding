import { useEffect, useRef, useState } from "react";
import {
  createBoardingAgreementPdfBlob,
  createBoardingAgreementPdfDoc,
  createBoardingAgreementPdfFilename,
} from "../utils/boardingAgreementPdf";

const createAgreementFromRequest = (requestData = {}) => ({
  requestId: requestData.id || requestData.requestId || "",
  preparedDate: new Date().toISOString().slice(0, 10),
  ownerName: requestData.ownerName || "",
  ownerPhone: requestData.phone || "",
  ownerEmail: requestData.email || "",
  ownerAddress: requestData.ownerAddress || "",
  emergencyContact: requestData.emergencyContact || "",
  emergencyPhone: requestData.emergencyPhone || "",
  dogName: requestData.dogName || "",
  dogBreed: requestData.dogBreed || "",
  dogAge: requestData.dogAge || "",
  dogWeight: requestData.dogWeight || "",
  dogSex: requestData.dogSex || "",
  spayedNeutered: requestData.spayedNeutered || "",
  colorMarkings: requestData.colorMarkings || "",
  veterinarianName: requestData.veterinarianName || "",
  veterinarianPhone: requestData.veterinarianPhone || "",
  vaccinationStatus: requestData.vaccinationStatus || "",
  arrivalDate: requestData.startDate || "",
  pickupDate: requestData.endDate || "",
  feedingInstructions: requestData.feedingInstructions || "",
  medications: requestData.medications || "",
  medicalConditions: requestData.medicalConditions || "",
  allergies: requestData.allergies || "",
  behaviorNotes: requestData.behaviorNotes || "",
  biteHistory: requestData.biteHistory || "",
  specialHandling: requestData.specialHandling || "",
  belongings: requestData.belongings || "",
  notes: requestData.notes || "",
});

function BoardingAgreement({ onBackAdmin, onAgreementGenerated, requestData }) {
  const [agreement, setAgreement] = useState(() =>
    createAgreementFromRequest(requestData),
  );
  const [pdfUrl, setPdfUrl] = useState("");
  const [generatedFileName, setGeneratedFileName] = useState("");
  const [generationError, setGenerationError] = useState("");
  const iframeRef = useRef(null);
  const approvalRecordedRef = useRef(false);
  const agreementGeneratedRef = useRef(onAgreementGenerated);

  useEffect(() => {
    agreementGeneratedRef.current = onAgreementGenerated;
  }, [onAgreementGenerated]);

  useEffect(() => {
    let isActive = true;
    let nextPdfUrl = "";

    approvalRecordedRef.current = false;
    setAgreement(createAgreementFromRequest(requestData));
    setGeneratedFileName("");
    setGenerationError("");

    if (!requestData) {
      setPdfUrl("");
      return undefined;
    }

    const prepareAgreement = async () => {
      try {
        const nextAgreement = createAgreementFromRequest(requestData);
        const nextFileName = createBoardingAgreementPdfFilename(nextAgreement);
        const blob = createBoardingAgreementPdfBlob(nextAgreement);
        nextPdfUrl = URL.createObjectURL(blob);

        if (!isActive) {
          URL.revokeObjectURL(nextPdfUrl);
          return;
        }

        setAgreement(nextAgreement);
        setGeneratedFileName(nextFileName);
        setPdfUrl(nextPdfUrl);

        if (agreementGeneratedRef.current && !approvalRecordedRef.current) {
          approvalRecordedRef.current = true;
          await agreementGeneratedRef.current({
            ...requestData,
            requestId: nextAgreement.requestId,
            fileName: nextFileName,
            ownerName: nextAgreement.ownerName,
            dogName: nextAgreement.dogName,
            arrivalDate: nextAgreement.arrivalDate,
            pickupDate: nextAgreement.pickupDate,
          });
        }
      } catch (error) {
        if (nextPdfUrl) {
          URL.revokeObjectURL(nextPdfUrl);
          nextPdfUrl = "";
        }

        if (!isActive) {
          return;
        }

        setPdfUrl("");
        setGenerationError(
          error.message ||
            "The printable PDF could not be created. Please go back to the admin dashboard and try again.",
        );
      }
    };

    prepareAgreement();

    return () => {
      isActive = false;

      if (nextPdfUrl) {
        URL.revokeObjectURL(nextPdfUrl);
      }
    };
  }, [requestData]);

  const handleDownload = () => {
    const doc = createBoardingAgreementPdfDoc(agreement);
    doc.save(createBoardingAgreementPdfFilename(agreement));
  };

  const handlePrint = () => {
    const frameWindow = iframeRef.current?.contentWindow;

    if (frameWindow) {
      frameWindow.focus();
      frameWindow.print();
      return;
    }

    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!requestData) {
    return (
      <main className="agreement-page">
        <div className="container agreement-shell">
          <section className="agreement-preview-card">
            <p className="script-label">No Request Selected</p>
            <h2>There is no approved boarding request open right now.</h2>
            <p className="agreement-preview-lead">
              Go back to the admin dashboard, choose a pending dog request, and
              approve it to generate the printable agreement PDF.
            </p>
            <div className="agreement-actions">
              <button
                type="button"
                className="booking-secondary"
                onClick={onBackAdmin}
              >
                Back to Admin
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="agreement-page">
      <div className="container agreement-shell">
        <div className="agreement-header">
          <div>
            <p className="script-label">Printable Agreement</p>
            <h1>Boarding Agreement Ready to Print</h1>
            <p className="agreement-lead">
              Kelsey approved this boarding request, and the printable PDF is
              ready below. The bottom of the agreement includes a real pet owner
              signature line for an ink signature.
            </p>
          </div>

          <button
            type="button"
            className="booking-secondary agreement-back-btn"
            onClick={onBackAdmin}
          >
            Back to Admin
          </button>
        </div>

        <section className="agreement-preview-card">
          <p className="script-label">Approved Request</p>
          <h2>{agreement.dogName || "This dog"} is ready for the agreement packet.</h2>
          <p className="agreement-preview-lead">
            Review the summary, print the PDF for the pet owner, and collect
            the owner&apos;s signature at the bottom of the printed form before
            the stay begins.
          </p>

          <div className="agreement-preview-grid">
            <div className="agreement-preview-block">
              <span>Owner</span>
              <strong>{agreement.ownerName}</strong>
              <p>{agreement.ownerPhone}</p>
              <p>{agreement.ownerEmail}</p>
              <p>{agreement.ownerAddress}</p>
            </div>

            <div className="agreement-preview-block">
              <span>Dog</span>
              <strong>{agreement.dogName}</strong>
              <p>
                {agreement.dogBreed} | {agreement.dogAge} | {agreement.dogWeight}
              </p>
              <p>
                {agreement.dogSex} | Spayed / Neutered: {agreement.spayedNeutered}
              </p>
              <p>{agreement.colorMarkings}</p>
            </div>

            <div className="agreement-preview-block">
              <span>Stay Dates</span>
              <strong>{agreement.arrivalDate}</strong>
              <p>Pickup: {agreement.pickupDate}</p>
              <p>Vaccination status: {agreement.vaccinationStatus}</p>
            </div>

            <div className="agreement-preview-block">
              <span>Veterinarian</span>
              <strong>{agreement.veterinarianName}</strong>
              <p>{agreement.veterinarianPhone}</p>
              <p>Emergency Contact: {agreement.emergencyContact}</p>
              <p>{agreement.emergencyPhone}</p>
            </div>
          </div>

          <div className="agreement-preview-notes">
            <div className="agreement-note-block">
              <h3>Medical Notes</h3>
              <p>
                <strong>Medications:</strong> {agreement.medications}
              </p>
              <p>
                <strong>Medical Conditions:</strong> {agreement.medicalConditions}
              </p>
              <p>
                <strong>Allergies:</strong> {agreement.allergies}
              </p>
            </div>

            <div className="agreement-note-block">
              <h3>Care Notes</h3>
              <p>
                <strong>Feeding:</strong> {agreement.feedingInstructions}
              </p>
              <p>
                <strong>Behavior:</strong> {agreement.behaviorNotes}
              </p>
              <p>
                <strong>Bite History:</strong> {agreement.biteHistory}
              </p>
              <p>
                <strong>Special Handling:</strong> {agreement.specialHandling}
              </p>
            </div>
          </div>
        </section>

        <section className="agreement-pdf-card">
          <div className="agreement-pdf-toolbar">
            <div>
              <strong>PDF File</strong>
              <p>{generatedFileName || "Preparing printable agreement..."}</p>
            </div>

            <div className="agreement-actions">
              <button type="button" className="book-btn" onClick={handlePrint}>
                Print PDF
              </button>
              <button
                type="button"
                className="booking-secondary"
                onClick={handleDownload}
              >
                Download PDF
              </button>
            </div>
          </div>

          {generationError ? (
            <p className="admin-login-error" role="alert">
              {generationError}
            </p>
          ) : null}

          {pdfUrl ? (
            <iframe
              ref={iframeRef}
              title="Boarding agreement PDF preview"
              src={pdfUrl}
              className="agreement-pdf-frame"
            />
          ) : (
            <div className="agreement-pdf-empty">
              <p>The printable agreement preview will appear here.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default BoardingAgreement;
