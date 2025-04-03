# Integration Framework for Odoo ERP with MCDA

This document outlines the detailed integration framework for connecting Odoo ERP with Multi-Criteria Decision Analysis (MCDA) for site selection, business model structuring, and portfolio management in Guatemala.

## 1. Custom Module Structure

### 1.1 MCDA Module (`urbop_mcda`)

```
urbop_mcda/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   ├── mcda_criteria.py
│   ├── mcda_evaluation.py
│   ├── mcda_score.py
│   └── mcda_site.py
├── views/
│   ├── mcda_criteria_views.xml
│   ├── mcda_evaluation_views.xml
│   ├── mcda_score_views.xml
│   ├── mcda_site_views.xml
│   └── mcda_menu.xml
├── security/
│   ├── ir.model.access.csv
│   └── mcda_security.xml
├── data/
│   └── mcda_criteria_data.xml
└── wizard/
    ├── __init__.py
    └── mcda_evaluation_wizard.py
```

### 1.2 Business Model Canvas Module (`urbop_bmc`)

```
urbop_bmc/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   ├── bmc_template.py
│   ├── bmc_canvas.py
│   ├── bmc_element.py
│   └── bmc_analysis.py
├── views/
│   ├── bmc_template_views.xml
│   ├── bmc_canvas_views.xml
│   ├── bmc_element_views.xml
│   ├── bmc_analysis_views.xml
│   └── bmc_menu.xml
├── security/
│   ├── ir.model.access.csv
│   └── bmc_security.xml
├── data/
│   └── bmc_template_data.xml
└── wizard/
    ├── __init__.py
    └── bmc_generation_wizard.py
```

### 1.3 Portfolio Management Module (`urbop_portfolio`)

```
urbop_portfolio/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   ├── portfolio_asset.py
│   ├── portfolio_category.py
│   ├── portfolio_performance.py
│   └── portfolio_risk.py
├── views/
│   ├── portfolio_asset_views.xml
│   ├── portfolio_category_views.xml
│   ├── portfolio_performance_views.xml
│   ├── portfolio_risk_views.xml
│   └── portfolio_menu.xml
├── security/
│   ├── ir.model.access.csv
│   └── portfolio_security.xml
├── data/
│   └── portfolio_category_data.xml
└── wizard/
    ├── __init__.py
    └── portfolio_analysis_wizard.py
```

### 1.4 Guatemala Data Hub Connector Module (`urbop_datahub`)

```
urbop_datahub/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   ├── datahub_connection.py
│   ├── datahub_data.py
│   └── datahub_sync.py
├── views/
│   ├── datahub_connection_views.xml
│   ├── datahub_data_views.xml
│   ├── datahub_sync_views.xml
│   └── datahub_menu.xml
├── security/
│   ├── ir.model.access.csv
│   └── datahub_security.xml
├── data/
│   └── datahub_config_data.xml
└── controllers/
    ├── __init__.py
    └── datahub_controller.py
```

## 2. Data Model Definitions

### 2.1 MCDA Models

#### 2.1.1 MCDA Criteria (`mcda.criteria`)

```python
from odoo import models, fields, api

class MCDACriteria(models.Model):
    _name = 'mcda.criteria'
    _description = 'MCDA Criteria'
    
    name = fields.Char(string='Criteria Name', required=True)
    description = fields.Text(string='Description')
    category = fields.Selection([
        ('economic', 'Economic'),
        ('social', 'Social'),
        ('environmental', 'Environmental'),
        ('technical', 'Technical'),
        ('legal', 'Legal'),
    ], string='Category', required=True)
    weight = fields.Float(string='Weight', default=1.0)
    measurement_unit = fields.Char(string='Measurement Unit')
    min_value = fields.Float(string='Minimum Value')
    max_value = fields.Float(string='Maximum Value')
    is_active = fields.Boolean(string='Active', default=True)
    parent_id = fields.Many2one('mcda.criteria', string='Parent Criteria')
    child_ids = fields.One2many('mcda.criteria', 'parent_id', string='Sub-Criteria')
    
    @api.constrains('weight')
    def _check_weight(self):
        for record in self:
            if record.weight < 0:
                raise ValidationError("Weight cannot be negative")
```

#### 2.1.2 MCDA Evaluation (`mcda.evaluation`)

