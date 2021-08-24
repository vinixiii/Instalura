/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Button } from '../../common/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';

function FormContent() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
  });
  const isValidForm =
    userInfo.email.length === 0 || userInfo.username.length === 0;

  function handleChangeFieldValue(event) {
    const fieldName = event.target.getAttribute('name');

    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Text variant="title" tag="h1" color="tertiary.main">
        Pronto para saber da vida dos outros?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está rolando no bairro, complete
        seu cadastro agora!
      </Text>
      <div>
        <TextField
          placeholder="E-mail"
          name="email"
          value={userInfo.email}
          onChange={handleChangeFieldValue}
        />
      </div>
      <div>
        <TextField
          placeholder="Username"
          name="username"
          value={userInfo.username}
          onChange={handleChangeFieldValue}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isValidForm}
        fullWidth
      >
        Cadastrar
      </Button>
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function RegisterForm({ propsDoModal }) {
  return (
    <Grid.Row
      marginLeft="0px"
      marginRight="0px"
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 6, lg: 8 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}
