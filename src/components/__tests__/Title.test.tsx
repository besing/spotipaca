import React from 'react';
import { cleanup, render } from '@testing-library/react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import Title from '../Title';

afterEach(cleanup);

describe('<Title />', () => {
  it('renders the component', () => {
    const { container } = render(<Title />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
