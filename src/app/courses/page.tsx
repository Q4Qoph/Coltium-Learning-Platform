'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Filter, 
  Search, 
  ChevronRight 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Courses' },
    { value: 'quantum-computing', label: 'Quantum Computing' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'iot', label: 'Internet of Things' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'blockchain', label: 'Blockchain' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Introduction to Quantum Computing',
      description: 'Learn the fundamentals of quantum computing and its applications.',
      level: 'Beginner',
      duration: '8 weeks',
      students: 250,
      modules: 12,
      category: 'quantum-computing',
      thumbnail: '/images/quantum.jpg',
      price: 99.99
    },
    {
      id: 2,
      title: 'AI and Machine Learning Basics',
      description: 'Understand the core concepts of AI and machine learning.',
      level: 'Intermediate',
      duration: '6 weeks',
      students: 350,
      modules: 10,
      category: 'ai-ml',
      thumbnail: '/images/ai.jpg',
      price: 129.99
    },
    // Add more courses
  ];

  const filteredCourses = courses.filter(course => 
    (selectedCategory === 'all' || course.category === selectedCategory) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Explore Cutting-Edge Technology Courses
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover world-class education in emerging technologies. 
          Learn from industry experts and transform your tech career.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search courses" 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem 
                key={category.value} 
                value={category.value}
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <Card 
            key={course.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="outline">
                  <Clock className="w-4 h-4 mr-1" /> {course.duration}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students} Students
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.modules} Modules
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <span className="text-2xl font-bold">${course.price}</span>
              <Button asChild>
                <Link href={`/courses/${course.id}`}>
                  View Course
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold mb-4">
            No Courses Found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;