```python
from odoo import models, fields, api
from datetime import datetime

class MCDAEvaluation(models.Model):
    _name = 'mcda.evaluation'
    _description = 'MCDA Evaluation'
    
    name = fields.Char(string='Evaluation Name', required=True)
    date = fields.Datetime(string='Evaluation Date', default=lambda self: fields.Datetime.now())
    user_id = fields.Many2one('res.users', string='Evaluator', default=lambda self: self.env.user.id)
    site_id = fields.Many2one('mcda.site', string='Site', required=True)
    score_ids = fields.One2many('mcda.score', 'evaluation_id', string='Scores')
    total_score = fields.Float(string='Total Score', compute='_compute_total_score', store=True)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], string='Status', default='draft')
    notes = fields.Text(string='Notes')
    
    @api.depends('score_ids.weighted_score')
    def _compute_total_score(self):
        for record in self:
            record.total_score = sum(record.score_ids.mapped('weighted_score'))
```

### 2.2 BMC Models

#### 2.2.1 BMC Template (`bmc.template`)

```python
from odoo import models, fields, api

class BMCTemplate(models.Model):
    _name = 'bmc.template'
    _description = 'Business Model Canvas Template'
    
    name = fields.Char(string='Template Name', required=True)
    asset_class = fields.Selection([
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('mixed_use', 'Mixed Use'),
        ('hospitality', 'Hospitality'),
        ('retail', 'Retail'),
    ], string='Asset Class', required=True)
    description = fields.Text(string='Description')
    is_active = fields.Boolean(string='Active', default=True)
    element_ids = fields.One2many('bmc.element', 'template_id', string='Elements')
    
    @api.model
    def create_canvas(self, property_id):
        # Logic to create a new canvas based on this template
        pass
```

### 2.3 Portfolio Models

#### 2.3.1 Portfolio Asset (`portfolio.asset`)

```python
from odoo import models, fields, api

class PortfolioAsset(models.Model):
    _name = 'portfolio.asset'
    _description = 'Portfolio Asset'
    
    name = fields.Char(string='Asset Name', required=True)
    property_id = fields.Many2one('property.property', string='Property')
    category_id = fields.Many2one('portfolio.category', string='Category')
    acquisition_date = fields.Date(string='Acquisition Date')
    acquisition_cost = fields.Monetary(string='Acquisition Cost', currency_field='currency_id')
    current_value = fields.Monetary(string='Current Value', currency_field='currency_id')
    currency_id = fields.Many2one('res.currency', string='Currency')
    performance_ids = fields.One2many('portfolio.performance', 'asset_id', string='Performance Metrics')
    risk_ids = fields.One2many('portfolio.risk', 'asset_id', string='Risk Assessments')
    bmc_id = fields.Many2one('bmc.canvas', string='Business Model Canvas')
    
    @api.depends('performance_ids.value')
    def _compute_performance_indicators(self):
        # Logic to compute performance indicators
        pass
```

## 3. API Endpoints and Integration Points

### 3.1 RESTful API Endpoints

#### 3.1.1 Sites API

```python
from odoo import http
from odoo.http import request
import json

class SitesController(http.Controller):
    
    @http.route('/api/v1/sites', type='http', auth='api_key', methods=['GET'], csrf=False)
    def get_sites(self, **kwargs):
        sites = request.env['mcda.site'].search([])
        result = []
        for site in sites:
            result.append({
                'id': site.id,
                'name': site.name,
                'location': site.location,
                'area': site.area,
                'status': site.state,
            })
        return json.dumps(result)
    
    @http.route('/api/v1/sites/<int:site_id>', type='http', auth='api_key', methods=['GET'], csrf=False)
    def get_site(self, site_id, **kwargs):
        site = request.env['mcda.site'].browse(site_id)
        if not site.exists():
            return json.dumps({'error': 'Site not found'})
        
        result = {
            'id': site.id,
            'name': site.name,
            'location': site.location,
            'area': site.area,
            'status': site.state,
            'evaluations': [{
                'id': eval.id,
                'date': eval.date,
                'score': eval.total_score,
            } for eval in site.evaluation_ids]
        }
        return json.dumps(result)
```

#### 3.1.2 MCDA API

