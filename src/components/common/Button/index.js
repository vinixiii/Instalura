import styled, { css } from 'styled-components';
import get from 'lodash/get';

import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMediaQuerie } from '../../../theme/utils/breakpointsMediaQuerie';

const GhostButton = css`
  background: transparent;
  color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
`;

const DefaultButton = css`
  background: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: opacity ${({ theme }) => theme.transition};

  ${TextStyleVariantsMap.smallestException}

  ${(props) => (props.ghost ? GhostButton : DefaultButton)}

  ${breakpointsMediaQuerie({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;
