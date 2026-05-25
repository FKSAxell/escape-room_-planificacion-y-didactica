export type ChallengeStatus = 'idle' | 'success' | 'error';

export interface FeedbackState {
  status: ChallengeStatus;
  message: string;
}

export interface ChallengeProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}
