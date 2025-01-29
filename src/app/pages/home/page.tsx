import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, BookOpen, Users, Award, ChevronRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empower Your Tech Journey in Africa
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access world-class education in emerging technologies. Learn Quantum Computing, AI, IoT, and more from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Start Learning Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Coltium?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg">
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
            <Card className="border-none shadow-lg">
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
            <Card className="border-none shadow-lg">
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
            <Card className="border-none shadow-lg">
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
            <Button variant="outline">View All Courses</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <img
                  src={`/api/placeholder/800/400`}
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      Beginner
                    </span>
                    <span className="ml-2">8 weeks</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Introduction to Quantum Computing</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn the fundamentals of quantum computing and its applications
                  </p>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}