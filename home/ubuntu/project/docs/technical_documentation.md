# Technical Documentation: Odoo ERP Integration with MCDA

## Overview

This technical documentation provides detailed information for developers and system administrators implementing the integration between Odoo ERP and Multi-Criteria Decision Analysis (MCDA) systems for site selection, business model structuring, and portfolio management in Guatemala.

## System Requirements

### Hardware Requirements

#### Development Environment
- CPU: 4+ cores
- RAM: 8GB minimum, 16GB recommended
- Storage: 100GB SSD
- Network: 100Mbps+ internet connection

#### Production Environment
- CPU: 8+ cores
- RAM: 16GB minimum, 32GB recommended
- Storage: 500GB SSD with RAID configuration
- Network: 1Gbps+ internet connection with redundancy

### Software Requirements

#### Server Software
- Operating System: Ubuntu 20.04 LTS or newer
- Database: PostgreSQL 12 or newer
- Web Server: Nginx 1.18 or newer
- Python: 3.8 or newer

#### Odoo Requirements
- Odoo Version: 15.0 or newer
- Odoo Enterprise subscription (recommended for production)
- Required Odoo modules:
  - Base
  - CRM
  - Project
  - Accounting
  - Real Estate (if available, or custom implementation)

#### Development Tools
- Git
- Python development tools
- IDE (VSCode, PyCharm, etc.)
- PostgreSQL client tools
- XML/XPath tools

## Installation Guide

### 1. Base System Setup

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install required packages
sudo apt install -y git python3-pip build-essential wget python3-dev python3-venv \
    python3-wheel libxslt-dev libzip-dev libldap2-dev libsasl2-dev \
    python3-setuptools node-less libjpeg-dev zlib1g-dev libpq-dev \
    libxml2-dev libxslt1-dev libldap2-dev libtiff5-dev libjpeg8-dev \
    libopenjp2-7-dev liblcms2-dev libwebp-dev libharfbuzz-dev libfribidi-dev \
    libxcb1-dev postgresql nginx
```

### 2. PostgreSQL Setup

```bash
# Create database user
sudo -u postgres createuser -s odoo

# Create databases
sudo -u postgres createdb urbop_dev
sudo -u postgres createdb urbop_test
sudo -u postgres createdb urbop_prod

# Set password for odoo user
sudo -u postgres psql
postgres=# ALTER USER odoo WITH PASSWORD 'secure_password';
postgres=# \q
```

### 3. Odoo Installation

```bash
# Create odoo user
sudo useradd -m -d /opt/odoo -U -r -s /bin/bash odoo

# Clone Odoo repository
sudo git clone --depth 1 --branch 15.0 https://www.github.com/odoo/odoo /opt/odoo/odoo

# Create Python virtual environment
sudo python3 -m venv /opt/odoo/venv
sudo /opt/odoo/venv/bin/pip3 install -r /opt/odoo/odoo/requirements.txt

# Create directories
sudo mkdir -p /opt/odoo/custom/addons
sudo mkdir -p /var/log/odoo
sudo chown -R odoo: /opt/odoo/
sudo chown -R odoo: /var/log/odoo/
```

### 4. Odoo Configuration

Create the configuration file:

```bash
sudo mkdir /etc/odoo
sudo cp /opt/odoo/odoo/debian/odoo.conf /etc/odoo/odoo.conf
sudo chown odoo: /etc/odoo/odoo.conf
sudo chmod 640 /etc/odoo/odoo.conf
```

Edit the configuration file:

```bash
sudo nano /etc/odoo/odoo.conf
```

Configuration content:

```ini
[options]
; This is the password that allows database operations:
admin_passwd = admin_secure_password
db_host = False
db_port = False
db_user = odoo
db_password = secure_password
addons_path = /opt/odoo/odoo/addons,/opt/odoo/custom/addons
logfile = /var/log/odoo/odoo.log
logrotate = True
log_level = info
```

### 5. Systemd Service Setup

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/odoo.service
```

Service file content:

```ini
[Unit]
Description=Odoo
Requires=postgresql.service
After=network.target postgresql.service

[Service]
Type=simple
SyslogIdentifier=odoo
PermissionsStartOnly=true
User=odoo
Group=odoo
ExecStart=/opt/odoo/venv/bin/python3 /opt/odoo/odoo/odoo-bin -c /etc/odoo/odoo.conf
StandardOutput=journal+console
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable odoo
sudo systemctl start odoo
```

