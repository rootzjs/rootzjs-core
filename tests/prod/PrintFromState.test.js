import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/dom';

// import Components
import { PrintFromState } from './PrintFromState';

test('Print Text from a Node State variable', function () {
        render(<PrintFromState />);
        const linkElement = screen.getByText(/Hello/i);
        expect(linkElement).toBeInTheDocument();
});
