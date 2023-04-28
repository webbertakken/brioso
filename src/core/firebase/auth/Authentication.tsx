// noinspection PointlessBooleanExpressionJS

import * as React from 'react'
import { useAuth, useSigninCheck } from 'reactfire'
import { WideButton } from './display/Button.tsx'
import { Card, CardSection } from './display/Card.tsx'
import { LoadingSpinner } from './display/LoadingSpinner.tsx'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import styles from './Authentication.module.css'
import cx from 'classnames'
import { useNotify } from '../../notifications/hooks/useNotify.tsx'

// @ts-ignore
import type { User, UserInfo, auth } from 'firebase/compat'
type Auth = auth.Auth

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck()

  if (!children) {
    throw new Error('Children must be provided')
  }
  if (status === 'loading') {
    return <LoadingSpinner />
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element
  }

  return fallback
}

interface UserDetailsProps {
  user: User
}

const UserDetails = ({ user }: UserDetailsProps) => {
  const auth = useAuth()
  const notify = useNotify()

  const signOut = async () => {
    await notify.promise(auth.signOut(), {
      loading: 'signing out...',
      success: 'signed out',
      error: (error) => `${error}`,
    })
  }

  const deleteAccount = async () => {
    if (!auth.currentUser) return
    if (window.confirm('This will permanently delete your account. Are you sure?')) {
      await notify.promise(auth.currentUser.delete(), {
        loading: 'deleting account...',
        error: (error) => `${error}`,
        success: 'account was successfully deleted',
      })
    }
  }

  return (
    <Card title="Profile">
      <CardSection title="Name">{user.displayName}</CardSection>
      <CardSection title="Auth providers">
        <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
          {user.providerData?.map((profile: UserInfo) => (
            <li key={profile?.providerId}>✅ {profile?.providerId}</li>
          ))}
        </ul>
      </CardSection>
      <CardSection title="Actions">
        <div style={{ gap: '.5em', display: 'flex' }}>
          <WideButton danger label="Delete account" onClick={deleteAccount} />
          <WideButton label="Sign Out" onClick={signOut} />
        </div>
      </CardSection>
    </Card>
  )
}

const SignInForm = () => {
  const auth = useAuth()
  const notify = useNotify()

  const signIn = async (auth: Auth) => {
    const provider = new GoogleAuthProvider()
    await notify.promise(signInWithPopup(auth, provider), {
      loading: 'Waiting for response from identity provider. Check the popup.',
      error: (error) => `Unable to sign in. ${error}`,
      success: `Signed in.`,
    })
  }

  return (
    <Card title="Sign In">
      <button className={cx(styles.providerButton, styles.google)} onClick={() => signIn(auth)} />
    </Card>
  )
}

export const Authentication = () => {
  const { status, data: signinResult } = useSigninCheck()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  const { signedIn, user } = signinResult

  if (signedIn === true) {
    return <UserDetails user={user} />
  } else {
    return <SignInForm />
  }
}
