import React, { useEffect, useState } from 'react';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { motion } from 'motion/react';

type Step = {
  id: string;
  name: string;
};

type StepperProgressProps = {
  steps: Step[];
  currentStepIndex: number; // 0 to steps.length
};

export default function StepperProgress({ steps, currentStepIndex }: StepperProgressProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const interval = setInterval(() => setElapsed(e => e + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [currentStepIndex, steps.length]);

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 w-full">
              <div className={`w-full absolute top-1/2 -z-10 left-1/2 h-1 transform -translate-y-1/2 ${
                index === steps.length - 1 ? 'hidden' : isCompleted ? 'bg-success-text' : 'bg-gray-200'
              }`} />
              
              <motion.div 
                initial={false}
                animate={{ scale: isActive ? 1.2 : 1 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-4 bg-white ${
                  isCompleted ? 'border-success-text text-success-text' : 
                  isActive ? 'border-primary text-primary' : 'border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <CircleDashed className="w-5 h-5" />
                )}
              </motion.div>
              <div className="mt-4 text-center">
                <p className={`text-sm font-semibold ${isCompleted || isActive ? 'text-dark' : 'text-muted'}`}>{step.name}</p>
                {isActive && <p className="text-xs text-primary font-mono">{elapsed}s</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
