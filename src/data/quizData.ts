import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Phonetics Quizzes
  {
    id: 'quiz-phon-1',
    module: 'phonetics',
    title: 'IPA Symbol Identification',
    prompt: 'Which phonetic feature description accurately matches the IPA symbol [θ] (as in English "think")?',
    options: [
      'Voiceless Alveolar Fricative',
      'Voiceless Dental Fricative',
      'Voiced Postalveolar Fricative',
      'Voiceless Velar Plosive',
    ],
    correctIndex: 1,
    explanation: '[θ] is produced with the tongue tip against the upper teeth (Dental), with friction turbulence (Fricative), without vocal fold vibration (Voiceless).',
  },
  {
    id: 'quiz-phon-2',
    module: 'phonetics',
    title: 'Vowel Formant Acoustics',
    prompt: 'When moving from the close front vowel [i] to the open front vowel [a], what happens to the First Formant (F1)?',
    options: [
      'F1 increases as tongue height lowers',
      'F1 decreases as tongue height lowers',
      'F1 remains unchanged while F2 doubles',
      'F1 drops to 0 Hz',
    ],
    correctIndex: 0,
    explanation: 'Acoustic Phonetics Rule: F1 frequency is inversely proportional to vowel height. Open vowels (low tongue position) have HIGH F1 (~800 Hz), whereas close vowels have LOW F1 (~250-300 Hz).',
  },
  {
    id: 'quiz-phon-3',
    module: 'phonetics',
    title: 'Phonemic Contrast & Minimal Pairs',
    prompt: 'Which pair of words forms a valid Minimal Pair proving that /p/ and /b/ are distinct phonemes in English?',
    options: ['pat and cat', 'pat and bat', 'spin and pin', 'light and night'],
    correctIndex: 1,
    explanation: 'A Minimal Pair consists of two words that differ by exactly ONE phone in the same position and have different meanings. "pat" (/pæt/) and "bat" (/bæt/) differ only in voicing of the initial bilabial plosive.',
  },

  // Syntax Quizzes
  {
    id: 'quiz-syn-1',
    module: 'syntax',
    title: 'Constituent Structure Tests',
    prompt: 'Consider "The student solved the problem with enthusiasm." Which constituency test proves "with enthusiasm" is a Prepositional Phrase (PP) constituent?',
    options: [
      'Substitution: "The student solved the problem so."',
      'Fronting / Movement: "With enthusiasm, the student solved the problem."',
      'Deletion: Removing "solved" leaves a complete sentence.',
      'Rhyming test.',
    ],
    correctIndex: 1,
    explanation: 'Fronting / Topicalization is a reliable syntactic constituent test. If a string of words can move together to the front of the sentence while retaining grammatical coherence, it forms a single constituent (PP).',
  },
  {
    id: 'quiz-syn-2',
    module: 'syntax',
    title: 'X-Bar Theory Projections',
    prompt: 'Under standard X-Bar Theory, what is the syntactic status of a Complement relative to the Head X?',
    options: [
      'Attaches as sister to X\' and daughter to XP',
      'Attaches as sister to Head X and daughter to X\'',
      'Attaches above the XP maximal projection',
      'Replaces the Head entirely',
    ],
    correctIndex: 1,
    explanation: 'X-Bar Hierarchy: Head X combines with its Complement to project X\' (X-bar). Thus, Complement is sister to Head X and daughter to X\'. Specifier is sister to X\' and daughter to XP.',
  },

  // Morphology Quizzes
  {
    id: 'quiz-morph-1',
    module: 'morphology',
    title: 'Morphological Process Identification',
    prompt: 'In Tagalog, "sulat" means "write" and "sumulat" means "wrote". What morphological process is illustrated by <-um->?',
    options: ['Prefixation', 'Infixation', 'Reduplication', 'Suppletion'],
    correctIndex: 1,
    explanation: 'An infix is inserted INSIDE the root. In Tagalog, <-um-> is placed after the first consonant /s/ of the root "sulat", yielding "sumulat".',
  },
  {
    id: 'quiz-morph-2',
    module: 'morphology',
    title: 'Agglutinative vs Fusional Languages',
    prompt: 'Which characteristic distinguishes an Agglutinative language (like Turkish or Finnish) from a Fusional language (like Latin or Russian)?',
    options: [
      'In agglutinative languages, each affix carries one distinct grammatical function with clear boundaries.',
      'In agglutinative languages, single affixes merge multiple case, number, and gender meanings into one unsegmentable morpheme.',
      'Agglutinative languages do not use affixes at all.',
      'Agglutinative languages only allow 1-syllable words.',
    ],
    correctIndex: 0,
    explanation: 'Agglutinative languages feature neat, 1-to-1 correspondences between morphemes and grammatical meanings (e.g. Turkish ev-ler-im-den = house-PL-POSS.1SG-ABL). Fusional languages fuse multiple meanings into single affixes.',
  },
];
