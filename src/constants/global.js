export const DATE_FORMAT = 'MMMM D, YYYY';
export const DEFAULT_PAGINATION_OPTIONS = [5, 10, 20, 30];
export const NOT_ELIGIBLE = 'NA';
export const PAYMENT_MERCHENT_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';
export const SCORE_CARD = {
  [NOT_ELIGIBLE]: { color: '#f5f5f5', label: 'Not Applicable' },
  0: { color: '#ffdada', label: 'No Experience' },
  25: { color: '#f9d7bf', label: 'Basic Experience' },
  50: { color: '#f6f8b5', label: 'Able to explain concepts theoretically' },
  75: { color: '#e1f8b5', label: 'Confident hands-on developer' },
  100: { color: '#c9f2c3', label: 'Able to code with guidence' },
};

export const STATUS = {
  NOT_STARTED: {
    color: '#ededed',
    options: [
      { label: 'Start Interview', id: 'Start' },
      { label: 'Cancel Interview', id: 'Cancel' },
    ],
  },
  IN_PROGRESS: {
    color: '#e6e600',
    options: [
      { label: 'End Interview', id: 'End' },
      { label: 'Cancel Interview', id: 'Cancel' },
      { label: 'Submit Feedback', id: 'Feedback' },
    ],
  },
  FEEDBACK_PENDING: { color: '#cdcd00', options: [{ label: 'Submit Feedback', id: 'Feedback' }] },
  FEEDBACK_SUBMITTTED: { color: '#818100', options: [] },
  CANCELED: { color: '#ff0101', options: [] },
  DONE: { color: '#00b300', options: [] },
  REJECTED: { color: '#ff0101', options: [] },
  ACCEPTED: { color: '#006700', options: [] },
  NEXT_ROUND: {
    color: '#006700',
    options: [
      { label: 'Create Next Round', id: 'NextRound' },
      { label: 'Accept Candidate', id: 'Accept' },
    ],
  },
};

export const CANDIDATE_APPLICATION_MENU = [
  { label: 'Consider for Interview', id: 'accept' },
  { label: 'Not Consider for Interview', id: 'reject' },
];
