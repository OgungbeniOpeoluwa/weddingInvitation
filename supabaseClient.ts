import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qssgpfiavieysaxmktac.supabase.co"; // replace
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzc2dwZmlhdmlleXNheG1rdGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMzIyMjIsImV4cCI6MjA3MjgwODIyMn0.zT2KzvdSw7INg_0y2zCAo21kG9I6tMHycn8L3d8si80"; // replace

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
