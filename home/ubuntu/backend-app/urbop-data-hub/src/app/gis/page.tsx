"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Layers, Map, Filter } from "lucide-react";

export default function GISPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLayer, setActiveLayer] = useState('municipalities');
  const [layerOpacity, setLayerOpacity] = useState(0.8);
  const [showLabels, setShowLabels] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [mapData, setMapData] = useState(null);
  
  const mapContainerRef = useRef(null);
  
  // Simulate loading map data
  useEffect(() => {
    const loadMap = async () => {
      // Simulate API calls and map initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock map data
      setMapData({
        municipalities: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                id: 1,
                name: 'Guatemala City',
                department: 'Guatemala',
                population: 1000000
              },
              geometry: {
                type: 'Point',
                coordinates: [-90.5069, 14.6349]
              }
            },
            {
              type: 'Feature',
              properties: {
                id: 2,
                name: 'Quetzaltenango',
                department: 'Quetzaltenango',
                population: 180000
              },
              geometry: {
                type: 'Point',
                coordinates: [-91.5178, 14.8448]
              }
            }
          ]
        },
        projects: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                id: 1,
                name: 'Urban Development Zone A',
                status: 'in_progress',
                budget: 5000000
              },
              geometry: {
                type: 'Point',
                coordinates: [-90.5269, 14.6149]
              }
            },
            {
              type: 'Feature',
              properties: {
                id: 2,
                name: 'Commercial District B',
                status: 'planned',
                budget: 8500000
              },
              geometry: {
                type: 'Point',
                coordinates: [-90.5469, 14.6349]
              }
            }
          ]
        },
        demographics: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                id: 1,
                region: 'Metropolitan',
                population: 3500000,
                income: 12500
              },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-90.6069, 14.5349],
                  [-90.4069, 14.5349],
                  [-90.4069, 14.7349],
                  [-90.6069, 14.7349],
                  [-90.6069, 14.5349]
                ]]
              }
            }
          ]
        }
      });
      
      setMapLoaded(true);
    };
    
    loadMap();
  }, []);
  
  // Handle layer change
  const handleLayerChange = (layer) => {
    setActiveLayer(layer);
  };
  
  // Handle opacity change
  const handleOpacityChange = (value) => {
    setLayerOpacity(value[0]);
  };
  
  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Geographic Information System</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Map Visualization</CardTitle>
              <CardDescription>Interactive map of Latin America with geographic data layers</CardDescription>
            </CardHeader>
            <CardContent className="relative h-[500px]">
              {!mapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                    <p>Loading Google Earth Engine data...</p>
                  </div>
                </div>
              ) : (
                <div ref={mapContainerRef} className="w-full h-full bg-gray-100 rounded-md relative">
                  {/* This would be replaced with actual Google Earth Engine map */}
                  <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-lg font-medium mb-2">Google Earth Engine Map</p>
                      <p className="text-sm text-gray-500">
                        Active Layer: {activeLayer} | Opacity: {Math.round(layerOpacity * 100)}% | 
                        Labels: {showLabels ? 'On' : 'Off'} | Filter: {filterValue || 'None'}
                      </p>
                      <p className="text-sm text-gray-500 mt-4">
                        Features: {mapData && mapData[activeLayer]?.features.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Layer Controls</CardTitle>
              <CardDescription>Manage map layers and visualization options</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="layers" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="layers">Layers</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="filter">Filter</TabsTrigger>
                </TabsList>
                
                <TabsContent value="layers" className="space-y-4">
                  <div className="space-y-2">
                    <Button 
                      variant={activeLayer === 'municipalities' ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleLayerChange('municipalities')}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      Municipalities
                    </Button>
                    
                    <Button 
                      variant={activeLayer === 'projects' ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleLayerChange('projects')}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      Projects
                    </Button>
                    
                    <Button 
                      variant={activeLayer === 'demographics' ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleLayerChange('demographics')}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      Demographics
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Layer Information</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Type:</span> {activeLayer}</p>
                      <p><span className="font-medium">Features:</span> {mapData && mapData[activeLayer]?.features.length || 0}</p>
                      <p><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="style" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Layer Opacity</Label>
                      <Slider 
                        defaultValue={[layerOpacity]} 
                        max={1} 
                        step={0.1}
                        onValueChange={handleOpacityChange}
                      />
                      <p className="text-xs text-gray-500 text-right">{Math.round(layerOpacity * 100)}%</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="show-labels" 
                        checked={showLabels}
                        onCheckedChange={setShowLabels}
                      />
                      <Label htmlFor="show-labels">Show Labels</Label>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Color Scheme</h3>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="w-full h-8 bg-blue-500 rounded cursor-pointer" />
                        <div className="w-full h-8 bg-green-500 rounded cursor-pointer" />
                        <div className="w-full h-8 bg-red-500 rounded cursor-pointer" />
                        <div className="w-full h-8 bg-purple-500 rounded cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="filter" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Filter by Name</Label>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Enter name..." 
                          value={filterValue}
                          onChange={handleFilterChange}
                        />
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Advanced Filters</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="filter-population" />
                          <Label htmlFor="filter-population">Population > 100,000</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="filter-budget" />
                          <Label htmlFor="filter-budget">Budget > $1M</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="filter-status" />
                          <Label htmlFor="filter-status">Status: In Progress</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Export Map Data
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Latin America Coverage</CardTitle>
            <CardDescription>Geographic data coverage across Latin American countries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { country: 'Guatemala', coverage: '95%', projects: 42 },
                { country: 'Mexico', coverage: '78%', projects: 36 },
                { country: 'Colombia', coverage: '82%', projects: 29 },
                { country: 'Brazil', coverage: '65%', projects: 47 },
                { country: 'Argentina', coverage: '70%', projects: 23 },
                { country: 'Chile', coverage: '88%', projects: 18 },
                { country: 'Peru', coverage: '72%', projects: 15 },
                { country: 'Ecuador', coverage: '68%', projects: 12 }
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className={`h-2 ${index % 4 === 0 ? 'bg-blue-500' : index % 4 === 1 ? 'bg-green-500' : index % 4 === 2 ? 'bg-purple-500' : 'bg-red-500'}`} />
                  <CardContent className="p-4">
                    <h3 className="font-medium">{item.country}</h3>
                    <div className="text-sm text-gray-500">
                      <p>Coverage: {item.coverage}</p>
                      <p>Projects: {item.projects}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
