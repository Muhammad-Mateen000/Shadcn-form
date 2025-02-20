import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// ✅ Define Form Schema
const formSchema = z.object({
  firstname: z.string().min(3, { message: "FirstName must be at least 3 characters." }).max(15, { message: "Max 15 characters required" }),
  lastname: z.string().min(3, { message: "LastName must be at least 3 characters." }).max(15, { message: "Max 15 characters required" }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/[A-Z]/, { message: "Password must have at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must have at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must have at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must have at least one special character." }),
})

const App = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values) {
    console.log("Form Submitted:", values)
    form.reset() // ✅ Reset fields after submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-14 w-full max-w-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="Enter First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="Enter Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="Enter Your Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="text-xs" placeholder="Enter Your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-gray-800 text-white" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default App
