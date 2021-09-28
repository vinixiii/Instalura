import React, { useContext } from 'react';
import Text from '../src/components/foundation/Text';
import { Button } from '../src/components/common/Button';
import { Grid } from '../src/components/foundation/layout/Grid';
import { WebsitePageWrapperContext } from '../src/components/wrappers/WebsitePage';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';
import { Box } from '../src/components/foundation/layout/Box';

function HomeScreen() {
  const { toggleRegisterModal } = useContext(WebsitePageWrapperContext);

  return (
    <Box display="flex" flex="1" flexDirection="column">
      <Grid.Container marginTop="auto" marginBottom="auto">
        <Grid.Row
          marginTop={{ xs: 32, md: 120 }}
          marginBottom={{ xs: 32, md: 120 }}
        >
          <Grid.Col
            // Deslocando uma coluna
            offset={{ xs: 0, md: 1 }}
            value={{ xs: 12, md: 5 }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            marginBottom={{
              xs: '40px',
              md: 'initial',
            }}
          >
            <Text
              variant="title"
              tag="h1"
              color="tertiary.main"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Compartilhe momentos e conecte-se com amigos
            </Text>
            <Text
              variant="paragraph1"
              tag="p"
              color="tertiary.light"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </Text>

            <Button
              variant="primary.main"
              display="block"
              margin={{
                xs: 'auto',
                md: 'initial',
              }}
              onClick={() => toggleRegisterModal()}
            >
              Cadastrar
            </Button>
          </Grid.Col>
          <Grid.Col value={{ xs: 12, md: 6 }}>
            <img
              style={{ display: 'block', margin: 'auto', maxWidth: '100%' }}
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
              alt="Imagem de um celular exibindo o perfil do N.Cage"
            />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </Box>
  );
}

export default websitePageHOC(HomeScreen, {
  pageWrapperProps: {
    seoProps: { headTitle: 'Home' },
    pageBoxProps: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      backgroundImage: 'url(/images/bubbles.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});
