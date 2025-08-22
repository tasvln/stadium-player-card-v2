import { ReactElement, ReactNode } from 'react'

const ConditionalWrapper: React.FC<{
  condition: boolean
  wrapper: (children: ReactNode) => ReactElement<any, any>
  altWrapper?: (children: ReactNode) => ReactElement<any, any>
  children: ReactNode
}> = ({ children, wrapper, altWrapper, condition }) =>
  condition ? wrapper(children) : altWrapper ? altWrapper(children) : <>{children}</>

export default ConditionalWrapper
