# Beauty AI Workspace Rules

## Mandatory Git & Deployment Workflow Rule

1. **Pull Latest Main**: Always pull the latest changes from the `main` branch before starting any new feature or fix (`git pull origin main`).
2. **Sub-Branch Isolation**: Always create and work on a dedicated sub-branch/feature-branch for making changes (`git checkout -b feature/<feature-name>`).
3. **Local Testing & Verification**: Thoroughly test and verify all changes locally on the sub-branch before staging.
4. **Merge & Push to Main**: After successful local verification, merge/push changes into `main`.
5. **Live Deployment**: Live deployment to staging/production MUST ONLY be executed from the `main` branch.
