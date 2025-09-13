import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Clock, Award, BarChart3, Brain } from 'lucide-react';

export const ProgressAnalytics = () => {
  const analyticsData = {
    studyStreak: 12,
    totalHours: 156,
    averageScore: 87,
    improvement: 15,
    subjects: [
      { name: 'Mathematics', hours: 45, score: 92, progress: 85, trend: 'up' },
      { name: 'Physics', hours: 38, score: 88, progress: 78, trend: 'up' },
      { name: 'Chemistry', hours: 32, score: 84, progress: 70, trend: 'down' },
      { name: 'Biology', hours: 28, score: 89, progress: 65, trend: 'up' }
    ],
    weeklyProgress: [
      { day: 'Mon', hours: 3.5, score: 85 },
      { day: 'Tue', hours: 4.2, score: 88 },
      { day: 'Wed', hours: 2.8, score: 82 },
      { day: 'Thu', hours: 3.9, score: 91 },
      { day: 'Fri', hours: 4.5, score: 89 },
      { day: 'Sat', hours: 5.1, score: 94 },
      { day: 'Sun', hours: 3.2, score: 87 }
    ],
    strengths: ['Problem Solving', 'Analytical Thinking', 'Mathematical Concepts'],
    improvements: ['Time Management', 'Chemistry Reactions', 'Physics Applications']
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingUp className="w-4 h-4 text-destructive rotate-180" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Progress Analytics</h2>
          <p className="text-muted-foreground">Track your learning journey and performance insights</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
            <Award className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{analyticsData.studyStreak}</div>
            <p className="text-xs text-muted-foreground">Days consecutive</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analyticsData.totalHours}h</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <Target className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{analyticsData.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Improvement</CardTitle>
            <TrendingUp className="w-4 h-4 text-secondary-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary-accent">+{analyticsData.improvement}%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="study-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analyticsData.subjects.map((subject, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{subject.name}</h4>
                    {getTrendIcon(subject.trend)}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{subject.hours}h studied</span>
                    <Badge variant="secondary">{subject.score}% avg</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="study-progress" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Chart */}
      <Card className="study-card-elevated">
        <CardHeader>
          <CardTitle>Weekly Study Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple bar chart representation */}
            <div className="flex items-end justify-between h-32 gap-2">
              {analyticsData.weeklyProgress.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div className="text-xs text-muted-foreground">{day.score}%</div>
                  <div 
                    className="w-full bg-primary rounded-t-sm min-h-4 flex items-end justify-center"
                    style={{ height: `${(day.hours / 6) * 100}%` }}
                  >
                  </div>
                  <div className="text-xs font-medium">{day.day}</div>
                  <div className="text-xs text-muted-foreground">{day.hours}h</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="study-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Brain className="w-5 h-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analyticsData.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-success-muted">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="study-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Target className="w-5 h-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analyticsData.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded bg-warning-muted">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span className="text-sm font-medium">{improvement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};