# Deploying Next.js Application to Vercel

This guide provides step-by-step instructions for deploying your Next.js application to Vercel, the platform created by the team behind Next.js.

## Why Vercel for Next.js Deployment?

Vercel is the native Next.js platform, designed specifically to enhance the Next.js experience:

- **Zero-configuration deployment**: Deploy with minimal setup required
- **Enhanced performance**: Global CDN with edge caching
- **Scalability**: Automatically scales with traffic
- **Availability**: High uptime and reliability
- **Framework-aware infrastructure**: Optimized specifically for Next.js

## Prerequisites

Before deploying to Vercel, ensure you have:

1. A GitHub, GitLab, or Bitbucket account (for source control)
2. Your Next.js application code ready for deployment
3. A Vercel account (free to create)

## Step 1: Prepare Your Next.js Application

Your application is already set up correctly with:
- Next.js version 14.2.11 (downgraded from 15.1.4)
- React version 18.2.0 (downgraded from 19.0.0)
- JavaScript configuration file (next.config.js) instead of TypeScript

These changes have fixed the HTML structure issues that were previously encountered.

## Step 2: Set Up Version Control

If your project isn't already in a Git repository:

1. Initialize a Git repository:
   ```bash
   cd /home/ubuntu/backend-app/urbop-data-hub
   git init
   ```

2. Add your files and commit:
   ```bash
   git add .
   git commit -m "Initial commit for Vercel deployment"
   ```

3. Create a repository on GitHub/GitLab/Bitbucket and push your code:
   ```bash
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

## Step 3: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com/)
2. Sign up with your GitHub, GitLab, or Bitbucket account
3. Complete the onboarding process

## Step 4: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended for First Deployment)

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Import your Git repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or the directory containing your Next.js app)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
5. Configure environment variables if needed (see Step 6)
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd /home/ubuntu/backend-app/urbop-data-hub
   ```

3. Run the deployment command:
   ```bash
   vercel
   ```

4. Follow the CLI prompts to link your project to your Vercel account and configure deployment settings

## Step 5: Configure Custom Domain (Optional)

1. In your Vercel dashboard, select your project
2. Go to "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings for your domain

## Step 6: Set Up Environment Variables

For your Latin America economic development application, you may need to configure environment variables:

1. In your Vercel dashboard, select your project
2. Go to "Settings" > "Environment Variables"
3. Add any required environment variables:
   - Database connection strings
   - API keys
   - Service credentials
   - Region-specific configurations for Latin America

## Step 7: Configure Project Settings

Optimize your deployment with these settings:

1. **Build Cache**: Enable build cache to speed up deployments
2. **Preview Deployments**: Automatically create preview deployments for pull requests
3. **Production Branch**: Set your main production branch (usually `main` or `master`)
4. **Framework Settings**: Ensure Next.js settings are correctly configured

## Step 8: Monitor Your Deployment

After deployment:

1. Vercel provides a deployment URL (e.g., `https://your-project.vercel.app`)
2. Check the deployment logs for any issues
3. Test your application thoroughly on the Vercel-hosted URL
4. Monitor performance in the Vercel dashboard

## Troubleshooting Common Issues

### Build Failures

- Check build logs in Vercel dashboard
- Ensure all dependencies are correctly specified in package.json
- Verify your next.config.js is correctly formatted

### API Routes Not Working

- Ensure API routes are properly configured
- Check for any server-side code that might not be compatible with serverless functions

### Environment Variable Issues

- Verify environment variables are correctly set in Vercel dashboard
- Remember that environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser

## Continuous Deployment

Vercel automatically sets up continuous deployment:

1. When you push changes to your repository, Vercel automatically rebuilds and redeploys
2. Pull requests create preview deployments for testing before merging
3. You can configure specific branches for production and preview environments

## Conclusion

Deploying to Vercel provides the optimal hosting environment for your Next.js application with minimal configuration. The platform is specifically designed to enhance Next.js applications with improved performance, scalability, and reliability.

For more information, refer to the [Vercel documentation for Next.js](https://vercel.com/docs/frameworks/nextjs).
