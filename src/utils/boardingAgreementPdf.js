import { jsPDF } from "jspdf";

const PDF_MARGIN = 48;
const PDF_WIDTH = 612;
const PDF_HEIGHT = 792;
const CONTENT_WIDTH = PDF_WIDTH - PDF_MARGIN * 2;

const formatDate = (value) => {
  if (!value) {
    return "Not provided";
  }

  const parsedDate = new Date(`${value}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const safeText = (value, fallback = "Not provided") => value || fallback;

const addPageIfNeeded = (doc, y, neededHeight = 24) => {
  if (y + neededHeight <= PDF_HEIGHT - PDF_MARGIN) {
    return y;
  }

  doc.addPage();
  return PDF_MARGIN;
};

const addParagraph = (doc, text, y, options = {}) => {
  const {
    font = "helvetica",
    style = "normal",
    size = 10.5,
    lineHeight = 15,
    color = [43, 31, 74],
  } = options;

  doc.setFont(font, style);
  doc.setFontSize(size);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  y = addPageIfNeeded(doc, y, lines.length * lineHeight + 6);
  doc.text(lines, PDF_MARGIN, y);

  return y + lines.length * lineHeight;
};

const addField = (doc, label, value, y) => {
  const lineHeight = 15;
  const lines = doc.splitTextToSize(`${label}: ${safeText(value)}`, CONTENT_WIDTH);

  y = addPageIfNeeded(doc, y, lines.length * lineHeight + 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(38, 22, 76);
  doc.text(`${label}:`, PDF_MARGIN, y);

  const labelWidth = doc.getTextWidth(`${label}: `);
  doc.setFont("helvetica", "normal");
  const firstLineValue = lines[0].replace(`${label}: `, "");
  doc.text(firstLineValue, PDF_MARGIN + labelWidth, y);

  if (lines.length > 1) {
    doc.text(lines.slice(1), PDF_MARGIN, y + lineHeight);
  }

  return y + lines.length * lineHeight;
};

const addSectionTitle = (doc, title, y) => {
  y = addPageIfNeeded(doc, y, 28);
  doc.setFillColor(245, 239, 255);
  doc.roundedRect(PDF_MARGIN, y - 16, CONTENT_WIDTH, 22, 8, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(59, 30, 104);
  doc.text(title, PDF_MARGIN + 10, y);

  return y + 22;
};

const addClause = (doc, title, body, y) => {
  y = addPageIfNeeded(doc, y, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.75);
  doc.setTextColor(38, 22, 76);
  doc.text(title, PDF_MARGIN, y);

  return addParagraph(doc, body, y + 14, {
    size: 10.25,
    lineHeight: 14.5,
    color: [70, 60, 92],
  });
};

const addSignatureRow = (doc, leftLabel, rightLabel, y) => {
  y = addPageIfNeeded(doc, y, 44);

  const gap = 22;
  const leftWidth = CONTENT_WIDTH * 0.68;
  const rightWidth = CONTENT_WIDTH - leftWidth - gap;
  const lineY = y + 12;
  const rightX = PDF_MARGIN + leftWidth + gap;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(38, 22, 76);
  doc.text(leftLabel, PDF_MARGIN, y);
  doc.text(rightLabel, rightX, y);

  doc.setDrawColor(126, 108, 162);
  doc.line(PDF_MARGIN, lineY, PDF_MARGIN + leftWidth, lineY);
  doc.line(rightX, lineY, rightX + rightWidth, lineY);

  return lineY + 24;
};

export const createBoardingAgreementPdfFilename = (agreement) => {
  const dogSlug = safeText(agreement.dogName, "dog")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const dateSlug = agreement.arrivalDate || new Date().toISOString().slice(0, 10);

  return `boarding-agreement-${dogSlug}-${dateSlug}.pdf`;
};

export const createBoardingAgreementPdfDoc = (agreement) => {
  const doc = new jsPDF({
    unit: "pt",
    format: "letter",
  });

  let y = PDF_MARGIN;

  doc.setFillColor(33, 9, 73);
  doc.rect(0, 0, PDF_WIDTH, 96, "F");
  doc.setTextColor(255, 248, 241);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Kelsey's Lazy Bonez Boarding & Grooming", PDF_MARGIN, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Dog Boarding Agreement", PDF_MARGIN, 64);
  doc.text("123 Pawsome Lane | Happy Tails, IN 12345 | (555) 123-4567", PDF_MARGIN, 80);

  y = 122;

  y = addParagraph(
    doc,
    `This Dog Boarding Agreement is entered into by and between Kelsey's Lazy Bonez Boarding & Grooming ("Facility") and the undersigned dog owner ("Owner"). The parties agree that the Facility will provide boarding services for ${safeText(agreement.dogName, "the dog")} under the terms stated below.`,
    y,
    {
      size: 10.5,
      lineHeight: 15,
    },
  );

  y += 10;
  y = addSectionTitle(doc, "Owner and Dog Information", y);
  y = addField(doc, "Owner Name", agreement.ownerName, y);
  y = addField(doc, "Owner Phone", agreement.ownerPhone, y);
  y = addField(doc, "Owner Email", agreement.ownerEmail, y);
  y = addField(doc, "Owner Address", agreement.ownerAddress, y);
  y = addField(doc, "Emergency Contact", agreement.emergencyContact, y);
  y = addField(doc, "Emergency Contact Phone", agreement.emergencyPhone, y);
  y = addField(doc, "Dog Name", agreement.dogName, y);
  y = addField(doc, "Dog Breed", agreement.dogBreed, y);
  y = addField(doc, "Dog Age", agreement.dogAge, y);
  y = addField(doc, "Dog Weight", agreement.dogWeight, y);
  y = addField(doc, "Dog Sex", agreement.dogSex, y);
  y = addField(doc, "Spayed / Neutered", agreement.spayedNeutered, y);
  y = addField(doc, "Color or Markings", agreement.colorMarkings, y);
  y = addField(doc, "Arrival Date", formatDate(agreement.arrivalDate), y);
  y = addField(doc, "Pickup Date", formatDate(agreement.pickupDate), y);
  y = addField(doc, "Veterinarian", agreement.veterinarianName, y);
  y = addField(doc, "Veterinarian Phone", agreement.veterinarianPhone, y);
  y = addField(doc, "Vaccination Status", agreement.vaccinationStatus, y);

  y += 10;
  y = addSectionTitle(doc, "Care, Medical, and Behavior Notes", y);
  y = addField(doc, "Feeding Instructions", agreement.feedingInstructions, y);
  y = addField(doc, "Medications", agreement.medications, y);
  y = addField(doc, "Medical Conditions", agreement.medicalConditions, y);
  y = addField(doc, "Allergies", agreement.allergies, y);
  y = addField(doc, "Behavior Notes", agreement.behaviorNotes, y);
  y = addField(doc, "Bite History", agreement.biteHistory, y);
  y = addField(doc, "Special Handling Notes", agreement.specialHandling, y);
  y = addField(doc, "Belongings Sent With Dog", agreement.belongings, y);
  y = addField(doc, "Additional Owner Notes", agreement.notes, y);

  y += 10;
  y = addSectionTitle(doc, "Terms and Conditions", y);

  const clauses = [
    {
      title: "1. Services and Stay Period",
      body: `Owner requests boarding services for ${safeText(agreement.dogName, "the dog")} beginning on ${formatDate(agreement.arrivalDate)} and ending on ${formatDate(agreement.pickupDate)}. Facility will provide lodging, routine supervision, feeding as instructed, and reasonable daily care during the boarding period.`,
    },
    {
      title: "2. Owner Representations and Health Disclosure",
      body: `Owner represents that the dog identified in this Agreement is owned by Owner or lawfully placed in Owner's care, is current on all vaccinations and preventive care required by Facility, is free of contagious disease to the best of Owner's knowledge, and has no undisclosed medical condition, injury, bite history, or behavioral issue that could affect the dog's safety or the safety of persons, animals, or property.`,
    },
    {
      title: "3. Medication, Feeding, and Special Care",
      body: `Owner is solely responsible for providing complete and accurate written instructions regarding feeding, medication, mobility limitations, crate routines, allergies, triggers, and all other special care needs. Facility will rely on the information supplied by Owner. Owner accepts full responsibility for any loss, injury, illness, complication, or expense arising out of incomplete, inaccurate, or omitted instructions.`,
    },
    {
      title: "4. Emergency Veterinary Care Authorization",
      body: `If Facility reasonably determines that emergency or urgent veterinary treatment is necessary and Owner or Owner's emergency contact cannot be reached promptly, Owner authorizes Facility to seek veterinary examination, treatment, hospitalization, sedation, transport, diagnostic testing, medication, or other care deemed reasonably necessary for the dog's health, safety, or welfare. Owner agrees to pay all veterinary charges, transportation charges, pharmacy charges, and related costs in full upon demand.`,
    },
    {
      title: "5. Assumption of Inherent Risks",
      body: `Owner understands that dog boarding, transportation, handling, feeding, exercise, and interaction with people, surfaces, noises, equipment, and other animals involve inherent risks that cannot be eliminated entirely. These risks include, without limitation, stress, weight loss, dehydration, diarrhea, scratches, bites, illness, escape attempts, injury, property damage, and in rare circumstances serious injury or death. Owner voluntarily accepts these inherent risks on behalf of the dog and Owner.`,
    },
    {
      title: "6. Responsibility for Damage or Injury Caused by the Dog",
      body: `Owner remains legally and financially responsible for damage, injury, loss, claims, costs, or expenses caused by the dog's actions, including damage to persons, other animals, equipment, furnishings, enclosures, vehicles, and other property. Owner agrees to reimburse Facility for all such losses and related costs incurred because of the dog's acts or omissions, except to the extent prohibited by applicable law.`,
    },
    {
      title: "7. Pickup, Fees, and Continuing Charges",
      body: `Owner agrees to pick up the dog on or before the stated pickup date and to pay all boarding charges, late pickup charges, cleaning charges, medication administration charges, and other agreed service fees. If Owner fails to retrieve the dog as scheduled and Facility cannot obtain prompt instructions, Facility may continue to board the dog and assess additional daily charges until the dog is retrieved or other lawful arrangements are made.`,
    },
    {
      title: "8. Accuracy, Entire Agreement, and Signature",
      body: `By signing below, Owner confirms that all information provided to Facility is true, complete, and current. Owner acknowledges that Facility is relying on these disclosures in accepting the dog for boarding. This document records the boarding terms supplied for this stay and remains effective throughout the dog's boarding period and any authorized extension of that period.`,
    },
  ];

  clauses.forEach((clause) => {
    y = addClause(doc, clause.title, clause.body, y);
    y += 8;
  });

  y += 6;
  y = addSectionTitle(doc, "Pet Owner Signature", y);
  y = addParagraph(
    doc,
    "Print this agreement and have the pet owner sign below in ink before the boarding stay begins.",
    y,
    {
      size: 10.25,
      lineHeight: 14,
      color: [70, 60, 92],
    },
  );
  y += 8;
  y = addSignatureRow(doc, "Pet Owner Signature", "Date", y);
  y = addSignatureRow(doc, "Printed Name", "Phone Number", y);

  const footerText = `Generated for ${safeText(agreement.dogName, "Dog")} on ${formatDate(
    agreement.preparedDate,
  )}`;

  const pageCount = doc.getNumberOfPages();
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    doc.setPage(pageNumber);
    doc.setDrawColor(220, 212, 236);
    doc.line(PDF_MARGIN, PDF_HEIGHT - 38, PDF_WIDTH - PDF_MARGIN, PDF_HEIGHT - 38);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(111, 97, 139);
    doc.text(footerText, PDF_MARGIN, PDF_HEIGHT - 22);
    doc.text(`Page ${pageNumber} of ${pageCount}`, PDF_WIDTH - PDF_MARGIN - 58, PDF_HEIGHT - 22);
  }

  return doc;
};

export const createBoardingAgreementPdfBlob = (agreement) =>
  createBoardingAgreementPdfDoc(agreement).output("blob");

export const generateBoardingAgreementPdf = (agreement) => {
  const doc = createBoardingAgreementPdfDoc(agreement);
  const fileName = createBoardingAgreementPdfFilename(agreement);
  doc.save(fileName);

  return fileName;
};
