import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Play, 
  FileText, 
  Code
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CourseDetailPage = () => {
  const course = {
    id: 1,
    title: 'Introduction to Quantum Computing',
    description: 'Master the fundamentals of quantum computing, from basic principles to practical applications.',
    level: 'Beginner',
    duration: '8 weeks',
    students: 250,
    modules: 12,
    price: 99.99,
    thumbnail: '/images/quantum.jpg',
    instructor: {
      name: 'Dr. Sarah Johnson',
      bio: 'Quantum Physics Professor with 15 years of research experience',
      avatar: '/images/instructor.jpg'
    },
    learningOutcomes: [
      'Understand quantum mechanics principles',
      'Design basic quantum circuits',
      'Apply quantum computing concepts',
      'Explore real-world quantum applications'
    ],
    curriculum: [
      {
        title: 'Quantum Mechanics Fundamentals',
        lessons: [
          { title: 'Introduction to Quantum States', type: 'video', duration: '20 min' },
          { title: 'Superposition and Entanglement', type: 'text', duration: '15 min' }
        ]
      },
      {
        title: 'Quantum Circuit Design',
        lessons: [
          { title: 'Basic Quantum Gates', type: 'video', duration: '25 min' },
          { title: 'Quantum Algorithm Basics', type: 'code', duration: '30 min' }
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Course Header */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Course Info */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{course.level}</Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
              <Separator orientation="vertical" className="h-4" />
              <Users className="w-4 h-4" />
              <span>{course.students} Students</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-6">{course.description}</p>

          {/* Instructor Preview */}
          <div className="flex items-center gap-4 bg-secondary/10 p-4 rounded-lg">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{course.instructor.name}</h3>
              <p className="text-sm text-muted-foreground">
                {course.instructor.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Enrollment Card */}
        <Card className="p-6 h-fit">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full rounded-lg mb-4"
          />
          <div className="text-center mb-6">
            <span className="text-3xl font-bold">${course.price}</span>
          </div>
          <Button size="lg" className="w-full mb-3">
            Enroll Now
          </Button>
          <Button size="lg" variant="outline" className="w-full">
            Free Preview
          </Button>
        </Card>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {course.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <p className="text-muted-foreground">
                {course.modules} modules • {course.duration}
              </p>
            </CardHeader>
            <CardContent>
              {course.curriculum.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-6">
                  <h3 className="font-semibold mb-4">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lessonIndex} 
                        className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.type === 'video' ? (
                            <Play className="w-5 h-5 text-primary" />
                          ) : lesson.type === 'text' ? (
                            <FileText className="w-5 h-5 text-primary" />
                          ) : (
                            <Code className="w-5 h-5 text-primary" />
                          )}
                          <span>{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructor Tab */}
        <TabsContent value="instructor">
          <Card>
            <CardHeader>
              <CardTitle>About the Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <img 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-semibold">{course.instructor.name}</h3>
                  <p className="text-muted-foreground">
                    Quantum Physics Professor
                  </p>
                  <div className="flex gap-3 mt-2">
                    <Badge variant="secondary">Expert Level</Badge>
                    <Badge variant="secondary">15+ Years Experience</Badge>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                {course.instructor.bio} with extensive research in quantum computing 
                and practical applications in emerging technologies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailPage;