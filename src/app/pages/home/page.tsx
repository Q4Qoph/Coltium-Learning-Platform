import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, BookOpen, Users, Award, ChevronRight, ArrowRight, PlayCircle, Globe, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const featuredCourses = [
    {
      id: 1,
      title: "Introduction to Quantum Computing",
      description: "Learn the fundamentals of quantum computing and its applications.",
      level: "Beginner",
      duration: "8 weeks",
      thumbnail: "/images/quantum.jpg",
    },
    {
      id: 2,
      title: "AI and Machine Learning Basics",
      description: "Understand the core concepts of AI and machine learning.",
      level: "Intermediate",
      duration: "6 weeks",
      thumbnail: "/images/ai.jpg",
    },
    {
      id: 3,
      title: "IoT for Beginners",
      description: "Explore the Internet of Things and its real-world applications.",
      level: "Beginner",
      duration: "4 weeks",
      thumbnail: "/images/iot.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <span className="text-sm font-medium">Now offering courses across Africa</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Empower Your Tech Journey in{" "}
                <span className="text-primary">Africa</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Access world-class education in emerging technologies. Learn Quantum Computing, AI, IoT, and more from industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg" asChild>
                  <Link href="/courses">
                    Start Learning Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link href="/courses">Explore Courses</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-muted-foreground">Expert Mentors</div>
                </div>
              </div>
            </div>
            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full animate-pulse" />
                <img
                  src="/images/home2.jpg"
                  alt="Students learning technology"
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Certified Courses</div>
                      <div className="text-sm text-muted-foreground">Industry Recognition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Coltium?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4">
                  <Laptop className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Tech Stack</h3>
                <p className="text-muted-foreground">
                  Learn cutting-edge technologies from Quantum Computing to AI
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Hands-on labs and real-world projects for practical experience
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Community</h3>
                <p className="text-muted-foreground">
                  Connect with mentors and peers across Africa
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recognized Certification</h3>
                <p className="text-muted-foreground">
                  Earn industry-recognized certificates upon completion
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button variant="outline" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      {course.level}
                    </span>
                    <span className="ml-2">{course.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <Card key={id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Student Name</h3>
                      <p className="text-sm text-muted-foreground">Course: Quantum Computing</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Coltium has transformed my career. The courses are well-structured, and the mentors are incredibly supportive."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}