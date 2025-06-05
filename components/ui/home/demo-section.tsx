import { PizzaIcon } from "lucide-react";
import { MotionDiv, MotionH3, MotionSection } from "../common/motion-wrapper";
import SummaryViewer from "@/components/summaries/summary-viewer";

export default function DemoSection() {
  // Format the summary in the markdown-like format expected by the SummaryViewer
  const demo_summary = `# Introduction to Machine Learning
Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. The chapter covers supervised, unsupervised, and reinforcement learning paradigms. ML algorithms allow computers to find patterns in data without explicit programming. This field has grown exponentially in the last decade due to increased computing power and data availability.

- Data-driven approach to problem solving
- Pattern recognition across large datasets
- Statistical models with predictive capabilities
- Automated feature extraction techniques
- Training and validation methodology

# Core Machine Learning Paradigms
There are three primary approaches to machine learning: supervised learning where models learn from labeled data, unsupervised learning where algorithms find patterns in unlabeled data, and reinforcement learning where agents learn through interaction with an environment.

- Supervised learning (classification, regression)
- Unsupervised learning (clustering, dimensionality reduction)
- Reinforcement learning (policy optimization, reward systems)
- Semi-supervised techniques
- Transfer learning methodologies

# Applications in Industry
Real-world applications of machine learning include image recognition, natural language processing, recommendation systems, and autonomous vehicles. These technologies are transforming industries from healthcare to finance, transportation, and entertainment, creating new possibilities for automation and insight.

- Computer vision for medical diagnostics
- NLP for customer service automation
- Predictive analytics for business intelligence
- Fraud detection in financial transactions
- Supply chain optimization
- Personalized content recommendations

# Technical Implementation
The implementation of machine learning systems requires understanding of algorithms, data preprocessing, feature engineering, and model evaluation. Engineers must balance model complexity with computational efficiency and interpret results within domain contexts.

- Data collection and cleaning protocols
- Feature selection and engineering
- Model training and hyperparameter tuning
- Cross-validation techniques
- Production deployment strategies
- Model monitoring and maintenance

# Future Directions
Emerging trends in the field include federated learning for privacy preservation, explainable AI for transparency, and quantum machine learning algorithms for computational advantage. The ethical implications of AI continue to be an important area of research and policy development.

- Privacy-preserving ML techniques
- Interpretability and explainability
- Quantum computing applications
- Ethical AI development frameworks
- Edge computing for ML applications
- Multimodal learning approaches`;

  return (
    <MotionSection className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100/80 backdrop-blur-xl shadow-lg border-gray-400/30 mb-4">
            <PizzaIcon className="w-6 h-6 text-rose-500 animate-pulse" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Take a look how MindworksAI transform{" "}
              <span className="bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this course PDF
              </span>{" "}
              into an easy-to-read summary!
            </MotionH3>
          </div>
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            className="flex justify-center items-center px-2 sm:px-4 lg:px-6"
          >
            <SummaryViewer summary={demo_summary} />
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}
