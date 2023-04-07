import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gpurkfdwpahrgmcglvty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdXJrZmR3cGFocmdtY2dsdnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjg4OTUsImV4cCI6MTk4ODgwNDg5NX0.dTpFELWvDq5exBdGhzCzdTmoM1V7S986BC8Up7yTzEk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
