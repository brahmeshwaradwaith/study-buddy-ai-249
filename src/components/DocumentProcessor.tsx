import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Brain, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DocumentProcessor = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([
    { name: 'Advanced Calculus.pdf', status: 'completed', insights: 15, questions: 23 },
    { name: 'Physics Mechanics.docx', status: 'completed', insights: 12, questions: 18 },
    { name: 'Chemistry Organic.pdf', status: 'processing', insights: 0, questions: 0 }
  ]);
  
  const { toast } = useToast();

  const handleFileUpload = () => {
    // Check if backend functionality is needed
    toast({
      title: "Backend Integration Required",
      description: "Document processing requires Supabase integration for file storage and AI analysis. Please connect your project to Supabase to enable this feature.",
      variant: "destructive",
    });
  };

  const simulateUpload = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: "Upload Complete!",
            description: "Your document has been processed and study materials generated.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="study-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Document Upload & Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Study Documents</h3>
            <p className="text-muted-foreground mb-4">
              Drop your PDFs, DOCX, or text files here for AI-powered analysis
            </p>
            <Button onClick={handleFileUpload} className="mb-2">
              Select Files
            </Button>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOCX, TXT up to 10MB
            </p>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="study-progress" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary-muted">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">AI Analysis</h4>
              <p className="text-sm text-muted-foreground">Extract key concepts and insights</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-success-muted">
              <FileText className="w-8 h-8 text-success mx-auto mb-2" />
              <h4 className="font-semibold">Study Materials</h4>
              <p className="text-sm text-muted-foreground">Generate summaries and notes</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-warning-muted">
              <CheckCircle2 className="w-8 h-8 text-warning mx-auto mb-2" />
              <h4 className="font-semibold">Assessments</h4>
              <p className="text-sm text-muted-foreground">Create quizzes and tests</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Queue */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>Processing Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{file.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {file.status === 'completed' ? (
                      <>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-success" />
                          Completed
                        </span>
                        <span>{file.insights} insights</span>
                        <span>{file.questions} questions generated</span>
                      </>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-warning" />
                        Processing...
                      </span>
                    )}
                  </div>
                </div>
                {file.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    View Results
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};