/*
 * @jest-environment jsdom
 */

/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '.';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the input value', () => {
      const { result } = renderHook(() =>
        useForm({ initialValues: { username: 'vinixiii' } })
      );
      const initialValues = { username: 'vinixiii' };
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'username',
          value: 'Elaine',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ username: 'Elaine' });
    });
  });
});
