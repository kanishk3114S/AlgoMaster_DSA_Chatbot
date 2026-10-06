/**
 * ============================================================================
 * AlgoMentor - DSA AI Instructor: API Service Layer
 * ============================================================================
 * 
 * 🎓 FOR FULL-STACK DEVELOPERS:
 * This file serves as the bridge between the React frontend and your backend.
 * 
 * 🚀 HOW TO CONNECT YOUR EXPRESS / NODE.JS BACKEND:
 * 1. By default, `API_CONFIG.useMock` is true so you can test the UI immediately.
 * 2. In your Express server (e.g., `server.js`), create an endpoint:
 * 
 *    ```javascript
 *    // Example Express backend endpoint (matches your dsa.js chattingFn):
 *    import express from 'express';
 *    import cors from 'cors';
 *    import { chattingFn } from './dsa.js';
 * 
 *    const app = express();
 *    app.use(cors()); // Allow requests from http://localhost:3000
 *    app.use(express.json());
 * 
 *    app.post('/api/chat', async (req, res) => {
 *      try {
 *        const { ques } = req.body; // <-- 'ques' matching your prompt
 *        const reply = await chattingFn(ques);
 *        res.json({ reply });
 *      } catch (err) {
 *        res.status(500).json({ error: err.message });
 *      }
 *    });
 * 
 *    app.listen(5000, () => console.log('Server running on port 5000'));
 *    ```
 * 
 * 3. Flip `useMock: false` below or call `setUseMockMode(false)` in the UI!
 * ============================================================================
 */

export const API_CONFIG = {
  // Toggle this to false when your Express backend is running on port 5000
  useMock: localStorage.getItem('algomentor_use_mock') !== 'false',
  
  // Express server endpoint:
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/chat',
  
  // Timeout in milliseconds:
  TIMEOUT_MS: 30000,
};

export const setUseMockMode = (enableMock) => {
  API_CONFIG.useMock = enableMock;
  localStorage.setItem('algomentor_use_mock', enableMock ? 'true' : 'false');
};

export const isMockModeActive = () => {
  return API_CONFIG.useMock;
};

/**
 * Send a DSA question to the AI Instructor.
 * @param {string} query - The user's DSA question or code
 * @param {string} topicContext - The selected topic context (optional)
 * @returns {Promise<{ reply: string, timeComplexity?: string, spaceComplexity?: string, code?: string }>}
 */
export async function sendDsaQuery(query, topicContext = 'General DSA') {
  // 1. If Mock Mode is enabled, return high quality simulated DSA response
  if (API_CONFIG.useMock) {
    return simulateDsaResponse(query, topicContext);
  }

  // =========================================================================
  // 🔌 PLUG YOUR BACKEND API HERE
  // =========================================================================
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

    // Call your Express / Node.js backend
    const response = await fetch(API_CONFIG.BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Passing { ques } directly to match your existing dsa.js parameter!
      body: JSON.stringify({ 
        query: topicContext && topicContext !== 'All Topics' 
          ? `[Context: ${topicContext}] ${query}` 
          : query,
        topic: topicContext 
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();

    // Supports { reply }, { text }, or { message } from Express:
    const rawReply = data.reply || data.text || data.message || JSON.stringify(data);
    
    // Parse structured metadata from reply if present
    return parseDsaAiResponse(rawReply);
  } catch (error) {
    console.error('[AlgoMentor API Error]:', error);
    if (error.name === 'AbortError') {
      throw new Error('Connection timed out. Ensure your backend server is running and accessible.');
    }
    throw new Error(
      `Could not reach backend at ${API_CONFIG.BACKEND_URL}. ` +
      `Make sure your Express server is running and CORS is enabled, or switch to Mock Mode.`
    );
  }
}

/**
 * Helper to parse Big-O tags and code blocks from raw Gemini / backend markdown text
 */
export function parseDsaAiResponse(rawText) {
  let timeComplexity = null;
  let spaceComplexity = null;

  // Regex to extract Time and Space complexity if present
  const timeMatch = rawText.match(/Time Complexity[:\s*]+([O|o]\([^)]+\))/i) || 
                    rawText.match(/\*\*Time\*\*[:\s*]+([O|o]\([^)]+\))/i);
  const spaceMatch = rawText.match(/Space Complexity[:\s*]+([O|o]\([^)]+\))/i) || 
                     rawText.match(/\*\*Space\*\*[:\s*]+([O|o]\([^)]+\))/i);

  if (timeMatch) timeComplexity = timeMatch[1];
  if (spaceMatch) spaceComplexity = spaceMatch[1];

  return {
    reply: rawText,
    timeComplexity: timeComplexity || 'O(N)',
    spaceComplexity: spaceComplexity || 'O(1)',
  };
}

/**
 * Simulated DSA Instructor responses mimicking Gemini 3.5 output
 */
