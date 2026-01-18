# Custom React Data Visualization Starter

A modern React starter template for data visualization projects, featuring TypeScript, Vite, and essential libraries for interactive web applications.

## Included Libraries

- **React** 19.2.0 - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** 4.1.17 - Utility-first CSS framework
- **D3** 7.9.0 - Data visualization library
- **GSAP** 3.14.1 - Animation library
- **pnpm** - Fast package manager

## Project Structure

```
├── data/ # Data files
│ ├── processed/ # Processed/cleaned data
│ └── raw/ # Raw data files
├── notebooks/ # Jupyter notebooks for data analysis
├── scripts/ # Python utility scripts
│ ├── run.py # Script runner (see below)
│ └── test.py # Example script
├── src/ # React application source
├── public/ # Static assets
└── .github/ # GitHub Actions workflows
```

## Getting Started

### Install dependencies

`pnpm install`

### Start development server

`pnpm run dev`

### Build for production

`pnpm run build`

### Preview production build

`pnpm run preview`

## Running Python Scripts

The project includes a Python script runner for data processing and utilities:

### Run any Python script in \_scripts/ folder

pnpm run py <script_name>

### Examples

`pnpm run py test` # Runs \_scripts/test.py
`pnpm run py data_clean` # Runs \_scripts/data_clean.py

## Deployment to GitHub Pages

### Repository Setup

1. Create a new GitHub repository
2. Push your code to the `main` branch
3. Go to repository Settings → Pages
4. Set source to "GitHub Actions"

### Configure Secrets

In your repository settings, add a new secret:

- **Name**: `VITE_REPO_NAME`
- **Value**: Your repository name (e.g., `my-awesome-project`)

### Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

- Triggers on pushes to `main` branch
- Builds the project with the correct base path
- Deploys to GitHub Pages on the `gh-pages` branch
