import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from '../../../infra/hooks/forms/useForm';
import { loginService } from '../../../services/login/loginService';

import { Button } from '../../common/Button';
import TextField from '../../forms/TextField';

export function LoginForm() {
  const router = useRouter();

  const initialValues = {
    username: '',
    password: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      loginService
        .login({
          username: values.username,
          password: values.password,
        })
        .then(() => router.push('/app/profile'));
    },
  });

  return (
    <form id="loginForm" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="username"
        value={form.values.username}
        onChange={form.handleChange}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
      >
        Entrar
      </Button>
    </form>
  );
}
