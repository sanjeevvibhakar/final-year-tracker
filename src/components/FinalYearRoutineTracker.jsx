import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const FinalYearRoutineTracker = () => (
  <Tabs defaultValue="schedule">
    <TabsList>
      <TabsTrigger value="schedule">Schedule</TabsTrigger>
      <TabsTrigger value="routine">Routine</TabsTrigger>
    </TabsList>
    <TabsContent value="schedule">Schedule content here</TabsContent>
    <TabsContent value="routine">Routine content here</TabsContent>
  </Tabs>
);

export default FinalYearRoutineTracker;