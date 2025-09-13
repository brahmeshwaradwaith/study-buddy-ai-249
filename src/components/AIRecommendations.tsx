import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp, Clock, Target, BookOpen, Brain, Lightbulb, ArrowRight } from 'lucide-react';

export const AIRecommendations = () => {
  const recommendations = {
    priority: [
      {
        type: 'weakness',
        title: 'Focus on Chemistry Organic Mechanisms',
        description: 'Your recent assessment shows difficulty with reaction mechanisms. Recommended study time: 2-3 hours.',
        confidence: 92,
        urgency: 'high',
        resources: ['Organic Chemistry Chapter 8', 'Mechanism Practice Problems'],
        estimatedTime: '2-3 hours'
      },
      {
        type: 'strength',
        title: 'Advanced Mathematics Ready',
        description: 'Your calculus performance is excellent. Ready to tackle differential equations.',
        confidence: 88,
        urgency: 'medium',
        resources: ['Differential Equations Introduction', 'Advanced Calculus Applications'],
        estimatedTime: '1-2 hours'
      }
    ],
    studyPlan: {
      today: [
        { subject: 'Chemistry', topic: 'Organic Mechanisms', duration: 45, priority: 'high' },
        { subject: 'Physics', topic: 'Wave Equations Review', duration: 30, priority: 'medium' },
        { subject: 'Mathematics', topic: 'Practice Problems', duration: 25, priority: 'low' }
      ],
      thisWeek: [
        { day: 'Monday', focus: 'Chemistry Deep Dive', hours: 2.5 },
        { day: 'Tuesday', focus: 'Physics Problem Solving', hours: 2.0 },
        { day: 'Wednesday', focus: 'Mathematics Applications', hours: 2.0 },
        { day: 'Thursday', focus: 'Mixed Review Session', hours: 1.5 },
        { day: 'Friday', focus: 'Assessment Practice', hours: 2.0 }
      ]
    },
    insights: [
      {
        icon: TrendingUp,
        title: 'Performance Trend',
        description: 'Your scores have improved by 15% over the last month',
        type: 'positive'
      },
      {
        icon: Clock,
        title: 'Optimal Study Time',
        description: 'You perform best during 2-4 PM sessions',
        type: 'neutral'
      },
      {
        icon: Target,
        title: 'Goal Progress',
        description: '73% towards your monthly study target',
        type: 'progress'
      },
      {
        icon: Brain,
        title: 'Learning Style',
        description: 'Visual learning with practice problems works best for you',
        type: 'neutral'
      }
    ],
    personalizedContent: [
      {
        title: 'Custom Study Path: Organic Chemistry Mastery',
        description: 'A 3-week intensive program tailored to your learning pattern',
        progress: 35,
        modules: 8,
        timeToComplete: '3 weeks'
      },
      {
        title: 'Physics Problem-Solving Bootcamp',
        description: 'Advanced problem-solving techniques for complex physics scenarios',
        progress: 60,
        modules: 5,
        timeToComplete: '2 weeks'
      }
    ]
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'progress': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Study Insights</h2>
          <p className="text-muted-foreground">Personalized recommendations based on your learning patterns</p>
        </div>
        <Button variant="outline">
          <Sparkles className="w-4 h-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* Priority Recommendations */}
      <Card className="study-card-elevated gradient-primary text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5" />
            Priority Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.priority.map((rec, index) => (
            <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-2">{rec.title}</h4>
                  <p className="text-white/90 text-sm mb-3">{rec.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getUrgencyColor(rec.urgency)} text-xs`}>
                      {rec.urgency} priority
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/30 text-xs">
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-white/80">Recommended Resources:</div>
                <div className="flex flex-wrap gap-1">
                  {rec.resources.map((resource, idx) => (
                    <Badge key={idx} variant="outline" className="text-white border-white/30 text-xs">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 text-white border-white/30 hover:bg-white/20">
                Start Studying
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Today's Study Plan */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Today's Recommended Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.studyPlan.today.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.priority === 'high' ? 'bg-destructive' :
                    item.priority === 'medium' ? 'bg-warning' : 'bg-success'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold">{item.subject}</h4>
                    <p className="text-sm text-muted-foreground">{item.topic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{item.duration} min</span>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="study-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className={`w-4 h-4 ${getInsightColor(insight.type)}`} />
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Personalized Learning Paths */}
      <Card className="study-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary-accent" />
            Personalized Learning Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.personalizedContent.map((path, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{path.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{path.modules} modules</span>
                      <span>{path.timeToComplete}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="study-progress" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Study Plan */}
      <Card className="study-card">
        <CardHeader>
          <CardTitle>This Week's Focus Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.studyPlan.thisWeek.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    {day.day.slice(0, 3)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{day.focus}</h4>
                    <p className="text-sm text-muted-foreground">{day.hours} hours planned</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};