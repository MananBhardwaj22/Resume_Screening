import { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { ResumeUploader } from './components/ResumeUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { About } from './components/About';
import { classifyResume } from './services/classifier';
import { ResumeResult } from './types';

function App() {
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async (text: string) => {
    setLoading(true);
    try {
      // Simulate a short delay to mimic processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      const classificationResult = classifyResume(text);
      setResult(classificationResult);
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Hero />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ResumeUploader onClassify={handleClassify} isProcessing={loading} />
        {result && <ResultsDisplay result={result} />}
        <About />
      </div>
    </Layout>
  );
}

export default App;