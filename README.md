<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/65dcf564-e1fd-46f6-80eb-910c86a59c7c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`


Live App URL: https://linguistics-app.vercel.app/
Introduction: Linguistics App is an interactive, full-stack educational web platform designed for students, educators, and researchers in theoretical and applied linguistics. It features real-time Web Audio sound synthesis, dynamic SVG syntax tree visualizers, cross-linguistic morpheme databases, interlinear glossing tools, historical biographical archives, and an AI-powered Linguistics Professor.
**🌟 Key Features & Functional Modules:**
**🔊 Feature 1. Phonetics & Phonology Studio:**
Pulmonary Consonants Grid: Filter consonants by place of articulation (bilabial, alveolar, velar, glottal, etc.) and manner (plosive, fricative, nasal, trill). Distinguish voiced vs. voiceless phones with instant Web Audio synthesis.
Vowel Quadrilateral & Formant Acoustics: Interactive IPA vowel trapezoid tracking tongue height and backness. Visualize First (F1) and Second (F2) formant frequencies in Hertz with dual-bandpass acoustic synthesis.
Virtual IPA Transcriber: Built-in virtual IPA keyboard for transcribing English words (e.g. think → /θɪŋk/, church → /tʃɜːtʃ/).
Ear Training Sandbox: Ear-training drills testing phone identification against synthesized acoustic targets.
**🌳 Feature 2. Interactive Syntax Tree Visualizer:**
Dynamic Phrase Structure Renderer: Generates SVG constituent trees supporting standard S, NP, VP, PP, CP, TP, DP labels with zoom and pan controls.
X-Bar Theory & Embedded CP Clauses: Pre-loaded examples demonstrating binary branching, Complementizer Phrase embedding, and auxiliary verb movement.
Structural Ambiguity Dual Comparison: Side-by-side analysis of High vs. Low attachment (e.g. "I saw the man with the telescope" — VP instrument attachment vs. NP post-modifier attachment).
AI Sentence Parser: Submit any complex English sentence to Google Gemini to parse into bracket notation ([S [NP ...] [VP ...]]).
**🧩 Feature 3. Cross-Linguistic Morphology Database & Glossing:**
Typological Process Database: Searchable database covering affixation, infixation (Tagalog), partial reduplication, vowel ablaut (English sang/sung), agglutination (Turkish evlerimden), fusional suffixes (Latin), total suppletion ( go/went ), and templatic root-and-pattern (Arabic √k-t-b).
Leipzig Interlinear Gloss Generator: 4-line interlinear gloss table generator (Original Word, Morpheme Segmentation, Leipzig Gloss Tags, English Translation) formatted for academic papers.
Leipzig Reference Rules: Quick reference guide for standard glossing abbreviations (1SG, ACC, ABL, CAUS, PERF, etc.).
**📜 Feature 4. Historical Pioneers & Theoretical Evolution:**
Biographical Profiles: Profiles of landmark figures including Pāṇini (Aṣṭādhyāyī 3,959 formal rules), Ferdinand de Saussure (Structuralism & Semiotics), Noam Chomsky (Generative Syntax & Universal Grammar), Edward Sapir & Benjamin Whorf (Linguistic Relativity), Roman Jakobson (Distinctive Features), William Labov (Sociolinguistics), Joseph Greenberg (Typological Universals), Wilhelm von Humboldt, and Daniel Everett (Pirahã fieldwork).
Search & Filter: Filter linguists by era (Ancient, 19th Century, Structuralism, Generativism) and subfields (Phonetics, Syntax, Morphology, Sociolinguistics, Cognitive).
**🏆 Feature 5. Linguistics Practice Quizzes**
Interactive Exercises: Knowledge checks testing IPA symbol features, acoustic formant rules, constituent tests, and morphological classification with immediate explanations.
**🛠️ Tech Stack**
**Frontend:** React 19 + TypeScript + Vite
**Styling:** Tailwind CSS v4
**Audio Engine:** Custom Web Audio API (Glottal source oscillators & dual Biquad filters)
AI Backend Engine: Express.js server + @google/genai (Gemini 3.6 Flash)
**Deployment:** Vercel / Cloud Run

<img width="901" height="407" alt="Scientists Contributions" src="https://github.com/user-attachments/assets/352ea51e-b2b2-4188-b805-755d86efe6c7" />



