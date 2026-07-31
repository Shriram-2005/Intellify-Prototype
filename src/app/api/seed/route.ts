import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

const mockReadingData: Record<string, any> = {
  'passage-1': {
    title: 'The Secret Life of Trees',
    meta: 'Academic Reading • Passage 1',
    paragraphs: [
      'For centuries, trees have been regarded merely as the silent, solitary giants of the natural world. However, recent ecological research has revolutionized our understanding of arboreal communities, revealing a complex, interconnected web of communication and resource sharing that challenges our fundamental perception of forest ecosystems.',
      'At the heart of this hidden network is the mycorrhizal network, often playfully referred to by scientists as the "Wood Wide Web." This intricate system consists of underground fungal threads known as mycelium, which colonize the roots of trees and other plants. Through this symbiotic relationship, trees are able to exchange vital nutrients, water, and even chemical warning signals.',
      'Dr. Suzanne Simard, a pioneer in forest ecology, demonstrated that older, more established trees—often termed "Mother Trees"—use this fungal network to supply younger, shaded saplings with excess carbon, effectively keeping them alive in light-deprived understories. Furthermore, when a tree is under attack by pests, it can transmit distress signals through the mycelium, prompting neighboring trees to preemptively ramp up their defensive enzymes.'
    ],
    questionsTitle: 'Questions 1-3',
    questionsDesc: 'Do the following statements agree with the information given in Reading Passage 1?',
    questions: [
      { num: 1, text: "Trees are now known to communicate and share resources with one another." },
      { num: 2, text: "The 'Wood Wide Web' is a system consisting entirely of tree roots touching each other." },
      { num: 3, text: "Mother Trees prioritize their own survival over supplying saplings with carbon." }
    ]
  },
  'passage-2': {
    title: 'The History of the Printing Press',
    meta: 'Academic Reading • Passage 2',
    paragraphs: [
      'The invention of the printing press by Johannes Gutenberg in the 15th century is widely regarded as one of the most significant events in human history. Prior to its invention, books were meticulously copied by hand, making them rare and prohibitively expensive. The printing press democratized knowledge by allowing for the mass production of books.',
      'Gutenberg’s key innovation was the use of movable metal type. Unlike woodblock printing, which required a new block to be carved for every page, movable type allowed individual letters to be rearranged and reused. This drastically reduced the time and cost required to produce printed materials.',
      'The impact of the printing press was profound. It fueled the Renaissance, accelerated the scientific revolution, and played a crucial role in the Protestant Reformation by allowing religious texts to be widely distributed in vernacular languages.'
    ],
    questionsTitle: 'Questions 4-6',
    questionsDesc: 'Choose the correct letter, A, B, C or D.',
    questions: [
      { num: 4, text: "Before the printing press, books were...", isMCQ: true, options: ['Cheap and accessible', 'Written in English', 'Copied by hand', 'Printed using woodblocks'] },
      { num: 5, text: "Gutenberg's key innovation was...", isMCQ: true, options: ['Woodblock printing', 'Movable metal type', 'The alphabet', 'The Renaissance'] },
      { num: 6, text: "The printing press helped fuel...", isMCQ: true, options: ['The industrial revolution', 'The Protestant Reformation', 'The middle ages', 'Agriculture'] }
    ]
  },
  'passage-3': {
    title: 'Artificial Intelligence in Medicine',
    meta: 'Academic Reading • Passage 3',
    paragraphs: [
      'Artificial intelligence (AI) is rapidly transforming the field of medicine, offering unprecedented opportunities for improving patient care, accelerating medical research, and optimizing healthcare operations. One of the most promising applications of AI is in medical imaging, where machine learning algorithms can analyze X-rays, MRIs, and CT scans with a level of accuracy that often rivals or exceeds that of human radiologists.',
      'AI is also playing a critical role in drug discovery. Traditionally, bringing a new drug to market can take over a decade and cost billions of dollars. AI can significantly expedite this process by analyzing vast datasets of chemical compounds and predicting their efficacy and potential side effects, thereby identifying promising drug candidates much faster than traditional methods.',
      'Despite these advancements, the integration of AI in healthcare is not without challenges. Issues such as data privacy, algorithmic bias, and the need for rigorous clinical validation must be addressed. Moreover, the role of the physician remains indispensable, as AI is best utilized as an augmentative tool rather than a replacement for human judgment and empathy.'
    ],
    questionsTitle: 'Questions 7-9',
    questionsDesc: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
    questions: [
      { num: 7, text: "AI algorithms can analyze medical images with high ____.", isFill: true },
      { num: 8, text: "In drug discovery, AI can identify promising ____ much faster.", isFill: true },
      { num: 9, text: "AI should be used as an augmentative tool rather than a replacement for human ____.", isFill: true }
    ]
  }
};

