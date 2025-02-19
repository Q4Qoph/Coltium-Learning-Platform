

// app/instructor/courses/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { 
  Users, Edit, PlusCircle, CheckCircle, Clock, 
  Cpu, Code, Brain, Radio, Shield, Boxes,
  BookOpen, MessageCircle, Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  status: CourseStatus;
  enrolledStudents: number;
  completionRate: number;
  updatedAt: string;
  language: string[];
  hasAITutor: boolean;
  difficulty: CourseDifficulty;
  teacherId: string;
  teacherName: string;
}

type CourseCategory = 'QUANTUM' | 'PCB' | 'AI' | 'IOT' | 'BLOCKCHAIN' | 'CYBERSECURITY' | 'RENEWABLE_ENERGY' | 'BIOTECHNOLOGY' | 'VR_AR';
type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
type CourseDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const getCategoryIcon = (category: CourseCategory) => {
  const icons = {
    QUANTUM: Cpu,
    PCB: Code,
    AI: Brain,
    IOT: Radio,
    CYBERSECURITY: Shield,
    BLOCKCHAIN: Boxes,
    RENEWABLE_ENERGY: BookOpen,
    BIOTECHNOLOGY: BookOpen,
    VR_AR: BookOpen
  };
  return icons[category] || BookOpen;
};

const CoursePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchCourses();
    }
  }, [session]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || course.status === filter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const handlePublishCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/publish`, {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Failed to publish course');
      
      // Update local state
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, status: 'PUBLISHED' as CourseStatus }
            : course
        )
      );
      
      toast.success('Course published successfully');
    } catch (error) {
      console.error('Error publishing course:', error);
      toast.error('Failed to publish course');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete course');
      
      // Remove course from local state
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      toast.success('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Create and manage your technical courses</p>
        </div>
        <Button onClick={() => router.push('/instructor/courses/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={(value: 'all' | 'PUBLISHED' | 'DRAFT') => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Drafts</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.keys(getCategoryIcon).map((category) => (
              <SelectItem key={category} value={category}>
                {category.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const CategoryIcon = getCategoryIcon(course.category);
          return (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <CategoryIcon className="h-6 w-6 mt-1" />
                    <div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                          {course.status.toLowerCase()}
                        </Badge>
                        <Badge variant="outline">{course.difficulty.toLowerCase()}</Badge>
                        {course.hasAITutor && (
                          <Badge variant="secondary">AI Tutor</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {course.enrolledStudents} Students Enrolled
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    {course.completionRate}% Completion Rate
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {course.language.join(', ')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Last updated: {new Date(course.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => router.push(`/instructor/courses/${course.id}`)}>
                    Manage
                  </Button>
                  {course.status === 'DRAFT' && (
                    <Button variant="secondary" onClick={() => handlePublishCourse(course.id)}>
                      Publish
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Course</DialogTitle>
                      </DialogHeader>
                      <p>Are you sure you want to delete this course? This action cannot be undone.</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDeleteCourse(course.id)}>
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <Alert>
          <AlertDescription>
            No courses found. Create a new course to get started.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CoursePage;