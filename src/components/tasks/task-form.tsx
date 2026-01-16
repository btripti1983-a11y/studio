"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

const allQuestions: QuizQuestion[] = [
    { 
      id: 'q1', 
      question: "In transformer architectures, what is the primary purpose of positional encoding?", 
      options: ["To normalize input tokens", "To inject word frequency information", "To provide sequence order information", "To reduce model overfitting"], 
      correctAnswer: "To provide sequence order information" 
    },
    { 
      id: 'q2', 
      question: "What does the 'self-attention' mechanism in a transformer allow the model to do?", 
      options: ["Weigh the importance of different words in the input sequence", "Attend to different parts of the output sequence", "Reduce the dimensionality of the input", "Exclusively focus on the first token"], 
      correctAnswer: "Weigh the importance of different words in the input sequence" 
    },
    { 
      id: 'q3', 
      question: "Which of the following is NOT a part of the original Transformer architecture proposed in 'Attention Is All You Need'?", 
      options: ["Encoder Stack", "Decoder Stack", "Recurrent Neural Network (RNN) layers", "Feed-Forward Networks"], 
      correctAnswer: "Recurrent Neural Network (RNN) layers" 
    },
    {
      id: 'q4',
      question: "What is a 'token' in the context of Natural Language Processing (NLP)?",
      options: ["A measure of model confidence", "A piece of a word or a whole word", "A type of neural network layer", "A hyperparameter for training speed"],
      correctAnswer: "A piece of a word or a whole word",
    },
    {
      id: 'q5',
      question: "Which activation function is commonly used in the feed-forward networks of a Transformer?",
      options: ["Sigmoid", "Tanh", "ReLU (Rectified Linear Unit)", "Linear"],
      correctAnswer: "ReLU (Rectified Linear Unit)",
    },
    {
      id: 'q6',
      question: "In BERT (Bidirectional Encoder Representations from Transformers), what task is used for pre-training?",
      options: ["Next Sentence Prediction", "Masked Language Modeling", "Both A and B", "Text Summarization"],
      correctAnswer: "Both A and B",
    },
    {
      id: 'q7',
      question: "What is the primary advantage of Transformers over RNNs for long sequences?",
      options: ["They are computationally cheaper for any sequence length", "They can process tokens in parallel, avoiding sequential bottlenecks", "They require less memory", "They do not need pre-training"],
      correctAnswer: "They can process tokens in parallel, avoiding sequential bottlenecks",
    },
    {
      id: 'q8',
      question: "What is 'temperature' in the context of text generation from a language model?",
      options: ["A parameter to control the randomness of the output", "The physical operating temperature of the hardware", "The number of layers in the model", "The learning rate"],
      correctAnswer: "A parameter to control the randomness of the output",
    },
    {
      id: 'q9',
      question: "What does 'fine-tuning' a pre-trained language model involve?",
      options: ["Training the model from scratch on a new dataset", "Further training the model on a smaller, task-specific dataset", "Removing layers from the model to make it faster", "Only training the final layer of the model"],
      correctAnswer: "Further training the model on a smaller, task-specific dataset",
    },
    {
      id: 'q10',
      question: "Which of these is a common application of large language models like GPT-3?",
      options: ["Image classification", "Robotics control", "Text generation and summarization", "Speech synthesis"],
      correctAnswer: "Text generation and summarization",
    },
    {
      id: 'q11',
      question: "What is the purpose of the 'attention mask' in a transformer model?",
      options: ["To tell the model which tokens to ignore (e.g., padding tokens)", "To hide future tokens in a sequence during training", "To randomly mask input tokens for pre-training", "To apply dropout to the attention scores"],
      correctAnswer: "To tell the model which tokens to ignore (e.g., padding tokens)",
    },
    {
      id: 'q12',
      question: "In multi-head attention, what is the benefit of having multiple heads?",
      options: ["It reduces the number of parameters", "It allows the model to focus on different parts of the sequence simultaneously", "It guarantees the model will converge faster", "It makes the model fully bidirectional"],
      correctAnswer: "It allows the model to focus on different parts of the sequence simultaneously",
    },
    {
      id: 'q13',
      question: "What is a 'hyperparameter' in machine learning?",
      options: ["A parameter learned by the model during training (e.g., weights)", "A configuration setting that is set before the training process begins", "The output of the model", "The input data fed to the model"],
      correctAnswer: "A configuration setting that is set before the training process begins",
    },
    {
      id: 'q14',
      question: "Which metric is commonly used to evaluate the performance of a classification model?",
      options: ["Mean Squared Error (MSE)", "Accuracy", "R-squared", "Mean Absolute Error (MAE)"],
      correctAnswer: "Accuracy",
    },
    {
      id: 'q15',
      question: "What is overfitting in the context of machine learning?",
      options: ["When a model performs well on training data but poorly on unseen data", "When a model is too simple to capture the underlying pattern of the data", "When the training process takes too long", "When the model's predictions are always incorrect"],
      correctAnswer: "When a model performs well on training data but poorly on unseen data",
    },
    {
      id: 'q16',
      question: "What is the role of a 'decoder' in a standard encoder-decoder architecture?",
      options: ["To compress the input sequence into a fixed-size vector", "To generate the output sequence based on the encoder's output", "To calculate the loss function", "To update the model's weights"],
      correctAnswer: "To generate the output sequence based on the encoder's output",
    },
    {
      id: 'q17',
      question: "What is Gradient Descent?",
      options: ["A type of neural network", "An optimization algorithm used to minimize a model's loss function", "A method for data normalization", "A technique for feature engineering"],
      correctAnswer: "An optimization algorithm used to minimize a model's loss function",
    },
    {
      id: 'q18',
      question: "What does 'NLP' stand for?",
      options: ["Natural Language Processing", "Neural Link Protocol", "Network Learning Program", "Nominal Language Paradigm"],
      correctAnswer: "Natural Language Processing",
    },
    {
      id: 'q19',
      question: "In a Convolutional Neural Network (CNN), what is the primary purpose of a pooling layer?",
      options: ["To add non-linearity to the model", "To reduce the spatial dimensions of the feature maps", "To learn features from the input image", "To increase the number of parameters"],
      correctAnswer: "To reduce the spatial dimensions of the feature maps",
    },
    {
      id: 'q20',
      question: "Which company developed the Transformer architecture?",
      options: ["Facebook AI", "DeepMind", "OpenAI", "Google"],
      correctAnswer: "Google",
    },
    { 
      id: 'q21', 
      question: "What is a key feature of the 'Attention' mechanism?", 
      options: ["It uses recurrent connections", "It assigns scores to input parts to focus on relevant ones", "It is only used for image data", "It requires fixed-length inputs"], 
      correctAnswer: "It assigns scores to input parts to focus on relevant ones" 
    },
    { 
      id: 'q22', 
      question: "Which of the following models is an example of a Transformer-based architecture?", 
      options: ["LSTM", "GRU", "GPT-3", "AlexNet"], 
      correctAnswer: "GPT-3" 
    },
    { 
      id: 'q23', 
      question: "What is 'transfer learning' in the context of NLP?", 
      options: ["Training a model on one language and testing on another", "Using a model pre-trained on a large dataset for a new, specific task", "Transferring model weights between different hardware", "A specific type of data augmentation"], 
      correctAnswer: "Using a model pre-trained on a large dataset for a new, specific task" 
    },
    { 
      id: 'q24', 
      question: "What does a 'softmax' function do in a classification model?", 
      options: ["It converts model outputs (logits) into probabilities", "It normalizes the input data", "It calculates the model's loss", "It adds random noise to the training data"], 
      correctAnswer: "It converts model outputs (logits) into probabilities" 
    },
    { 
      id: 'q25', 
      question: "What is the purpose of a validation set in machine learning?", 
      options: ["To train the model", "To tune hyperparameters and evaluate model performance during training", "To be held back for the final, unbiased evaluation of the model", "To augment the training data"], 
      correctAnswer: "To tune hyperparameters and evaluate model performance during training" 
    }
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function TaskForm() {
    const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const activeQuiz = localStorage.getItem('activeQuiz');
            if (activeQuiz) {
                const { questions, userAnswers } = JSON.parse(activeQuiz);
                setSelectedQuestions(questions);
                setAnswers(userAnswers || {});
            } else {
                const shuffled = shuffleArray([...allQuestions]);
                const newQuestions = shuffled.slice(0, 20);
                setSelectedQuestions(newQuestions);
                setAnswers({});
                localStorage.setItem('activeQuiz', JSON.stringify({ questions: newQuestions, userAnswers: {} }));
            }
        } catch (error) {
            console.error("Failed to process quiz from localStorage", error);
            const shuffled = shuffleArray([...allQuestions]);
            const newQuestions = shuffled.slice(0, 20);
            setSelectedQuestions(newQuestions);
            setAnswers({});
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        try {
            const activeQuiz = localStorage.getItem('activeQuiz');
            if (activeQuiz) {
                const quizData = JSON.parse(activeQuiz);
                quizData.userAnswers = answers;
                localStorage.setItem('activeQuiz', JSON.stringify(quizData));
            }
        } catch (error) {
            console.error("Failed to save answers to localStorage", error);
        }
    }, [answers, isInitialized]);


    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };
    
    const handleRetry = () => {
        try {
            localStorage.removeItem('activeQuiz');
        } catch (error) {
            console.error("Failed to remove quiz from localStorage", error);
        }
        window.location.reload();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (Object.keys(answers).length < 20) {
            toast({
                variant: 'destructive',
                title: 'Incomplete Task',
                description: 'Please answer all 20 questions before submitting.',
            });
            return;
        }

        setLoading(true);

        let correctCount = 0;
        selectedQuestions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });

        const calculatedScore = (correctCount / 20) * 100;
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        setScore(calculatedScore);
        setSubmitted(true);
        setLoading(false);
        
        try {
            localStorage.removeItem('activeQuiz');
        } catch (error) {
            console.error("Failed to remove quiz from localStorage on submit", error);
        }

        if (calculatedScore < 95) {
            toast({
                variant: 'destructive',
                title: `FAIL: Score ${calculatedScore.toFixed(0)}%`,
                description: `You did not meet the 95% pass requirement. Please try again.`,
                duration: 5000,
            });
        } else {
            toast({
                title: `PASS: Score ${calculatedScore.toFixed(0)}%`,
                description: `Congratulations! Your submission is under review.`,
                duration: 5000,
            });
        }
    };
    
    if (!isInitialized) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>New Task</CardTitle>
                    <CardDescription>Loading your quiz...</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        )
    }

    if (submitted) {
        const pass = score >= 95;
        const correctAnswers = Math.round((score / 100) * 20);
        const incorrectAnswers = 20 - correctAnswers;

        return (
             <Card>
                <CardHeader>
                    <CardTitle>Quiz Result</CardTitle>
                    <CardDescription>Here is your score for this attempt.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className={`text-center p-6 rounded-lg ${pass ? 'bg-green-100' : 'bg-red-100'}`}>
                        <h2 className={`text-4xl font-bold ${pass ? 'text-green-700' : 'text-red-700'}`}>
                            {score.toFixed(0)}%
                        </h2>
                        <p className={`text-lg font-semibold ${pass ? 'text-green-600' : 'text-red-600'}`}>
                           {pass ? 'PASSED' : 'FAILED'}
                        </p>
                    </div>
                     <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="text-2xl font-bold">{correctAnswers}</p>
                            <p className="text-sm text-muted-foreground">Correct Answers</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                            <p className="text-2xl font-bold">{incorrectAnswers}</p>
                            <p className="text-sm text-muted-foreground">Incorrect Answers</p>
                        </div>
                    </div>
                    {!pass && (
                        <div className="text-center pt-4">
                             <Button onClick={handleRetry}>
                                Try Again
                            </Button>
                        </div>
                    )}
                     {pass && (
                        <div className="text-center pt-4">
                             <p className="text-muted-foreground">You can now proceed to the next tasks.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Task</CardTitle>
                <CardDescription>Answer all 20 questions. You must score at least 95% to pass.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {selectedQuestions.map((q, index) => (
                        <div key={q.id} className="space-y-3 p-4 border rounded-lg">
                            <Label className="font-semibold">{index + 1}. {q.question}</Label>
                            <RadioGroup
                                value={answers[q.id] || ''}
                                onValueChange={(value) => handleAnswerChange(q.id, value)}
                                className="space-y-2 pt-2"
                            >
                                {q.options.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                        <Label htmlFor={`${q.id}-${option}`} className="font-normal">{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={loading || Object.keys(answers).length < 20}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}
