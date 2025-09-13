import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Target, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
  const studyStats = {
    totalHours: 24,
    documentsProcessed: 12,
    assessmentsCompleted: 8,
    averageScore: 85,
    streak: 7,
    todayGoal: 75
  };

  const recentActivity = [
    { type: 'document', title: 'Advanced Mathematics Chapter 5', time: '2 hours ago' },
    { type: 'assessment', title: 'Physics Quiz - Wave Motion', score: 92, time: '4 hours ago' },
    { type: 'study', title: 'Chemistry Study Session', duration: '45 min', time: '1 day ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="study-card-elevated gradient-hero text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back to StudySync!</h2>
            <p className="text-white/90 text-lg">Continue your learning journey with AI-powered insights</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{studyStats.streak}</div>
            <div className="text-white/90">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Hours</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studyStats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documents</CardTitle>
            <BookOpen className="w-4 h-4 text-secondary-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-accent">{studyStats.documentsProcessed}</div>
            <p className="text-xs text-muted-foreground">Processed</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assessments</CardTitle>
            <Target className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{studyStats.assessmentsCompleted}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <TrendingUp className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{studyStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Today's Study Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{studyStats.todayGoal}% Complete</span>
          </div>
          <Progress value={studyStats.todayGoal} className="study-progress" />
          <div className="flex gap-3">
            <Button variant="default" className="flex-1">Continue Studying</Button>
            <Button variant="outline" className="flex-1">Take Assessment</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                    {activity.score && <span className="ml-2 text-success font-medium">Score: {activity.score}%</span>}
                    {activity.duration && <span className="ml-2 text-primary font-medium">{activity.duration}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};