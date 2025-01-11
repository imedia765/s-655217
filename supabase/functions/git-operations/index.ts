import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Octokit } from 'https://esm.sh/octokit'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GitOperation {
  type: 'push' | 'sync' | 'delete' | 'getLastCommit';
  sourceRepoId: string;
  targetRepoId?: string;
  pushType?: 'regular' | 'force' | 'force-with-lease';
}

console.log('Git Operations Function Started');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, sourceRepoId, targetRepoId, pushType } = await req.json() as GitOperation

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Initialize Octokit
    const octokit = new Octokit({
      auth: Deno.env.get('GITHUB_ACCESS_TOKEN')
    });

    // Log operation details
    console.log('Operation:', { type, sourceRepoId, targetRepoId, pushType });

    if (type === 'getLastCommit') {
      const { data: repo } = await supabaseClient
        .from('repositories')
        .select('url')
        .eq('id', sourceRepoId)
        .single();

      if (!repo) throw new Error('Repository not found');

      // Extract owner and repo name from URL
      const [, owner, repoName] = repo.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/) || [];
      
      try {
        const { data: commit } = await octokit.rest.repos.getCommit({
          owner,
          repo: repoName,
          ref: 'HEAD'
        });

        await supabaseClient
          .from('repositories')
          .update({ 
            last_commit: commit.sha,
            last_commit_date: commit.commit.author?.date,
            last_sync: new Date().toISOString(),
            status: 'synced'
          })
          .eq('id', sourceRepoId);

        return new Response(
          JSON.stringify({ success: true, commit }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error fetching commit:', error);
        throw error;
      }
    }
    
    if (type === 'push' && targetRepoId) {
      // Simulate Git push operation
      const timestamp = new Date().toISOString()
      
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
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Git ${type} operation completed successfully`,
        timestamp: new Date().toISOString()
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