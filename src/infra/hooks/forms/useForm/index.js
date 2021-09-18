import { useState } from 'react';

export function useForm({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues);

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
  };
}
