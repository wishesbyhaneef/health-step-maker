import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { healthKitService } from '@/components/HealthKitService';

const StepCounter = () => {
  const [steps, setSteps] = useState('10000');
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format for datetime-local input
  });
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Request HealthKit permissions on component mount
    const requestPermissions = async () => {
      const granted = await healthKitService.requestPermissions();
      setIsPermissionGranted(granted);
      
      if (!granted) {
        toast({
          title: "Permissions Required",
          description: "Please enable HealthKit permissions in Settings to add steps to Health app.",
        });
      }
    };

    requestPermissions();
  }, [toast]);

  const formatSteps = (value: string) => {
    const num = parseInt(value) || 0;
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}t`;
    }
    return num.toString();
  };

  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSteps(value);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const addSteps = async () => {
    const stepCount = parseInt(steps) || 0;
    
    if (stepCount === 0) {
      toast({
        title: "Invalid Steps",
        description: "Please enter a valid number of steps.",
        variant: "destructive",
      });
      return;
    }

    try {
      const stepData = {
        steps: stepCount,
        date: new Date(date)
      };

      const success = await healthKitService.addSteps(stepData);
      
      if (success) {
        toast({
          title: "Steps Added!",
          description: `Added ${stepCount.toLocaleString()} steps to Health App`,
        });
      } else {
        throw new Error('Failed to add steps');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add steps to Health App",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="ios-card w-full max-w-sm p-6 space-y-6">
        {/* Steps Display */}
        <div className="text-center">
          <div className="text-4xl font-light text-foreground mb-2">
            {formatSteps(steps)}
          </div>
        </div>

        {/* Steps Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Steps</label>
          <Input
            type="text"
            value={steps}
            onChange={handleStepsChange}
            placeholder="Enter steps"
            className="ios-input text-lg text-center"
          />
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Start Date</label>
          <div className="ios-card p-3">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-foreground text-right focus:outline-none"
            />
          </div>
        </div>

        {/* Add Steps Button */}
        <Button 
          onClick={addSteps}
          className="ios-button w-full text-lg"
        >
          ADD STEPS
        </Button>
      </Card>
    </div>
  );
};

export default StepCounter;