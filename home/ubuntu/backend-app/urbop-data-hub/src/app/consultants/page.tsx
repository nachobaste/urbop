"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw } from "lucide-react";

export default function ConsultantsPage() {
  const [activeTab, setActiveTab] = useState('consultants');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const data = [
        { 
          id: 1, 
          name: 'Maria Rodriguez', 
          type: 'Employee',
          role: 'Project Manager',
          skills: ['Leadership', 'Project Planning', 'Risk Management', 'Stakeholder Communication'],
          onetCode: '11-9199.07',
          onetTitle: 'Project Management Specialists',
          matchScore: 92,
          availability: 'Available',
          projects: 8
        },
        { 
          id: 2, 
          name: 'Carlos Mendez', 
          type: 'Employee',
          role: 'Senior Developer',
          skills: ['JavaScript', 'Python', 'Database Design', 'API Development'],
          onetCode: '15-1252.00',
          onetTitle: 'Software Developers',
          matchScore: 88,
          availability: 'Assigned',
          projects: 5
        },
        { 
          id: 3, 
          name: 'Ana Gutierrez', 
          type: 'Vendor',
          role: 'GIS Specialist',
          skills: ['GIS Analysis', 'Spatial Data Management', 'Remote Sensing', 'Cartography'],
          onetCode: '15-1299.02',
          onetTitle: 'Geographic Information Systems Technologists and Technicians',
          matchScore: 95,
          availability: 'Available',
          projects: 12
        },
        { 
          id: 4, 
          name: 'Roberto Fuentes', 
          type: 'Employee',
          role: 'Business Analyst',
          skills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'Documentation'],
          onetCode: '13-1111.00',
          onetTitle: 'Management Analysts',
          matchScore: 85,
          availability: 'Available',
          projects: 7
        },
        { 
          id: 5, 
          name: 'Sofia Hernandez', 
          type: 'Vendor',
          role: 'Urban Planner',
          skills: ['Urban Design', 'Land Use Planning', 'Zoning Regulations', 'Community Engagement'],
          onetCode: '19-3051.00',
          onetTitle: 'Urban and Regional Planners',
          matchScore: 90,
          availability: 'Assigned',
          projects: 9
        },
        { 
          id: 6, 
          name: 'Javier Morales', 
          type: 'Employee',
          role: 'Data Scientist',
          skills: ['Statistical Analysis', 'Machine Learning', 'Data Visualization', 'Python'],
          onetCode: '15-2051.00',
          onetTitle: 'Data Scientists',
          matchScore: 87,
          availability: 'Available',
          projects: 6
        },
        { 
          id: 7, 
          name: 'Gabriela Torres', 
          type: 'Vendor',
          role: 'Economic Analyst',
          skills: ['Economic Modeling', 'Market Research', 'Financial Analysis', 'Forecasting'],
          onetCode: '19-3011.00',
          onetTitle: 'Economists',
          matchScore: 89,
          availability: 'Available',
          projects: 11
        },
        { 
          id: 8, 
          name: 'Miguel Sanchez', 
          type: 'Employee',
          role: 'Infrastructure Engineer',
          skills: ['Civil Engineering', 'Infrastructure Planning', 'Cost Estimation', 'AutoCAD'],
          onetCode: '17-2051.00',
          onetTitle: 'Civil Engineers',
          matchScore: 91,
          availability: 'Assigned',
          projects: 10
        }
      ];
      
      setConsultants(data);
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter consultants based on search query and selected skills
  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = searchQuery === '' || 
      consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.onetTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => consultant.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });
  
  // All unique skills from consultants
  const allSkills = [...new Set(consultants.flatMap(consultant => consultant.skills))].sort();
  
  // Toggle skill selection
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  // Mock WBS deliverables
  const wbsDeliverables = [
    {
      id: 1,
      name: 'Market Analysis Report',
      skills: ['Market Research', 'Data Analysis', 'Economic Modeling', 'Report Writing'],
      onetCode: '13-1161.00',
      onetTitle: 'Market Research Analysts and Marketing Specialists',
      status: 'In Progress',
      dueDate: '2025-05-15',
      assignedTo: 'Gabriela Torres'
    },
    {
      id: 2,
      name: 'Site Selection Analysis',
      skills: ['GIS Analysis', 'Spatial Data Management', 'Land Use Planning', 'Multi-Criteria Decision Analysis'],
      onetCode: '15-1299.02',
      onetTitle: 'Geographic Information Systems Technologists and Technicians',
      status: 'Pending',
      dueDate: '2025-05-30',
      assignedTo: null
    },
    {
      id: 3,
      name: 'Infrastructure Assessment',
      skills: ['Civil Engineering', 'Infrastructure Planning', 'Cost Estimation', 'Technical Documentation'],
      onetCode: '17-2051.00',
      onetTitle: 'Civil Engineers',
      status: 'Completed',
      dueDate: '2025-04-20',
      assignedTo: 'Miguel Sanchez'
    },
    {
      id: 4,
      name: 'Business Model Canvas',
      skills: ['Business Modeling', 'Financial Analysis', 'Strategic Planning', 'Value Proposition Design'],
      onetCode: '13-1111.00',
      onetTitle: 'Management Analysts',
      status: 'Pending',
      dueDate: '2025-06-10',
      assignedTo: null
    },
    {
      id: 5,
      name: 'Project Implementation Plan',
      skills: ['Project Planning', 'Risk Management', 'Resource Allocation', 'Scheduling'],
      onetCode: '11-9199.07',
      onetTitle: 'Project Management Specialists',
      status: 'In Progress',
      dueDate: '2025-06-25',
      assignedTo: 'Maria Rodriguez'
    }
  ];
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Consultant Management</h1>
          <p className="text-gray-500">O*NET integrated consultant selection and management</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search consultants..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>Add Consultant</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="wbs">WBS Deliverables</TabsTrigger>
          <TabsTrigger value="onet">O*NET Integration</TabsTrigger>
          <TabsTrigger value="skills">Skill Matrix</TabsTrigger>
        </TabsList>
        
        <TabsContent value="consultants" className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-1/5 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Filter by Skills</CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {allSkills.map(skill => (
                      <div key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="mr-2"
                        />
                        <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedSkills([])}
                  >
                    Clear Filters
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Consultant Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Total Consultants</p>
                      <p className="text-2xl font-bold">{consultants.length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Employees</p>
                      <p className="text-2xl font-bold">{consultants.filter(c => c.type === 'Employee').length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vendors</p>
                      <p className="text-2xl font-bold">{consultants.filter(c => c.type === 'Vendor').length}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Available</p>
                      <p className="text-2xl font-bold">{consultants.filter(c => c.availability === 'Available').length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-4/5">
              <Card>
                <CardHeader>
                  <CardTitle>Consultant Directory</CardTitle>
                  <CardDescription>
                    {filteredConsultants.length} consultants found
                    {selectedSkills.length > 0 && ` with ${selectedSkills.length} selected skills`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center h-40">
                      <p>Loading consultants...</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>O*NET Title</TableHead>
                          <TableHead>Match Score</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredConsultants.map(consultant => (
                          <TableRow key={consultant.id}>
                            <TableCell className="font-medium">{consultant.name}</TableCell>
                            <TableCell>
                              <Badge variant={consultant.type === 'Employee' ? "default" : "secondary"}>
                                {consultant.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{consultant.role}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{consultant.onetTitle}</span>
                                <span className="text-xs text-gray-500">{consultant.onetCode}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div className={`h-2 w-2 rounded-full mr-2 ${
                                  consultant.matchScore >= 90 ? 'bg-green-500' :
                                  consultant.matchScore >= 80 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}></div>
                                <span>{consultant.matchScore}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={consultant.availability === 'Available' ? "outline" : "secondary"}>
                                {consultant.availability}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View Profile</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wbs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WBS Deliverables</CardTitle>
              <CardDescription>Match consultants with Work Breakdown Structure deliverables</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deliverable</TableHead>
                    <TableHead>Required Skills</TableHead>
                    <TableHead>O*NET Match</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wbsDeliverables.map(deliverable => (
                    <TableRow key={deliverable.id}>
                      <TableCell className="font-medium">{deliverable.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {deliverable.skills.map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                      
(Content truncated due to size limit. Use line ranges to read in chunks)