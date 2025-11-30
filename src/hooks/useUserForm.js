import { useState, useMemo } from 'react';
import { VALIDATION_RULES } from '../constants/validation';
import { validateName, validateJob } from '../utils/validators';

export const useUserForm = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [name_error, setNameError] = useState('');
  const [job_error, setJobError] = useState('');

  const updateName = (value) => {
    setName(value);
    if (name_error) {
      setNameError('');
    }
  };

  const updateJob = (value) => {
    setJob(value);
    if (job_error) {
      setJobError('');
    }
  };

  const setError = (field, error) => {
    if (field === 'name') {
      setNameError(error);
    } else if (field === 'job') {
      setJobError(error);
    }
  };

  const reset = () => {
    setName('');
    setJob('');
    setNameError('');
    setJobError('');
  };

  const validateField = (field, value) => {
    if (field === 'name') {
      const error = validateName(value);
      if (error) {
        setError('name', error);
      }
      return !error;
    } else if (field === 'job') {
      const error = validateJob(value);
      if (error) {
        setError('job', error);
      }
      return !error;
    }
    return true;
  };

  const isValid = useMemo(() => {
    const nameValid = name.trim().length >= VALIDATION_RULES.NAME_MIN_LENGTH;
    const jobValid = job.trim().length >= VALIDATION_RULES.JOB_MIN_LENGTH;
    return nameValid && jobValid && !name_error && !job_error;
  }, [name, job, name_error, job_error]);

  return {
    form: {
      name,
      job,
      name_error,
      job_error,
    },
    updateName,
    updateJob,
    setError,
    reset,
    validateField,
    isValid,
  };
};

