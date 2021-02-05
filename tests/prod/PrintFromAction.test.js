import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// import Components
import { PrintFromAction } from './PrintFromAction';

test('Print Text from a Node Action', function () {
        render(<PrintFromAction />);

        const buttonRef = screen.getByTestId('btn-test');
        fireEvent.click(buttonRef);

        const linkElement = screen.getByText(/Hello/i);
        expect(linkElement).toBeInTheDocument();
});
