import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/dom';

// import Components
import { Print } from './Print';

test('Print Text from a Node', function () {
        render(<Print />);
        const linkElement = screen.getByText(/Hello/i);
        expect(linkElement).toBeInTheDocument();
});
