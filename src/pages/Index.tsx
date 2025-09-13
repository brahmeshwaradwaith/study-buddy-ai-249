import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { StudyMaterials } from '@/components/StudyMaterials';
import { ProgressAnalytics } from '@/components/ProgressAnalytics';
import { AssessmentGenerator } from '@/components/AssessmentGenerator';
import { AIRecommendations } from '@/components/AIRecommendations';
import { DocumentProcessor } from '@/components/DocumentProcessor';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'materials':
        return <StudyMaterials />;
      case 'upload':
        return <DocumentProcessor />;
      case 'assessments':
        return <AssessmentGenerator />;
      case 'analytics':
        return <ProgressAnalytics />;
      case 'recommendations':
        return <AIRecommendations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Index;