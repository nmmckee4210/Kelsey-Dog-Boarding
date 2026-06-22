import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const cwd = process.cwd();
const envPath = path.join(cwd, ".env.local");

const readEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    env[key] = value;
  }

  return env;
};

const fileEnv = readEnvFile(envPath);
const env = { ...fileEnv, ...process.env };

const url = env.VITE_SUPABASE_URL || "";
const key =
  env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || "";
const email = env.SUPABASE_VERIFY_EMAIL || env.VITE_ADMIN_EMAIL || "";
const password = env.SUPABASE_VERIFY_PASSWORD || "";

if (!url || !key) {
  console.error(
    "Missing Supabase config. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local first.",
  );
  process.exit(1);
}

if (!email || !password) {
  console.error(
    "Missing verification credentials. Set SUPABASE_VERIFY_EMAIL and SUPABASE_VERIFY_PASSWORD for this check.",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const main = async () => {
  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    throw new Error(`Sign-in failed: ${signInError.message}`);
  }

  const signedInEmail = signInData.user?.email || "(unknown user)";
  console.log(`Signed in as ${signedInEmail}`);

  const { data, error } = await supabase
    .from("bookings")
    .select("id, status, dog_name, submitted_at")
    .order("submitted_at", { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(`Bookings query failed: ${error.message}`);
  }

  console.log(`Bookings table reachable. ${data.length} row(s) returned.`);

  for (const row of data) {
    console.log(
      `- ${row.id} | ${row.status} | ${row.dog_name} | ${row.submitted_at}`,
    );
  }

  await supabase.auth.signOut();
};

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
