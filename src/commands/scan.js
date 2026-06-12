const fs = require('fs');
const env = require('../core/env');

module.exports = function scanCmd() {
  const report = {
      claude: [],
      openclaw: [],
      cursor: [],
      overlapping: []
  };

  // Scan Claude
  try {
      if (fs.existsSync(env.CLAUDE_CONFIG)) {
          const claudeData = JSON.parse(fs.readFileSync(env.CLAUDE_CONFIG, 'utf8'));
          if (claudeData.mcpServers) report.claude = Object.keys(claudeData.mcpServers);
      }
  } catch(e) {}

  // Scan OpenClaw
  try {
      if (fs.existsSync(env.OPENCLAW_SKILLS_DIR)) {
          const contents = fs.readdirSync(env.OPENCLAW_SKILLS_DIR);
          report.openclaw = contents.filter(item => !item.startsWith('.'));
      }
  } catch(e) {}

  // Map overlaps
  const allSkillsMap = {};
  const add = (src, arr) => arr.forEach(item => {
      if (!allSkillsMap[item]) allSkillsMap[item] = [];
      allSkillsMap[item].push(src);
  });
  
  add('Claude', report.claude);
  add('OpenClaw', report.openclaw);

  for (let [skillName, sources] of Object.entries(allSkillsMap)) {
      if (sources.length > 1) {
          report.overlapping.push({ skill: skillName, locations: sources });
      }
  }

  console.log('===========================================');
  console.log(' 🔍 Uniskill: Scanning Local AI Assets...');
  console.log('===========================================');
  console.log(`\n[Claude]   Found MCPs: ${report.claude.length ? report.claude.join(', ') : 'None'}`);
  console.log(`[OpenClaw] Found Skills: ${report.openclaw.length ? report.openclaw.join(', ') : 'None'}`);

  if (report.overlapping.length > 0) {
      console.log('\n⚠️ Overlaps Detected:');
      report.overlapping.forEach(overlap => {
          console.log(` - "${overlap.skill}" exists in ${overlap.locations.join(' & ')}.`);
      });
      console.log(`   💡 Tip: Run \`uniskill migrate\` to merge them into the universal pool.`);
  } else {
      console.log('\n✅ System is clean! No overlapping skills detected.');
  }
};
