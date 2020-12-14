import React from 'react';
import { App } from './App';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

test('renders "Learn Rootz JS" button', () => {
    render(<App />);
    const linkElement = screen.getByText(/Learn Rootz JS/i);
    expect(linkElement).toBeInTheDocument();
});
