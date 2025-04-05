import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"



export default function SignUp() {

    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword]= useState("")
    console.log(email)
    function handelSubmit(){
        if(password !== confirmPassword)
            alert("Password must be same!!")
        else{
            
        }
    }
    
    function SignupForm({
      className,
      ...props
    }: React.ComponentPropsWithoutRef<"div">) {
      return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Signup</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e)=>{e.preventDefault(); handelSubmit()}}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-start">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                  <Label htmlFor="password">Conform Password</Label>
                  <Input id="password" type="password" required onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
    
                  <Button type="submit" className="w-full">
                    SignUp
                  </Button>
                  
                </div>
                <div className="mt-4 text-center text-sm">
                  Do you have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignupForm />
        </div>
      </div>
    )
  }
