import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { AuthCardWrapper } from './auth-card-wrapper'

export const AuthErrorCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text" />
      </div>
    </AuthCardWrapper>
  )
}
