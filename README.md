# comps350f_gp38


This guide provides instructions on how to rename the project and update all relevant references.

## Steps to Rename the Project

1. **Update Project Name in `package.json`**:
   - Open the [`package.json`](package.json) file.
   - Update the `"name"` field with the new project name.

   ```json
   {
     "name": "new-project-name",
     "private": true,
     "version": "0.0.0",
     ...
   }
   ```

2. **Update Project Title in `index.html`**:
   - Open the [`index.html`](index.html) file.
   - Update the `<title>` tag with the new project title.

   ```html
   <title>New Project Title</title>
   ```

3. **Update README.md**:
   - Open the [`README.md`](README.md) file.
   - Update the project title and any other relevant information.

4. **Update Vite Configuration**:
   - Open the [`vite.config.ts`](vite.config.ts) file.
   - Ensure any references to the old project name are updated.

5. **Update Any Other References**:
   - Search the entire codebase for the old project name.
   - Update any remaining references to the new project name.

## Additional Considerations

- **Environment Variables**:
  - If your project uses environment variables, ensure they are updated to reflect the new project name.

- **CI/CD Pipelines**:
  - Update any Continuous Integration/Continuous Deployment (CI/CD) configurations to use the new project name.

- **Documentation**:
  - Ensure all documentation is updated to reflect the new project name.

## Verification

After completing the renaming process, verify that the project builds and runs correctly:

1. **Install Dependencies**:
   ```sh
   npm install
   ```

2. **Run Development Server**:
   ```sh
   npm run dev
   ```

3. **Build the Project**:
   ```sh
   npm run build
   ```

4. **Run Tests** (if applicable):
   ```sh
   npm test
   ```

Ensure that all references to the old project name have been updated and that the project functions as expected with the new name.

---

By following these steps, you can successfully rename your project and update all relevant references.
```

Feel free to modify this guide according to your specific project requirements.