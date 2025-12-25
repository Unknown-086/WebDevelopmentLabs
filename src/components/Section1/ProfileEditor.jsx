import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User } from 'lucide-react';

export const ProfileEditor = () => {
  // Using useState with an object to hold profile data
  const [profile, setProfile] = useState({
    name: '',
    age: '',
  });

  // Update individual properties using spread operator
  const handleNameChange = (e) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleAgeChange = (e) => {
    setProfile({ ...profile, age: e.target.value });
  };

  const handleReset = () => {
    setProfile({ name: '', age: '' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card variant="gradient">
        <CardHeader>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-primary/20 rounded-full"
            >
              <User className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle>Profile Editor</CardTitle>
              <CardDescription>
                Section 1: Managing Objects in State
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Fields */}
          <div className="space-y-4">
            <Input
              label="Name"
              type="text"
              value={profile.name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />

            <Input
              label="Age"
              type="number"
              value={profile.age}
              onChange={handleAgeChange}
              placeholder="Enter your age"
            />
          </div>

          {/* Display Current Profile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-lg bg-secondary/50 border border-primary/20"
          >
            <h3 className="font-semibold text-lg mb-3 gradient-text">Current Profile</h3>
            <div className="space-y-2">
              <motion.p
                key={profile.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-foreground"
              >
                <span className="font-medium">Name:</span>{' '}
                <span className="text-primary">{profile.name || 'Not set'}</span>
              </motion.p>
              <motion.p
                key={profile.age}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-foreground"
              >
                <span className="font-medium">Age:</span>{' '}
                <span className="text-primary">{profile.age || 'Not set'}</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Action Button */}
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset Profile
          </Button>

          {/* Learning Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-lg bg-muted/50 text-sm"
          >
            <p className="font-semibold mb-2 text-primary">💡 Key Concept:</p>
            <p className="text-muted-foreground">
              We use the spread operator (<code className="px-2 py-1 bg-primary/20 rounded">...</code>) 
              to update state objects. This creates a new object with all existing properties, 
              then overwrites the specific property we want to change.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};
