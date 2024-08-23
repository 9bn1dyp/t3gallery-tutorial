import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { SimpleUploadButton } from "./simple-upload-button"

export function TopNav() {

    return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b">
      <a href="/">Gallery</a>
  
      <div className="flex flex-row gap-4 items-center">
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
          
            <SimpleUploadButton/>
            <UserButton />
        </SignedIn>
      </div>
    </nav>
    )
  }
  /**
   * router.refresh re runs the current 
   * route on the server and sends back what 
   * you need to update
   */