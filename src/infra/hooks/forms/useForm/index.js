/* eslint-disable comma-dangle */
import { useEffect, useState } from 'react';

export function useForm({ initialValues, onSubmit, validateSchema }) {
  const [values, setValues] = useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    validateSchema(values)
      .then(() => {
        setIsFormDisabled(false);
        setErrors({});
      })
      .catch((err) => {
        const formatedErrors = err.inner.reduce(
          (errorObjectAcc, currentError) => {
            const fieldName = currentError.path;
            const errorMessage = currentError.message;
            return {
              ...errorObjectAcc,
              [fieldName]: errorMessage,
            };
          },
          {}
        );
        setErrors(formatedErrors);
        setIsFormDisabled(true);
      });
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