const mockWritingData: Record<string, any> = {
  'task-1': {
    title: 'Task 1: Academic Report',
    meta: 'Chart Analysis • 20 Minutes',
    promptHtml: `
      <p><strong>The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.</strong></p>
      <br/>
      <p>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
      <p>Write at least 150 words.</p>
      <br/>
      <p><em>(In a real exam, a chart image would be displayed here)</em></p>
    `,
    minWords: 150
  },
  'task-2': {
    title: 'Task 2: Essay',
    meta: 'Opinion Essay • 40 Minutes',
    promptHtml: `
      <p><strong>Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology.</strong></p>
      <br/>
      <p>Discuss both these views and give your own opinion.</p>
      <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
      <p>Write at least 250 words.</p>
    `,
    minWords: 250
  }
};

const mockListeningData: Record<string, any> = {
  'part-1': {
    title: 'Part 1: Social Conversation',
    meta: 'Everyday Context • Audio',
    questionsTitle: 'Questions 1-4',
    questionsDesc: 'Listen to the audio and answer the questions below.',
    questions: [
      { num: 1, text: "The man wants to book a flight to...", isMCQ: true, options: ['London', 'Paris', 'Tokyo', 'New York'] },
      { num: 2, text: "The departure date is...", isMCQ: true, options: ['12th May', '15th May', '20th May', '22nd May'] },
      { num: 3, text: "The man prefers a window seat.", isMCQ: true, options: ['True', 'False', 'Not Given'] },
      { num: 4, text: "The total cost of the ticket is $____.", isFill: true }
    ]
  },
  'part-2': {
    title: 'Part 2: Monologue',
    meta: 'Everyday Context • Audio',
    questionsTitle: 'Questions 5-8',
    questionsDesc: 'Listen to the audio and answer the questions below.',
    questions: [
      { num: 5, text: "The speaker is giving a tour of a...", isMCQ: true, options: ['Museum', 'University campus', 'Factory', 'Historical building'] },
      { num: 6, text: "The main building was constructed in...", isMCQ: true, options: ['1890', '1905', '1920', '1950'] },
      { num: 7, text: "Visitors are not allowed to take photographs.", isMCQ: true, options: ['True', 'False', 'Not Given'] },
      { num: 8, text: "The tour will conclude at the ____.", isFill: true }
    ]
  },
  'part-3': {
    title: 'Part 3: Academic Discussion',
    meta: 'Educational Context • Audio',
    questionsTitle: 'Questions 9-12',
    questionsDesc: 'Listen to the audio and answer the questions below.',
    questions: [
      { num: 9, text: "The students are discussing a project on...", isMCQ: true, options: ['Marine biology', 'Climate change', 'Renewable energy', 'Urban planning'] },
      { num: 10, text: "John suggests they should focus on...", isMCQ: true, options: ['Solar power', 'Wind power', 'Geothermal energy', 'Hydroelectric power'] },
      { num: 11, text: "Sarah disagrees with John's initial idea.", isMCQ: true, options: ['True', 'False', 'Not Given'] },
      { num: 12, text: "They decide to interview a ____ for their research.", isFill: true }
    ]
  },
  'part-4': {
    title: 'Part 4: Academic Lecture',
    meta: 'Educational Context • Audio',
    questionsTitle: 'Questions 13-16',
    questionsDesc: 'Listen to the audio and answer the questions below.',
    questions: [
      { num: 13, text: "The lecture is about the history of...", isMCQ: true, options: ['Space exploration', 'Computer science', 'Ancient civilizations', 'Modern art'] },
      { num: 14, text: "The first mechanical computer was designed by...", isMCQ: true, options: ['Alan Turing', 'Charles Babbage', 'Ada Lovelace', 'John von Neumann'] },
      { num: 15, text: "The speaker believes that AI will eventually surpass human intelligence.", isMCQ: true, options: ['True', 'False', 'Not Given'] },
      { num: 16, text: "The next topic will be the impact of technology on ____.", isFill: true }
    ]
  }
};

