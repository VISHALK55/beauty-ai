# Beauty AI Workspace Rules

## Mandatory Git & Deployment Workflow Rule

1. **Develop Branch Workflow**: Perform all feature additions, updates, and fixes on the `develop` branch.
2. **Local Testing & Verification**: Test and verify all changes locally on the `develop` branch (`npm run build`, `npm run dev`).
3. **Merge & Push to Main**: Once tested and confirmed, merge `develop` into `main` and push `main` to `origin/main`.
4. **Live Production Deployment**: Live production deployment to Vercel/AWS is triggered ONLY from the `main` branch.
