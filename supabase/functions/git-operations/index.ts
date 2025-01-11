import { serve } from 'https://deno.fresh.run/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface GitOperation {
  type: 'push' | 'sync';
  sourceRepoId: string;
  targetRepoId?: string;
  pushType?: 'regular' | 'force' | 'force-with-lease';
}

console.log('Git Operations Function Started');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, sourceRepoId, targetRepoId, pushType } = await req.json() as GitOperation

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Log operation details
    console.log('Operation:', { type, sourceRepoId, targetRepoId, pushType });

    // Simulate Git operation (in a real implementation, this would interact with Git)
    const timestamp = new Date().toISOString()
    
    if (type === 'push' && targetRepoId) {
      // Update target repository
      const { error: targetError } = await supabaseClient
        .from('repositories')
        .update({ 
          last_sync: timestamp,
          status: 'synced'
        })
        .eq('id', targetRepoId)

      if (targetError) throw targetError
      
      console.log('Target repository updated:', targetRepoId);
    }

    // Update source repository
    const { error: sourceError } = await supabaseClient
      .from('repositories')
      .update({ 
        last_sync: timestamp,
        status: 'synced'
      })
      .eq('id', sourceRepoId)

    if (sourceError) throw sourceError
    
    console.log('Source repository updated:', sourceRepoId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Git ${type} operation completed successfully`,
        timestamp 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})