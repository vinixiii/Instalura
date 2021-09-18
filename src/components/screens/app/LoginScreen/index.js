// Essa página e desafio, e vamos dar pronto no próximo módulo o 04
import React from 'react';
import { Grid } from '../../../foundation/layout/Grid';
import { Box } from '../../../foundation/layout/Box';
import { Link } from '../../../common/Link';
import Text from '../../../foundation/Text';
import { Logo } from '../../../../theme/Logo';
import { WebsitePageWrapperContext } from '../../../wrappers/WebsitePage';
import { LoginForm } from '../../../patterns/LoginForm';

export function LoginScreen() {
  const websitePageContext = React.useContext(WebsitePageWrapperContext);

  return (
    <Grid.Container display="flex" flex="1" alignItems="center">
      <Grid.Row flex="1" alignItems="center" justifyContent="center">
        <Grid.Col
          display="flex"
          flexDirection="column"
          justifyContent="center"
          offset={{ lg: 2 }}
          value={{ xs: 12, md: 6, lg: 4 }}
          flex={1}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="37px"
            marginBottom="37px"
          >
            <Link href="/" color="secondary.main">
              <Logo size="large" />
            </Link>
          </Box>
          <LoginForm />
          <Text
            variant="paragraph1"
            tag="p"
            color="tertiary.light"
            textAlign="center"
          >
            {'Não tem uma conta? '}
            <Link
              href="/"
              color="secondary.main"
              onClick={(event) => {
                event.preventDefault();
                websitePageContext.toggleRegisterModal();
              }}
            >
              Cadastre-se
            </Link>
          </Text>
        </Grid.Col>

        <Grid.Col value={{ xs: 12, md: 6 }}>
          <Box display="flex" justifyContent="center">
            <img
              align="center"
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
              alt="Telefones mostrando as páginas internas do app"
            />
          </Box>
        </Grid.Col>
      </Grid.Row>
    </Grid.Container>
  );
}
