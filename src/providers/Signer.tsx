import React, { useEffect } from 'react'

type SignerProps = {
  children: React.ReactNode;
}

const SignerProvider = ({ children }: SignerProps) => {
  return (
    <>{children}</>
  )
}

export default SignerProvider;