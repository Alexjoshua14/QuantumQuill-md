import { FC } from "react"
import Button, { ButtonProps } from "../Button"
import { signIn, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

/**
 * Sign in button for OAuth
 */
export const SignInButton: FC<Partial<ButtonProps>> = ({ text, className, ...props }) => {
  return (
    <Button
      text="Sign In"
      onClick={() => signIn()}
      className={cn(`bg-gray-500 hover:bg-gray-400 transition-colors`, className)}
      {...props}
    />
  )
}

/**
 * Sign out button for OAuth
 */
export const SignOutButton: FC<Partial<ButtonProps>> = ({ text, className, ...props }) => {
  return (
    <Button
      text="Sign Out"
      onClick={() => signOut()}
      className={cn(`bg-gray-500 hover:bg-gray-400 transition-colors`, className)}
      {...props}
    />
  )
}