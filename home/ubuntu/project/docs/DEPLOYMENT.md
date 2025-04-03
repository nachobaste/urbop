# URBOP Data Hub - Deployment Guide

This document provides detailed instructions for deploying the URBOP Data Hub platform for Latin America economic development.

## Deployment Options

The URBOP Data Hub can be deployed in several ways:

1. **Vercel Deployment** (Recommended): Zero-configuration deployment optimized for Next.js
2. **Self-Hosted Node.js**: Traditional Node.js server deployment
3. **Docker Deployment**: Containerized deployment for cloud environments
4. **Static Export**: For simple hosting without server-side features

## Prerequisites

Before deploying, ensure you have:

1. **Source Code**: Complete codebase from the repository
2. **Environment Variables**: Configuration for all required services
3. **Database Access**: Credentials for database connection
4. **Odoo Instance**: Running Odoo ERP with API access
5. **Google Earth Engine**: API access for GIS features

## Environment Variables

Create a `.env` file with the following variables:

```
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Odoo Connection
ODOO_URL=https://your-odoo-instance.com
ODOO_DB=your_database
ODOO_USERNAME=your_username
ODOO_PASSWORD=your_password

# Google Earth Engine
GOOGLE_EARTH_ENGINE_API_KEY=your_gee_api_key

# Database
DATABASE_URL=your_database_connection_string

# API Security
API_SECRET_KEY=your_api_secret_key
```

## Vercel Deployment (Recommended)

### Step 1: Prepare for Deployment

1. Ensure your code is in a Git repository (GitHub, GitLab, or Bitbucket)
2. Verify that `next.config.js` is properly configured
3. Make sure all dependencies are correctly listed in `package.json`

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard

1. Create an account on [Vercel](https://vercel.com)
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or the directory containing your Next.js app)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
5. Add environment variables from your `.env` file
6. Click "Deploy"

#### Option B: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd /path/to/urbop-data-hub
   ```

3. Run the deployment command:
   ```bash
   vercel
   ```

4. Follow the CLI prompts to configure your deployment

### Step 3: Configure Custom Domain

1. In your Vercel dashboard, select your project
2. Go to "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings

### Step 4: Set Up Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository:

1. Push changes to your repository to trigger new deployments
2. Pull requests create preview deployments
3. Configure production branch in project settings

## Self-Hosted Node.js Deployment

### Step 1: Prepare Server

1. Set up a server with Node.js 18+ installed
2. Install PM2 for process management:
   ```bash
   npm install -g pm2
   ```

3. Set up Nginx as a reverse proxy:
   ```bash
   apt-get install nginx
   ```

### Step 2: Deploy Application

1. Clone your repository:
   ```bash
   git clone <repository-url>
   cd urbop-data-hub
   ```

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Create ecosystem.config.js for PM2:
   ```javascript
   module.exports = {
     apps: [
       {
         name: 'urbop-data-hub',
         script: 'node_modules/next/dist/bin/next',
         args: 'start',
         instances: 'max',
         exec_mode: 'cluster',
         env: {
           PORT: 3000,
           NODE_ENV: 'production',
           // Add other environment variables here
         },
       },
     ],
   };
   ```

5. Start the application with PM2:
   ```bash
   pm2 start ecosystem.config.js
   ```

### Step 3: Configure Nginx

Create an Nginx configuration file:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the configuration and restart Nginx:

```bash
ln -s /etc/nginx/sites-available/urbop-data-hub /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 4: Set Up SSL with Let's Encrypt

```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## Docker Deployment

### Step 1: Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Update next.config.js

Ensure your `next.config.js` includes the `output: 'standalone'` option:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // other config options...
}

module.exports = nextConfig
```

### Step 3: Build and Run Docker Container

```bash
# Build the Docker image
docker build -t urbop-data-hub .

# Run the container
docker run -p 3000:3000 -e ODOO_URL=https://your-odoo-instance.com -e ODOO_DB=your_database -e ODOO_USERNAME=your_username -e ODOO_PASSWORD=your_password -e GOOGLE_EARTH_ENGINE_API_KEY=your_gee_api_key urbop-data-hub
```

### Step 4: Deploy with Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  app:
    image: urbop-data-hub
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: always
```

Run with Docker Compose:

```bash
docker-compose up -d
```

## Static Export (Limited Functionality)

For simple hosting without server-side features:

### Step 1: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // other config options...
}

module.exports = nextConfig
```

### Step 2: Build Static Export

```bash
npm run build
```

This generates static files in the `out` directory.

### Step 3: Deploy to Static Hosting

Upload the contents of the `out` directory to any static hosting service:

- AWS S3 + CloudFront
- Netlify
- GitHub Pages
- Cloudflare Pages

Note that static export has limitations:
- No server-side rendering
- No API routes
- Limited dynamic functionality

## Monitoring and Maintenance

### Monitoring

Set up monitoring for your deployment:

1. **Vercel Analytics**: Built-in for Vercel deployments
2. **Application Monitoring**: New Relic, Datadog, or Sentry
3. **Server Monitoring**: Prometheus + Grafana for self-hosted deployments
4. **Log Management**: ELK Stack or Papertrail

### Backup Strategy

Implement regular backups:

1. **Database Backups**: Daily automated backups
2. **Configuration Backups**: Version-controlled environment configurations
3. **Disaster Recovery Plan**: Documented recovery procedures

### Update Procedure

Keep your deployment up to date:

1. **Dependency Updates**: Regular security updates
2. **Feature Deployments**: Staged rollout through environments
3. **Rollback Procedure**: Documented process for reverting changes

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs
   - Verify dependencies
   - Ensure correct Node.js version

2. **Runtime Errors**:
   - Check application logs
   - Verify environment variables
   - Test API endpoints

3. **Performance Issues**:
   - Monitor resource usage
   - Check database query performance
   - Analyze client-side performance

### Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [Project GitHub Repository](https://github.com/your-org/urbop-data-hub)

## Security Considerations

1. **Environment Variables**: Never commit sensitive values to version control
2. **API Security**: Implement rate limiting and authentication
3. **Regular Updates**: Keep dependencies updated for security patches
4. **Access Control**: Limit access to deployment environments
5. **Compliance**: Ensure data handling complies with regional regulations

## Conclusion

The URBOP Data Hub is designed for flexible deployment options, with Vercel being the recommended approach for optimal performance and ease of maintenance. Choose the deployment strategy that best fits your organization's requirements and infrastructure capabilities.
