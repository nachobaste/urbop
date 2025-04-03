"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, Link } from "lucide-react";

export default function ParametersPage() {
  const [activeTab, setActiveTab] = useState('dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [parameters, setParameters] = useState([]);
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
          name: 'Population Density', 
          category: 'Demographic',
          dataType: 'Numeric',
          unit: 'people/km²',
          description: 'Number of people per square kilometer in a given area',
          source: 'Census Data',
          usedIn: ['MCDA', 'Market Analysis', 'BMC'],
          lastUpdated: '2025-03-15'
        },
        { 
          id: 2, 
          name: 'Average Income', 
          category: 'Economic',
          dataType: 'Numeric',
          unit: 'USD',
          description: 'Average annual income per household in a given area',
          source: 'Economic Survey',
          usedIn: ['MCDA', 'Market Analysis', 'BMC'],
          lastUpdated: '2025-03-10'
        },
        { 
          id: 3, 
          name: 'Land Use Classification', 
          category: 'Geographic',
          dataType: 'Categorical',
          unit: 'N/A',
          description: 'Classification of land use (residential, commercial, industrial, etc.)',
          source: 'Zoning Regulations',
          usedIn: ['MCDA', 'Site Selection'],
          lastUpdated: '2025-02-28'
        },
        { 
          id: 4, 
          name: 'Infrastructure Quality Index', 
          category: 'Infrastructure',
          dataType: 'Numeric',
          unit: 'Score (0-100)',
          description: 'Composite index measuring quality of infrastructure in an area',
          source: 'Infrastructure Assessment',
          usedIn: ['MCDA', 'Site Selection', 'BMC'],
          lastUpdated: '2025-03-05'
        },
        { 
          id: 5, 
          name: 'Market Growth Rate', 
          category: 'Economic',
          dataType: 'Numeric',
          unit: '%',
          description: 'Annual growth rate of the market in a specific sector',
          source: 'Market Analysis',
          usedIn: ['BMC', 'Portfolio Management'],
          lastUpdated: '2025-03-20'
        },
        { 
          id: 6, 
          name: 'Environmental Risk Score', 
          category: 'Environmental',
          dataType: 'Numeric',
          unit: 'Score (0-10)',
          description: 'Score indicating environmental risks in an area',
          source: 'Environmental Assessment',
          usedIn: ['MCDA', 'Site Selection'],
          lastUpdated: '2025-03-12'
        },
        { 
          id: 7, 
          name: 'Accessibility Index', 
          category: 'Infrastructure',
          dataType: 'Numeric',
          unit: 'Score (0-100)',
          description: 'Measure of how accessible an area is via transportation',
          source: 'Transportation Analysis',
          usedIn: ['MCDA', 'Site Selection', 'BMC'],
          lastUpdated: '2025-03-08'
        },
        { 
          id: 8, 
          name: 'Competitive Density', 
          category: 'Market',
          dataType: 'Numeric',
          unit: 'competitors/km²',
          description: 'Number of competitors per square kilometer in a given area',
          source: 'Market Research',
          usedIn: ['MCDA', 'BMC', 'Market Analysis'],
          lastUpdated: '2025-03-18'
        },
        { 
          id: 9, 
          name: 'Education Level', 
          category: 'Demographic',
          dataType: 'Categorical',
          unit: 'N/A',
          description: 'Distribution of education levels in the population',
          source: 'Census Data',
          usedIn: ['MCDA', 'Market Analysis'],
          lastUpdated: '2025-03-15'
        },
        { 
          id: 10, 
          name: 'Regulatory Compliance Score', 
          category: 'Regulatory',
          dataType: 'Numeric',
          unit: 'Score (0-100)',
          description: 'Score indicating ease of regulatory compliance in an area',
          source: 'Regulatory Assessment',
          usedIn: ['MCDA', 'Site Selection', 'BMC'],
          lastUpdated: '2025-03-02'
        },
        { 
          id: 11, 
          name: 'Customer Acquisition Cost', 
          category: 'Financial',
          dataType: 'Numeric',
          unit: 'USD',
          description: 'Average cost to acquire a new customer in a given market',
          source: 'Financial Analysis',
          usedIn: ['BMC', 'Portfolio Management'],
          lastUpdated: '2025-03-22'
        },
        { 
          id: 12, 
          name: 'Employment Rate', 
          category: 'Economic',
          dataType: 'Numeric',
          unit: '%',
          description: 'Percentage of working-age population that is employed',
          source: 'Economic Survey',
          usedIn: ['MCDA', 'Market Analysis'],
          lastUpdated: '2025-03-10'
        }
      ];
      
      setParameters(data);
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  // Filter parameters based on search query
  const filteredParameters = parameters.filter(parameter => {
    return searchQuery === '' || 
      parameter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parameter.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parameter.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Group parameters by category
  const parametersByCategory = filteredParameters.reduce((acc, parameter) => {
    if (!acc[parameter.category]) {
      acc[parameter.category] = [];
    }
    acc[parameter.category].push(parameter);
    return acc;
  }, {});
  
  // Group parameters by module
  const parametersByModule = filteredParameters.reduce((acc, parameter) => {
    parameter.usedIn.forEach(module => {
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(parameter);
    });
    return acc;
  }, {});
  
  // Mock relationships data
  const relationships = [
    {
      id: 1,
      sourceParameter: 'Population Density',
      targetParameter: 'Market Growth Rate',
      relationship: 'Positive Correlation',
      strength: 0.75,
      description: 'Higher population density tends to correlate with higher market growth rates in urban areas'
    },
    {
      id: 2,
      sourceParameter: 'Average Income',
      targetParameter: 'Customer Acquisition Cost',
      relationship: 'Negative Correlation',
      strength: -0.62,
      description: 'Higher average income areas typically have lower customer acquisition costs for premium services'
    },
    {
      id: 3,
      sourceParameter: 'Infrastructure Quality Index',
      targetParameter: 'Accessibility Index',
      relationship: 'Positive Correlation',
      strength: 0.88,
      description: 'Better infrastructure quality strongly correlates with higher accessibility'
    },
    {
      id: 4,
      sourceParameter: 'Land Use Classification',
      targetParameter: 'Regulatory Compliance Score',
      relationship: 'Dependency',
      strength: 0.70,
      description: 'Land use classification directly affects regulatory compliance requirements'
    },
    {
      id: 5,
      sourceParameter: 'Environmental Risk Score',
      targetParameter: 'Regulatory Compliance Score',
      relationship: 'Negative Correlation',
      strength: -0.65,
      description: 'Higher environmental risks typically lead to more stringent regulatory requirements'
    }
  ];
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Parameter Dictionary</h1>
          <p className="text-gray-500">Unified parameter system with cross-table relationships</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search parameters..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>Add Parameter</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
          <TabsTrigger value="modules">Module Usage</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dictionary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Dictionary</CardTitle>
              <CardDescription>
                {filteredParameters.length} parameters found
                {searchQuery && ` matching "${searchQuery}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <p>Loading parameters...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Used In</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParameters.map(parameter => (
                      <TableRow key={parameter.id}>
                        <TableCell className="font-medium">{parameter.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{parameter.category}</Badge>
                        </TableCell>
                        <TableCell>{parameter.dataType}</TableCell>
                        <TableCell>{parameter.unit}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {parameter.usedIn.map(module => (
                              <Badge key={module} variant="secondary" className="text-xs">
                                {module}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{parameter.lastUpdated}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Relationships</CardTitle>
              <CardDescription>Connections and dependencies between parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source Parameter</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Target Parameter</TableHead>
                    <TableHead>Strength</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relationships.map(relationship => (
                    <TableRow key={relationship.id}>
                      <TableCell className="font-medium">{relationship.sourceParameter}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            relationship.relationship.includes('Positive') ? 'bg-green-500' :
                            relationship.relationship.includes('Negative') ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}></div>
                          <span>{relationship.relationship}</span>
                        </div>
                      </TableCell>
                      <TableCell>{relationship.targetParameter}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            Math.abs(relationship.strength) >= 0.7 ? 'bg-green-500' :
                            Math.abs(relationship.strength) >= 0.4 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <span>{relationship.strength > 0 ? '+' : ''}{relationship.strength.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate" title={relationship.description}>
                        {relationship.description}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Recalculate Relationships
              </Button>
              <Button>Add Relationship</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Relationship Network</CardTitle>
              <CardDescription>Visual representation of parameter relationships</CardDescription>
            </CardHeader>
            <CardContent className="h-96 bg-gray-50 rounded-md flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Network visualization would appear here</p>
                <p className="text-sm text-gray-400">Showing connections between parameters with strength indicators</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
(Content truncated due to size limit. Use line ranges to read in chunks)