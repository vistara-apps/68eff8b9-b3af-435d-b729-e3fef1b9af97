'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Square, Play, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recordingData: { duration: number; summary: string }) => void;
}

export function RecordingModal({ isOpen, onClose, onSave }: RecordingModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        // Handle recording data
        console.log('Recording data available:', event.data);
      };
      
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setDuration(0);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
    setIsPaused(false);
    
    // Generate summary and save
    const summary = `Audio recording of police interaction. Duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;
    onSave({ duration, summary });
    
    // Reset state
    setDuration(0);
    setMediaRecorder(null);
  };

  const togglePause = () => {
    if (mediaRecorder) {
      if (isPaused) {
        mediaRecorder.resume();
      } else {
        mediaRecorder.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Record Interaction</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Recording Status */}
        <div className="text-center mb-8">
          <div className={cn(
            'w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center',
            isRecording 
              ? 'bg-red-500 bg-opacity-20 animate-pulse' 
              : 'bg-gray-500 bg-opacity-20'
          )}>
            {isRecording ? (
              <Mic className="w-10 h-10 text-red-400" />
            ) : (
              <MicOff className="w-10 h-10 text-gray-400" />
            )}
          </div>
          
          <div className="text-3xl font-mono text-white mb-2">
            {formatTime(duration)}
          </div>
          
          <div className="text-sm text-gray-300">
            {isRecording 
              ? (isPaused ? 'Recording Paused' : 'Recording Active')
              : 'Ready to Record'
            }
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg text-red-400 hover:bg-opacity-30 transition-colors duration-200"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </button>
          ) : (
            <>
              <button
                onClick={togglePause}
                className="flex items-center gap-2 px-4 py-3 glass-button"
              >
                {isPaused ? (
                  <>
                    <Play className="w-5 h-5" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                )}
              </button>
              
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-4 py-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg text-red-400 hover:bg-opacity-30 transition-colors duration-200"
              >
                <Square className="w-5 h-5" />
                Stop & Save
              </button>
            </>
          )}
        </div>

        {/* Legal Notice */}
        <div className="mt-6 p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-20 rounded-lg">
          <p className="text-sm text-yellow-200">
            <strong>Legal Notice:</strong> Recording laws vary by state. Ensure you comply with local laws regarding recording police interactions.
          </p>
        </div>
      </div>
    </div>
  );
}