```python
from odoo import http
from odoo.http import request
import json

class MCDAController(http.Controller):
    
    @http.route('/api/v1/mcda/criteria', type='http', auth='api_key', methods=['GET'], csrf=False)
    def get_criteria(self, **kwargs):
        criteria = request.env['mcda.criteria'].search([('is_active', '=', True)])
        result = []
        for criterion in criteria:
            result.append({
                'id': criterion.id,
                'name': criterion.name,
                'category': criterion.category,
                'weight': criterion.weight,
            })
        return json.dumps(result)
    
    @http.route('/api/v1/mcda/evaluate', type='json', auth='api_key', methods=['POST'], csrf=False)
    def evaluate_site(self, **kwargs):
        site_id = kwargs.get('site_id')
        scores = kwargs.get('scores', [])
        
        if not site_id:
            return {'error': 'Site ID is required'}
        
        site = request.env['mcda.site'].browse(site_id)
        if not site.exists():
            return {'error': 'Site not found'}
        
        # Create evaluation
        evaluation = request.env['mcda.evaluation'].create({
            'name': f"Evaluation for {site.name}",
            'site_id': site.id,
            'state': 'in_progress',
        })
        
        # Create scores
        for score_data in scores:
            request.env['mcda.score'].create({
                'evaluation_id': evaluation.id,
                'criteria_id': score_data.get('criteria_id'),
                'value': score_data.get('value'),
            })
        
        evaluation.state = 'completed'
        
        return {
            'evaluation_id': evaluation.id,
            'total_score': evaluation.total_score,
        }
```

### 3.2 XML-RPC Integration Examples

#### 3.2.1 Python Client for MCDA Evaluation

```python
import xmlrpc.client

# Connection parameters
url = 'https://your-odoo-instance.com'
db = 'your-database'
username = 'your-username'
password = 'your-password'

# Authenticate
common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
uid = common.authenticate(db, username, password, {})

# Create XML-RPC endpoint
models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')

# Get criteria
criteria = models.execute_kw(db, uid, password, 'mcda.criteria', 'search_read', 
                            [[['is_active', '=', True]]], 
                            {'fields': ['id', 'name', 'category', 'weight']})

# Create site
site_id = models.execute_kw(db, uid, password, 'mcda.site', 'create', [{
    'name': 'New Development Site',
    'location': 'Guatemala City',
    'area': 5000,
    'state': 'available',
}])

# Create evaluation
evaluation_id = models.execute_kw(db, uid, password, 'mcda.evaluation', 'create', [{
    'name': f"Evaluation for Site {site_id}",
    'site_id': site_id,
    'state': 'draft',
}])

# Add scores
for criterion in criteria:
    models.execute_kw(db, uid, password, 'mcda.score', 'create', [{
        'evaluation_id': evaluation_id,
        'criteria_id': criterion['id'],
        'value': 7.5,  # Example value
    }])

# Complete evaluation
models.execute_kw(db, uid, password, 'mcda.evaluation', 'write', [[evaluation_id], {
    'state': 'completed',
}])

# Get evaluation result
result = models.execute_kw(db, uid, password, 'mcda.evaluation', 'read', 
                          [[evaluation_id]], 
                          {'fields': ['total_score']})
print(f"Total score: {result[0]['total_score']}")
```

## 4. Data Transformation and ETL Processes

### 4.1 Guatemala Data Hub Integration

#### 4.1.1 Data Synchronization Process

```python
from odoo import models, fields, api
import requests
import json
from datetime import datetime

class DataHubSync(models.Model):
    _name = 'datahub.sync'
    _description = 'Guatemala Data Hub Synchronization'
    
    name = fields.Char(string='Sync Name', required=True)
    date = fields.Datetime(string='Sync Date', default=lambda self: fields.Datetime.now())
    data_type = fields.Selection([
        ('geographic', 'Geographic Data'),
        ('demographic', 'Demographic Data'),
        ('economic', 'Economic Data'),
    ], string='Data Type', required=True)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ], string='Status', default='draft')
    log = fields.Text(string='Sync Log')
    
    def sync_data(self):
        self.ensure_one()
        self.state = 'in_progress'
        self.log = f"Starting synchronization at {datetime.now()}\n"
        
        try:
            # Get connection settings
            connection = self.env['datahub.connection'].search([], limit=1)
            if not connection:
                raise Exception("Data Hub connection not configured")
            
            # Prepare request
            url = f"{connection.api_url}/{self.data_type}"
            headers = {
                'Authorization': f"Bearer {connection.api_key}",
                'Content-Type': 'application/json'
            }
            
            # Make request
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            # Process data based on type
            if self.data_type == 'geographic':
                self._process_geographic_data(data)
            elif self.data_type == 'demographic':
                self._process_demographic_data(data)
            elif self.data_type == 'economic':
                self._process_economic_data(data)
            
            self.log += f"Synchronization completed successfully at {datetime.now()}\n"
            self.state = 'completed'
            
        except Exception as e:
            self.log += f"Error during synchronization: {str(e)}\n"
            self.state = 'failed'
    
    def _process_geographic_data(self, data):
        # Logic to process and store geographic data
        self.log += f"Processing {len(data)} geographic records\n"
        
        for item in data:
            # Create or update geographic data
            geo_data = self.env['datahub.data'].search([
                ('external_id', '=', item.get('id')),
                ('data_type', '=', 'geographic')
            ], limit=1)
            
            values = {
                'name': item.get('name'),
                'data_type': 'geographic',
                'external_id': item.get('id'),
                'data': json.dumps(item),
                'last_update': fields.Datetime.now(),
            }
            
            if geo_data:
                geo_data.write(values)
            else:
                self.env['datahub.data'].create(values)
```

