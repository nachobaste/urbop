import { NextRequest, NextResponse } from 'next/server';
import OdooConnector from '@/lib/odoo_connector';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const skill = searchParams.get('skill');
    const wbsId = searchParams.get('wbs_id');
    
    // Create Odoo connector instance
    const odoo = new OdooConnector();
    
    // Mock O*NET data based on skill or WBS ID
    let onetData = [];
    
    if (skill) {
      // Return occupations matching the skill
      onetData = [
        {
          code: '15-1299.08',
          title: 'Urban and Regional Planners',
          description: 'Develop comprehensive plans and programs for use of land and physical facilities of jurisdictions, such as towns, cities, counties, and metropolitan areas.',
          skills: ['Urban Planning', 'GIS', 'Economic Analysis', 'Zoning'],
          match_score: 92
        },
        {
          code: '11-9199.02',
          title: 'Real Estate Development Manager',
          description: 'Plan and direct real estate development projects, ensuring compliance with regulations and project goals.',
          skills: ['Project Management', 'Financial Analysis', 'Market Research', 'Urban Planning'],
          match_score: 87
        },
        {
          code: '13-2051.00',
          title: 'Financial Analyst',
          description: 'Conduct quantitative analyses of information affecting investment programs of public or private institutions.',
          skills: ['Financial Analysis', 'Market Research', 'Economic Forecasting', 'Statistical Analysis'],
          match_score: 75
        }
      ];
    } else if (wbsId) {
      // Return occupations matching the WBS deliverable
      onetData = [
        {
          code: '15-1299.08',
          title: 'Urban and Regional Planners',
          description: 'Develop comprehensive plans and programs for use of land and physical facilities of jurisdictions, such as towns, cities, counties, and metropolitan areas.',
          skills: ['Urban Planning', 'GIS', 'Economic Analysis', 'Zoning'],
          wbs_match: 'Site Selection and Analysis',
          match_score: 95
        },
        {
          code: '17-2051.00',
          title: 'Civil Engineers',
          description: 'Perform engineering duties in planning, designing, and overseeing construction and maintenance of building structures and facilities.',
          skills: ['Infrastructure Planning', 'Structural Analysis', 'Project Management', 'CAD'],
          wbs_match: 'Infrastructure Assessment',
          match_score: 88
        },
        {
          code: '19-3011.00',
          title: 'Economists',
          description: 'Study the production and distribution of resources, goods, and services by collecting and analyzing data, researching trends, and evaluating economic issues.',
          skills: ['Economic Analysis', 'Statistical Analysis', 'Market Research', 'Forecasting'],
          wbs_match: 'Economic Impact Assessment',
          match_score: 82
        }
      ];
    } else {
      // Return general O*NET occupations relevant to economic development
      onetData = [
        {
          code: '15-1299.08',
          title: 'Urban and Regional Planners',
          description: 'Develop comprehensive plans and programs for use of land and physical facilities of jurisdictions, such as towns, cities, counties, and metropolitan areas.',
          skills: ['Urban Planning', 'GIS', 'Economic Analysis', 'Zoning'],
          match_score: 90
        },
        {
          code: '11-9199.02',
          title: 'Real Estate Development Manager',
          description: 'Plan and direct real estate development projects, ensuring compliance with regulations and project goals.',
          skills: ['Project Management', 'Financial Analysis', 'Market Research', 'Urban Planning'],
          match_score: 85
        },
        {
          code: '13-2051.00',
          title: 'Financial Analyst',
          description: 'Conduct quantitative analyses of information affecting investment programs of public or private institutions.',
          skills: ['Financial Analysis', 'Market Research', 'Economic Forecasting', 'Statistical Analysis'],
          match_score: 80
        },
        {
          code: '17-2051.00',
          title: 'Civil Engineers',
          description: 'Perform engineering duties in planning, designing, and overseeing construction and maintenance of building structures and facilities.',
          skills: ['Infrastructure Planning', 'Structural Analysis', 'Project Management', 'CAD'],
          match_score: 75
        },
        {
          code: '19-3011.00',
          title: 'Economists',
          description: 'Study the production and distribution of resources, goods, and services by collecting and analyzing data, researching trends, and evaluating economic issues.',
          skills: ['Economic Analysis', 'Statistical Analysis', 'Market Research', 'Forecasting'],
          match_score: 70
        }
      ];
    }
    
    // Mock integration with Odoo HR modules
    const odooIntegration = {
      status: 'connected',
      skill_types_mapped: true,
      job_positions_synced: true,
      last_sync: new Date().toISOString()
    };
    
    return NextResponse.json({
      onet_data: onetData,
      odoo_integration: odooIntegration
    });
  } catch (error) {
    console.error('Error fetching O*NET data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch O*NET data' },
      { status: 500 }
    );
  }
}
