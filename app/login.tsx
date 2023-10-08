// import { Label } from "@/components/ui/label"
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { setSession } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const login = ()=>{
    // setSession("user",{uid:1,username:"test"})
    router.refresh()
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm p-6 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:border-gray-700">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Enter your email below to login to your account</p>
        </div>
        <div className="space-y-4">
          {/* <div className="space-y-2"> */}
            {/* <Label htmlFor="email">Email</Label> */}
            <Input id="email" placeholder="m@example.com" required type="email"  label="Email"/>
            <Input id="password" placeholder="" required type="password"  label="Password"/>
            <Button onClick={login}>sign up</Button>
          {/* </div> */}
          {/* <div className="flex items-center space-x-2">
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span className="text-sm text-zinc-400 dark:text-zinc-300">OR</span>
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div> */}
      
        </div>
      </div>
    </div>
  )
}