import { isSupabaseConfigured, supabase } from "./supabase";

const BOOKINGS_TABLE = "bookings";

const assertSupabaseConfigured = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured yet. Add your VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY values to .env.local first.",
    );
  }
};

const mapBookingRow = (row) => ({
  id: row.id,
  requestId: row.id,
  ownerName: row.owner_name || "",
  email: row.email || "",
  phone: row.phone || "",
  ownerAddress: row.owner_address || "",
  emergencyContact: row.emergency_contact || "",
  emergencyPhone: row.emergency_phone || "",
  dogName: row.dog_name || "",
  dogBreed: row.dog_breed || "",
  dogAge: row.dog_age || "",
  dogWeight: row.dog_weight || "",
  dogSex: row.dog_sex || "",
  spayedNeutered: row.spayed_neutered || "",
  colorMarkings: row.color_markings || "",
  service: row.service || "Boarding",
  startDate: row.start_date || "",
  endDate: row.end_date || "",
  veterinarianName: row.veterinarian_name || "",
  veterinarianPhone: row.veterinarian_phone || "",
  vaccinationStatus: row.vaccination_status || "",
  feedingInstructions: row.feeding_instructions || "",
  medications: row.medications || "",
  medicalConditions: row.medical_conditions || "",
  allergies: row.allergies || "",
  behaviorNotes: row.behavior_notes || "",
  biteHistory: row.bite_history || "",
  specialHandling: row.special_handling || "",
  belongings: row.belongings || "",
  notes: row.notes || "",
  status: row.status || "pending",
  submittedAt: row.submitted_at || row.created_at || "",
  approvedAt: row.approved_at || "",
  deniedAt: row.denied_at || "",
  pdfFileName: row.pdf_file_name || "",
});

const serializeBookingForm = (bookingForm) => ({
  owner_name: bookingForm.ownerName.trim(),
  email: bookingForm.email.trim().toLowerCase(),
  phone: bookingForm.phone.trim(),
  owner_address: bookingForm.ownerAddress.trim(),
  emergency_contact: bookingForm.emergencyContact.trim(),
  emergency_phone: bookingForm.emergencyPhone.trim(),
  dog_name: bookingForm.dogName.trim(),
  dog_breed: bookingForm.dogBreed.trim(),
  dog_age: bookingForm.dogAge.trim(),
  dog_weight: bookingForm.dogWeight.trim(),
  dog_sex: bookingForm.dogSex,
  spayed_neutered: bookingForm.spayedNeutered,
  color_markings: bookingForm.colorMarkings.trim(),
  service: bookingForm.service,
  start_date: bookingForm.startDate,
  end_date: bookingForm.endDate,
  veterinarian_name: bookingForm.veterinarianName.trim(),
  veterinarian_phone: bookingForm.veterinarianPhone.trim(),
  vaccination_status: bookingForm.vaccinationStatus,
  feeding_instructions: bookingForm.feedingInstructions.trim(),
  medications: bookingForm.medications.trim(),
  medical_conditions: bookingForm.medicalConditions.trim(),
  allergies: bookingForm.allergies.trim(),
  behavior_notes: bookingForm.behaviorNotes.trim(),
  bite_history: bookingForm.biteHistory.trim(),
  special_handling: bookingForm.specialHandling.trim(),
  belongings: bookingForm.belongings.trim(),
  notes: bookingForm.notes.trim(),
  status: "pending",
  submitted_at: new Date().toISOString(),
});

const updateBookingRow = async (bookingId, payload) => {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .update(payload)
    .eq("id", bookingId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapBookingRow(data);
};

export const fetchBookingRequests = async () => {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapBookingRow);
};

export const createBookingRequest = async (bookingForm) => {
  assertSupabaseConfigured();

  const { data, error } = await supabase
    .from(BOOKINGS_TABLE)
    .insert(serializeBookingForm(bookingForm))
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapBookingRow(data);
};

export const markBookingApproved = async (bookingId, pdfFileName) =>
  updateBookingRow(bookingId, {
    status: "approved",
    approved_at: new Date().toISOString(),
    denied_at: null,
    pdf_file_name: pdfFileName,
  });

export const markBookingDenied = async (bookingId) =>
  updateBookingRow(bookingId, {
    status: "denied",
    denied_at: new Date().toISOString(),
    approved_at: null,
    pdf_file_name: null,
  });
