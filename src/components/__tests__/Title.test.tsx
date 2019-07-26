import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import Title from '../Title';

afterEach(cleanup);

describe('<Title />', () => {
  it('displays the (correct) title', () => {
    const { getByText } = render(<Title />);
    expect(getByText('spotipaca')).toBeVisible();
  });
});
