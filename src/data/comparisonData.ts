export interface ComparisonFeature {
  feature: string;
  stack: string;
  queue: string;
  description: string;
}

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    feature: 'Core Principle',
    stack: 'LIFO (Last In, First Out)',
    queue: 'FIFO (First In, First Out)',
    description: 'Stack serves the newest element first; Queue serves the oldest waiting element first.',
  },
  {
    feature: 'Insertion Location',
    stack: 'Top of stack (PUSH)',
    queue: 'Rear / Tail of queue (ENQUEUE)',
    description: 'Stack adds on top of existing elements; Queue adds at the back of the line.',
  },
  {
    feature: 'Deletion Location',
    stack: 'Top of stack (POP)',
    queue: 'Front / Head of queue (DEQUEUE)',
    description: 'Stack removes from the same end it inserts; Queue removes from the opposite end.',
  },
  {
    feature: 'Active Pointers',
    stack: '1 Pointer: TOP',
    queue: '2 Pointers: FRONT and REAR',
    description: 'Stack tracks single entry/exit index; Queue requires separate read and write cursors.',
  },
  {
    feature: 'Underflow Condition',
    stack: 'TOP == -1',
    queue: 'FRONT == -1 or FRONT > REAR',
    description: 'Occurs when attempting deletion on an empty structure.',
  },
  {
    feature: 'Overflow Condition',
    stack: 'TOP == MAX_SIZE - 1',
    queue: 'REAR == MAX_SIZE - 1 (Linear) / (REAR+1)%MAX == FRONT (Circular)',
    description: 'Occurs when attempting insertion on an already full buffer.',
  },
  {
    feature: 'Order Inversion',
    stack: 'Inverts order of data',
    queue: 'Preserves original sequence',
    description: 'Pushing items 1,2,3 and popping them yields 3,2,1. Queuing yields 1,2,3.',
  },
  {
    feature: 'Key Real-World Analogy',
    stack: 'Stack of dinner plates / Cafeteria trays',
    queue: 'Line of passengers boarding a bus',
    description: 'Plates are removed from the top; Passengers board in the order they arrived.',
  },
  {
    feature: 'Primary Graph Algorithm',
    stack: 'Depth-First Search (DFS)',
    queue: 'Breadth-First Search (BFS)',
    description: 'Stack dives deep along single path; Queue expands outwards layer-by-layer.',
  },
  {
    feature: 'System Analogy',
    stack: 'Function Call Stack, Undo / Redo',
    queue: 'Printer Spooler, OS Task Scheduler',
    description: 'Backtracking and state recovery vs sequential job dispatching.',
  },
];
