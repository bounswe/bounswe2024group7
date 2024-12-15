import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// SVG Icons as components
const CalendarIcon = () => (
  <svg className="w-4 h-4 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DumbbellIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4" />
  </svg>
);

const ProgramModal = ({ 
  isOpen, 
  onClose, 
  program, 
  isUserJoined, 
  user, 
  handleStartPracticing, 
  joinProgram, 
  toast 
}) => {
  const getProgramTypeColor = (type) => {
    const typeColors = {
      CARDIO: 'text-red-500 bg-red-100',
      BODY_BUILDING: 'text-purple-500 bg-purple-100',
      FLEXIBILITY: 'text-blue-500 bg-blue-100',
      BALANCE: 'text-green-500 bg-green-100'
    };
    return typeColors[type] || 'text-gray-500 bg-gray-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{program.title}</DialogTitle>
          <p className="text-gray-600">{program.description}</p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-200px)]">
          <div className="space-y-6 p-6">
            {/* Program Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center space-x-2">
                  <CalendarIcon />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">{formatDate(program.createdAt)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center space-x-2">
                  <ClockIcon />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{program.interval} weeks</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center space-x-2">
                  <StarIcon />
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="font-medium">{program.rating}/5 ({program.ratingCount})</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center space-x-2">
                  <UserIcon />
                  <div>
                    <p className="text-sm text-gray-500">Created by</p>
                    <p className="font-medium">{program.trainerUsername}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Program Type Badges */}
            <div className="flex gap-2">
              <Badge variant="secondary" className={getProgramTypeColor(program.type)}>
                {program.type.replace('_', ' ')}
              </Badge>
              <Badge variant="secondary" className="bg-teal-100 text-teal-500">
                {program.level}
              </Badge>
            </div>

            <Separator />

            {/* Workout Schedule */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DumbbellIcon />
                Program Schedule
              </h3>
              
              <div className="space-y-6">
                {program.weeks?.map((week) => (
                  <div key={week.id} className="space-y-4">
                    <h4 className="text-lg font-semibold">Week {week.weekNumber}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {week.workouts?.map((workout) => (
                        <Card key={workout.id}>
                          <CardContent className="p-4">
                            <h5 className="font-semibold mb-2">{workout.name}</h5>
                            <div className="space-y-2">
                              {workout.workoutExercises?.map((exercise) => (
                                <div key={exercise.id} className="flex justify-between items-center text-sm">
                                  <span>{exercise.exercise.name}</span>
                                  <Badge variant="outline">
                                    {exercise.sets} × {exercise.repetitions}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 border-t bg-gray-50 mt-4">
          {isUserJoined && user && program.trainerUsername !== user.username ? (
            <Button 
              className="w-full"
              onClick={() => {
                onClose();
                handleStartPracticing(program.id);
              }}
            >
              Start Program
            </Button>
          ) : (
            <Button
              className="w-full"
              variant={user && program.trainerUsername === user.username ? "secondary" : "default"}
              onClick={(e) => {
                if (user) {
                  if (!isUserJoined) {
                    joinProgram(program.id);
                  }
                } else {
                  toast({
                    title: 'You need to login to join a program',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                }
                onClose();
              }}
              disabled={user && program.trainerUsername === user.username}
            >
              {user && program.trainerUsername === user.username ? 
                'You are the trainer' : 'Join Program'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramModal;