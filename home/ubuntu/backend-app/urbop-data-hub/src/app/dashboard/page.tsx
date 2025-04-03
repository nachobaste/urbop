"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [refreshing, setRefreshing] = useState(false);
  
  // Simulate data refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  // Mock data for charts and tables
  const projectData = [
    { name: 'Urban Development', count: 12, budget: 45000000, score: 87 },
    { name: 'Commercial', count: 8, budget: 32000000, score: 92 },
    { name: 'Residential', count: 15, budget: 28000000, score: 78 },
    { name: 'Industrial', count: 5, budget: 18000000, score: 85 },
    { name: 'Mixed Use', count: 7, budget: 22000000, score: 90 }
  ];
  
  const countryData = [
    { name: 'Guatemala', projects: 18, budget: 42000000, score: 88 },
    { name: 'Mexico', projects: 12, budget: 38000000, score: 85 },
    { name: 'Colombia', projects: 9, budget: 25000000, score: 82 },
    { name: 'Brazil', projects: 14, budget: 40000000, score: 79 },
    { name: 'Argentina', projects: 7, budget: 20000000, score: 84 }
  ];
  
  const marketAnalysisData = [
    { sector: 'Retail', growth: 4.2, demand: 'High', saturation: 'Medium', opportunity: 85 },
    { sector: 'Office', growth: 2.8, demand: 'Medium', saturation: 'High', opportunity: 72 },
    { sector: 'Residential', growth: 5.1, demand: 'Very High', saturation: 'Low', opportunity: 92 },
    { sector: 'Industrial', growth: 3.7, demand: 'High', saturation: 'Low', opportunity: 88 },
    { sector: 'Hospitality', growth: 1.9, demand: 'Medium', saturation: 'Medium', opportunity: 76 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const pieData = projectData.map(item => ({
    name: item.name,
    value: item.budget
  }));
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button 
              variant={timeRange === 'week' ? "default" : "outline"}
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? "default" : "outline"}
              onClick={() => setTimeRange('month')}
            >
              Month
            </Button>
            <Button 
              variant={timeRange === 'year' ? "default" : "outline"}
              onClick={() => setTimeRange('year')}
            >
              Year
            </Button>
          </div>
          <Button onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+12% from previous {timeRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$145M</div>
            <p className="text-xs text-muted-foreground">+8% from previous {timeRange}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average MCDA Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84.5</div>
            <p className="text-xs text-muted-foreground">+2.3 from previous {timeRange}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects by Type</CardTitle>
                <CardDescription>Distribution of projects across different types</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Projects" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>Budget distribution across project types</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>Site Selection Completed</TableCell>
                    <TableCell>Urban Development Zone A</TableCell>
                    <TableCell>Guatemala</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                    <TableCell>Business Model Canvas Updated</TableCell>
                    <TableCell>Commercial District B</TableCell>
                    <TableCell>Mexico</TableCell>
                    <TableCell>Planning</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{new Date(Date.now() - 172800000).toLocaleDateString()}</TableCell>
                    <TableCell>MCDA Evaluation Completed</TableCell>
                    <TableCell>Residential Area C</TableCell>
                    <TableCell>Colombia</TableCell>
                    <TableCell>Approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{new Date(Date.now() - 259200000).toLocaleDateString()}</TableCell>
                    <TableCell>Portfolio Review</TableCell>
                    <TableCell>Multiple Projects</TableCell>
                    <TableCell>Latin America</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>MCDA scores across different project types</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" name="MCDA Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>Comprehensive project information</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Avg. MCDA Score</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.count}</TableCell>
                      <TableCell>${(project.budget / 1000000).toFixed(1)}M</TableCell>
                      <TableCell>{project.score}</TableCell>
                      <TableCell>
                        {index % 3 === 0 ? 'In Progress' : index % 3 === 1 ? 'Planning' : 'Completed'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="countries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects by Country</CardTitle>
              <CardDescription>Distribution of projects across Latin America</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countryData}
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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Country Performance</CardTitle>
              <CardDescription>MCDA scores across different countries</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" name="Average MCDA Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>Sector growth and opportunity assessment</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marketAnalysisData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="growth" fill="#8884d8" name="Growth Rate (%)" />
                  <Bar dataKey="opportunity" fill="#82ca9d" name="Opportunity Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Details</CardTitle>
              <CardDescription>Detailed market analysis by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sector</TableHead>
                    <TableHead>Growth Rate</TableHead>
                    <TableHead>Demand</TableHead>
                    <TableHead>Saturation</TableHead>
                    <TableHead>Opportunity Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketAnalysisData.map((sector, index) => (
                    <TableRow key={index}>
                      <TableCell>{sector.sector}</TableCell>
                      <TableCell>{sector.growth}%</TableCell>
                      <TableCell>{sector.demand}</TableCell>
                      <TableCell>{sector.saturation}</TableCell>
                      <TableCell>{sector.opportunity}</TableCell>
                    </TableRow>
                  ))}
          
(Content truncated due to size limit. Use line ranges to read in chunks)