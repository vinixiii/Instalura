import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { loginService } from '../../../services/login/loginService';

import { Button } from '../../common/Button';
import TextField from '../../forms/TextField';

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('O campo "Usuário" é obrigatório!')
    .min(3, 'Preencha ao menos 3 caracteres'),
  password: yup
    .string()
    .required('O campo "Senha" é obrigatório!')
    .min(8, 'Sua senha deve conter ao menos 8 caracteres'),
});

export function LoginForm({ onSubmit }) {
  const router = useRouter();

  const initialValues = {
    username: '',
    password: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsFormDisabled(true);
      loginService
        .login({
          username: values.username,
          password: values.password,
        })
        .then(() => router.push('/app/profile'))
        .catch((error) => {
          console.error(error);
          form.setIsFormDisabled(false);
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        // Traz todos os erros em um array
        abortEarly: false,
      });
    },
  });

  return (
    <form id="loginForm" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="username"
        value={form.values.username}
        onChange={form.handleChange}
        error={form.errors.username}
        onBlur={form.handleBlur}
        isTouched={form.touchedFields.username}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        onBlur={form.handleBlur}
        isTouched={form.touchedFields.password}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
    </form>
  );
}

LoginForm.defaultProps = {
  onSubmit: () => {},
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
