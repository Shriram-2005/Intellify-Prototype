INSERT INTO articles (title, slug, category, content, external_url) VALUES 
('IELTS Official Preparation Hub', 'idp-preparation-hub', 'General', 'https://ielts.idp.com/about/test-tips', 'https://ielts.idp.com/about/test-tips'),
('IELTS Listening Preparation', 'idp-listening-prep', 'Listening', 'https://ielts.idp.com/prepare/ielts-listening', 'https://ielts.idp.com/prepare/ielts-listening'),
('Tips to Avoid Common Mistakes in Listening', 'idp-listening-tips', 'Listening', 'https://ielts.idp.com/prepare/article-ielts-listening-test-tips-to-avoid-common-mistakes', 'https://ielts.idp.com/prepare/article-ielts-listening-test-tips-to-avoid-common-mistakes'),
('IELTS Reading Preparation', 'idp-reading-prep', 'Reading', 'https://ielts.idp.com/prepare/ielts-reading', 'https://ielts.idp.com/prepare/ielts-reading'),
('How to Manage Your Time in Reading', 'idp-reading-time', 'Reading', 'https://ielts.idp.com/prepare/article-ielts-reading-test-how-to-manage-your-time', 'https://ielts.idp.com/prepare/article-ielts-reading-test-how-to-manage-your-time'),
('IELTS Writing Preparation', 'idp-writing-prep', 'Writing', 'https://ielts.idp.com/prepare/ielts-writing', 'https://ielts.idp.com/prepare/ielts-writing'),
('How to Organise Your Response (Task 1 & 2)', 'idp-writing-organise', 'Writing', 'https://ielts.idp.com/prepare/article-ielts-writing-task-1-and-2-how-to-organise-your-response', 'https://ielts.idp.com/prepare/article-ielts-writing-task-1-and-2-how-to-organise-your-response'),
('Academic Writing Task 1', 'idp-writing-task-1', 'Writing', 'https://ielts.idp.com/about/academic-writing', 'https://ielts.idp.com/about/academic-writing'),
('Sample Answers: Writing Task 1', 'idp-writing-task-1-samples', 'Writing', 'https://ielts.idp.com/prepare/sample-answers/writing-task-1', 'https://ielts.idp.com/prepare/sample-answers/writing-task-1'),
('7 Steps Towards a Band 7 in Task 2', 'idp-writing-task-2-steps', 'Writing', 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-steps-towards-a-band-7', 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-steps-towards-a-band-7'),
('7 Mistakes Preventing a Band 7', 'idp-writing-task-2-mistakes', 'Writing', 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-mistakes-preventing-you-from-getting-a-band-7', 'https://ielts.idp.com/prepare/article-ielts-writing-task-2-7-mistakes-preventing-you-from-getting-a-band-7'),
('Speaking Preparation', 'idp-speaking-prep', 'Speaking', 'https://ielts.idp.com/about/ielts-speaking', 'https://ielts.idp.com/about/ielts-speaking'),
('10 Expert Speaking Tips', 'idp-speaking-tips', 'Speaking', 'https://ielts.idp.com/prepare/article-10-tips-ielts-speaking', 'https://ielts.idp.com/prepare/article-10-tips-ielts-speaking'),
('Speaking Practice Questions', 'idp-speaking-practice', 'Speaking', 'https://ielts.idp.com/prepare/ielts-speaking-practice-test', 'https://ielts.idp.com/prepare/ielts-speaking-practice-test'),
('Step Up to Band 7', 'idp-step-up-band-7', 'General', 'https://ielts.idp.com/prepare/article-step-up-to-band-7', 'https://ielts.idp.com/prepare/article-step-up-to-band-7'),
('Step Up to Band 8', 'idp-step-up-band-8', 'General', 'https://ielts.idp.com/prepare/article-step-up-to-band-8', 'https://ielts.idp.com/prepare/article-step-up-to-band-8'),
('Official Practice Tests', 'idp-official-practice-tests', 'Practice', 'https://ielts.idp.com/prepare/practice-tests', 'https://ielts.idp.com/prepare/practice-tests')
ON CONFLICT (slug) DO NOTHING;
