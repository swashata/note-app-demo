import React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import {
  TestAppProvider,
  getFirebaseAppAndAuth,
} from '../../utils/testHelpers';

import Nav from '.';

describe('Nav Component', () => {
  test('shows sing-in button when not logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth(null);
    const { getByText } = render(
      <TestAppProvider app={app} auth={auth}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    await waitForElement(() => getByText('Sign in'));
  });

  test('shows logout button when logged in', async () => {
    const [app, auth] = getFirebaseAppAndAuth();
    const { getByTestId } = render(
      <TestAppProvider auth={auth} app={app}>
        <Nav firebaseAuth={{ signOut: () => {} }} />
      </TestAppProvider>
    );
    await waitForElement(() => getByTestId('logoutbutton'));
  });

  test('calls firebase signout function when clicked on logout button', async () => {
    const firebaseAuth = {
      signOut: jest.fn(),
    };
    const [app, auth] = getFirebaseAppAndAuth();
    const { getByTestId } = render(
      <TestAppProvider auth={auth} app={app}>
        <Nav firebaseAuth={firebaseAuth} />
      </TestAppProvider>
    );
    const button = await waitForElement(() => getByTestId('logoutbutton'));

    fireEvent.click(button);

    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1);
  });
});
