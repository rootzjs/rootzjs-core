import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// import Components
import { CheckForArgumentsInActionCallback } from './CheckForArgumentsInActionCallback';

test('Check for Arguments in Action Callback', async function () {
        render(<CheckForArgumentsInActionCallback />);

        const buttonRef = screen.getByTestId('btn-test');
        fireEvent.click(buttonRef);

        await waitFor(
                () => expect(
                        screen.getByText(/Hello/i)
                ).toBeInTheDocument());
});
