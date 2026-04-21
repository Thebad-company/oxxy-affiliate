const { createClient } = require('@supabase/supabase-js');
const config = require('./env');

if (!config.db.supabaseUrl || !config.db.supabaseServiceKey) {
  console.warn('[Oxxy DB Warning] Supabase URL or Service Key is missing. Database connection will fail.');
}

const supabase = createClient(
  config.db.supabaseUrl || 'https://dummy-url.supabase.co',
  config.db.supabaseServiceKey || 'dummy-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

/**
 * Utility to test DB connection on startup
 */
const checkDbConnection = async () => {
  try {
    const { data, error } = await supabase.from('affiliates').select('id').limit(1);
    if (error) throw error;
    console.log('[Oxxy DB] Database securely connected via Service Role.');
    return true;
  } catch (err) {
    if (err.code === 'PGRST116') {
       // Table might be empty, but connection works.
       console.log('[Oxxy DB] Database connected securely.');
       return true;
    }
    console.error('[Oxxy DB Error] Could not connect to database. Have you run the SQL schema yet? Error:', err.message);
    return false;
  }
};

module.exports = { supabase, checkDbConnection };
