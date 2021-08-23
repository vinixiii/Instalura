import { breakpointsMediaQuerie } from './breakpointsMediaQuerie';

export function propToStyle(propName) {
  // Retorna uma função que recebe as props do styled-components
  // e essa função retorna o valor da chave 'textAlign' no objeto 'props'
  return (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    const propValue = props[propName];

    if (typeof propValue === 'string') {
      return {
        [propName]: props[propName],
      };
    }

    if (typeof propValue === 'object') {
      return breakpointsMediaQuerie({
        xs: {
          [propName]: propValue.xs,
        },
        sm: {
          [propName]: propValue.sm,
        },
        md: {
          [propName]: propValue.md,
        },
        lg: {
          [propName]: propValue.lg,
        },
        xl: {
          [propName]: propValue.xl,
        },
      });
    }

    return null;
  };
}