async function simulateDsaResponse(ques, topicContext) {
  // Artificial 800ms delay to feel natural like live AI generation
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = ques.toLowerCase();

  if (lower.includes('merge sort') || lower.includes('quick sort')) {
    return {
      reply: `### 1. Intuition & High-Level Approach
Both **Merge Sort** and **Quick Sort** are classic *Divide-and-Conquer* algorithms, but they differ fundamentally in *where* the primary work happens:
- **Merge Sort**: Divides the array in half unconditionally ($O(1)$ divide), then does the heavy work during the **merge step** ($O(N)$ combine).
- **Quick Sort**: Does the heavy work during the **partition step** ($O(N)$ pivot placement), then recursively sorts the sub-arrays.

### 2. Step-by-Step Logic
- **Stability**: Merge Sort is guaranteed *stable*; Quick Sort is generally *unstable* in place.
- **Cache Locality**: Quick Sort has superior cache locality and avoids heap memory allocations, making it faster in practice for contiguous RAM arrays.
- **Linked Lists**: Merge Sort is the undisputed king for sorting linked lists because merging nodes requires $O(1)$ extra memory.

### 3. Quick Sort Partition Implementation (JavaScript)
\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Choosing last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap smaller to left
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
\`\`\`

### 4. Complexity Analysis
- **Merge Sort**: Time Complexity: O(N log N) (always) | Space Complexity: O(N)
- **Quick Sort**: Time Complexity: O(N log N) (avg), O(N^2) (worst) | Space Complexity: O(log N) auxiliary call stack`,
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(log N)',
    };
  }

  if (lower.includes('cycle') || lower.includes('floyd') || lower.includes('linked list')) {
    return {
      reply: `### 1. Intuition & High-Level Approach
To detect a cycle in a Linked List without consuming additional hash table memory, we use **Floyd’s Cycle-Finding Algorithm** (also known as the *Tortoise and Hare* algorithm).

Imagine two runners on a circular track: if one runs at twice the speed of the other, the faster runner is mathematically guaranteed to lap and meet the slower runner.

### 2. Step-by-Step Logic
1. Initialize two pointers: \`slow = head\` and \`fast = head\`.
2. Move \`slow\` by 1 step (\`slow = slow.next\`) and \`fast\` by 2 steps (\`fast = fast.next.next\`).
3. If \`fast\` or \`fast.next\` reaches \`null\`, the list is linear (no cycle).
4. If \`slow === fast\` at any point, a cycle exists.
5. To find the cycle **entry node**: Reset \`slow = head\`, keep \`fast\` at meeting point, move both at 1 step each. The node where they collide is the cycle start.

### 3. Clean Implementation
\`\`\`javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // Step 1: Detect cycle collision
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Step 2: Locate cycle start node
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr; // Entry point found!
    }
  }

  return null; // No cycle
}
\`\`\`

### 4. Complexity Analysis
- Time Complexity: O(N) where N is the number of nodes in the linked list.
- Space Complexity: O(1) in-place pointer manipulation.`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
    };
  }

  if (lower.includes('rain water') || lower.includes('trapping')) {
    return {
      reply: `### 1. Intuition & High-Level Approach
In **Trapping Rain Water**, the water trapped above any column index \`i\` is bounded by the minimum of the highest wall to its left and right minus its own height:
$$\\text{water}[i] = \\max(0, \\min(\\text{leftMax}, \\text{rightMax}) - \\text{height}[i])$$

Rather than allocating two prefix/suffix arrays of size $N$, we can use the **Two Pointers technique** converging from both ends. We only need to advance whichever boundary is lower, because that boundary strictly determines the bottleneck.

### 2. Step-by-Step Logic
1. Place \`left = 0\` and \`right = n - 1\`.
2. Track \`leftMax = 0\` and \`rightMax = 0\`.
3. If \`height[left] <= height[right]\`:
   - If \`height[left] >= leftMax\`, update \`leftMax\`.
   - Else, add \`leftMax - height[left]\` to total water.
   - Advance \`left++\`.
4. Otherwise:
   - If \`height[right] >= rightMax\`, update \`rightMax\`.
   - Else, add \`rightMax - height[right]\` to total water.
   - Advance \`right--\`.

### 3. Optimal Solution
\`\`\`javascript
function trap(height) {
  if (!height || height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }

  return totalWater;
}
\`\`\`

### 4. Complexity Analysis
- Time Complexity: O(N) single-pass two-pointer traversal.
- Space Complexity: O(1) constant auxiliary memory.`,
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
    };
  }

  // General fallback DSA explanation
  return {
    reply: `### 1. Intuition & High-Level Approach
Let's analyze this DSA problem systematically under **${topicContext}**.

When approaching this challenge, identify the data structures best suited for state lookups or ordering. A hash table or two-pointer approach often reduces quadratic $O(N^2)$ brute forces down to optimal linear $O(N)$ or logarithmic $O(N \\log N)$ complexity.

### 2. Step-by-Step Logic
1. **State Definition**: Establish the base condition and invariants.
2. **Transition / Traversal**: Iterate over the elements while maintaining either a monotonic condition, sliding window boundaries, or memoized states.
3. **Edge Cases**: Account for empty inputs, negative numbers, single-node graphs, and boundary overlaps.

### 3. Implementation Template
\`\`\`javascript
function solveDsaProblem(input) {
  if (!input || input.length === 0) return 0;

  // Track dynamic state
  let result = 0;
  const lookup = new Map();

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    // Core algorithmic operation
    if (lookup.has(current)) {
      result = Math.max(result, i - lookup.get(current));
    } else {
      lookup.set(current, i);
    }
  }

  return result;
}
\`\`\`

### 4. Complexity Analysis
- Time Complexity: O(N) where N is the size of the input.
- Space Complexity: O(N) for hash map state storage.`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
  };
}
