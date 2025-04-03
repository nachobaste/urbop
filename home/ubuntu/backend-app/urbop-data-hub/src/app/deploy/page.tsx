"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function DeployPage() {
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [deployStatus, setDeployStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<any>(null);
  const [deployResults, setDeployResults] = useState<any>(null);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  
  const logRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logMessages]);
  
  const runTests = async () => {
    setTestStatus('running');
    setLogMessages(prev => [...prev, "Starting test suite..."]);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLogMessages(prev => [...prev, "Testing API endpoints..."]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLogMessages(prev => [...prev, "Testing Odoo integration..."]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLogMessages(prev => [...prev, "Testing Google Earth Engine integration..."]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLogMessages(prev => [...prev, "Testing database connections..."]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results
    const results = {
      total: 42,
      passed: 42,
      failed: 0,
      coverage: "94%",
      duration: "8.5s"
    };
    
    setTestResults(results);
    setTestStatus('success');
    setLogMessages(prev => [...prev, `✅ All tests passed! (${results.total} tests in ${results.duration})`]);
  };
  
  const deployApplication = async () => {
    setDeployStatus('running');
    setLogMessages(prev => [...prev, "Starting deployment process..."]);
    
    // Simulate deployment steps
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLogMessages(prev => [...prev, "Building application..."]);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    setLogMessages(prev => [...prev, "Optimizing assets..."]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLogMessages(prev => [...prev, "Deploying to production environment..."]);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock deployment results
    const results = {
      url: "https://urbop-data-hub.example.com",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      environment: "production"
    };
    
    setDeployResults(results);
    setDeployStatus('success');
    setLogMessages(prev => [...prev, `✅ Deployment successful! Application is now live at ${results.url}`]);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Deployment Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Suite</CardTitle>
            <CardDescription>Run tests to verify application functionality</CardDescription>
          </CardHeader>
          <CardContent>
            {testStatus === 'success' && testResults && (
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total Tests:</span>
                  <span className="font-medium">{testResults.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passed:</span>
                  <span className="font-medium text-green-600">{testResults.passed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed:</span>
                  <span className="font-medium text-red-600">{testResults.failed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage:</span>
                  <span className="font-medium">{testResults.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{testResults.duration}</span>
                </div>
              </div>
            )}
            
            {testStatus === 'idle' && (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Click the button below to run tests</p>
              </div>
            )}
            
            {testStatus === 'running' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={runTests} 
              disabled={testStatus === 'running'}
              className="w-full"
            >
              {testStatus === 'running' && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {testStatus === 'success' ? 'Run Tests Again' : 'Run Tests'}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Deployment</CardTitle>
            <CardDescription>Deploy the application to production</CardDescription>
          </CardHeader>
          <CardContent>
            {deployStatus === 'success' && deployResults && (
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span>URL:</span>
                  <span className="font-medium">{deployResults.url}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-medium">{deployResults.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="font-medium">{deployResults.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timestamp:</span>
                  <span className="font-medium">{new Date(deployResults.timestamp).toLocaleString()}</span>
                </div>
              </div>
            )}
            
            {deployStatus === 'idle' && (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Run tests first, then deploy the application</p>
              </div>
            )}
            
            {deployStatus === 'running' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={deployApplication} 
              disabled={deployStatus === 'running' || testStatus !== 'success'}
              className="w-full"
            >
              {deployStatus === 'running' && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {deployStatus === 'success' ? 'Redeploy Application' : 'Deploy Application'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Deployment Logs</CardTitle>
          <CardDescription>Real-time logs from test and deployment processes</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            ref={logRef}
            className="bg-black text-green-400 font-mono p-4 rounded h-64 overflow-y-auto"
          >
            {logMessages.length === 0 ? (
              <p className="text-gray-500">No logs yet. Run tests or deploy to see logs.</p>
            ) : (
              logMessages.map((message, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {message}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Alert variant={deployStatus === 'success' ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This is a simulated deployment interface. In a real production environment, 
            you would need to configure proper CI/CD pipelines and deployment targets.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
