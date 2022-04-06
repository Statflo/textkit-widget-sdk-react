import { render, screen } from '@testing-library/react';
import React from 'react';

import MediumContent from '../src/MediumContent';
import '@testing-library/jest-dom';
import { TextKitWidgetProvider } from '../src/TextKitWidgetProvider';

describe('MediumContent tests', () => {
  it('should return the text test', () => {
    render(
      <TextKitWidgetProvider>
        <MediumContent>test</MediumContent>
      </TextKitWidgetProvider>
    );
    expect(screen.getByTestId('tk-provider-wrapper')).toContainHTML('test');
  });
});
