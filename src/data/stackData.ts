import { AlgorithmDefinition, CodeSnippet, ComplexityItem, ApplicationItem } from '../types';

export const STACK_CAPACITY = 7;

export const STACK_ALGORITHMS: Record<string, AlgorithmDefinition> = {
  push: {
    id: 'push',
    name: 'Push Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Push(value):',
      '  if TOP == MAX_SIZE - 1 then',
      '    return OVERFLOW ("Stack is full")',
      '  end if',
      '  TOP = TOP + 1',
      '  STACK[TOP] = value',
      '  return SUCCESS',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check for Stack Overflow',
        description: 'Verify if TOP has reached the maximum array boundary (MAX_SIZE - 1). If full, insertion is rejected to prevent memory corruption.',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Advance TOP Pointer',
        description: 'Increment TOP pointer by 1 (TOP = TOP + 1) to point to the next vacant slot in the stack.',
        pseudocodeLine: 5,
      },
      {
        stepNumber: 3,
        title: 'Store Value at STACK[TOP]',
        description: 'Write the incoming value into the memory slot currently indexed by TOP.',
        pseudocodeLine: 6,
      },
      {
        stepNumber: 4,
        title: 'Operation Completed',
        description: 'The new element is now safely positioned at the TOP of the stack. Stack state updated successfully.',
        pseudocodeLine: 7,
      },
    ],
  },
  pop: {
    id: 'pop',
    name: 'Pop Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Pop():',
      '  if TOP == -1 then',
      '    return UNDERFLOW ("Stack is empty")',
      '  end if',
      '  poppedValue = STACK[TOP]',
      '  TOP = TOP - 1',
      '  return poppedValue',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check for Stack Underflow',
        description: 'Check if TOP equals -1 (or null). If true, the stack contains no elements and deletion cannot be performed.',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Retrieve Top Element',
        description: 'Read the data value stored at STACK[TOP] into a temporary variable to return to the caller.',
        pseudocodeLine: 5,
      },
      {
        stepNumber: 3,
        title: 'Decrement TOP Pointer',
        description: 'Decrease TOP by 1 (TOP = TOP - 1), conceptually removing access to the previous element.',
        pseudocodeLine: 6,
      },
      {
        stepNumber: 4,
        title: 'Return Value',
        description: 'Operation complete. The top item was ejected and its value successfully returned.',
        pseudocodeLine: 7,
      },
    ],
  },
  peek: {
    id: 'peek',
    name: 'Peek (Top) Operation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    pseudocode: [
      'ALGORITHM Peek():',
      '  if TOP == -1 then',
      '    return UNDERFLOW ("Stack is empty")',
      '  end if',
      '  return STACK[TOP]',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Check if Empty',
        description: 'Verify if the stack contains any items. If TOP == -1, there is no element to inspect.',
        pseudocodeLine: 2,
      },
      {
        stepNumber: 2,
        title: 'Inspect Current TOP',
        description: 'Read and return the value at STACK[TOP] without decrementing TOP or altering stack state.',
        pseudocodeLine: 4,
      },
    ],
  },
};

export const STACK_CODE_SNIPPETS: Record<string, Record<string, CodeSnippet>> = {
  push: {
    c: {
      language: 'c',
      code: `// Stack Push in C (Fixed-size array)
#define MAX 100
int stack[MAX];
int top = -1;

bool push(int value) {
    if (top >= MAX - 1) {
        printf("Error: Stack Overflow! Cannot push %d\\n", value);
        return false;
    }
    stack[++top] = value;
    printf("Pushed %d to stack at index %d\\n", value, top);
    return true;
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Stack Push in C++
#include <iostream>
#include <vector>

template <typename T>
class Stack {
private:
    std::vector<T> data;
    int maxSize;
public:
    Stack(int size = 100) : maxSize(size) {}

    bool push(const T& value) {
        if (data.size() >= maxSize) {
            std::cerr << "Stack Overflow\\n";
            return false;
        }
        data.push_back(value);
        return true;
    }
};`,
    },
    java: {
      language: 'java',
      code: `// Stack Push in Java
public class ArrayStack {
    private int[] stack;
    private int top;
    private int capacity;

    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.stack = new int[capacity];
        this.top = -1;
    }

    public boolean push(int value) {
        if (top == capacity - 1) {
            System.out.println("Stack Overflow: Stack is full");
            return false;
        }
        stack[++top] = value;
        return true;
    }
}`,
    },
    python: {
      language: 'python',
      code: `# Stack Push in Python
class Stack:
    def __init__(self, max_size=100):
        self.stack = []
        self.max_size = max_size

    def push(self, value):
        if len(self.stack) >= self.max_size:
            raise IndexError("Stack Overflow: Cannot push to full stack")
        self.stack.append(value)
        return True`,
    },
  },
  pop: {
    c: {
      language: 'c',
      code: `// Stack Pop in C
int pop() {
    if (top == -1) {
        printf("Error: Stack Underflow! Stack is empty\\n");
        return -1; // Sentinel value
    }
    int poppedValue = stack[top--];
    return poppedValue;
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Stack Pop in C++
T pop() {
    if (data.empty()) {
        throw std::underflow_error("Stack Underflow: Stack is empty");
    }
    T topVal = data.back();
    data.pop_back();
    return topVal;
}`,
    },
    java: {
      language: 'java',
      code: `// Stack Pop in Java
public int pop() {
    if (top == -1) {
        throw new IllegalStateException("Stack Underflow: Stack is empty");
    }
    return stack[top--];
}`,
    },
    python: {
      language: 'python',
      code: `# Stack Pop in Python
def pop(self):
    if not self.stack:
        raise IndexError("Stack Underflow: Cannot pop from empty stack")
    return self.stack.pop()`,
    },
  },
  peek: {
    c: {
      language: 'c',
      code: `// Stack Peek in C
int peek() {
    if (top == -1) {
        printf("Error: Stack is empty\\n");
        return -1;
    }
    return stack[top];
}`,
    },
    cpp: {
      language: 'cpp',
      code: `// Stack Peek in C++
const T& peek() const {
    if (data.empty()) {
        throw std::underflow_error("Stack is empty");
    }
    return data.back();
}`,
    },
    java: {
      language: 'java',
      code: `// Stack Peek in Java
public int peek() {
    if (top == -1) {
        throw new IllegalStateException("Stack is empty");
    }
    return stack[top];
}`,
    },
    python: {
      language: 'python',
      code: `# Stack Peek in Python
def peek(self):
    if not self.stack:
        raise IndexError("Stack is empty")
    return self.stack[-1]`,
    },
  },
};

