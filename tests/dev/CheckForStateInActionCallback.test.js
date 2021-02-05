import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// import Components
import { CheckForStateInActionCallback } from './CheckForStateInActionCallback';

test('Check for State in Action Callback', async function () {
        render(<CheckForStateInActionCallback />);

        const buttonRef = screen.getByTestId('btn-test');
        fireEvent.click(buttonRef);

        await waitFor(
                () => expect(
                        screen.getByText(/Hello/i)
                ).toBeInTheDocument());
});
