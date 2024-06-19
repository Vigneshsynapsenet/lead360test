import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { PrefetchLoadingDecorator } from '~/testing/decorators/PrefetchLoadingDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';

import { SettingsNewObject } from '../SettingsNewObject';

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Settings/DataModel/SettingsNewObject',
  component: SettingsNewObject,
  decorators: [PrefetchLoadingDecorator, PageDecorator],
  args: {
    routePath: '/settings/objects/new',
  },
  parameters: {
    msw: graphqlMocks,
  },
};

export default meta;

export type Story = StoryObj<typeof SettingsNewObject>;

export const WithStandardSelected: Story = {
  play: async () => {
    const canvas = within(document.body);
    const listingInput = await canvas.findByPlaceholderText('Listing');
    const pluralInput = await canvas.findByPlaceholderText('Listings');
    const descriptionInput = await canvas.findByPlaceholderText(
      'Write a description',
    );
    const saveButton = await canvas.findByText('Save');
    await userEvent.type(listingInput, 'Company');
    await userEvent.type(pluralInput, 'Companies');
    await userEvent.type(descriptionInput, 'Test Description');

    await userEvent.click(saveButton);
  },
};
