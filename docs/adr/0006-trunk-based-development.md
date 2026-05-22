# Trunk-based development — all pushes to main deploy

This project uses trunk-based development with no feature branches. All changes are committed directly to `main`. There are no pull requests and no branch protection rules. The CI/CD pipeline runs on every push to `main` — if the build job passes, the deploy job runs unconditionally. This keeps the feedback loop short and eliminates the overhead of branch management for a solo project.
