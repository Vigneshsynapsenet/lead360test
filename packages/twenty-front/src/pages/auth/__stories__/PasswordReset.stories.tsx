import { getOperationName } from '@apollo/client/utilities';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';
import { graphql, HttpResponse } from 'msw';

import { GET_CURRENT_USER } from '@/users/graphql/queries/getCurrentUser';
import {
  OnboardingStatus,
  ValidatePasswordResetTokenDocument,
} from '~/generated/graphql';
import { PasswordReset } from '~/pages/auth/PasswordReset';
import {
  PageDecorator,
  PageDecoratorArgs,
} from '~/testing/decorators/PageDecorator';
import { PrefetchLoadingDecorator } from '~/testing/decorators/PrefetchLoadingDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedOnboardingUserData } from '~/testing/mock-data/users';

const mockedOnboardingUsersData = mockedOnboardingUserData(
  OnboardingStatus.Completed,
);

const meta: Meta<PageDecoratorArgs> = {
  title: 'Pages/Auth/PasswordReset',
  component: PasswordReset,
  decorators: [PrefetchLoadingDecorator, PageDecorator],
  args: {
    routePath: '/reset-password/:passwordResetToken',
    routeParams: { ':passwordResetToken': 'MOCKED_TOKEN' },
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          getOperationName(ValidatePasswordResetTokenDocument) ?? '',
          () => {
            return HttpResponse.json({
              data: {
                validatePasswordResetToken: {
                  id: mockedOnboardingUsersData.id,
                  email: mockedOnboardingUsersData.email,
                },
              },
            });
          },
        ),
        graphql.query(getOperationName(GET_CURRENT_USER) ?? '', () => {
          return HttpResponse.json({
            data: {
              currentUser: mockedOnboardingUsersData,
            },
          });
        }),
        graphqlMocks.handlers,
      ],
    },
  },
};

export default meta;

export type Story = StoryObj<typeof PasswordReset>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await canvas.findByText('Reset Password');
  },
};