### 6. Nginx Configuration

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/odoo
```

Configuration content:

```nginx
upstream odoo {
    server 127.0.0.1:8069;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /etc/ssl/your-domain.com.crt;
    ssl_certificate_key /etc/ssl/your-domain.com.key;
    ssl_session_timeout 30m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-CHACHA20-POLY1305';
    ssl_prefer_server_ciphers off;

    # Log files
    access_log /var/log/nginx/odoo.access.log;
    error_log /var/log/nginx/odoo.error.log;

    # Proxy headers
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;

    # Increase proxy buffer size
    proxy_buffers 16 64k;
    proxy_buffer_size 128k;

    # Odoo web
    location / {
        proxy_pass http://odoo;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
    }

    # Longpolling
    location /longpolling {
        proxy_pass http://odoo;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
    }

    # Static files
    location ~* /web/static/ {
        proxy_cache_valid 200 60m;
        proxy_buffering on;
        expires 864000;
        proxy_pass http://odoo;
    }

    # Gzip
    gzip on;
    gzip_min_length 1000;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/xml text/css text/javascript application/javascript application/json application/xml;
    gzip_disable "MSIE [1-6]\.";
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/odoo /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## Custom Module Development

### 1. Module Structure

Each custom module follows the standard Odoo module structure:

```
module_name/
├── __init__.py
├── __manifest__.py
├── models/
│   ├── __init__.py
│   └── model_files.py
├── views/
│   └── view_files.xml
├── security/
│   ├── ir.model.access.csv
│   └── security_rules.xml
├── data/
│   └── data_files.xml
├── static/
│   ├── description/
│   │   └── icon.png
│   ├── src/
│   │   ├── js/
│   │   ├── css/
│   │   └── xml/
├── controllers/
│   ├── __init__.py
│   └── controller_files.py
└── wizard/
    ├── __init__.py
    └── wizard_files.py
```

### 2. Module Creation

Create the module scaffolding:

```bash
cd /opt/odoo/custom/addons
/opt/odoo/odoo/odoo-bin scaffold urbop_mcda
```

### 3. Manifest File

The `__manifest__.py` file defines the module metadata:

```python
{
    'name': 'URBOP MCDA',
    'version': '1.0',
    'category': 'Real Estate',
    'summary': 'Multi-Criteria Decision Analysis for Site Selection',
    'description': """
        This module implements Multi-Criteria Decision Analysis for site selection
        in real estate development projects.
    """,
    'author': 'URBOP',
    'website': 'https://www.urbop.com',
    'depends': ['base', 'mail', 'urbop_datahub'],
    'data': [
        'security/mcda_security.xml',
        'security/ir.model.access.csv',
        'views/mcda_criteria_views.xml',
        'views/mcda_evaluation_views.xml',
        'views/mcda_score_views.xml',
        'views/mcda_site_views.xml',
        'views/mcda_menu.xml',
        'data/mcda_criteria_data.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
```

### 4. Model Definition

Example model definition in `models/mcda_criteria.py`:

```python
from odoo import models, fields, api
from odoo.exceptions import ValidationError

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

### 5. View Definition

Example view definition in `views/mcda_criteria_views.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <record id="view_mcda_criteria_form" model="ir.ui.view">
        <field name="name">mcda.criteria.form</field>
        <field name="model">mcda.criteria</field>
        <field name="arch" type="xml">
            <form string="MCDA Criteria">
                <sheet>
                    <div class="oe_title">
                        <h1>
                            <field name="name" placeholder="Criteria Name"/>
                        </h1>
                    </div>
                    <group>
                        <group>
                            <field name="category"/>
                            <field name="weight"/>
                            <field name="measurement_unit"/>
                        </group>
                        <group>
                            <field name="min_value"/>
                            <field name="max_value"/>
                            <field name="is_active"/>
                            <field name="parent_id"/>
                        </group>
                    </group>
                    <notebook>
                        <page string="Description">
                            <field name="description"/>
                        </page>
                        <page string="Sub-Criteria" attrs="{'invisible': [('parent_id', '!=', False)]}">
                            <field name="child_ids">
                                <tree>
                                    <field name="name"/>
                                    <field name="category"/>
                                    <field name="weight"/>
                                    <field name="is_active"/>
                                </tree>
                            </field>
                        </page>
                    </notebook>
                </sheet>
            </form>
        </field>
    </record>

    <record id="view_mcda_criteria_tree" model="ir.ui.view">
        <field name="name">mcda.criteria.tree</field>
        <field name="model">mcda.criteria</field>
        <field name="arch" type="xml">
            <tree string="MCDA Criteria">
                <field name="name"/>
                <field name="category"/>
                <field name="weight"/>
                <field name="is_active"/>
            </tree>
        </field>
    </record>

    <record id="view_mcda_criteria_search" model="ir.ui.view">
        <field name="name">mcda.criteria.search</field>
        <field name="model">mcda.criteria</field>
        <field name="arch" type="xml">
            <search string="MCDA Criteria">
                <field name="name"/>
                <field name="category"/>
                <filter string="Active" name="active" domain="[('is_active', '=', True)]"/>
                <filter string="Inactive" name="inactive" domain="[('is_active', '=', False)]"/>
                <group expand="0" string="Group By">
                    <filter string="Category" name="group_by_category" context="{'group_by': 'category'}"/>
                </group>
            </search>
        </field>
    </record>

    <record id="action_mcda_criteria" model="ir.actions.act_window">
        <field name="name">Criteria</field>
        <field name="res_model">mcda.criteria</field>
        <field name="view_mode">tree,form</field>
        <field name="context">{'search_default_active': 1}</field>
        <field name="help" type="html">
            <p class="o_view_nocontent_smiling_face">
                Create your first MCDA criterion
            </p>
        </field>
    </record>
</odoo>
```

### 6. Security Configuration

Example security file `security/ir.model.access.csv`:

```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_mcda_criteria_user,mcda.criteria.user,model_mcda_criteria,urbop_mcda.group_urbop_user,1,0,0,0
access_mcda_criteria_manager,mcda.criteria.manager,model_mcda_criteria,urbop_mcda.group_urbop_manager,1,1,1,0
access_mcda_criteria_admin,mcda.criteria.admin,model_mcda_criteria,urbop_mcda.group_urbop_admin,1,1,1,1
```

Example security groups in `security/mcda_security.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
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
</odoo>
```

## API Integration

### 1. RESTful API Controller

Example controller in `controllers/mcda_controller.py`:

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

### 2. XML-RPC Client Example

Python client for XML-RPC integration:

```python
import xmlrpc.client

def connect_to_odoo(url, db, username, password):
    """
    Connect to Odoo server and return common and models endpoints
    """
    common = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/common')
    uid = common.authenticate(db, username, password, {})
    models = xmlrpc.client.ServerProxy(f'{url}/xmlrpc/2/object')
    
    return uid, models

def get_criteria(models, db, uid, password):
    """
    Get all active MCDA criteria
    """
    return models.execute_kw(db, uid, password, 'mcda.criteria', 'search_read', 
                            [[['is_active', '=', True]]], 
                            {'fields': ['id', 'name', 'category', 'weight']})

def create_site(models, db, uid, password, site_data):
    """
    Create a new site
    """
    return models.execute_kw(db, uid, password, 'mcda.site', 'create', [site_data])

def create_evaluation(models, db, uid, password, site_id, scores):
    """
    Create an evaluation for a site with scores
    """
    # Create evaluation
    evaluation_id = models.execute_kw(db, uid, password, 'mcda.evaluation', 'create', [{
        'name': f"Evaluation for Site {site_id}",
        'site_id': site_id,
        'state': 'draft',
    }])
    
    # Add scores
    for score in scores:
        models.execute_kw(db, uid, password, 'mcda.score', 'create', [{
            'evaluation_id': evaluation_id,
            'criteria_id': score['criteria_id'],
            'value': score['value'],
        }])
    
    # Complete evaluation
    models.execute_kw(db, uid, password, 'mcda.evaluation', 'write', [[evaluation_id], {
        'state': 'completed',
    }])
    
    # Get evaluation result
    result = models.execute_kw(db, uid, password, 'mcda.evaluation', 'read', 
                              [[evaluation_id]], 
                              {'fields': ['total_score']})
    
    return result[0]

# Example usage
if __name__ == "__main__":
    # Connection parameters
    url = 'https://your-odoo-instance.com'
    db = 'your-database'
    username = 'your-username'
    password = 'your-password'
    
    # Connect to Odoo
    uid, models = connect_to_odoo(url, db, username, password)
    
    # Get criteria
    criteria = get_criteria(models, db, uid, password)
    
    # Create site
    site_data = {
        'name': 'New Development Site',
        'location': 'Guatemala City',
        'area': 5000,
        'state': 'available',
    }
    site_id = create_site(models, db, uid, password, site_data)
    
    # Create scores for evaluation
    scores = []
    for criterion in criteria:
        scores.append({
            'criteria_id': criterion['id'],
            'value': 7.5,  # Example value
        })
    
    # Create evaluation
    evaluation = create_evaluation(models, db, uid, password, site_id, scores)
    
    print(f"Site created with ID: {site_id}")
    print(f"Evaluation total score: {evaluation['total_score']}")
```

## Database Schema

### 1. MCDA Module Tables

#### mcda.criteria

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Criteria name                              |
| description     | Text      | Detailed description                       |
| category        | Selection | Category (economic, social, etc.)          |
| weight          | Float     | Weight for scoring calculation             |
| measurement_unit| Char      | Unit of measurement                        |
| min_value       | Float     | Minimum possible value                     |
| max_value       | Float     | Maximum possible value                     |
| is_active       | Boolean   | Whether the criteria is active             |
| parent_id       | Many2one  | Reference to parent criteria (if any)      |

#### mcda.site

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Site name                                  |
| location        | Char      | Location description                       |
| area            | Float     | Site area in square meters                 |
| state           | Selection | Status (available, reserved, sold, etc.)   |
| evaluation_ids  | One2many  | Related evaluations                        |

#### mcda.evaluation

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Evaluation name                            |
| date            | Datetime  | Evaluation date                            |
| user_id         | Many2one  | User who performed the evaluation          |
| site_id         | Many2one  | Related site                               |
| score_ids       | One2many  | Individual scores                          |
| total_score     | Float     | Computed total score                       |
| state           | Selection | Status (draft, in_progress, completed)     |
| notes           | Text      | Additional notes                           |

#### mcda.score

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| evaluation_id   | Many2one  | Related evaluation                         |
| criteria_id     | Many2one  | Related criteria                           |
| value           | Float     | Score value                                |
| weight          | Float     | Related criteria weight (computed)         |
| weighted_score  | Float     | Computed weighted score (value * weight)   |

### 2. BMC Module Tables

#### bmc.template

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Template name                              |
| asset_class     | Selection | Asset class (residential, commercial, etc.)|
| description     | Text      | Template description                       |
| is_active       | Boolean   | Whether the template is active             |
| element_ids     | One2many  | Template elements                          |

#### bmc.canvas

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Canvas name                                |
| property_id     | Many2one  | Related property                           |
| template_id     | Many2one  | Related template                           |
| element_ids     | One2many  | Canvas elements                            |
| analysis_ids    | One2many  | Analysis results                           |
| state           | Selection | Status (draft, in_progress, etc.)          |
| notes           | Text      | Additional notes                           |

#### bmc.element

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Element name                               |
| canvas_id       | Many2one  | Related canvas                             |
| template_id     | Many2one  | Related template                           |
| section         | Selection | BMC section (key_partners, etc.)           |
| description     | Text      | Element description                        |
| sequence        | Integer   | Display sequence                           |

### 3. Portfolio Module Tables

#### portfolio.asset

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Asset name                                 |
| property_id     | Many2one  | Related property                           |
| category_id     | Many2one  | Asset category                             |
| acquisition_date| Date      | Acquisition date                           |
| acquisition_cost| Monetary  | Acquisition cost                           |
| current_value   | Monetary  | Current value                              |
| currency_id     | Many2one  | Currency                                   |
| performance_ids | One2many  | Performance metrics                        |
| risk_ids        | One2many  | Risk assessments                           |
| bmc_id          | Many2one  | Related business model canvas              |

#### portfolio.category

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| name            | Char      | Category name                              |
| code            | Char      | Category code                              |
| parent_id       | Many2one  | Parent category                            |
| description     | Text      | Category description                       |
| asset_ids       | One2many  | Assets in this category                    |

#### portfolio.performance

| Column Name     | Data Type | Description                                |
|-----------------|-----------|-------------------------------------------|
| id              | Integer   | Primary key                                |
| asset_id        | Many2one  | Related asset                              |
| name            | Char      | Metric name                                |
| date            | Date      | Measurement date                           |
| value           | Float     | Metric value                               |
| target          | Float     | Target value                               |
| unit            | Char      | Unit of measurement                        |
| notes           | Text      | Additional notes                           |

## Troubleshooting

### 1. Common Issues and Solutions

#### Database Connection Issues

**Issue**: Unable to connect to PostgreSQL database.

**Solution**:
1. Check PostgreSQL service status: `sudo systemctl status postgresql`
2. Verify database user and permissions: `sudo -u postgres psql -c "\du"`
3. Check Odoo configuration file for correct database settings
4. Ensure PostgreSQL is listening on the correct interface: `sudo nano /etc/postgresql/12/main/postgresql.conf`

#### Module Installation Failures

**Issue**: Custom module fails to install.

**Solution**:
1. Check Odoo server logs: `sudo tail -f /var/log/odoo/odoo.log`
2. Verify module dependencies are installed
3. Check for syntax errors in Python files
4. Validate XML files for correct structure
5. Restart Odoo service: `sudo systemctl restart odoo`

#### API Authentication Issues

**Issue**: API calls return authentication errors.

**Solution**:
1. Verify API key is correctly set up in Odoo
2. Check user permissions for the models being accessed
3. Ensure the API endpoint is correctly configured
4. Verify SSL certificates if using HTTPS

### 2. Logging and Debugging

#### Enable Debug Logging

Edit the Odoo configuration file:

```bash
sudo nano /etc/odoo/odoo.conf
```

Change the log level:

```ini
log_level = debug
```

Restart Odoo:

```bash
sudo systemctl restart odoo
```

#### View Logs

```bash
sudo tail -f /var/log/odoo/odoo.log
```

#### Developer Mode

Access Odoo with developer mode by adding `?debug=1` to the URL:

```
https://your-domain.com/web?debug=1
```

### 3. Performance Optimization

#### Database Optimization

```sql
-- Analyze tables
ANALYZE;

-- Add indexes to frequently queried fields
CREATE INDEX IF NOT EXISTS mcda_criteria_category_idx ON mcda_criteria (category);
CREATE INDEX IF NOT EXISTS mcda_evaluation_site_id_idx ON mcda_evaluation (site_id);
CREATE INDEX IF NOT EXISTS portfolio_asset_category_id_idx ON portfolio_asset (category_id);
```

#### Odoo Configuration Optimization

Edit the Odoo configuration file:

```ini
[options]
; Worker configuration
workers = 4
max_cron_threads = 2

; Memory management
limit_memory_hard = 2684354560
limit_memory_soft = 2147483648
limit_request = 8192
limit_time_cpu = 60
limit_time_real = 120

; HTTP configuration
proxy_mode = True
```

#### Nginx Caching

Add caching configuration to Nginx:

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=odoo_cache:10m max_size=1g inactive=60m;

# In server block
location ~* /web/static/ {
    proxy_cache odoo_cache;
    proxy_cache_valid 200 302 304 60m;
    proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
    proxy_buffering on;
    expires 864000;
    proxy_pass http://odoo;
}
```

## Backup and Recovery

### 1. Database Backup

#### Manual Backup

```bash
# Backup a specific database
sudo -u postgres pg_dump urbop_prod > /path/to/backup/urbop_prod_$(date +%Y%m%d).sql

# Backup all databases
sudo -u postgres pg_dumpall > /path/to/backup/all_databases_$(date +%Y%m%d).sql
```

#### Automated Backup Script

Create a backup script:

```bash
sudo nano /opt/odoo/backup.sh
```

Script content:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/odoo"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="urbop_prod"
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup database
sudo -u postgres pg_dump $DB_NAME > $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Remove backups older than 30 days
find $BACKUP_DIR -name "${DB_NAME}_*.sql.gz" -mtime +30 -delete
```

Make the script executable:

```bash
sudo chmod +x /opt/odoo/backup.sh
```

Add to crontab:

```bash
sudo crontab -e
```

Add the following line to run daily at 2 AM:

```
0 2 * * * /opt/odoo/backup.sh
```

### 2. Filestore Backup

```bash
# Backup Odoo filestore
sudo tar -czf /path/to/backup/filestore_$(date +%Y%m%d).tar.gz /opt/odoo/.local/share/Odoo/filestore/urbop_prod
```

### 3. Recovery Procedure

#### Database Recovery

```bash
# Stop Odoo service
sudo systemctl stop odoo

# Drop existing database if needed
sudo -u postgres dropdb urbop_prod

# Create empty database
sudo -u postgres createdb urbop_prod

# Restore database
sudo -u postgres psql urbop_prod < /path/to/backup/urbop_prod_20250401.sql

# Start Odoo service
sudo systemctl start odoo
```

#### Filestore Recovery

```bash
# Stop Odoo service
sudo systemctl stop odoo

# Restore filestore
sudo rm -rf /opt/odoo/.local/share/Odoo/filestore/urbop_prod
sudo mkdir -p /opt/odoo/.local/share/Odoo/filestore/urbop_prod
sudo tar -xzf /path/to/backup/filestore_20250401.tar.gz -C /

# Fix permissions
sudo chown -R odoo: /opt/odoo/.local/share/Odoo/filestore/urbop_prod

# Start Odoo service
sudo systemctl start odoo
```

## Security Considerations

### 1. Authentication and Authorization

#### API Key Management

1. Generate API keys through Odoo user preferences
2. Store API keys securely in environment variables or secure storage
3. Rotate API keys periodically
4. Revoke unused or compromised API keys immediately

#### User Access Control

1. Follow the principle of least privilege
2. Create specific user roles for different responsibilities
3. Use record rules to restrict access to sensitive data
4. Regularly audit user permissions

### 2. Data Protection

#### Sensitive Data Handling

1. Encrypt sensitive data at rest
2. Use secure connections (HTTPS) for all communications
3. Implement data anonymization for testing environments
4. Create data retention policies

#### Database Security

1. Use strong passwords for database users
2. Restrict database access to local connections only
3. Implement database-level encryption if required
4. Regularly update PostgreSQL to patch security vulnerabilities

### 3. Network Security

#### Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

#### SSL/TLS Configuration

1. Use Let's Encrypt for free SSL certificates:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

2. Configure strong SSL settings in Nginx

## Maintenance Procedures

### 1. Odoo Updates

#### Minor Updates

```bash
# Stop Odoo service
sudo systemctl stop odoo

# Backup database
sudo -u postgres pg_dump urbop_prod > /path/to/backup/urbop_prod_before_update.sql

# Update Odoo code
cd /opt/odoo/odoo
sudo git pull

# Update Python dependencies
sudo /opt/odoo/venv/bin/pip3 install -r /opt/odoo/odoo/requirements.txt

# Start Odoo service
sudo systemctl start odoo

# Update modules through web interface or command line
sudo -u odoo /opt/odoo/venv/bin/python3 /opt/odoo/odoo/odoo-bin -c /etc/odoo/odoo.conf -d urbop_prod -u all
```

#### Major Version Upgrades

Major version upgrades require a more careful approach:

1. Create a complete backup of database and filestore
2. Set up a test environment with the new Odoo version
3. Follow Odoo's migration guide for the specific version
4. Test thoroughly before upgrading production

### 2. Custom Module Updates

```bash
# Stop Odoo service
sudo systemctl stop odoo

# Backup database
sudo -u postgres pg_dump urbop_prod > /path/to/backup/urbop_prod_before_module_update.sql

# Update custom module code
cd /opt/odoo/custom/addons/urbop_mcda
sudo git pull

# Start Odoo service
sudo systemctl start odoo

# Update specific module
sudo -u odoo /opt/odoo/venv/bin/python3 /opt/odoo/odoo/odoo-bin -c /etc/odoo/odoo.conf -d urbop_prod -u urbop_mcda
```

### 3. System Monitoring

#### Server Monitoring

Install monitoring tools:

```bash
sudo apt install -y htop iotop sysstat
```

Set up basic monitoring script:

```bash
#!/bin/bash
LOG_FILE="/var/log/odoo/system_monitor.log"
DATE=$(date "+%Y-%m-%d %H:%M:%S")

# CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')

# Memory usage
MEM_USAGE=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2}')

