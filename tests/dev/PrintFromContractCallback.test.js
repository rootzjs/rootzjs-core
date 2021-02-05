import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// import Components
import { PrintFromContractCallback } from './PrintFromContractCallback';

test('Print Text from a Contract Callback', async function () {
        render(<PrintFromContractCallback />);

        const buttonRef = screen.getByTestId('btn-test');
        fireEvent.click(buttonRef);

        await waitFor(
                () => expect(
                        screen.getByText(/Hello/i)
                ).toBeInTheDocument());
});
