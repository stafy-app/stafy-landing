set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

# List available recipes
default:
    @just --list

# Start Astro dev server (http://localhost:4321)
dev:
    npm run dev

# Type-check (astro check) + production build to dist/
build:
    npm run check; if ($LASTEXITCODE -ne 0) { throw "astro check failed" }; npm run build

# eslint + astro check (types for .astro/.ts/.tsx)
lint:
    npm run lint; if ($LASTEXITCODE -ne 0) { throw "eslint failed" }; npm run check

# Preview production build (run `just build` first)
preview:
    npm run preview

# Run unit tests once
test:
    npm test

# Run tests in watch mode
test-watch:
    npm run test:watch

# Install dependencies from lockfile
install:
    npm install

# Add a package: just add axios
add pkg:
    npm install {{ pkg }}

# Add a dev-only package: just add-dev @types/foo
add-dev pkg:
    npm install -D {{ pkg }}

# Remove a package: just remove axios
remove pkg:
    npm uninstall {{ pkg }}

# Delete build output and Astro cache
clean:
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue dist, .astro

# Bump project version (patch|minor|major). No commit/tag.
bump-version bump:
    npm version {{ bump }} --no-git-tag-version
