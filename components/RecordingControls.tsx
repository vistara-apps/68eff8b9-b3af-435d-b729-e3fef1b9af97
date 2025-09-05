'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, Square, Play, Pause } from 'lucide-react';
import { ActionFAB } from './ActionFAB';

interface RecordingControlsProps {
  onRecordingStart: (type: 'audio' | 'video') => void;
  onRecordingStop: (recordingUrl: string) => void;
}

export function RecordingControls({
  onRecordingStart,
  onRecordingStop
}: RecordingControlsProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video' | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async (type: 'audio' | 'video') => {
    try {
      const constraints = type === 'video' 
        ? { video: true, audio: true }
        : { audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        });
        const url = URL.createObjectURL(blob);
        onRecordingStop(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingType(type);
      setRecordingTime(0);
      onRecordingStart(type);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access camera/microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsRecording(false);
      setRecordingType(null);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isRecording) {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-card px-6 py-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">
              Recording {recordingType} - {formatTime(recordingTime)}
            </span>
          </div>
          
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200"
          >
            <Square className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
      <ActionFAB
        variant="record"
        onClick={() => startRecording('audio')}
        icon={<Mic className="w-6 h-6" />}
        label="Start Audio Recording"
      />
      
      <ActionFAB
        variant="secondary"
        onClick={() => startRecording('video')}
        icon={<Video className="w-6 h-6" />}
        label="Start Video Recording"
      />
    </div>
  );
}
