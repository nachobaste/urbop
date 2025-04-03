"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState('csv');
  const [csvFile, setCsvFile] = useState(null);
  const [sqlFile, setSqlFile] = useState(null);
  const [shapeFile, setShapeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  
  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      toast({
        title: "Error",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      const formData = new FormData();
      formData.append('csvFile', csvFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: "Success",
        description: "CSV file uploaded successfully",
        variant: "default",
      });
      
      // Reset form
      setCsvFile(null);
      setUploadProgress(0);
    } catch (error) {
      clearInterval(interval);
      toast({
        title: "Error",
        description: error.message || "Failed to upload CSV file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleSqlUpload = async (e) => {
    e.preventDefault();
    if (!sqlFile) {
      toast({
        title: "Error",
        description: "Please select an SQL file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      const formData = new FormData();
      formData.append('sqlFile', sqlFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: "Success",
        description: "SQL file processed successfully",
        variant: "default",
      });
      
      // Reset form
      setSqlFile(null);
      setUploadProgress(0);
    } catch (error) {
      clearInterval(interval);
      toast({
        title: "Error",
        description: error.message || "Failed to process SQL file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleShapefileUpload = async (e) => {
    e.preventDefault();
    if (!shapeFile) {
      toast({
        title: "Error",
        description: "Please select a shapefile to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 150);
    
    try {
      const formData = new FormData();
      formData.append('shapeFile', shapeFile);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: "Success",
        description: "Shapefile uploaded and processed successfully",
        variant: "default",
      });
      
      // Reset form
      setShapeFile(null);
      setUploadProgress(0);
    } catch (error) {
      clearInterval(interval);
      toast({
        title: "Error",
        description: error.message || "Failed to process shapefile",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Data Upload</h1>
          <p className="text-gray-500">Upload and process data for the Guatemala Data Hub</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          <TabsTrigger value="sql">SQL Upload</TabsTrigger>
          <TabsTrigger value="shapefile">Shapefile Upload</TabsTrigger>
          <TabsTrigger value="odoo">Odoo Sync</TabsTrigger>
        </TabsList>
        
        <TabsContent value="csv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CSV Data Upload</CardTitle>
              <CardDescription>Upload CSV files for demographic, economic, or infrastructure data</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCsvUpload} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="csvFile">CSV File</Label>
                  <Input 
                    id="csvFile" 
                    type="file" 
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files[0])}
                    disabled={uploading}
                  />
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="dataType">Data Type</Label>
                  <select 
                    id="dataType" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={uploading}
                  >
                    <option value="demographic">Demographic Data</option>
                    <option value="economic">Economic Data</option>
                    <option value="infrastructure">Infrastructure Data</option>
                    <option value="market">Market Data</option>
                    <option value="environmental">Environmental Data</option>
                  </select>
                </div>
                
                {uploading && (
                  <div className="w-full max-w-sm">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <Button type="submit" disabled={!csvFile || uploading}>
                  {uploading ? 'Uploading...' : 'Upload CSV'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-medium mb-2">Supported CSV Formats:</h3>
              <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
                <li>Demographic data (population, age groups, education)</li>
                <li>Economic indicators (income, employment, business activity)</li>
                <li>Infrastructure metrics (roads, utilities, public services)</li>
                <li>Market data (competition, demand, growth rates)</li>
                <li>Environmental factors (risks, resources, sustainability)</li>
              </ul>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sql" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SQL Data Upload</CardTitle>
              <CardDescription>Upload SQL files to populate the database</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSqlUpload} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="sqlFile">SQL File</Label>
                  <Input 
                    id="sqlFile" 
                    type="file" 
                    accept=".sql"
                    onChange={(e) => setSqlFile(e.target.files[0])}
                    disabled={uploading}
                  />
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="executionMode">Execution Mode</Label>
                  <select 
                    id="executionMode" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={uploading}
                  >
                    <option value="safe">Safe Mode (Validate Only)</option>
                    <option value="transaction">Transaction Mode (Rollback on Error)</option>
                    <option value="execute">Execute Mode (Run All Statements)</option>
                  </select>
                </div>
                
                {uploading && (
                  <div className="w-full max-w-sm">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Processing SQL...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <Button type="submit" disabled={!sqlFile || uploading}>
                  {uploading ? 'Processing...' : 'Process SQL'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-medium mb-2">SQL Upload Guidelines:</h3>
              <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
                <li>SQL files should be compatible with SQLite syntax</li>
                <li>Use transaction blocks for related operations</li>
                <li>Include proper error handling in your SQL scripts</li>
                <li>Maximum file size: 10MB</li>
                <li>Avoid schema-altering operations in production mode</li>
              </ul>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="shapefile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shapefile Upload</CardTitle>
              <CardDescription>Upload geographic data in shapefile format</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShapefileUpload} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="shapeFile">Shapefile (.zip containing .shp, .dbf, .shx)</Label>
                  <Input 
                    id="shapeFile" 
                    type="file" 
                    accept=".zip"
                    onChange={(e) => setShapeFile(e.target.files[0])}
                    disabled={uploading}
                  />
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="geoType">Geographic Type</Label>
                  <select 
                    id="geoType" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={uploading}
                  >
                    <option value="municipalities">Municipalities</option>
                    <option value="departments">Departments</option>
                    <option value="projects">Project Locations</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="custom">Custom Boundaries</option>
                  </select>
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="projection">Coordinate System</Label>
                  <select 
                    id="projection" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={uploading}
                  >
                    <option value="wgs84">WGS 84 (EPSG:4326)</option>
                    <option value="utm15n">UTM Zone 15N (EPSG:32615)</option>
                    <option value="utm16n">UTM Zone 16N (EPSG:32616)</option>
                    <option value="other">Other (Will be reprojected)</option>
                  </select>
                </div>
                
                {uploading && (
                  <div className="w-full max-w-sm">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Processing shapefile...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <Button type="submit" disabled={!shapeFile || uploading}>
                  {uploading ? 'Processing...' :
(Content truncated due to size limit. Use line ranges to read in chunks)