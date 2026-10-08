import { AlgorithmDefinition, CodeSnippet, ComplexityItem, ApplicationItem } from '../types';

export const QUEUE_CAPACITY = 7;

export const QUEUE_ALGORITHMS: Record<string, AlgorithmDefinition> = {
  enqueue: {
    id: 'enqueue',
    name: 'Enqueue Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Enqueue(value):',
      '  if REAR == MAX_SIZE - 1 then',
      '    return OVERFLOW ("Queue is full")',
      '  end if',
      '  if FRONT == -1 then',
      '    FRONT = 0',
      '  end if',
      '  REAR = REAR + 1',
      '  QUEUE[REAR] = value',
      '  return SUCCESS',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check for Queue Overflow',
        description: 'Verify if REAR has reached the capacity boundary (MAX_SIZE - 1 in linear queue, or (REAR + 1) % MAX == FRONT in circular queue).',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Initialize FRONT for First Item',
        description: 'If this is the initial element inserted into an empty queue (FRONT == -1), set FRONT to 0.',
        pseudocodeLine: 5,
      },
      {
        stepNumber: 3,
        title: 'Advance REAR Pointer',
        description: 'Increment REAR pointer by 1 (REAR = REAR + 1) to point to the next insertion slot at the tail of the line.',
        pseudocodeLine: 8,
      },
      {
        stepNumber: 4,
        title: 'Store Value at QUEUE[REAR]',
        description: 'Write the new data element into QUEUE[REAR]. Enqueue operation completed successfully.',
        pseudocodeLine: 9,
      },
    ],
  },
  dequeue: {
    id: 'dequeue',
    name: 'Dequeue Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Dequeue():',
      '  if FRONT == -1 or FRONT > REAR then',
      '    return UNDERFLOW ("Queue is empty")',
      '  end if',
      '  removedValue = QUEUE[FRONT]',
      '  FRONT = FRONT + 1',
      '  if FRONT > REAR then',
      '    FRONT = -1; REAR = -1  // Reset when emptied',
      '  end if',
      '  return removedValue',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check for Queue Underflow',
        description: 'Check if FRONT == -1 or FRONT > REAR. If true, no elements reside in the queue to be removed.',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Retrieve FRONT Element',
        description: 'Read the data element located at QUEUE[FRONT] into a temporary variable.',
        pseudocodeLine: 5,
      },
      {
        stepNumber: 3,
        title: 'Advance FRONT Pointer',
        description: 'Increment FRONT by 1 (FRONT = FRONT + 1). In FIFO order, the oldest element leaves first.',
        pseudocodeLine: 6,
      },
      {
        stepNumber: 4,
        title: 'Reset Pointers if Queue Empty',
        description: 'If FRONT surpasses REAR, all items have been dequeued. Reset both FRONT and REAR to -1 to reclaim capacity.',
        pseudocodeLine: 8,
      },
    ],
  },
  peek: {
    id: 'peek',
    name: 'Peek (Front) Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Peek():',
      '  if FRONT == -1 or FRONT > REAR then',
      '    return UNDERFLOW ("Queue is empty")',
      '  end if',
      '  return QUEUE[FRONT]',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check if Queue Empty',
        description: 'Verify if FRONT is valid. If FRONT == -1, the queue is currently empty.',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Inspect FRONT Element',
        description: 'Return QUEUE[FRONT] without altering either FRONT or REAR pointers.',
        pseudocodeLine: 5,
      },
    ],
  },
};

export const QUEUE_CODE_SNIPPETS: Record<string, Record<string, CodeSnippet>> = {
  enqueue: {
    c: {
      language: 'c',
      code: `// Linear Queue Enqueue in C
#define MAX 100
int queue[MAX];
int front = -1;
int rear = -1;

bool enqueue(int value) {
    if (rear >= MAX - 1) {
        printf("Queue Overflow! Cannot enqueue %d\\n", value);
        return false;
    }
    if (front == -1) front = 0;
    queue[++rear] = value;
    printf("Enqueued %d at rear position %d\\n", value, rear);
    return true;
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Queue Enqueue in C++
#include <iostream>
#include <vector>

template <typename T>
class Queue {
private:
    std::vector<T> data;
    int front = 0;
public:
    void enqueue(const T& value) {
        data.push_back(value);
    }
};`,
    },
    java: {
      language: 'java',
      code: `// Circular Queue Enqueue in Java
public class CircularQueue {
    private int[] queue;
    private int front, rear, size, capacity;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.queue = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    public boolean enqueue(int value) {
        if (size == capacity) {
            System.out.println("Queue Overflow: Circular queue is full");
            return false;
        }
        rear = (rear + 1) % capacity;
        queue[rear] = value;
        size++;
        return true;
    }
}`,
    },
    python: {
      language: 'python',
      code: `# Queue Enqueue in Python (using collections.deque)
from collections import deque

class Queue:
    def __init__(self, max_size=100):
        self.queue = deque()
        self.max_size = max_size

    def enqueue(self, value):
        if len(self.queue) >= self.max_size:
            raise IndexError("Queue Overflow: Queue is full")
        self.queue.append(value)
        return True`,
    },
  },
  dequeue: {
    c: {
      language: 'c',
      code: `// Linear Queue Dequeue in C
int dequeue() {
    if (front == -1 || front > rear) {
        printf("Queue Underflow! Queue is empty\\n");
        return -1;
    }
    int value = queue[front++];
    if (front > rear) { // Reset when emptied
        front = -1;
        rear = -1;
    }
    return value;
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Queue Dequeue in C++
T dequeue() {
    if (front >= data.size()) {
        throw std::underflow_error("Queue Underflow");
    }
    return data[front++];
}`,
    },
    java: {
      language: 'java',
      code: `// Circular Queue Dequeue in Java
public int dequeue() {
    if (size == 0) {
        throw new IllegalStateException("Queue Underflow: Queue is empty");
    }
    int value = queue[front];
    front = (front + 1) % capacity;
    size--;
    return value;
}`,
    },
    python: {
      language: 'python',
      code: `# Queue Dequeue in Python
def dequeue(self):
    if not self.queue:
        raise IndexError("Queue Underflow: Queue is empty")
    return self.queue.popleft()`,
    },
  },
  peek: {
    c: {
      language: 'c',
      code: `// Queue Peek in C
int peek() {
    if (front == -1 || front > rear) {
        printf("Queue is empty\\n");
        return -1;
    }
    return queue[front];
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Queue Peek in C++
const T& peek() const {
    if (front >= data.size()) {
        throw std::underflow_error("Queue is empty");
    }
    return data[front];
}`,
    },
    java: {
      language: 'java',
      code: `// Queue Peek in Java
public int peek() {
    if (size == 0) {
        throw new IllegalStateException("Queue is empty");
    }
    return queue[front];
}`,
    },
    python: {
      language: 'python',
      code: `# Queue Peek in Python
def peek(self):
    if not self.queue:
        raise IndexError("Queue is empty")
    return self.queue[0]`,
    },
  },
};

