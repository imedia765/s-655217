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
    console.log('Received operation:', { type, sourceRepoId, targetRepoId, pushType });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Initialize Octokit with GitHub token
    const githubToken = Deno.env.get('GITHUB_ACCESS_TOKEN');
    if (!githubToken) {
      console.error('GitHub token not found');
      throw new Error('GitHub token not configured');
    }

    const octokit = new Octokit({
      auth: githubToken
    });

    console.log('Initialized clients');

    if (type === 'getLastCommit') {
      console.log('Getting last commit for repo:', sourceRepoId);
      
      const { data: repo, error: repoError } = await supabaseClient
        .from('repositories')
        .select('url')
        .eq('id', sourceRepoId)
        .single();

      if (repoError) {
        console.error('Error fetching repository:', repoError);
        throw repoError;
      }

      if (!repo) {
        console.error('Repository not found:', sourceRepoId);
        throw new Error('Repository not found');
      }

      console.log('Found repository:', repo.url);

      // Extract owner and repo name from URL
      const [, owner, repoName] = repo.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/) || [];
      
      if (!owner || !repoName) {
        console.error('Invalid repository URL format:', repo.url);
        throw new Error('Invalid repository URL format');
      }

      console.log('Fetching commit for:', { owner, repoName });
      
      try {
        const { data: commit } = await octokit.rest.repos.getCommit({
          owner,
          repo: repoName,
          ref: 'HEAD'
        });

        console.log('Got commit:', commit.sha);

        const { error: updateError } = await supabaseClient
          .from('repositories')
          .update({ 
            last_commit: commit.sha,
            last_commit_date: commit.commit.author?.date,
            last_sync: new Date().toISOString(),
            status: 'synced'
          })
          .eq('id', sourceRepoId);

        if (updateError) {
          console.error('Error updating repository:', updateError);
          throw updateError;
        }

        console.log('Successfully updated repository with commit info');

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
      console.log('Starting push operation');
      
      // Get source and target repositories
      const { data: repos, error: reposError } = await supabaseClient
        .from('repositories')
        .select('*')
        .in('id', [sourceRepoId, targetRepoId]);

      if (reposError) {
        console.error('Error fetching repositories:', reposError);
        throw reposError;
      }

      const sourceRepo = repos.find(r => r.id === sourceRepoId);
      const targetRepo = repos.find(r => r.id === targetRepoId);

      if (!sourceRepo || !targetRepo) {
        console.error('Source or target repository not found');
        throw new Error('Source or target repository not found');
      }

      console.log('Found repositories:', {
        source: sourceRepo.url,
        target: targetRepo.url
      });

      // Extract owner and repo info
      const [, sourceOwner, sourceRepoName] = sourceRepo.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/) || [];
      const [, targetOwner, targetRepoName] = targetRepo.url.match(/github\.com\/([^\/]+)\/([^\/\.]+)/) || [];

      if (!sourceOwner || !sourceRepoName || !targetOwner || !targetRepoName) {
        console.error('Invalid repository URL format');
        throw new Error('Invalid repository URL format');
      }

      try {
        // Get the latest commit from source
        const { data: sourceCommit } = await octokit.rest.repos.getCommit({
          owner: sourceOwner,
          repo: sourceRepoName,
          ref: 'HEAD'
        });

        console.log('Got source commit:', sourceCommit.sha);

        // Create a merge using GitHub's API
        const { data: mergeResult } = await octokit.rest.repos.merge({
          owner: targetOwner,
          repo: targetRepoName,
          base: 'main', // or 'master' depending on your default branch
          head: sourceCommit.sha,
          commit_message: `Merge from ${sourceRepo.nickname || sourceRepo.url}`
        });

        console.log('Merge successful:', mergeResult);

        // Update both repositories' status
        const timestamp = new Date().toISOString();
        
        const { error: updateError } = await supabaseClient
          .from('repositories')
          .update({ 
            last_sync: timestamp,
            status: 'synced'
          })
          .in('id', [sourceRepoId, targetRepoId]);

        if (updateError) {
          console.error('Error updating repositories status:', updateError);
          throw updateError;
        }

        console.log('Successfully updated repositories status');

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: `Push operation completed successfully`,
            mergeResult
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (error) {
        console.error('Error during push operation:', error);
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Git ${type} operation completed successfully`,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in git-operations function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.response?.data || error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});