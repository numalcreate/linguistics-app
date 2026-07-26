import { SyntaxNode } from '../types';

let idCounter = 1;
function genId(): string {
  return `node_${idCounter++}_${Math.random().toString(36).substr(2, 4)}`;
}

/**
 * Parse bracket notation string into a SyntaxNode tree structure.
 * Example: "[S [NP [Det The] [N cat]] [VP [V sat]]]"
 */
export function parseBracketNotation(input: string): SyntaxNode | null {
  const trimmed = input.trim();
  if (!trimmed || !trimmed.startsWith('[')) {
    return null;
  }

  // Tokenize string while keeping brackets, spaces, and strings
  const tokens: string[] = [];
  let currentToken = '';

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '[' || char === ']') {
      if (currentToken.trim()) {
        tokens.push(currentToken.trim());
        currentToken = '';
      }
      tokens.push(char);
    } else if (char === ' ' || char === '\t' || char === '\n') {
      if (currentToken.trim()) {
        tokens.push(currentToken.trim());
        currentToken = '';
      }
    } else {
      currentToken += char;
    }
  }
  if (currentToken.trim()) {
    tokens.push(currentToken.trim());
  }

  const stack: SyntaxNode[] = [];
  let root: SyntaxNode | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === '[') {
      // Lookahead for label
      const nextToken = tokens[i + 1];
      if (nextToken && nextToken !== '[' && nextToken !== ']') {
        const newNode: SyntaxNode = {
          id: genId(),
          label: nextToken,
          children: [],
        };
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          if (!parent.children) parent.children = [];
          parent.children.push(newNode);
        } else {
          root = newNode;
        }
        stack.push(newNode);
        i++; // skip label token
      }
    } else if (token === ']') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // Terminal word token attached to top node
      if (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (!top.text) {
          top.text = token;
        } else {
          top.text += ' ' + token;
        }
      }
    }
  }

  return root;
}

/**
 * Convert a SyntaxNode tree back into bracket notation string.
 */
export function nodeToBracketNotation(node: SyntaxNode): string {
  if (!node) return '';

  if (node.text) {
    return `[${node.label} ${node.text}]`;
  }

  if (!node.children || node.children.length === 0) {
    return `[${node.label}]`;
  }

  const childBrackets = node.children.map((child) => nodeToBracketNotation(child)).join(' ');
  return `[${node.label} ${childBrackets}]`;
}

/**
 * Fallback auto-parser for raw English sentences into a baseline bracket structure.
 */
export function sentenceToBaselineTree(sentence: string): SyntaxNode {
  const words = sentence.trim().split(/\s+/);
  const detWords = new Set(['the', 'a', 'an', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'their']);
  const prepWords = new Set(['in', 'on', 'at', 'with', 'by', 'for', 'from', 'to', 'about', 'over', 'under']);
  const verbWords = new Set(['is', 'are', 'was', 'were', 'sat', 'ate', 'saw', 'loves', 'likes', 'walked', 'ran', 'jumped', 'believed', 'solved', 'analyzed']);

  if (words.length === 1) {
    return {
      id: genId(),
      label: 'NP',
      children: [{ id: genId(), label: 'N', text: words[0] }],
    };
  }

  // Simple heuristic split into Subject NP + VP
  let verbIndex = words.findIndex((w) => verbWords.has(w.toLowerCase()));
  if (verbIndex <= 0) verbIndex = Math.max(1, Math.floor(words.length / 2));

  const subjectWords = words.slice(0, verbIndex);
  const predicateWords = words.slice(verbIndex);

  const npChildren: SyntaxNode[] = [];
  if (detWords.has(subjectWords[0]?.toLowerCase())) {
    npChildren.push({ id: genId(), label: 'Det', text: subjectWords[0] });
    if (subjectWords.length > 1) {
      npChildren.push({ id: genId(), label: 'N', text: subjectWords.slice(1).join(' ') });
    }
  } else {
    npChildren.push({ id: genId(), label: 'N', text: subjectWords.join(' ') });
  }

  const vpChildren: SyntaxNode[] = [];
  if (predicateWords.length > 0) {
    vpChildren.push({ id: genId(), label: 'V', text: predicateWords[0] });
    if (predicateWords.length > 1) {
      const remaining = predicateWords.slice(1);
      const prepIdx = remaining.findIndex((w) => prepWords.has(w.toLowerCase()));
      if (prepIdx !== -1) {
        const objNP = remaining.slice(0, prepIdx);
        const ppWords = remaining.slice(prepIdx);
        if (objNP.length > 0) {
          vpChildren.push({
            id: genId(),
            label: 'NP',
            children: [{ id: genId(), label: 'N', text: objNP.join(' ') }],
          });
        }
        vpChildren.push({
          id: genId(),
          label: 'PP',
          children: [
            { id: genId(), label: 'P', text: ppWords[0] },
            { id: genId(), label: 'NP', text: ppWords.slice(1).join(' ') || '...' },
          ],
        });
      } else {
        vpChildren.push({
          id: genId(),
          label: 'NP',
          children: [{ id: genId(), label: 'N', text: remaining.join(' ') }],
        });
      }
    }
  }

  return {
    id: genId(),
    label: 'S',
    children: [
      { id: genId(), label: 'NP', children: npChildren },
      { id: genId(), label: 'VP', children: vpChildren },
    ],
  };
}
