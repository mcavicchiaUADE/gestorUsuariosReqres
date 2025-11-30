import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/users/usersSlice';
import { selectIsCreatingUser } from '../../features/users/usersSelectors';
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../constants/validation';
import { useUserForm } from '../../hooks/useUserForm';
import { validateName, validateJob } from '../../utils/validators';

const UserForm = ({ isExpanded, onToggle, onSuccess }) => {
  const dispatch = useDispatch();
  const is_creating_user = useSelector(selectIsCreatingUser);
  const { form, updateName, updateJob, setError, reset, isValid } = useUserForm();

  const handleCreateUser = () => {
    const nameValidation = validateName(form.name);
    const jobValidation = validateJob(form.job);

    if (nameValidation || jobValidation) {
      if (nameValidation) setError('name', nameValidation);
      if (jobValidation) setError('job', jobValidation);
      Alert.alert(
        'Campos incompletos',
        VALIDATION_MESSAGES.FIELDS_INCOMPLETE,
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    if (!isValid) {
      Alert.alert(
        'Validación fallida',
        VALIDATION_MESSAGES.VALIDATION_FAILED,
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    const new_user = {
      name: form.name.trim(),
      job: form.job.trim(),
    };

    dispatch(createUser(new_user));
    reset();
    onToggle();
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClean = () => {
    Alert.alert(
      'Limpiar formulario',
      '¿Estás seguro de que deseas limpiar el formulario? Se perderán los datos ingresados.',
      [
        { text: 'Continuar editando', style: 'cancel' },
        {
          text: 'Limpiar',
          style: 'destructive',
          onPress: () => {
            reset();
          },
        },
      ]
    );
  };

  if (!isExpanded) return null;

  return (
    <View style={styles.form_overlay}>
      <TouchableOpacity
        style={styles.form_overlay_backdrop}
        activeOpacity={1}
        onPress={onToggle}
      />
      <View style={styles.form}>
        <View style={styles.form_header_container}>
          <Text style={styles.form_title}>Nuevo usuario</Text>
          {(form.name || form.job) && (
            <TouchableOpacity onPress={handleClean} style={styles.cancel_button}>
              <Text style={styles.cancel_button_text}>Limpiar</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.form_content}>
          <View>
            <Text style={styles.label}>
              Nombre <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                form.name_error ? styles.input_error : null,
                form.name.trim().length >= VALIDATION_RULES.NAME_MIN_LENGTH && !form.name_error
                  ? styles.input_success
                  : null,
              ]}
              placeholder="Escribe el nombre del usuario"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={updateName}
              maxLength={VALIDATION_RULES.NAME_MAX_LENGTH}
            />
            {form.name_error ? (
              <Text style={styles.error_hint}>{form.name_error}</Text>
            ) : form.name.trim().length > 0 && form.name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH ? (
              <Text style={styles.warning_hint}>
                Mínimo {VALIDATION_RULES.NAME_MIN_LENGTH} caracteres ({form.name.trim().length}/{VALIDATION_RULES.NAME_MIN_LENGTH})
              </Text>
            ) : null}
          </View>

          <View style={styles.job_container}>
            <Text style={styles.label}>
              Puesto (Job) <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                form.job_error ? styles.input_error : null,
                form.job.trim().length >= VALIDATION_RULES.JOB_MIN_LENGTH && !form.job_error
                  ? styles.input_success
                  : null,
              ]}
              placeholder="Escribe el puesto del usuario"
              placeholderTextColor="#999"
              value={form.job}
              onChangeText={updateJob}
              maxLength={VALIDATION_RULES.JOB_MAX_LENGTH}
            />
            {form.job_error ? (
              <Text style={styles.error_hint}>{form.job_error}</Text>
            ) : form.job.trim().length > 0 && form.job.trim().length < VALIDATION_RULES.JOB_MIN_LENGTH ? (
              <Text style={styles.warning_hint}>
                Mínimo {VALIDATION_RULES.JOB_MIN_LENGTH} caracteres ({form.job.trim().length}/{VALIDATION_RULES.JOB_MIN_LENGTH})
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.button, !isValid && styles.button_disabled]}
            onPress={handleCreateUser}
            disabled={!isValid || is_creating_user}
            activeOpacity={0.8}
          >
            {is_creating_user ? (
              <View style={styles.button_content}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={[styles.button_text, { marginLeft: 8 }]}>Creando...</Text>
              </View>
            ) : (
              <Text style={styles.button_text}>Crear usuario</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form_overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 300,
    zIndex: 999,
  },
  form_overlay_backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  form: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  form_header_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
    backgroundColor: '#FFE0B2',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCC80',
  },
  form_content: {
    padding: 16,
    maxHeight: '70%',
  },
  form_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  cancel_button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cancel_button_text: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#D32F2F',
  },
  input: {
    borderWidth: 2,
    borderColor: '#FFCC80',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  input_error: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFEBEE',
  },
  input_success: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8F4',
  },
  job_container: {
    marginTop: 12,
  },
  error_hint: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  warning_hint: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  button_disabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  button_content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button_text: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default UserForm;

