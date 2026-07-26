import { SyntaxExample } from '../types';

export const SYNTAX_EXAMPLES: SyntaxExample[] = [
  {
    id: 'basic-transitive',
    title: 'Basic Transitive Sentence (S -> NP VP)',
    description: 'A standard simple English sentence showing fundamental constituent structure.',
    category: 'Basic',
    bracketNotation: '[S [NP [Det The] [N cat]] [VP [V sat] [PP [P on] [NP [Det the] [N mat]]]]]',
    explanation:
      'Demonstrates phrase structure rules S → NP VP. The Subject NP contains a Determiner ("The") and Noun ("cat"). The VP contains a Verb ("sat") and a Prepositional Phrase ("on the mat").',
  },
  {
    id: 'embedded-cp',
    title: 'Complementizer Phrase (CP) Embedding',
    description: 'Embedded clause introduced by complementizer "that".',
    category: 'Complex',
    bracketNotation:
      '[S [NP [Det The] [N professor]] [VP [V believed] [CP [C that] [S [NP [Det the] [N student]] [VP [V solved] [NP [Det the] [N problem]]]]]]]',
    explanation:
      'In generative grammar, embedded clauses are dominated by a Complementizer Phrase (CP). "That" acts as the C head taking a subordinate sentence (S or TP) as its complement.',
  },
  {
    id: 'ambiguity-pp-vp',
    title: 'Structural Ambiguity: VP Attachment',
    description: '"I saw the man with the telescope" — Meaning A: Saw using a telescope.',
    category: 'Ambiguity',
    bracketNotation:
      '[S [NP [Pronoun I]] [VP [V saw] [NP [Det the] [N man]] [PP [P with] [NP [Det the] [N telescope]]]]]',
    explanation:
      'VP Attachment: The Prepositional Phrase [PP with the telescope] attaches directly to the VP node as an adjunct/modifier of "saw". Meaning: The instrument used for seeing was the telescope.',
  },
  {
    id: 'ambiguity-pp-np',
    title: 'Structural Ambiguity: NP Attachment',
    description: '"I saw the man with the telescope" — Meaning B: The man who has a telescope.',
    category: 'Ambiguity',
    bracketNotation:
      '[S [NP [Pronoun I]] [VP [V saw] [NP [Det the] [N man] [PP [P with] [NP [Det the] [N telescope]]]]]]',
    explanation:
      'NP Attachment: The Prepositional Phrase [PP with the telescope] attaches inside the Object NP as a post-modifier of "man". Meaning: The man holding/having the telescope was seen.',
  },
  {
    id: 'xbar-dp-tp',
    title: 'X-Bar Theory (TP / DP Structure)',
    description: 'Binary branching X-bar representation with Specifier, Head, and Complement.',
    category: 'X-Bar',
    bracketNotation:
      '[TP [DP [D The] [NP [N linguist]]] [T\' [T -ed] [VP [V analyze] [DP [D the] [NP [N sentence]]]]]]',
    explanation:
      'Under X-Bar Theory (Chomsky 1970/1986), phrases strictly project from Head X to X\' (X-bar) to XP. Subjects originate in Specifier position, and inflectional tense projects a Tense Phrase (TP).',
  },
  {
    id: 'auxiliary-inversion',
    title: 'Question Inversion / Movement (C\' / CP)',
    description: 'Auxiliary verb movement from T to C in yes/no questions.',
    category: 'Movement',
    bracketNotation:
      '[CP [C Will] [TP [DP [D the] [NP [N student]]] [T\' [T t_i] [VP [V study] [NP [N syntax]]]]]]',
    explanation:
      'Head-to-Head Movement: The modal verb "Will" moves from T (Tense) position to C (Complementizer) to form an interrogative clause, leaving a trace (t_i) behind in T.',
  },
];
