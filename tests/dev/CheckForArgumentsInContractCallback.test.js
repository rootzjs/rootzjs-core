import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// import Components
import { CheckForArgumentsInContractCallback } from './CheckForArgumentsInContractCallback';

test('Check for Arguments in Contract Callback', async function () {
        render(<CheckForArgumentsInContractCallback />);

        const buttonRef = screen.getByTestId('btn-test');
        fireEvent.click(buttonRef);

        await waitFor(
                () => expect(
                        screen.getByText(/Hello/i)
                ).toBeInTheDocument());
});
