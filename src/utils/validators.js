import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../constants/validation';

export const validateName = (name) => {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return VALIDATION_MESSAGES.NAME_REQUIRED;
  }
  if (trimmed.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return VALIDATION_MESSAGES.NAME_TOO_SHORT;
  }
  return null;
};

export const validateJob = (job) => {
  const trimmed = job.trim();
  if (trimmed.length === 0) {
    return VALIDATION_MESSAGES.JOB_REQUIRED;
  }
  if (trimmed.length < VALIDATION_RULES.JOB_MIN_LENGTH) {
    return VALIDATION_MESSAGES.JOB_TOO_SHORT;
  }
  return null;
};