### 4.2 Business Model Canvas Generation

#### 4.2.1 BMC Generation Wizard

```python
from odoo import models, fields, api

class BMCGenerationWizard(models.TransientModel):
    _name = 'bmc.generation.wizard'
    _description = 'Business Model Canvas Generation Wizard'
    
    property_id = fields.Many2one('property.property', string='Property', required=True)
    template_id = fields.Many2one('bmc.template', string='Template', required=True)
    asset_class = fields.Selection(related='template_id.asset_class', readonly=True)
    
    @api.onchange('property_id')
    def _onchange_property(self):
        if self.property_id:
            # Suggest template based on property characteristics
            property_type = self.property_id.property_type
            if property_type == 'residential':
                templates = self.env['bmc.template'].search([('asset_class', '=', 'residential')])
                if templates:
                    self.template_id = templates[0].id
    
    def generate_canvas(self):
        self.ensure_one()
        
        # Create canvas
        canvas = self.env['bmc.canvas'].create({
            'name': f"BMC for {self.property_id.name}",
            'property_id': self.property_id.id,
            'template_id': self.template_id.id,
        })
        
        # Create elements based on template
        for template_element in self.template_id.element_ids:
            self.env['bmc.element'].create({
                'canvas_id': canvas.id,
                'name': template_element.name,
                'section': template_element.section,
                'description': template_element.description,
                'sequence': template_element.sequence,
            })
        
        # Pre-fill data from property
        self._prefill_canvas_data(canvas)
        
        # Return action to view the canvas
        return {
            'name': 'Business Model Canvas',
            'type': 'ir.actions.act_window',
            'res_model': 'bmc.canvas',
            'res_id': canvas.id,
            'view_mode': 'form',
            'target': 'current',
        }
    
    def _prefill_canvas_data(self, canvas):
        # Logic to pre-fill canvas elements based on property data
        property = self.property_id
        
        # Example: Fill customer segments based on property location
        customer_segment = canvas.element_ids.filtered(lambda e: e.section == 'customer_segments')
        if customer_segment and property.city_id:
            demographic_data = self.env['datahub.data'].search([
                ('data_type', '=', 'demographic'),
                ('name', 'ilike', property.city_id.name)
            ], limit=1)
            
            if demographic_data:
                data = json.loads(demographic_data.data)
                customer_segment.write({
                    'description': f"Primary demographic: {data.get('primary_demographic')}\n"
                                  f"Income level: {data.get('income_level')}\n"
                                  f"Age group: {data.get('age_group')}"
                })
```

## 5. Workflow Definitions

### 5.1 Site Selection Workflow