export const STACK_COMPLEXITY_DATA: ComplexityItem[] = [
  {
    operation: 'Push',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Element is inserted directly at index (top + 1). No elements need to be shifted.',
  },
  {
    operation: 'Pop',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Top element is read and top pointer is decremented by 1. Instantaneous index access.',
  },
  {
    operation: 'Peek (Top)',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Directly reads the value at the current top index without modifying stack state.',
  },
  {
    operation: 'Search',
    averageTime: 'O(n)',
    worstTime: 'O(n)',
    space: 'O(1)',
    reason: 'Must pop/traverse each item sequentially from top to bottom until target is found.',
  },
  {
    operation: 'Is Empty / Full',
    averageTime: 'O(1)',
    worstTime: 'O(1)',
    space: 'O(1)',
    reason: 'Simple arithmetic comparison: top == -1 or top == MAX - 1.',
  },
];

export const STACK_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'call-stack',
    title: 'Function Call Stack',
    category: 'stack',
    subtitle: 'Runtime Execution Management',
    description: 'When functions are invoked, their local variables and return addresses are pushed onto the call stack. When a function finishes execution, its stack frame is popped.',
    howItWorks: 'Enables nested function calls and recursive algorithms (e.g., DFS, Quicksort) to resume right where the caller left off.',
    exampleScenario: 'main() calls calculateArea() -> calculateArea() calls multiply() -> multiply() finishes and pops back to calculateArea().',
    iconName: 'Cpu',
  },
  {
    id: 'undo-redo',
    title: 'Undo / Redo Buffers',
    category: 'stack',
    subtitle: 'Text Editors & Productivity Tools',
    description: 'Every user action (typing, deleting, formatting) is pushed onto an Undo stack. Pressing Ctrl+Z pops the latest action and pushes it onto a Redo stack.',
    howItWorks: 'LIFO ensures that the most recent action is the very first one undone.',
    exampleScenario: 'Type "Hello" -> Type "World" -> Undo pops "World" and restores "Hello".',
    iconName: 'RotateCcw',
  },
  {
    id: 'browser-history',
    title: 'Browser Navigation History',
    category: 'stack',
    subtitle: 'Back & Forward Navigation',
    description: 'Every visited webpage URL is pushed onto the Back Stack. Clicking the Back button pops the current page and displays the previously visited URL.',
    howItWorks: 'Clicking Forward uses a second forward stack to re-navigate to popped pages.',
    exampleScenario: 'Google -> GitHub -> StackOverflow. Click Back -> Returns to GitHub.',
    iconName: 'Globe',
  },
  {
    id: 'parentheses-matching',
    title: 'Parentheses / Delimiter Matching',
    category: 'stack',
    subtitle: 'Compilers & Syntax Parsers',
    description: 'When an opening bracket (, [, { is encountered in code, it is pushed onto the stack. When a closing bracket is seen, the top is popped and verified for matching type.',
    howItWorks: 'If the stack is empty at completion and no mismatches occurred, the expression is syntactically balanced.',
    exampleScenario: 'Parsing "{ [ ( a + b ) ] }": each pair resolves in inverse order of appearance.',
    iconName: 'Code',
  },
  {
    id: 'expression-eval',
    title: 'Expression Evaluation & Conversion',
    category: 'stack',
    subtitle: 'Infix, Postfix, & Prefix Parsers',
    description: 'Calculators convert standard human infix expressions like 3 + 4 * 2 into Reverse Polish Notation (Postfix) using Dijkstra’s Shunting-yard algorithm.',
    howItWorks: 'Operands and operators are handled via stack precedence to eliminate parenthesis ambiguity.',
    exampleScenario: 'Postfix "3 4 2 * +" evaluated by pushing 3, 4, 2, multiplying 4*2=8, then adding 3+8=11.',
    iconName: 'Calculator',
  },
  {
    id: 'backtracking',
    title: 'Backtracking & Maze Solving',
    category: 'stack',
    subtitle: 'Algorithmic Search & Pathfinding',
    description: 'Solvers explore candidate paths step by step. When a dead end is reached, the solver pops the last recorded choice and backtracks to try an alternate branch.',
    howItWorks: 'Implicit recursion or an explicit stack saves the decision trail at each fork in the maze or Sudoku grid.',
    exampleScenario: 'N-Queens, Sudoku solvers, and Depth First Search graph traversal.',
    iconName: 'GitBranch',
  },
];
