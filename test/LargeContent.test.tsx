import { render, screen } from '@testing-library/react';
import React from 'react';

import LargeContent from '../src/LargeContent';
import '@testing-library/jest-dom';
import { TextKitWidgetProvider } from '../src/TextKitWidgetProvider';

describe('LargeContent tests', () => {
  it('should return empty', () => {
    render(
      <TextKitWidgetProvider>
        <LargeContent>test</LargeContent>
      </TextKitWidgetProvider>
    );
    expect(screen.getByTestId('tk-provider-wrapper')).toBeEmptyDOMElement();
  });
});
