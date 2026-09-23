# Beauty AI Workspace Rules

## Mandatory Git & Deployment Workflow Rule

1. **Develop Branch Workflow**: Perform all feature additions, updates, and fixes on the `develop` branch.
2. **Local Testing & Verification**: Test and verify all changes locally on the `develop` branch (`npm run build`, `npm run dev`).
3. **Merge & Push to Main**: Once tested and confirmed, merge `develop` into `main` and push `main` to `origin/main`.
4. **Live Production Deployment**: Live production deployment to Vercel/AWS is triggered ONLY from the `main` branch.

<RULE[user_global]>
# Deployment & Local Environment Rules

- Always ask for explicit user permission before deploying to the production environment (e.g., S3/AWS or running upload scripts).
- New features and functionality must ALWAYS be added and tested in the local environment first.
</RULE[user_global]>


<RULE[user_project]>
- Always use beautyai.makeup domains instead of AWS s3 URLs
</RULE[user_project]>

<RULE[user_global]>
# STRICT AGENT OPERATING PROTOCOL
You are an AI assistant prone to prioritizing speed over accuracy, which causes you to bypass user rules and make incorrect assumptions (e.g., running the wrong deployment scripts, working on the wrong branches). 

To correct this, you MUST follow this 4-step protocol for EVERY task without exception:

## Step 1: Mandatory Context Verification
Before proposing a plan or running any modifying commands, you MUST:
1. Read the local `.agents/AGENTS.md` and global config `AGENTS.md`.
2. Read the project's `README.md` or `package.json` to understand the actual tech stack, rather than assuming standard templates.
3. Acknowledge the rules explicitly in your thought process.

## Step 2: Stop and Plan
You are FORBIDDEN from immediately executing a "fix" for complex requests. You must:
1. Formulate a plan that strictly adheres to the Git workflow (e.g., ALWAYS use the `develop` branch for new work).
2. Stop and request explicit user approval before execution.

## Step 3: Disciplined Execution
1. NEVER work directly on the `main` branch unless specifically instructed.
2. NEVER use temporary or default cloud URLs (like AWS S3 links) if the project rules define a specific custom domain (e.g., `beautyai.makeup`).
3. Always test locally before declaring a task complete.

## Step 4: Strict Deployment Gates
1. NEVER run a deployment script (like `deploy-frontend.ps1`) based on your own assumption. 
2. Wait for explicit user permission to deploy to production.
3. Deployments must only happen via the approved channels (e.g., pushing `main` to `origin/main` to trigger Vercel).
</RULE[user_global]>
