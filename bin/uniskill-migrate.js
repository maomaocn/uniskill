#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SHARED_PROMPTS_DIR = path.join(process.env.HOME, '.shared-ai-skills', 'prompts');
const OPENCLAW_SKILLS_DIR = path.join(process.env.HOME, '.openclaw', 'skills');

console.log('===========================================');
console.log(' 📦 Uniskill: Migrating Historical Skills');
console.log('===========================================');

let migratedCount = 0;

try {
    if (fs.existsSync(OPENCLAW_SKILLS_DIR)) {
        const skills = fs.readdirSync(OPENCLAW_SKILLS_DIR);
        
        for (let skill of skills) {
             // Skip hidden files or our test files
            if (skill.startsWith('.') || skill === 'cua-driver') continue; 
            
            // In openclaw, skills are often symlinks to ~/.agents/skills or workspace/skills
            const skillPath = path.join(OPENCLAW_SKILLS_DIR, skill);
            const resolvedPath = fs.realpathSync(skillPath);
            
            const promptFilePath = path.join(resolvedPath, 'prompt.md');
            const targetSharedPath = path.join(SHARED_PROMPTS_DIR, `${skill}.md`);

            // Extract prompt/logic if it exists natively in the agent skill
            if (fs.existsSync(promptFilePath)) {
                console.log(`\n> Found historical skill: [${skill}]`);
                
                // Read the old logic
                const promptData = fs.readFileSync(promptFilePath, 'utf8');
                
                // Write into our new centralized shared engine
                fs.writeFileSync(targetSharedPath, promptData);
                console.log(`  ✓ Abstracted logic into Universal Pool -> ${targetSharedPath}`);
                console.log(`  ! Ready to share with Claude and Cursor.`);
                migratedCount++;
            } else {
                 // Check if it's a directory with other md files
                 const files = fs.readdirSync(resolvedPath);
                 const mdFiles = files.filter(f => f.endsWith('.md'));
                 
                 if(mdFiles.length > 0) {
                     console.log(`\n> Found historical skill: [${skill}]`);
                     let mergedContent = `# Skill: ${skill}\n\n`;
                     for(let md of mdFiles) {
                         mergedContent += fs.readFileSync(path.join(resolvedPath, md), 'utf8') + '\n\n';
                     }
                     fs.writeFileSync(targetSharedPath, mergedContent);
                     console.log(`  ✓ Abstracted and merged ${mdFiles.length} files into Universal Pool -> ${targetSharedPath}`);
                     migratedCount++;
                 }
            }
        }
    }
} catch (e) {
    console.error("Migration error:", e.message);
}

console.log(`\n✅ Migration Complete. Successfully converted ${migratedCount} locked skills into Universal Skills!\n`);
