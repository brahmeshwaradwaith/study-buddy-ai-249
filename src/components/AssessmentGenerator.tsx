import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Brain, Timer, CheckCircle2, X, Play, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AssessmentGenerator = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isAssessmentActive, setIsAssessmentActive] = useState(false);
  
  const { toast } = useToast();

  const assessmentHistory = [
    { subject: 'Mathematics', score: 85, date: '2 days ago', questions: 15, time: '12 min' },
    { subject: 'Physics', score: 92, date: '1 week ago', questions: 20, time: '18 min' },
    { subject: 'Chemistry', score: 78, date: '1 week ago', questions: 12, time: '15 min' }
  ];

  const sampleQuestions = [
    {
      question: "What is the derivative of x² + 3x - 5?",
      options: ["2x + 3", "x² + 3", "2x - 5", "3x + 2"],
      correct: 0,
      explanation: "Using the power rule: d/dx(x²) = 2x, d/dx(3x) = 3, d/dx(-5) = 0"
    },
    {
      question: "Which of the following represents simple harmonic motion?",
      options: ["x = A sin(ωt + φ)", "x = At + B", "x = Ae^(-t)", "x = A log(t)"],
      correct: 0,
      explanation: "Simple harmonic motion follows the sinusoidal pattern x = A sin(ωt + φ)"
    },
    {
      question: "What is the molecular formula for glucose?",
      options: ["C₆H₁₂O₆", "C₆H₆O₆", "C₅H₁₀O₅", "C₁₂H₂₂O₁₁"],
      correct: 0,
      explanation: "Glucose has 6 carbon atoms, 12 hydrogen atoms, and 6 oxygen atoms"
    }
  ];

  const generateAssessment = () => {
    if (!selectedSubject || !selectedDifficulty) {
      toast({
        title: "Missing Information",
        description: "Please select both subject and difficulty level.",
        variant: "destructive",
      });
      return;
    }

    // For now, show a message about backend integration
    toast({
      title: "AI Assessment Generation",
      description: "Full AI-powered assessment generation requires Supabase integration for advanced features. Using sample questions for demo.",
    });

    setIsAssessmentActive(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
    setTimeLeft(600);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex.toString();
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    setShowResults(true);
    setIsAssessmentActive(false);
    
    const score = userAnswers.reduce((acc, answer, index) => {
      return acc + (parseInt(answer) === sampleQuestions[index].correct ? 1 : 0);
    }, 0);
    
    toast({
      title: "Assessment Complete!",
      description: `You scored ${score}/${sampleQuestions.length} (${Math.round((score/sampleQuestions.length) * 100)}%)`,
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  if (isAssessmentActive) {
    const question = sampleQuestions[currentQuestion];
    return (
      <div className="space-y-6">
        <Card className="study-card-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assessment in Progress</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="w-4 h-4" />
                  {formatTime(timeLeft)}
                </div>
                <Badge variant="outline">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </Badge>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={userAnswers[currentQuestion] === index.toString() ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setIsAssessmentActive(false)}
              >
                Pause Assessment
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!userAnswers[currentQuestion]}
              >
                {currentQuestion === sampleQuestions.length - 1 ? 'Complete' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = userAnswers.reduce((acc, answer, index) => {
      return acc + (parseInt(answer) === sampleQuestions[index].correct ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / sampleQuestions.length) * 100);

    return (
      <div className="space-y-6">
        <Card className="study-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}>
                {percentage}%
              </div>
              <p className="text-muted-foreground">
                You got {score} out of {sampleQuestions.length} questions correct
              </p>
            </div>

            <div className="space-y-4">
              {sampleQuestions.map((question, index) => {
                const userAnswer = parseInt(userAnswers[index]);
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={index} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            Your answer: <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                              {question.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground">
                              Correct answer: <span className="text-success">
                                {question.options[question.correct]}
                              </span>
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground italic">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setShowResults(false)} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Another Assessment
              </Button>
              <Button variant="outline" className="flex-1">
                Review Materials
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Assessment Generator</h2>
          <p className="text-muted-foreground">AI-powered quizzes and tests based on your study materials</p>
        </div>
      </div>

      {/* Generate Assessment */}
      <Card className="study-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Generate New Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={generateAssessment} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Generate Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Assessment History */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary-accent" />
            Recent Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentHistory.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{assessment.subject} Assessment</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{assessment.date}</span>
                      <span>{assessment.questions} questions</span>
                      <span>{assessment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(assessment.score)}`}>
                    {assessment.score}%
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};