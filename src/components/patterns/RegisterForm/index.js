/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { Lottie } from '@crello/react-lottie';
import { Button } from '../../common/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import errorAnimation from '../animations/error.json';
import successAnimation from '../animations/success.json';
import loadingAnimation from '../animations/loading.json';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

function FormContent() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
  });

  const isValidForm =
    userInfo.name.length === 0 || userInfo.username.length === 0;

  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(formStates.DEFAULT);

  function handleChangeFieldValue(event) {
    const fieldName = event.target.getAttribute('name');

    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsFormSubmited(true);
    setSubmissionStatus(formStates.LOADING);

    const userDTO = {
      name: userInfo.name,
      username: userInfo.username,
    };

    fetch('https://instalura-api.vercel.app/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDTO),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Não foi possível cadastrar o usuário');
      })
      .then((convertedResponse) => {
        setSubmissionStatus(formStates.DONE);
        console.log(convertedResponse);
      })
      .catch((error) => {
        setSubmissionStatus(formStates.ERROR);
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
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
          placeholder="Nome"
          name="name"
          value={userInfo.name}
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

      {isFormSubmited && submissionStatus === formStates.LOADING && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Lottie
            width="150px"
            height="150px"
            className="lottie-container basic"
            config={{
              animationData: loadingAnimation,
              loop: true,
              autoplay: true,
            }}
          />
        </Box>
        // https://lottiefiles.com/66650-loading-circle
      )}

      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Lottie
            width="150px"
            height="150px"
            className="lottie-container basic"
            config={{
              animationData: successAnimation,
              loop: false,
              autoplay: true,
            }}
          />
          <Text variant="paragraph2" tag="p" color="tertiary.light">
            Usuário cadastrado com sucesso :)
          </Text>
        </Box>
        // https://lottiefiles.com/50465-done
      )}

      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Lottie
            width="100px"
            height="100px"
            className="lottie-container basic"
            config={{
              animationData: errorAnimation,
              loop: false,
              autoplay: true,
            }}
          />
          <Text
            variant="paragraph2"
            tag="p"
            color="tertiary.light"
            marginBottom="32px"
          >
            Não foi possível cadastrar o usuário :(
          </Text>
        </Box>
        // https://lottiefiles.com/14331-error
      )}
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