export const QUEUE_COMPLEXITY_DATA: ComplexityItem[] = [
  {
    operation: 'Enqueue (Insert at Rear)',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Element placed directly at REAR index or tail node. Constant time.',
  },
  {
    operation: 'Dequeue (Remove from Front)',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Front pointer moves forward by 1 index or head node unlinked. In a naive array without circular buffer or shifting, shifting would cost O(n).',
  },
  {
    operation: 'Peek (Front)',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Directly reads value stored at FRONT without modifying indices.',
  },
  {
    operation: 'Search',
    averageTime: 'O(n)',
    worstTime: 'O(n)',
    space: 'O(1)',
    reason: 'Must scan sequentially from FRONT to REAR to locate specific element.',
  },
  {
    operation: 'Is Empty / Full',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Simple arithmetic check on pointer bounds or element counter.',
  },
];

export const QUEUE_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'printer-spooler',
    title: 'Printer Spooling & Print Queue',
    category: 'queue',
    subtitle: 'Hardware Resource Sharing',
    description: 'When multiple users send documents to a shared office printer, print jobs are queued in FIFO order so earlier submissions are printed first without collision.',
    howItWorks: 'The operating system spools files to disk, dequeuing each job sequentially as the physical printer becomes ready.',
    exampleScenario: 'Doc A sent at 10:00 AM prints before Doc B sent at 10:01 AM.',
    iconName: 'Printer',
  },
  {
    id: 'cpu-scheduling',
    title: 'CPU Task Scheduling & Ready Queue',
    category: 'queue',
    subtitle: 'Operating System Multiprocessing',
    description: 'In Round-Robin and FCFS (First-Come, First-Served) OS scheduling, active processes wait in a Ready Queue for their turn on the CPU time slice.',
    howItWorks: 'When a process exhausts its quantum, it is placed at the tail (REAR) while the next process at the FRONT is scheduled.',
    exampleScenario: 'Multitasking OS smoothly rotating execution among 50 background tasks.',
    iconName: 'Server',
  },
  {
    id: 'bfs-traversal',
    title: 'Breadth-First Search (BFS)',
    category: 'queue',
    subtitle: 'Graph & Tree Level-Order Exploration',
    description: 'BFS explores neighbor nodes level by level. A queue ensures all nodes at distance k from the source are processed before moving to distance k+1.',
    howItWorks: 'Enqueue initial node -> while queue not empty: dequeue current, visit, and enqueue all unvisited neighbors.',
    exampleScenario: 'Shortest path in unweighted graphs (GPS maps, social network degrees of separation).',
    iconName: 'Network',
  },
  {
    id: 'network-buffers',
    title: 'Network Packet Buffering',
    category: 'queue',
    subtitle: 'Internet Routers & Switches',
    description: 'When network packet arrival rate temporarily exceeds packet transmission bandwidth, routers store incoming packets in FIFO hardware buffers.',
    howItWorks: 'Packets exit the buffer in the exact order received, preventing packet reordering.',
    exampleScenario: 'Streaming video buffer smoothing out intermittent Wi-Fi jitter.',
    iconName: 'Wifi',
  },
  {
    id: 'call-center',
    title: 'Customer Support & Ticket Queuing',
    category: 'queue',
    subtitle: 'Telephony & Helpdesk Dispatch',
    description: 'Incoming customer phone calls or support tickets enter a wait queue: "Your call will be answered in the order it was received."',
    howItWorks: 'As support agents become available, the longest-waiting caller at FRONT is assigned.',
    exampleScenario: 'Call center queue: Caller 1 -> Caller 2 -> Caller 3.',
    iconName: 'PhoneCall',
  },
  {
    id: 'event-loop',
    title: 'Asynchronous Event Loop & Message Queue',
    category: 'queue',
    subtitle: 'JavaScript & Reactive Frameworks',
    description: 'Browser UI events (clicks, timers, network responses) push callback tasks onto the Macrotask and Microtask Queues to be executed once call stack clears.',
    howItWorks: 'Guarantees sequential event handling without race conditions or thread blocking.',
    exampleScenario: 'setTimeout callbacks executed in FIFO arrival order once stack is empty.',
    iconName: 'Clock',
  },
];
