import { createClient } from '@supabase/supabase-js';
import { loadEnvConfig } from '@next/env';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectDir = resolve(__dirname, '../');
loadEnvConfig(projectDir);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const idpResources = [
  { title: 'IELTS Official Preparation Hub', category: 'General', slug: 'idp-preparation-hub', external_url: 'https://ielts.idp.com/about/test-tips' },
  { title: 'IELTS Listening Preparation', category: 'Listening', slug: 'idp-listening-prep', external_url: 'https://ielts.idp.com/prepare/ielts-listening' },
  { title: 'Tips to Avoid Common Mistakes in Listening', category: 'Listening', slug: 'idp-listening-tips', external_url: 'https://ielts.idp.com/prepare/article-ielts-listening-test-tips-to-avoid-common-mistakes' },
  { title: 'IELTS Reading Preparation', category: 'Reading', slug: 'idp-reading-prep', external_url: 'https://ielts.idp.com/prepare/ielts-reading' },
  { title: 'How to Manage Your Time in Reading', category: 'Reading', slug: 'idp-reading-time', external_url: 'https://ielts.idp.com/prepare/article-ielts-reading-test-how-to-manage-your-time' },
  { title: 'IELTS Writing Preparation', category: 'Writing', slug: 'idp-writing-prep', external_url: 'https://ielts.idp.com/prepare/ielts-writing' },
  { title: 'How to Organise Your Response (Task 1 & 2)', category: 'Writing', slug: 'idp-writing-organise', external_url: 'https://ielts.idp.com/prepare/article-ielts-writing-task-1-and-2-how-to-organise-your-response' },
  { title: 'Academic Writing Task 1', category: 'Writing', slug: 'idp-writing-task-1', external_url: 'https://ielts.idp.com/about/academic-writing' },
  { title: 'Sample Answers: Writing Task 1', category: 'Writing', slug: 'idp-writing-task-1-samples', external_url: 'https://ielts.idp.com/prepare/sample-answers/writing-task-1' },
  { title: '7 Steps Towards a Band 7 in Task 2', category: 'Writing', slug: 'idp-writing-task-2-steps', external_url: 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-steps-towards-a-band-7' },
  { title: '7 Mistakes Preventing a Band 7', category: 'Writing', slug: 'idp-writing-task-2-mistakes', external_url: 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-mistakes-preventing-you-from-getting-a-band-7' },
  { title: 'Speaking Preparation', category: 'Speaking', slug: 'idp-speaking-prep', external_url: 'https://ielts.idp.com/about/ielts-speaking' },
  { title: '10 Expert Speaking Tips', category: 'Speaking', slug: 'idp-speaking-tips', external_url: 'https://ielts.idp.com/prepare/article-10-tips-ielts-speaking' },
  { title: 'Speaking Practice Questions', category: 'Speaking', slug: 'idp-speaking-practice', external_url: 'https://ielts.idp.com/prepare/ielts-speaking-practice-test' },
  { title: 'Step Up to Band 7', category: 'General', slug: 'idp-step-up-band-7', external_url: 'https://ielts.idp.com/prepare/article-step-up-to-band-7' },
  { title: 'Step Up to Band 8', category: 'General', slug: 'idp-step-up-band-8', external_url: 'https://ielts.idp.com/prepare/article-step-up-to-band-8' },
  { title: 'Official Practice Tests', category: 'Practice', slug: 'idp-official-practice-tests', external_url: 'https://ielts.idp.com/prepare/practice-tests' },
];

async function run() {
  console.log('Inserting IDP resources into articles table...');
  
  for (const resource of idpResources) {
    const { error } = await supabase.from('articles').upsert({
      title: resource.title,
      slug: resource.slug,
      category: resource.category,
      content: resource.external_url, 
      external_url: resource.external_url
    }, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error inserting ${resource.title}:`, error.message);
    } else {
      console.log(`Successfully inserted: ${resource.title}`);
    }
  }
  
  console.log('Done!');
}

run();
