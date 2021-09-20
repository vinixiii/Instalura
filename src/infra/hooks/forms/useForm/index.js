/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';

function formatErrors(yupErrorsInner = []) {
  return yupErrorsInner.reduce((errorObjectAcc, currentError) => {
    const fieldName = currentError.path;
    const errorMessage = currentError.message;
    return {
      ...errorObjectAcc,
      [fieldName]: errorMessage,
    };
  }, {});
}

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setIsFormDisabled(false);
      setErrors({});
    } catch (err) {
      const formatedErrors = formatErrors(err.inner);
      setErrors(formatedErrors);
      setIsFormDisabled(true);
    }
  }

  useEffect(() => {
    validateValues(values);
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      // O que acontecerá quando clicamos no botão?
      event.preventDefault();
      onSubmit(values);
    },
    handleChange(event) {
      // O que acontecerá quando digitamos no input?
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      // console.log(fieldName, event.target.value);

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    // Validação do form
    isFormDisabled,
    setIsFormDisabled,
    errors,
    touchedFields,
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');

      setTouchedFields({
        ...touchedFields,
        [fieldName]: true, // usuario: true, senha: true ...
      });
    },
  };
}