const mockSpeakingData: Record<string, any> = {
  'part-1': {
    title: 'Part 1: Introduction & Interview',
    meta: 'Q&A • 4-5 Minutes',
    promptHtml: `
        <p><strong>The examiner will ask you general questions about yourself and a range of familiar topics, such as home, family, work, studies, and interests.</strong></p>
        <br/>
        <p>Example questions:</p>
        <ul>
          <li>Let's talk about your hometown. Where is your hometown?</li>
          <li>What do you like most about it?</li>
          <li>Is there anything you dislike about it?</li>
          <li>How has your hometown changed in recent years?</li>
        </ul>
    `,
    time: '05:00'
  },
  'part-2': {
    title: 'Part 2: Long Turn',
    meta: 'Cue Card • 3-4 Minutes',
    promptHtml: `
        <p><strong>Describe a memorable journey you have made.</strong></p>
        <br/>
        <p>You should say:</p>
        <ul>
          <li>where you went</li>
          <li>how you travelled</li>
          <li>why you went on the journey</li>
        </ul>
        <p>and explain why you remember this journey so well.</p>
        <br/>
        <p><em>(You will have to talk about the topic for 1 to 2 minutes. You have 1 minute to think about what you are going to say. You can make some notes to help you if you wish.)</em></p>
    `,
    time: '04:00'
  },
  'part-3': {
    title: 'Part 3: Two-Way Discussion',
    meta: 'Discussion • 4-5 Minutes',
    promptHtml: `
        <p><strong>The examiner will ask further questions which are connected to the topic of Part 2.</strong></p>
        <br/>
        <p>Example questions:</p>
        <ul>
          <li>Why do people need to travel every day?</li>
          <li>What problems can people have when they are on a long journey?</li>
          <li>Do you think tourism causes more harm than good to a country?</li>
          <li>How do you think people will travel in the future?</li>
        </ul>
    `,
    time: '05:00'
  }
};

export async function GET() {
  const supabase = await createClient();

  // Protect this route by ensuring only admins can trigger the seed
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden. Admin only.' }, { status: 403 });
  }

  const testsToInsert = [];

  // Reading
  for (const [slug, data] of Object.entries(mockReadingData)) {
    const { title, meta, ...content } = data;
    testsToInsert.push({ type: 'reading', slug, title, meta, content });
  }

  // Writing
  for (const [slug, data] of Object.entries(mockWritingData)) {
    const { title, meta, ...content } = data;
    testsToInsert.push({ type: 'writing', slug, title, meta, content });
  }

  // Listening
  for (const [slug, data] of Object.entries(mockListeningData)) {
    const { title, meta, ...content } = data;
    testsToInsert.push({ type: 'listening', slug, title, meta, content });
  }

  // Speaking
  for (const [slug, data] of Object.entries(mockSpeakingData)) {
    const { title, meta, ...content } = data;
    testsToInsert.push({ type: 'speaking', slug, title, meta, content });
  }

  // Insert to DB
  const { error } = await supabase.from('tests').insert(testsToInsert);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Seed successful!', count: testsToInsert.length });
}
