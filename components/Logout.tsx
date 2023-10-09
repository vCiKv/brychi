import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Logout(){
  return(
    <div className="fixed top-0 right-0 p-4">
      <SignOutButton>
        <Button variant={"destructive"} size="sm">logout</Button>
      </SignOutButton>
    </div>
  )
}