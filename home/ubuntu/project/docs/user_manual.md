# User Manual: Odoo ERP Integration with MCDA

## Introduction

Welcome to the User Manual for the Odoo ERP integration with Multi-Criteria Decision Analysis (MCDA) for site selection, business model structuring, and portfolio management. This manual provides step-by-step instructions for using the integrated system to support economic development activities in Guatemala.

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Site Selection](#2-site-selection)
3. [Business Model Canvas](#3-business-model-canvas)
4. [Portfolio Management](#4-portfolio-management)
5. [Reporting and Analytics](#5-reporting-and-analytics)
6. [Administration](#6-administration)
7. [Troubleshooting](#7-troubleshooting)

## 1. Getting Started

### 1.1 Logging In

1. Open your web browser and navigate to your Odoo instance URL (e.g., https://your-company.odoo.com)
2. Enter your username and password
3. Click "Log in"

![Login Screen](https://www.odoo.com/web/image/33261-800/odoo-login-page.png)

### 1.2 Dashboard Overview

After logging in, you will see the main dashboard with access to all modules:

- **MCDA**: Multi-Criteria Decision Analysis for site selection
- **BMC**: Business Model Canvas for business model structuring
- **Portfolio**: Portfolio management for real estate assets
- **Data Hub**: Integration with Guatemala Data Hub

### 1.3 Navigation

- The main menu is located at the top of the screen
- Each module has its own submenu with specific functions
- Use the search bar at the top to quickly find records or functions
- Use breadcrumbs at the top of the page to navigate back to previous screens

## 2. Site Selection

The Site Selection module uses Multi-Criteria Decision Analysis to evaluate and rank potential development sites.

### 2.1 Creating a New Site

1. Navigate to **MCDA > Sites > Create**
2. Fill in the site details:
   - **Name**: Enter a descriptive name for the site
   - **Location**: Enter the location description or address
   - **Area**: Enter the site area in square meters
   - **Status**: Select the current status (available, reserved, etc.)
3. Click **Save** to create the site record

### 2.2 Importing Site Data from Guatemala Data Hub

1. Navigate to **MCDA > Sites**
2. Click **Import from Data Hub**
3. Select the location area from the map or enter coordinates
4. Click **Search** to find available sites
5. Select the sites you want to import
6. Click **Import Selected** to create site records

### 2.3 Performing Site Evaluation

1. Navigate to **MCDA > Sites** and select a site
2. Click the **Evaluate** button
3. A new evaluation form will open:
   - **Name**: Enter a name for this evaluation (auto-filled by default)
   - **Date**: Current date (can be modified if needed)
   - **Evaluator**: Your user (auto-filled by default)
4. In the **Scores** tab, enter values for each criterion
   - The system will automatically calculate weighted scores
   - The total score is displayed at the top of the form
5. Add any notes in the **Notes** tab
6. Click **Start Evaluation** to begin
7. After completing all scores, click **Complete** to finalize the evaluation

### 2.4 Comparing Multiple Sites

1. Navigate to **MCDA > Evaluations**
2. Select the evaluations you want to compare (use checkboxes)
3. Click **Compare Selected**
4. A comparison view will show:
   - Side-by-side scores for each criterion
   - Total scores for each site
   - Radar charts visualizing the comparison
   - Strengths and weaknesses analysis
5. Click **Generate Report** to create a PDF report of the comparison

## 3. Business Model Canvas

The Business Model Canvas module helps structure business models for development projects.

### 3.1 Creating a New Canvas

1. Navigate to **BMC > Canvases > Create**
2. Fill in the basic information:
   - **Name**: Enter a name for the canvas
   - **Property**: Select the related property or site
   - **Template**: Select a template based on asset class
3. Click **Save** to create the canvas

### 3.2 Using the Canvas Generator Wizard

1. Navigate to **BMC > Generate Canvas**
2. Select the property/site for which you want to create a canvas
3. Select the appropriate template based on asset class
4. Click **Generate Canvas**
5. The system will pre-fill some elements based on property data
6. Review and complete the canvas elements

### 3.3 Editing Canvas Elements

1. Open the canvas you want to edit
2. Each section of the Business Model Canvas is displayed in the form
3. Click on any section to add or edit elements:
   - **Key Partners**: Add organizations that will help your business
   - **Key Activities**: Add activities crucial to your value proposition
   - **Value Propositions**: Add what value you deliver to customers
   - **Customer Relationships**: Add how you interact with customers
   - **Customer Segments**: Add the different groups of people you serve
   - **Key Resources**: Add resources required to deliver your value proposition
   - **Channels**: Add how you communicate with and reach customers
   - **Cost Structure**: Add the costs involved in operating your business
   - **Revenue Streams**: Add how your business generates income
4. Click **Save** after making changes

### 3.4 Analyzing Business Model Viability

1. Open the canvas you want to analyze
2. Click the **Analyze** button
3. The system will evaluate the business model based on:
   - Completeness of all sections
   - Coherence between sections
   - Financial viability (based on cost structure and revenue streams)
   - Market fit (based on customer segments and value propositions)
4. Review the analysis results in the **Analysis** tab
5. Based on the results, you can:
   - Click **Validate** to approve the business model
   - Click **Reject** to mark it as needing revision
   - Return to editing to make improvements

## 4. Portfolio Management

The Portfolio Management module helps track and analyze your real estate asset portfolio.

### 4.1 Adding Assets to Portfolio

1. Navigate to **Portfolio > Assets > Create**
2. Fill in the asset details:
   - **Name**: Enter a descriptive name for the asset
   - **Property**: Select the related property
   - **Category**: Select the asset category
   - **Acquisition Date**: Enter when the asset was acquired
   - **Acquisition Cost**: Enter the initial cost
   - **Current Value**: Enter the current estimated value
   - **Currency**: Select the currency
3. Click **Save** to add the asset to your portfolio

### 4.2 Categorizing Assets

1. Navigate to **Portfolio > Categories**
2. To create a new category:
   - Click **Create**
   - Enter a **Name** and **Code** for the category
   - Select a **Parent Category** if applicable
   - Add a **Description**
   - Click **Save**
3. To assign assets to categories:
   - Navigate to **Portfolio > Assets**
   - Select the assets you want to categorize
   - Click **Action > Set Category**
   - Select the category
   - Click **Apply**

### 4.3 Tracking Performance Metrics

1. Navigate to **Portfolio > Assets** and select an asset
2. Go to the **Performance** tab
3. Click **Add a line** to add a new performance metric:
   - **Name**: Enter the metric name (e.g., "ROI", "Occupancy Rate")
   - **Date**: Enter the measurement date
   - **Value**: Enter the metric value
   - **Target**: Enter the target value
   - **Unit**: Enter the unit of measurement
   - **Notes**: Add any additional information
4. Click **Save** to record the metric

### 4.4 Assessing Risk

1. Navigate to **Portfolio > Assets** and select an asset
2. Go to the **Risk** tab
3. Click **Add a line** to add a new risk assessment:
   - **Risk Type**: Select the type of risk
   - **Probability**: Rate the probability (1-5)
   - **Impact**: Rate the potential impact (1-5)
   - **Risk Score**: Automatically calculated (Probability × Impact)
   - **Mitigation Strategy**: Describe how to mitigate this risk
4. Click **Save** to record the risk assessment

## 5. Reporting and Analytics

The system provides various reports and analytics to support decision-making.

### 5.1 Accessing Dashboards

1. Navigate to **Dashboard** in the main menu
2. Select the dashboard you want to view:
   - **Site Selection Dashboard**: Overview of site evaluations
   - **Business Model Dashboard**: Analysis of business models
   - **Portfolio Dashboard**: Portfolio performance metrics
   - **Executive Dashboard**: High-level overview for management

### 5.2 Generating Reports

1. Navigate to the module for which you want to generate a report
2. Select the records to include in the report
3. Click **Print > Report Name** (e.g., "Site Evaluation Report")
4. The system will generate a PDF report
5. You can download, print, or email the report

### 5.3 Custom Analysis

1. Navigate to **Reporting > Custom Analysis**
2. Select the data source:
   - **MCDA**: Site evaluation data
   - **BMC**: Business model data
   - **Portfolio**: Asset performance data
3. Select the metrics and dimensions for analysis
4. Click **Generate Analysis**
5. View the results in table or chart format
6. Click **Export** to download the analysis in Excel or CSV format

### 5.4 OKR Tracking

1. Navigate to **Reporting > OKRs**
2. To create a new OKR:
   - Click **Create**
   - Enter the **Objective**
   - Add **Key Results** with targets and deadlines
   - Assign **Responsible** persons
   - Click **Save**
3. To update OKR progress:
   - Select the OKR
   - Update the **Current Value** for each Key Result
   - Add **Comments** on progress
   - Click **Save**

## 6. Administration

This section covers administrative tasks for system management.

### 6.1 User Management

1. Navigate to **Settings > Users & Companies > Users**
2. To create a new user:
   - Click **Create**
   - Enter the user's **Name** and **Email**
   - Set a **Password**
   - Assign **Access Rights** and **Groups**
   - Click **Save**
3. To edit a user:
   - Select the user
   - Make the necessary changes
   - Click **Save**

### 6.2 Data Hub Configuration

1. Navigate to **Data Hub > Configuration**
2. Enter the connection details:
   - **Connection Name**: Enter a name for this connection
   - **API URL**: Enter the Guatemala Data Hub API URL
   - **API Key**: Enter your API key
3. Click **Test Connection** to verify
4. Click **Save** to store the configuration

### 6.3 MCDA Criteria Management

1. Navigate to **MCDA > Configuration > Criteria**
2. To create a new criterion:
   - Click **Create**
   - Enter the **Name** and **Description**
   - Select the **Category**
   - Set the **Weight**
   - Enter the **Measurement Unit**
   - Set the **Minimum** and **Maximum** values
   - Click **Save**
3. To edit a criterion:
   - Select the criterion
   - Make the necessary changes
   - Click **Save**

### 6.4 BMC Template Management

1. Navigate to **BMC > Configuration > Templates**
2. To create a new template:
   - Click **Create**
   - Enter the **Name** and **Description**
   - Select the **Asset Class**
   - Click **Save**
   - Go to the **Elements** tab to add template elements
3. To edit a template:
   - Select the template
   - Make the necessary changes
   - Click **Save**

## 7. Troubleshooting

This section provides solutions to common issues you might encounter.

### 7.1 Login Issues

**Issue**: Unable to log in to the system.

**Solution**:
1. Verify that you are using the correct username and password
2. Check if Caps Lock is enabled
3. Clear your browser cache and cookies
4. Try using a different browser
5. Contact your system administrator if the problem persists

### 7.2 Data Synchronization Issues

**Issue**: Data from Guatemala Data Hub is not updating.

**Solution**:
1. Navigate to **Data Hub > Synchronization**
2. Check the status of recent synchronizations
3. If there are errors, note the error message
4. Click **Sync Now** to manually trigger synchronization
5. If the problem persists, check the Data Hub connection settings
6. Contact your system administrator if needed

### 7.3 Report Generation Issues

**Issue**: Unable to generate reports.

**Solution**:
1. Verify that you have selected the correct records
2. Check if you have permission to access the report
3. Try generating a different report to see if the issue is specific
4. Clear your browser cache and try again
5. Contact your system administrator if the problem persists

### 7.4 Performance Issues

**Issue**: System is running slowly.

**Solution**:
1. Close unnecessary browser tabs
2. Clear your browser cache
3. Try using a different browser
4. If using a mobile device, try a desktop computer
5. Check your internet connection
6. Contact your system administrator if the problem persists

### 7.5 Getting Help

If you encounter issues not covered in this manual:

1. Click the **Help** icon in the top-right corner
2. Search the help documentation for relevant topics
3. Click **Contact Support** to submit a support ticket
4. Provide detailed information about the issue, including:
   - What you were trying to do
   - What happened instead
   - Any error messages you received
   - Screenshots if possible

## Appendix

### Keyboard Shortcuts

- **Alt + C**: Create new record
- **Alt + S**: Save current record
- **Alt + D**: Discard changes
- **Alt + E**: Edit current record
- **Alt + P**: Print/Report menu
- **Alt + H**: Help menu
- **Ctrl + F**: Search
- **Esc**: Close dialog or cancel action

### Glossary

- **BMC**: Business Model Canvas
- **ERP**: Enterprise Resource Planning
- **MCDA**: Multi-Criteria Decision Analysis
- **OKR**: Objectives and Key Results
- **ROI**: Return on Investment
- **WBS**: Work Breakdown Structure

### Contact Information

For additional support, please contact:

- **Technical Support**: support@urbop.com
- **User Training**: training@urbop.com
- **General Inquiries**: info@urbop.com
