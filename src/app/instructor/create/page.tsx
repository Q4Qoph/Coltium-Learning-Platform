"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { z } from "zod";
import { useSession } from "next-auth/react";


const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum([
    "QUANTUM",
    "PCB",
    "AI",
    "IOT",
    "BLOCKCHAIN",
    "CYBERSECURITY",
    "RENEWABLE_ENERGY",
    "BIOTECHNOLOGY",
    "VR_AR"
  ]),
  price: z.string(),
  language: z.array(z.string()).min(1, "At least one language is required"),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  hasAITutor: z.boolean(),
});

type CourseFormData = z.infer<typeof courseSchema>;

const CATEGORIES = [
  { label: "Quantum Computing", value: "QUANTUM" },
  { label: "PCB Design", value: "PCB" },
  { label: "AI & Machine Learning", value: "AI" },
  { label: "Internet of Things", value: "IOT" },
  { label: "Blockchain", value: "BLOCKCHAIN" },
  { label: "Cybersecurity", value: "CYBERSECURITY" },
  { label: "Renewable Energy", value: "RENEWABLE_ENERGY" },
  { label: "Biotechnology", value: "BIOTECHNOLOGY" },
  { label: "VR/AR", value: "VR_AR" },
];

const DIFFICULTIES = [
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
];

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Swahili", value: "sw" },
];

const CreateCoursePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Protect the page
  React.useEffect(() => {
    if (status === "authenticated" && session?.user.role !== "INSTRUCTOR") {
      router.push("/");
      toast.error("Only instructors can create courses");
    }
  }, [session, status, router]);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "QUANTUM",
      price: "0",
      language: ["en"],
      difficulty: "BEGINNER",
      hasAITutor: false,
    },
  });

  const onSubmit = async (data: CourseFormData) => {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to create course");
      }

      const course = await response.json();
      toast.success("Course created successfully!");
      router.push(`/instructor/courses/${course.id}`);
    } catch (error) {
      console.error("Failed to create course:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create course");
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Don't show the form if not authenticated or not an instructor
  if (!session || session.user.role !== "INSTRUCTOR") {
    return null;
  }
  
  return (
    <div className="container mx-auto py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter course title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Difficulty Field */}
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DIFFICULTIES.map((difficulty) => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter course description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Language Field */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange([value])}
                      defaultValue={field.value[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGES.map((language) => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Field */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AI Tutor Field */}
              <FormField
                control={form.control}
                name="hasAITutor"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable AI Tutor</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/instructor/courses")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCoursePage;