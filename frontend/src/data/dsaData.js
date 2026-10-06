export const DSA_TOPICS = [
  {
    id: 'arrays',
    name: 'Arrays & Two Pointers',
    code: '01',
    progress: 85,
    solved: 34,
    total: 40,
    difficulty: 'Core',
    description: 'Sliding window, two pointers, prefix sums, Kadane algorithm.'
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    code: '02',
    progress: 70,
    solved: 21,
    total: 30,
    difficulty: 'Intermediate',
    description: 'Fast & slow pointers, reversal, cycle detection, LRU cache.'
  },
  {
    id: 'trees',
    name: 'Trees & Binary Search',
    code: '03',
    progress: 60,
    solved: 24,
    total: 40,
    difficulty: 'Intermediate',
    description: 'DFS, BFS traversals, LCA, AVL & Binary Search Tree invariants.'
  },
  {
    id: 'graphs',
    name: 'Graphs & Disjoint Sets',
    code: '04',
    progress: 45,
    solved: 18,
    total: 40,
    difficulty: 'Advanced',
    description: 'Dijkstra, Topological sort, Cycle detection, Union-Find.'
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    code: '05',
    progress: 35,
    solved: 14,
    total: 40,
    difficulty: 'Advanced',
    description: 'Knapsack state transitions, LIS, Interval DP, Memoization vs Tabulation.'
  },
  {
    id: 'sorting',
    name: 'Sorting & Searching',
    code: '06',
    progress: 90,
    solved: 27,
    total: 30,
    difficulty: 'Core',
    description: 'Binary search invariants, QuickSelect, In-place partition, HeapSort.'
  },
  {
    id: 'system-design',
    name: 'Algorithmic System Design',
    code: '07',
    progress: 25,
    solved: 5,
    total: 20,
    difficulty: 'Elite',
    description: 'Consistent hashing, Rate limiting (Token Bucket), Bloom filters.'
  }
];

export const USER_STATS = {
  masteryIndex: '74.2%',
  streakDays: 7,
  questionsSolved: 143,
  aiQueriesAsked: 58,
  activeTopic: 'Dynamic Programming',
};

export const QUESTION_OF_THE_DAY = {
  id: 'qotd-1',
  code: 'LC-42',
  title: 'Trapping Rain Water',
  difficulty: 'Hard',
  topic: 'Arrays & Two Pointers',
  summary: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
  recommendedApproach: 'Two Pointers converging technique achieves optimal O(N) time with O(1) auxiliary space.',
  prompt: 'Provide an executive breakdown of Trapping Rain Water using the optimal Two Pointers technique. Include intuition, step-by-step logic, code, and exact Big-O complexity.'
};

export const QUICK_PROMPTS = [
  'Explain Quick Sort vs Merge Sort cache locality and tradeoffs',
  'Prove Floyd cycle detection and how to locate the entry node',
  'Explain the 0/1 Knapsack state transition and 1D space optimization',
  'Binary Search on Answer pattern: invariants & edge cases',
  'BFS vs DFS on Directed Graphs: cycle detection proof'
];

export const RECENT_CHAT_SESSIONS = [
  {
    id: 'sess-1',
    title: 'Floyd Cycle Proof',
    topic: 'Linked Lists',
    time: '2h ago',
    preview: 'Mathematical derivation of why 2k meeting point guarantees entry distance.'
  },
  {
    id: 'sess-2',
    title: 'LIS O(N log N) Patience Sorting',
    topic: 'Dynamic Programming',
    time: 'Yesterday',
    preview: 'Replacing DP table with monotonic array and binary search lookups.'
  },
  {
    id: 'sess-3',
    title: 'Dijkstra Priority Queue Proof',
    topic: 'Graphs',
    time: '3d ago',
    preview: 'Handling non-negative edge constraints and Fibonacci heap analysis.'
  }
];
