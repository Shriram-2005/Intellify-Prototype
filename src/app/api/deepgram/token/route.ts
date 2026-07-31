import { NextResponse } from 'next/server';
import { createClient } from '@deepgram/sdk';

export async function GET() {
  try {
    const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
    
    if (!deepgramApiKey) {
      return NextResponse.json(
        { error: 'Deepgram API Key is missing in environment variables.' },
        { status: 500 }
      );
    }

    const deepgram = createClient(deepgramApiKey);

    // Get the first project ID associated with the API key
    const { result: projectsResult, error: projectsError } = await deepgram.manage.getProjects();
    
    if (projectsError) {
      console.error('Error fetching Deepgram projects:', projectsError);
      return NextResponse.json({ error: projectsError.message }, { status: 500 });
    }

    const projectId = projectsResult?.projects[0]?.project_id;

    if (!projectId) {
      return NextResponse.json({ error: 'No Deepgram project found.' }, { status: 500 });
    }

    // Create a temporary key that expires in 1 hour
    const { result: keyResult, error: keyError } = await deepgram.manage.createProjectKey(projectId, {
      comment: 'Temporary client key for frontend WebSocket',
      scopes: ['usage:write'],
      time_to_live_in_seconds: 3600, // 1 hour
    });

    if (keyError) {
      console.error('Error creating Deepgram temporary key:', keyError);
      return NextResponse.json({ error: keyError.message }, { status: 500 });
    }

    return NextResponse.json({ key: keyResult.key });
  } catch (error) {
    console.error('Unexpected error generating Deepgram token:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while generating the Deepgram token.' },
      { status: 500 }
    );
  }
}