```xml
<record id="mcda_site_selection_workflow" model="workflow">
    <field name="name">Site Selection Workflow</field>
    <field name="osv">mcda.site</field>
    <field name="on_create">True</field>
</record>

<record id="activity_site_draft" model="workflow.activity">
    <field name="name">Draft</field>
    <field name="wkf_id" ref="mcda_site_selection_workflow"/>
    <field name="flow_start">True</field>
    <field name="kind">function</field>
    <field name="action">action_draft()</field>
</record>

<record id="activity_site_data_collection" model="workflow.activity">
    <field name="name">Data Collection</field>
    <field name="wkf_id" ref="mcda_site_selection_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_data_collection()</field>
</record>

<record id="activity_site_evaluation" model="workflow.activity">
    <field name="name">Evaluation</field>
    <field name="wkf_id" ref="mcda_site_selection_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_evaluation()</field>
</record>

<record id="activity_site_approved" model="workflow.activity">
    <field name="name">Approved</field>
    <field name="wkf_id" ref="mcda_site_selection_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_approve()</field>
</record>

<record id="activity_site_rejected" model="workflow.activity">
    <field name="name">Rejected</field>
    <field name="wkf_id" ref="mcda_site_selection_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_reject()</field>
</record>

<record id="trans_draft_data_collection" model="workflow.transition">
    <field name="act_from" ref="activity_site_draft"/>
    <field name="act_to" ref="activity_site_data_collection"/>
    <field name="signal">button_collect_data</field>
</record>

<record id="trans_data_collection_evaluation" model="workflow.transition">
    <field name="act_from" ref="activity_site_data_collection"/>
    <field name="act_to" ref="activity_site_evaluation"/>
    <field name="signal">button_evaluate</field>
</record>

<record id="trans_evaluation_approved" model="workflow.transition">
    <field name="act_from" ref="activity_site_evaluation"/>
    <field name="act_to" ref="activity_site_approved"/>
    <field name="signal">button_approve</field>
</record>

<record id="trans_evaluation_rejected" model="workflow.transition">
    <field name="act_from" ref="activity_site_evaluation"/>
    <field name="act_to" ref="activity_site_rejected"/>
    <field name="signal">button_reject</field>
</record>
```

### 5.2 Business Model Structuring Workflow

```xml
<record id="bmc_workflow" model="workflow">
    <field name="name">Business Model Canvas Workflow</field>
    <field name="osv">bmc.canvas</field>
    <field name="on_create">True</field>
</record>

<record id="activity_bmc_draft" model="workflow.activity">
    <field name="name">Draft</field>
    <field name="wkf_id" ref="bmc_workflow"/>
    <field name="flow_start">True</field>
    <field name="kind">function</field>
    <field name="action">action_draft()</field>
</record>

<record id="activity_bmc_in_progress" model="workflow.activity">
    <field name="name">In Progress</field>
    <field name="wkf_id" ref="bmc_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_in_progress()</field>
</record>

<record id="activity_bmc_analysis" model="workflow.activity">
    <field name="name">Analysis</field>
    <field name="wkf_id" ref="bmc_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_analysis()</field>
</record>

<record id="activity_bmc_validated" model="workflow.activity">
    <field name="name">Validated</field>
    <field name="wkf_id" ref="bmc_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_validate()</field>
</record>

<record id="activity_bmc_rejected" model="workflow.activity">
    <field name="name">Rejected</field>
    <field name="wkf_id" ref="bmc_workflow"/>
    <field name="kind">function</field>
    <field name="action">action_reject()</field>
</record>

<record id="trans_draft_in_progress" model="workflow.transition">
    <field name="act_from" ref="activity_bmc_draft"/>
    <field name="act_to" ref="activity_bmc_in_progress"/>
    <field name="signal">button_start</field>
</record>

<record id="trans_in_progress_analysis" model="workflow.transition">
    <field name="act_from" ref="activity_bmc_in_progress"/>
    <field name="act_to" ref="activity_bmc_analysis"/>
    <field name="signal">button_analyze</field>
</record>

<record id="trans_analysis_validated" model="workflow.transition">
    <field name="act_from" ref="activity_bmc_analysis"/>
    <field name="act_to" ref="activity_bmc_validated"/>
    <field name="signal">button_validate</field>
</record>

<record id="trans_analysis_rejected" model="workflow.transition">
    <field name="act_from" ref="activity_bmc_analysis"/>
    <field name="act_to" ref="activity_bmc_rejected"/>
    <field name="signal">button_reject</field>
</record>
```

## 6. Security and Access Control

### 6.1 Security Groups

```xml
<record id="module_category_urbop" model="ir.module.category">
    <field name="name">URBOP</field>
    <field name="description">Category for URBOP modules</field>
    <field name="sequence">20</field>
</record>

<record id="group_urbop_user" model="res.groups">
    <field name="name">User</field>
    <field name="category_id" ref="module_category_urbop"/>
    <field name="implied_ids" eval="[(4, ref('base.group_user'))]"/>
</record>

<record id="group_urbop_manager" model="res.groups">
    <field name="name">Manager</field>
    <field name="category_id" ref="module_category_urbop"/>
    <field name="implied_ids" eval="[(4, ref('group_urbop_user'))]"/>
    <field name="users" eval="[(4, ref('base.user_root')), (4, ref('base.user_admin'))]"/>
</record>

<record id="group_urbop_admin" model="res.groups">
    <field name="name">Administrator</field>
    <field name="category_id" ref="module_category_urbop"/>
    <field name="implied_ids" eval="[(4, ref('group_urbop_manager'))]"/>
    <field name="users" eval="[(4, ref('base.user_root')), (4, ref('base.user_admin'))]"/>
</record>
```

