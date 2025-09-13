import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Star, Clock, Filter } from 'lucide-react';

export const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const materials = [
    {
      id: 1,
      title: 'Advanced Calculus - Derivatives',
      category: 'Mathematics',
      lastStudied: '2 days ago',
      progress: 85,
      difficulty: 'Advanced',
      keyPoints: ['Chain Rule', 'Product Rule', 'Implicit Differentiation'],
      summary: 'Comprehensive guide to derivative calculations and applications in real-world problems.',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Wave Motion & Oscillations',
      category: 'Physics',
      lastStudied: '1 day ago',
      progress: 92,
      difficulty: 'Intermediate',
      keyPoints: ['Simple Harmonic Motion', 'Wave Equations', 'Resonance'],
      summary: 'Understanding wave propagation, oscillatory motion, and resonance phenomena.',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Organic Chemistry Mechanisms',
      category: 'Chemistry',
      lastStudied: '3 days ago',
      progress: 67,
      difficulty: 'Advanced',
      keyPoints: ['Reaction Mechanisms', 'Stereochemistry', 'Synthesis'],
      summary: 'Detailed analysis of organic reaction mechanisms and synthetic pathways.',
      rating: 4.7
    }
  ];

  const categories = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.keyPoints.some(point => point.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success text-success-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Study Materials</h2>
          <p className="text-muted-foreground">AI-processed documents and study resources</p>
        </div>
        <Button className="gradient-primary text-white">
          <BookOpen className="w-4 h-4 mr-2" />
          Study Session
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="study-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials, topics, or concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMaterials.map(material => (
          <Card key={material.id} className="study-card-elevated hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{material.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{material.category}</Badge>
                    <Badge className={getDifficultyColor(material.difficulty)}>
                      {material.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-warning">
                      <Star className="w-3 h-3 fill-current" />
                      {material.rating}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{material.summary}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="text-muted-foreground">{material.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full study-progress" 
                    style={{ width: `${material.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Points</h4>
                <div className="flex flex-wrap gap-1">
                  {material.keyPoints.map((point, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {point}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {material.lastStudied}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Review</Button>
                  <Button size="sm">Continue</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="study-card">
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No materials found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or upload new documents to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};