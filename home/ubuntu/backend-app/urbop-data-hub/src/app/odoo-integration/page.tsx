"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Check, X } from "lucide-react";

export default function OdooIntegrationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [syncStatus, setSyncStatus] = useState('idle');
  const [lastSync, setLastSync] = useState(null);
  const [odooUrl, setOdooUrl] = useState('https://example.odoo.sh');
  const [apiKey, setApiKey] = useState('');
  const [database, setDatabase] = useState('urbop_production');
  
  // Mock data for modules and sync status
  const [modules, setModules] = useState([
    { id: 1, name: 'CRM', status: 'connected', lastSync: new Date().toISOString(), records: 1245 },
    { id: 2, name: 'Projects', status: 'connected', lastSync: new Date().toISOString(), records: 872 },
    { id: 3, name: 'HR', status: 'connected', lastSync: new Date().toISOString(), records: 356 },
    { id: 4, name: 'Accounting', status: 'pending', lastSync: null, records: 0 },
    { id: 5, name: 'Inventory', status: 'error', lastSync: new Date(Date.now() - 86400000).toISOString(), records: 1089 },
    { id: 6, name: 'Purchase', status: 'connected', lastSync: new Date().toISOString(), records: 523 },
    { id: 7, name: 'Sales', status: 'connected', lastSync: new Date().toISOString(), records: 987 },
    { id: 8, name: 'Manufacturing', status: 'pending', lastSync: null, records: 0 }
  ]);
  
  const [syncHistory, setSyncHistory] = useState([
    { id: 1, timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'success', module: 'All', records: 5072, duration: '2m 34s' },
    { id: 2, timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'error', module: 'Inventory', records: 1089, duration: '1m 12s', error: 'Connection timeout' },
    { id: 3, timestamp: new Date(Date.now() - 172800000).toISOString(), status: 'success', module: 'CRM', records: 1245, duration: '45s' },
    { id: 4, timestamp: new Date(Date.now() - 259200000).toISOString(), status: 'success', module: 'Projects', records: 872, duration: '38s' },
    { id: 5, timestamp: new Date(Date.now() - 345600000).toISOString(), status: 'success', module: 'HR', records: 356, duration: '22s' }
  ]);
  
  // Simulate sync operation
  const handleSync = () => {
    setSyncStatus('syncing');
    
    // Simulate API call
    setTimeout(() => {
      setLastSync(new Date().toISOString());
      setSyncStatus('success');
      
      // Add to sync history
      setSyncHistory(prev => [
        {
          id: prev.length + 1,
          timestamp: new Date().toISOString(),
          status: 'success',
          module: 'All',
          records: 5072,
          duration: '2m 12s'
        },
        ...prev
      ]);
      
      // Update modules last sync
      setModules(prev => prev.map(module => 
        module.status === 'connected' ? 
          { ...module, lastSync: new Date().toISOString() } : 
          module
      ));
      
      // Reset status after a delay
      setTimeout(() => {
        setSyncStatus('idle');
      }, 3000);
    }, 5000);
  };
  
  // Handle module connection toggle
  const toggleModuleConnection = (id) => {
    setModules(prev => prev.map(module => 
      module.id === id ? 
        { 
          ...module, 
          status: module.status === 'connected' ? 'pending' : 
                  module.status === 'pending' ? 'connected' : 
                  module.status === 'error' ? 'connected' : 'pending',
          lastSync: module.status === 'pending' ? new Date().toISOString() : module.lastSync,
          records: module.status === 'pending' ? Math.floor(Math.random() * 1000) + 100 : module.records
        } : 
        module
    ));
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Odoo Integration</h1>
          <p className="text-gray-500">Manage your Odoo ERP connection and synchronization</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {lastSync ? (
              <span>Last synced: {formatDate(lastSync)}</span>
            ) : (
              <span>Never synced</span>
            )}
          </div>
          <Button 
            onClick={handleSync} 
            disabled={syncStatus === 'syncing'}
            className="flex items-center"
          >
            {syncStatus === 'syncing' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : syncStatus === 'success' ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Synced
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="history">Sync History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Connected Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {modules.filter(m => m.status === 'connected').length} / {modules.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {modules.filter(m => m.status === 'pending').length} pending, 
                  {modules.filter(m => m.status === 'error').length} with errors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Synced Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {modules.reduce((sum, module) => sum + module.records, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all connected modules
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-2 ${
                    modules.some(m => m.status === 'error') ? 'bg-red-500' :
                    modules.every(m => m.status === 'connected') ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <div className="text-lg font-medium">
                    {modules.some(m => m.status === 'error') ? 'Issues Detected' :
                     modules.every(m => m.status === 'connected') ? 'All Connected' :
                     'Partially Connected'}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {modules.some(m => m.status === 'error') ? 'Check module status for details' :
                   modules.every(m => m.status === 'connected') ? 'All systems operational' :
                   'Some modules need configuration'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Integration Overview</CardTitle>
              <CardDescription>Status of your Odoo ERP integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-medium">Connection Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Odoo Instance</p>
                      <p className="text-sm text-gray-500">{odooUrl}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Database</p>
                      <p className="text-sm text-gray-500">{database}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">API Status</p>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-sm text-gray-500">Connected</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Webhook Status</p>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <p className="text-sm text-gray-500">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Recent Activity</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {syncHistory.slice(0, 3).map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(item.timestamp)}</TableCell>
                          <TableCell>Synchronization</TableCell>
                          <TableCell>{item.module}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === 'success' ? "default" : "destructive"}>
                              {item.status === 'success' ? 'Success' : 'Failed'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Integration Health</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">API Response Time</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-1/5"></div>
                      </div>
                      <p className="text-xs text-gray-500">245ms (Excellent)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Sync Success Rate</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-4/5"></div>
                      </div>
                      <p className="text-xs text-gray-500">98.5% (Good)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Data Consistency</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 w-3/5"></div>
                      </div>
                      <p className="text-xs text-gray-500">92.3% (Needs Attention)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Odoo Modules</CardTitle>
              <CardDescription>Manage connections to Odoo ERP modules</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Synced</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modules.map(module => (
                    <TableRow key={module.id}>
                      <TableCell className="font-medium">{module.name}</TableCell>
                      <TableCell>
                        <Badge variant={
                          module.status === 'connected' ? "default" : 
                          module.status === 'pending' ? "secondary" : 
                          "destructive"
                        }>
                          {module.status === 'connected' ? 'Connected' : 
                           module.status === 'pending' ? 'Pending' : 
                           'Error'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(module.lastSync)}</TableCell>
                      <TableCell>{module.records.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleModuleConnection(module.id)}
                        >
                          {module.status === 'connected' ? 'Disconnect' : 'Connect'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Custom Module
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Mapping</CardTitle>
                <CardDescription>Field mappings between Odoo and local database</CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="space-y-6">
                  <div className="space-y
(Content truncated due to size limit. Use line ranges to read in chunks)