### 6.2 Access Control Rules

```xml
<!-- MCDA Access Rights -->
<record id="access_mcda_criteria_user" model="ir.model.access">
    <field name="name">mcda.criteria.user</field>
    <field name="model_id" ref="model_mcda_criteria"/>
    <field name="group_id" ref="group_urbop_user"/>
    <field name="perm_read" eval="1"/>
    <field name="perm_write" eval="0"/>
    <field name="perm_create" eval="0"/>
    <field name="perm_unlink" eval="0"/>
</record>

<record id="access_mcda_criteria_manager" model="ir.model.access">
    <field name="name">mcda.criteria.manager</field>
    <field name="model_id" ref="model_mcda_criteria"/>
    <field name="group_id" ref="group_urbop_manager"/>
    <field name="perm_read" eval="1"/>
    <field name="perm_write" eval="1"/>
    <field name="perm_create" eval="1"/>
    <field name="perm_unlink" eval="0"/>
</record>

<record id="access_mcda_criteria_admin" model="ir.model.access">
    <field name="name">mcda.criteria.admin</field>
    <field name="model_id" ref="model_mcda_criteria"/>
    <field name="group_id" ref="group_urbop_admin"/>
    <field name="perm_read" eval="1"/>
    <field name="perm_write" eval="1"/>
    <field name="perm_create" eval="1"/>
    <field name="perm_unlink" eval="1"/>
</record>

<!-- Record Rules -->
<record id="rule_mcda_evaluation_user" model="ir.rule">
    <field name="name">MCDA Evaluation: User can only see own evaluations</field>
    <field name="model_id" ref="model_mcda_evaluation"/>
    <field name="domain_force">[('user_id', '=', user.id)]</field>
    <field name="groups" eval="[(4, ref('group_urbop_user'))]"/>
</record>

<record id="rule_mcda_evaluation_manager" model="ir.rule">
    <field name="name">MCDA Evaluation: Manager can see all evaluations</field>
    <field name="model_id" ref="model_mcda_evaluation"/>
    <field name="domain_force">[(1, '=', 1)]</field>
    <field name="groups" eval="[(4, ref('group_urbop_manager'))]"/>
</record>
```

## 7. User Interface Components

### 7.1 MCDA Evaluation Form View

```xml
<record id="view_mcda_evaluation_form" model="ir.ui.view">
    <field name="name">mcda.evaluation.form</field>
    <field name="model">mcda.evaluation</field>
    <field name="arch" type="xml">
        <form string="MCDA Evaluation">
            <header>
                <button name="button_draft" string="Set to Draft" type="object" states="in_progress"/>
                <button name="button_in_progress" string="Start Evaluation" type="object" class="oe_highlight" states="draft"/>
                <button name="button_complete" string="Complete" type="object" class="oe_highlight" states="in_progress"/>
                <button name="button_cancel" string="Cancel" type="object" states="draft,in_progress"/>
                <field name="state" widget="statusbar" statusbar_visible="draft,in_progress,completed"/>
            </header>
            <sheet>
                <div class="oe_title">
                    <h1>
                        <field name="name" placeholder="Evaluation Name"/>
                    </h1>
                </div>
                <group>
                    <group>
                        <field name="site_id"/>
                        <field name="date"/>
                    </group>
                    <group>
                        <field name="user_id"/>
                        <field name="total_score" widget="progressbar"/>
                    </group>
                </group>
                <notebook>
                    <page string="Scores">
                        <field name="score_ids">
                            <tree editable="bottom">
                                <field name="criteria_id"/>
                                <field name="criteria_category"/>
                                <field name="weight"/>
                                <field name="value"/>
                                <field name="weighted_score"/>
                            </tree>
                        </field>
                    </page>
                    <page string="Notes">
                        <field name="notes"/>
                    </page>
                </notebook>
            </sheet>
            <div class="oe_chatter">
                <field name="message_follower_ids" widget="mail_followers"/>
                <field name="message_ids" widget="mail_thread"/>
            </div>
        </form>
    </field>
</record>
```