# Disk usage
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}')

# Odoo service status
ODOO_STATUS=$(systemctl is-active odoo)

# PostgreSQL status
PG_STATUS=$(systemctl is-active postgresql)

# Log information
echo "$DATE - CPU: $CPU_USAGE% | Memory: $MEM_USAGE | Disk: $DISK_USAGE | Odoo: $ODOO_STATUS | PostgreSQL: $PG_STATUS" >> $LOG_FILE

# Alert if resources are critical
if (( $(echo "$CPU_USAGE > 90" | bc -l) )); then
    echo "ALERT: High CPU usage: $CPU_USAGE%" | mail -s "Server Alert: High CPU" admin@example.com
fi

if [[ "$ODOO_STATUS" != "active" ]]; then
    echo "ALERT: Odoo service is not running" | mail -s "Server Alert: Odoo Down" admin@example.com
fi
```

Add to crontab to run every 5 minutes:

```
*/5 * * * * /path/to/monitor.sh
```

## Appendix

### 1. Command Reference

#### Odoo Server Commands

```bash
# Start Odoo server
sudo systemctl start odoo

# Stop Odoo server
sudo systemctl stop odoo

# Restart Odoo server
sudo systemctl restart odoo

# Check Odoo status
sudo systemctl status odoo

# View Odoo logs
sudo tail -f /var/log/odoo/odoo.log

