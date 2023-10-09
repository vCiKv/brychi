"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignIn, useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginV1 = () => {
  const [loading,setLoading] = useState(false)
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const loginFormSchema = z.object({
    email: z
      .string({ invalid_type_error: "invalid input" })
      .nonempty("please input an email")
      .email("use a valid email"),
    password: z
      .string({ invalid_type_error: "invalid input" })
      .nonempty("please input a password"),
  });
  type LoginFormType = z.infer<typeof loginFormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginFormSchema) });
  const submitForm = async (formData: LoginFormType) => {
    const { email, password } = formData;
    if (!isLoaded) {
      return;
    }

    try {
      setLoading(true)
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        toast.success("login successful")

        router.refresh();
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
        toast.error("login failed to complete")

      }
    } catch (err: any) {
        toast.error("login failed ")
        console.error("error", err.errors[0].longMessage);
      setLoading(false)
    }
    setLoading(false)

  };
  return (
    <div className="max-w-sm p-6 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:border-gray-700">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
    
      </div>
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <Input
          id="email"
          required
          type="email"
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          id="password"
          required
          type="password"
          label="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" loading={loading}>sign up</Button>
      </form>
    </div>
  );
};
export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <SignIn /> */}
      <LoginV1/>
    </div>
  );
}
