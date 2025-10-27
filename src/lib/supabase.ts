import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vpuykispootccqsugbsa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwdXlraXNwb290Y2Nxc3VnYnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NjUxNTQsImV4cCI6MjA3NzE0MTE1NH0.TCnDtvGf08CePSUHeQvcA1Fkd7q1ENy6if-UrS59hFM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  created_at: string;
};