# Run Odoo with specific options
sudo -u odoo /opt/odoo/venv/bin/python3 /opt/odoo/odoo/odoo-bin -c /etc/odoo/odoo.conf -d urbop_prod --test-enable
```

#### Database Commands

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# List databases
sudo -u postgres psql -c "\l"

# Create database
sudo -u postgres createdb database_name

# Drop database
sudo -u postgres dropdb database_name

# Backup database
sudo -u postgres pg_dump database_name > backup.sql

# Restore database
sudo -u postgres psql database_name < backup.sql
```

### 2. Configuration Templates

#### Odoo Configuration Template

```ini
[options]
; Admin password for database management
admin_passwd = admin_secure_password

; Database configuration
db_host = False
db_port = False
db_user = odoo
db_password = secure_password
db_name = False
db_template = template0
db_maxconn = 64

; Addons paths
addons_path = /opt/odoo/odoo/addons,/opt/odoo/custom/addons

; Server configuration
http_interface = 127.0.0.1
http_port = 8069
longpolling_port = 8072
proxy_mode = True
xmlrpc = True
xmlrpc_interface = 127.0.0.1
xmlrpc_port = 8069
netrpc = False

; Logging configuration
logfile = /var/log/odoo/odoo.log
log_level = info
logrotate = True

; Performance tuning
workers = 4
max_cron_threads = 2
limit_memory_hard = 2684354560
limit_memory_soft = 2147483648
limit_request = 8192
limit_time_cpu = 60
limit_time_real = 120
```