### 7.2 Business Model Canvas Form View

```xml
<record id="view_bmc_canvas_form" model="ir.ui.view">
    <field name="name">bmc.canvas.form</field>
    <field name="model">bmc.canvas</field>
    <field name="arch" type="xml">
        <form string="Business Model Canvas">
            <header>
                <button name="button_draft" string="Set to Draft" type="object" states="in_progress,analysis"/>
                <button name="button_start" string="Start Editing" type="object" class="oe_highlight" states="draft"/>
                <button name="button_analyze" string="Analyze" type="object" class="oe_highlight" states="in_progress"/>
                <button name="button_validate" string="Validate" type="object" class="oe_highlight" states="analysis"/>
                <button name="button_reject" string="Reject" type="object" states="analysis"/>
                <field name="state" widget="statusbar" statusbar_visible="draft,in_progress,analysis,validated"/>
            </header>
            <sheet>
                <div class="oe_title">
                    <h1>
                        <field name="name" placeholder="Canvas Name"/>
                    </h1>
                </div>
                <group>
                    <group>
                        <field name="property_id"/>
                        <field name="template_id"/>
                    </group>
                    <group>
                        <field name="create_date"/>
                        <field name="create_uid"/>
                    </group>
                </group>
                <div class="oe_bmc_container">
                    <div class="row">
                        <div class="col-md-2 oe_bmc_section" id="key_partners">
                            <h3>Key Partners</h3>
                            <field name="element_ids" domain="[('section', '=', 'key_partners')]" context="{'default_section': 'key_partners'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-2 oe_bmc_section" id="key_activities">
                            <h3>Key Activities</h3>
                            <field name="element_ids" domain="[('section', '=', 'key_activities')]" context="{'default_section': 'key_activities'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-2 oe_bmc_section" id="value_propositions">
                            <h3>Value Propositions</h3>
                            <field name="element_ids" domain="[('section', '=', 'value_propositions')]" context="{'default_section': 'value_propositions'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-2 oe_bmc_section" id="customer_relationships">
                            <h3>Customer Relationships</h3>
                            <field name="element_ids" domain="[('section', '=', 'customer_relationships')]" context="{'default_section': 'customer_relationships'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-2 oe_bmc_section" id="customer_segments">
                            <h3>Customer Segments</h3>
                            <field name="element_ids" domain="[('section', '=', 'customer_segments')]" context="{'default_section': 'customer_segments'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 oe_bmc_section" id="key_resources">
                            <h3>Key Resources</h3>
                            <field name="element_ids" domain="[('section', '=', 'key_resources')]" context="{'default_section': 'key_resources'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-8 oe_bmc_section" id="channels">
                            <h3>Channels</h3>
                            <field name="element_ids" domain="[('section', '=', 'channels')]" context="{'default_section': 'channels'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 oe_bmc_section" id="cost_structure">
                            <h3>Cost Structure</h3>
                            <field name="element_ids" domain="[('section', '=', 'cost_structure')]" context="{'default_section': 'cost_structure'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                        <div class="col-md-6 oe_bmc_section" id="revenue_streams">
                            <h3>Revenue Streams</h3>
                            <field name="element_ids" domain="[('section', '=', 'revenue_streams')]" context="{'default_section': 'revenue_streams'}" mode="tree">
                                <tree editable="bottom">
                                    <field name="name"/>
                                    <field name="description"/>
                                    <field name="section" invisible="1"/>
                                </tree>
                            </field>
                        </div>
                    </div>
                </div>
                <notebook>
                    <page string="Analysis">
                        <field name="analysis_ids">
                            <tree>
                                <field name="name"/>
                                <field name="date"/>
                                <field name="score"/>
                                <field name="recommendation"/>
                            </tree>
                        </field>
                    </page>
                    <page string="Notes">
                        <field name="notes"/>
                    </page>
                </notebook>
            </sheet>
            <div class="oe_chatter">
                <field name="message_follower_ids" widget="mail_followers"/>
                <field name="message_ids" widget="mail_thread"/>
            </div>
        </form>
    </field>
</record>
```

This integration framework provides a comprehensive foundation for implementing the system architecture designed for connecting Odoo ERP with Multi-Criteria Decision Analysis for site selection, business model structuring, and portfolio management in Guatemala.
