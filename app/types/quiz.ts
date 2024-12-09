export interface QuizComponent {
  id: string;
  type: 'progress' | 'timer' | 'question' | 'image' | 'options';
  position: { x: number; y: number };
  config: ComponentConfig;
}

export interface ComponentConfig {
  progressBar?: {
    color: string;
    width: string;
    height: string;
  };
  timer?: {
    minutes: number;
    seconds: number;
  };
  question?: {
    total: number;
    current: number;
    text: string;
  };
  image?: {
    url: string;
    alt: string;
  };
  options?: {
    items: string[];
    correctAnswer: number;
  };
}

export interface QuizState {
  components: QuizComponent[];
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  isComplete: boolean;
}