#### Nginx Configuration Template

```nginx
upstream odoo {
    server 127.0.0.1:8069;
}

upstream odoo-chat {
    server 127.0.0.1:8072;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_session_timeout 30m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-CHACHA20-POLY1305';
    ssl_prefer_server_ciphers off;

    # Log files
    access_log /var/log/nginx/odoo.access.log;
    error_log /var/log/nginx/odoo.error.log;

    # Proxy headers
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;

    # Increase proxy buffer size
    proxy_buffers 16 64k;
    proxy_buffer_size 128k;

    # Odoo web
    location / {
        proxy_pass http://odoo;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
    }

    # Longpolling
    location /longpolling {
        proxy_pass http://odoo-chat;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
    }

    # Static files
    location ~* /web/static/ {
        proxy_cache_valid 200 60m;
        proxy_buffering on;
        expires 864000;
        proxy_pass http://odoo;
    }

    # Gzip
    gzip on;
    gzip_min_length 1000;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/xml text/css text/javascript application/javascript application/json application/xml;
    gzip_disable "MSIE [1-6]\.";
}
```

### 3. Additional Resources

- [Odoo Official Documentation](https://www.odoo.com/documentation/15.0/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Python XML-RPC Documentation](https://docs.python.org/3/library/xmlrpc.html)
