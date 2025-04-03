"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LatinAmericaPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [countryData, setCountryData] = useState([]);
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
          name: 'Guatemala', 
          projects: 42, 
          budget: 145000000, 
          score: 87,
          coverage: 95,
          implementation: 'Advanced',
          status: 'active'
        },
        { 
          id: 2, 
          name: 'Mexico', 
          projects: 36, 
          budget: 128000000, 
          score: 82,
          coverage: 78,
          implementation: 'Advanced',
          status: 'active'
        },
        { 
          id: 3, 
          name: 'Colombia', 
          projects: 29, 
          budget: 98000000, 
          score: 84,
          coverage: 82,
          implementation: 'Intermediate',
          status: 'active'
        },
        { 
          id: 4, 
          name: 'Brazil', 
          projects: 47, 
          budget: 165000000, 
          score: 79,
          coverage: 65,
          implementation: 'Intermediate',
          status: 'active'
        },
        { 
          id: 5, 
          name: 'Argentina', 
          projects: 23, 
          budget: 87000000, 
          score: 81,
          coverage: 70,
          implementation: 'Intermediate',
          status: 'active'
        },
        { 
          id: 6, 
          name: 'Chile', 
          projects: 18, 
          budget: 72000000, 
          score: 86,
          coverage: 88,
          implementation: 'Advanced',
          status: 'active'
        },
        { 
          id: 7, 
          name: 'Peru', 
          projects: 15, 
          budget: 58000000, 
          score: 80,
          coverage: 72,
          implementation: 'Basic',
          status: 'active'
        },
        { 
          id: 8, 
          name: 'Ecuador', 
          projects: 12, 
          budget: 45000000, 
          score: 78,
          coverage: 68,
          implementation: 'Basic',
          status: 'active'
        },
        { 
          id: 9, 
          name: 'Venezuela', 
          projects: 8, 
          budget: 32000000, 
          score: 72,
          coverage: 45,
          implementation: 'Planning',
          status: 'pending'
        },
        { 
          id: 10, 
          name: 'Bolivia', 
          projects: 10, 
          budget: 38000000, 
          score: 75,
          coverage: 58,
          implementation: 'Basic',
          status: 'active'
        },
        { 
          id: 11, 
          name: 'Paraguay', 
          projects: 7, 
          budget: 28000000, 
          score: 76,
          coverage: 52,
          implementation: 'Planning',
          status: 'pending'
        },
        { 
          id: 12, 
          name: 'Uruguay', 
          projects: 9, 
          budget: 35000000, 
          score: 83,
          coverage: 75,
          implementation: 'Intermediate',
          status: 'active'
        },
        { 
          id: 13, 
          name: 'Panama', 
          projects: 11, 
          budget: 42000000, 
          score: 81,
          coverage: 70,
          implementation: 'Basic',
          status: 'active'
        },
        { 
          id: 14, 
          name: 'Costa Rica', 
          projects: 13, 
          budget: 48000000, 
          score: 84,
          coverage: 78,
          implementation: 'Intermediate',
          status: 'active'
        },
        { 
          id: 15, 
          name: 'Honduras', 
          projects: 6, 
          budget: 25000000, 
          score: 73,
          coverage: 48,
          implementation: 'Planning',
          status: 'pending'
        }
      ];
      
      setCountryData(data);
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter data based on selected country
  const filteredData = selectedCountry === 'all' 
    ? countryData 
    : countryData.filter(country => country.name === selectedCountry);
  
  // Calculate totals
  const totalProjects = countryData.reduce((sum, country) => sum + country.projects, 0);
  const totalBudget = countryData.reduce((sum, country) => sum + country.budget, 0);
  const averageScore = countryData.length > 0 
    ? countryData.reduce((sum, country) => sum + country.score, 0) / countryData.length 
    : 0;
  const activeCountries = countryData.filter(country => country.status === 'active').length;
  
  // Implementation status counts
  const implementationCounts = {
    Advanced: countryData.filter(country => country.implementation === 'Advanced').length,
    Intermediate: countryData.filter(country => country.implementation === 'Intermediate').length,
    Basic: countryData.filter(country => country.implementation === 'Basic').length,
    Planning: countryData.filter(country => country.implementation === 'Planning').length
  };
  
  const implementationData = [
    { name: 'Advanced', value: implementationCounts.Advanced },
    { name: 'Intermediate', value: implementationCounts.Intermediate },
    { name: 'Basic', value: implementationCounts.Basic },
    { name: 'Planning', value: implementationCounts.Planning }
  ];
  
  // Top 5 countries by projects
  const topCountriesByProjects = [...countryData]
    .sort((a, b) => b.projects - a.projects)
    .slice(0, 5);
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Latin America Expansion</h1>
          <p className="text-gray-500">Economic development methodology across Latin America</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countryData.map(country => (
                <SelectItem key={country.id} value={country.name}>{country.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{countryData.length}</div>
            <p className="text-xs text-muted-foreground">{activeCountries} active, {countryData.length - activeCountries} pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Across all Latin America</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalBudget / 1000000).toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground">Allocated for economic development</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average MCDA Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Across all countries</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects by Country</CardTitle>
                <CardDescription>Top 5 countries by number of projects</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Loading chart data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topCountriesByProjects}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="projects" fill="#8884d8" name="Number of Projects" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Implementation Status</CardTitle>
                <CardDescription>Methodology implementation across countries</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Loading implementation data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Advanced</span>
                        <span>{implementationCounts.Advanced} countries</span>
                      </div>
                      <Progress value={(implementationCounts.Advanced / countryData.length) * 100} className="h-2 bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Intermediate</span>
                        <span>{implementationCounts.Intermediate} countries</span>
                      </div>
                      <Progress value={(implementationCounts.Intermediate / countryData.length) * 100} className="h-2 bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Basic</span>
                        <span>{implementationCounts.Basic} countries</span>
                      </div>
                      <Progress value={(implementationCounts.Basic / countryData.length) * 100} className="h-2 bg-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Planning</span>
                        <span>{implementationCounts.Planning} countries</span>
                      </div>
                      <Progress value={(implementationCounts.Planning / countryData.length) * 100} className="h-2 bg-gray-200" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Expansion Timeline</CardTitle>
              <CardDescription>Methodology implementation timeline across Latin America</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute h-full w-px bg-gray-200 left-8 top-0"></div>
                <div className="space-y-8">
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-blue-500 p-2 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phase 1: Initial Deployment</h3>
                      <p className="text-sm text-gray-500">Guatemala, Mexico, Chile</p>
                      <p className="text-sm text-gray-500">Q1 2025 - Completed</p>
                    </div>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-blue-500 p-2 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phase 2: Regional Expansion</h3>
                      <p className="text-sm text-gray-500">Colombia, Brazil, Argentina, Uruguay, Costa Rica</p>
                      <p className="text-sm text-gray-500">Q2 2025 - In Progress</p>
                    </div>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute left-0 rounded-full bg-gray-300 p-2 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Phase 3: Secondary Markets</h3>
                      <p className="text-sm text-g
(Content truncated due to size limit. Use line ranges to read in chunks)