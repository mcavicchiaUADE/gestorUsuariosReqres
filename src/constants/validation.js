export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  JOB_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  JOB_MAX_LENGTH: 50,
};

export const VALIDATION_MESSAGES = {
  NAME_TOO_SHORT: 'El nombre debe tener al menos 2 caracteres',
  JOB_TOO_SHORT: 'El puesto debe tener al menos 2 caracteres',
  NAME_REQUIRED: 'El nombre es obligatorio',
  JOB_REQUIRED: 'El puesto es obligatorio',
  FIELDS_INCOMPLETE: 'Por favor completa todos los campos obligatorios antes de crear el usuario.',
  VALIDATION_FAILED: 'El nombre y el puesto deben tener al menos 2 caracteres cada uno.',
};

