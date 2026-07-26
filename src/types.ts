export type ModuleTab = 'phonetics' | 'syntax' | 'morphology' | 'linguists' | 'ai-assistant';

export interface IPASymbol {
  symbol: string;
  name: string;
  category: 'consonant' | 'vowel' | 'diacritic';
  place?: string; // e.g., Bilabial, Alveolar, Velar
  manner?: string; // e.g., Plosive, Fricative, Nasal
  voiced?: boolean;
  // Vowel properties
  height?: string; // Close, Mid, Open
  backness?: string; // Front, Central, Back
  rounded?: boolean;
  // Acoustic / Synthesis properties (F1 and F2 formants in Hz for Web Audio synthesis)
  formants?: { f1: number; f2: number };
  examples: Array<{
    word: string;
    ipa: string;
    meaning: string;
    language: string;
  }>;
}

export interface SyntaxNode {
  id: string;
  label: string; // e.g., S, NP, VP, Det, N, V
  category?: string;
  text?: string; // terminal word e.g., "cat", "the"
  children?: SyntaxNode[];
  isCollapsed?: boolean;
}

export interface SyntaxExample {
  id: string;
  title: string;
  description: string;
  category: 'Basic' | 'X-Bar' | 'Ambiguity' | 'Movement' | 'Complex';
  bracketNotation: string;
  explanation: string;
}

export interface MorphemeProcess {
  id: string;
  processName: string;
  processCategory:
    | 'Affixation'
    | 'Reduplication'
    | 'Ablaut / Apophony'
    | 'Suppletion'
    | 'Compounding'
    | 'Infixation'
    | 'Agglutination'
    | 'Fusional / Cumulative';
  definition: string;
  language: string;
  languageFamily: string;
  exampleWord: string;
  segmentation: string;
  gloss: string;
  englishTranslation: string;
  notes: string;
}

export interface LeipzigGlossRule {
  code: string;
  name: string;
  explanation: string;
  example: string;
}

export interface LinguistProfile {
  id: string;
  name: string;
  years: string;
  era: 'Ancient' | '19th Century' | 'Structuralism (20th C.)' | 'Generativism & Modern';
  subfields: Array<'Phonetics & Phonology' | 'Syntax' | 'Morphology' | 'Sociolinguistics' | 'Historical / Typology' | 'Cognitive'>;
  avatarIcon: string;
  shortBio: string;
  majorBreakthroughs: string[];
  keyPublications: string[];
  famousQuote: string;
  relatedLinguists: string[];
  moduleLink: ModuleTab;
}

export interface QuizQuestion {
  id: string;
  module: 'phonetics' | 'syntax' | 'morphology';
  title: string;
  prompt: string;
  ipaTarget?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AnalysisResult {
  ipa?: string;
  bracketSyntax?: string;
  morphemes?: Array<{
    word: string;
    segmentation: string;
    gloss: string;
    type: string;
  }>;
  phonologicalProcesses?: string;
  syntaxNotes?: string;
  morphologyNotes?: string;
}
