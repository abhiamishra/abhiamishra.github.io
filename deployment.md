# Next.js GitHub Pages Deployment Guide

This guide will help you deploy your Next.js application to GitHub Pages and troubleshoot common errors.

## Prerequisites

- A Next.js application
- A GitHub repository
- GitHub Actions enabled in your repository

## Initial Setup

### 1. Configure Next.js for Static Export

Add or update your Next.js configuration file with static export settings:

**For `next.config.mjs`:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only needed if deploying to username.github.io/repo-name
  // basePath: '/your-repo-name',
}

export default nextConfig
```

**For `next.config.ts`:**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only needed if deploying to username.github.io/repo-name
  // basePath: '/your-repo-name',
}

export default nextConfig
```

**Important Notes:**
- `output: 'export'` - Tells Next.js to generate static files in the `out` directory
- `images.unoptimized: true` - Required because Image Optimization needs a server
- `basePath` - Only uncomment if deploying to a repository page (not username.github.io)

### 2. Update package.json Scripts (Optional)

Add helpful scripts to your `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build"
  }
}
```

### 3. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main"]  # Change to your default branch
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
          fi

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "lts/*"
          cache: ${{ steps.detect-package-manager.outputs.manager }}

      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}

      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 5. Deploy

1. Commit all changes:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push
   ```

2. Go to the **Actions** tab in your GitHub repository
3. Watch the workflow run
4. Once complete, your site will be live at:
   - `https://username.github.io` (for username.github.io repo)
   - `https://username.github.io/repo-name` (for other repos)

## Common Errors & Solutions

### Error: "tar: out: Cannot open: No such file or directory"

**Cause:** The `out` directory doesn't exist because Next.js isn't configured for static export.

**Solution:**
1. Add `output: 'export'` to your `next.config.js/mjs/ts`
2. Add `images: { unoptimized: true }`
3. Commit and push the changes

**Verification:**
Add this step before the upload in your workflow to debug:
```yaml
- name: Verify build output
  run: |
    echo "Checking for out directory:"
    ls -la
    if [ -d "out" ]; then
      echo "✓ out directory exists"
      ls -la out
    else
      echo "✗ out directory missing"
    fi
```

### Error: 404 on Deployed Site

**Cause:** Incorrect basePath configuration.

**Solution:**
- For `username.github.io` repo: Don't set basePath
- For other repos: Set `basePath: '/repo-name'` in next.config

Also update any internal links:
```jsx
// Before
<Link href="/about">About</Link>

// After (if using basePath)
<Link href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/about`}>About</Link>
```

### Error: Images Not Loading

**Cause:** Next.js Image Optimization requires a server.

**Solution:**
Set `images.unoptimized: true` in your config, or use standard `<img>` tags instead of `<Image>`.

### Error: "Module not found" or Build Fails

**Cause:** Missing dependencies or incorrect imports.

**Solution:**
1. Run `npm install` locally to ensure all dependencies are installed
2. Check for case-sensitive import paths (GitHub Actions is case-sensitive)
3. Verify all imports exist:
   ```bash
   npm run build
   ```

### Error: API Routes Not Working

**Cause:** GitHub Pages only supports static sites, not server-side code.

**Solution:**
- Remove API routes or
- Use a different hosting service (Vercel, Netlify) that supports Next.js server features or
- Convert API routes to external services

### Error: "_next folder not found" or Assets 404

**Cause:** basePath misconfiguration or missing static files.

**Solution:**
1. Ensure `basePath` matches your repository name exactly
2. Add to next.config:
   ```js
   assetPrefix: process.env.NODE_ENV === 'production' ? '/repo-name' : '',
   ```

## Debugging Checklist

When deployment fails, check these in order:

- [ ] Does `next.config` have `output: 'export'`?
- [ ] Does `next.config` have `images.unoptimized: true`?
- [ ] Does `next build` work locally?
- [ ] Is the `out` directory created locally after build?
- [ ] Is GitHub Pages enabled in repository settings?
- [ ] Is the source set to "GitHub Actions"?
- [ ] Does the workflow file exist in `.github/workflows/`?
- [ ] Is the branch name in the workflow correct?
- [ ] Are there any API routes (not supported)?
- [ ] Is `basePath` set correctly (if needed)?

## Testing Locally

Before deploying, test the static export locally:

```bash
# Build the static site
npm run build

# Serve the out directory
npx serve out

# Or with a basePath
npx serve out -p 3000
```

Visit `http://localhost:3000` (or `http://localhost:3000/repo-name` if using basePath)

## Additional Resources

- [Next.js Static Exports Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Quick Reference: Key Files

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── next.config.mjs             # Next.js configuration (or .js/.ts)
├── package.json                # Dependencies and scripts
└── out/                        # Generated after build (gitignored)
```

## Need Help?

1. Check the Actions tab for detailed error logs
2. Review the "Verify build output" step to see what was created
3. Test the build locally before pushing
4. Ensure all configuration files are committed and pushed