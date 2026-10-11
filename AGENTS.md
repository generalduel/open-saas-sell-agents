# Frontend design skills for Open SaaS

These are project-local skill instructions, not account-wide ChatGPT plugins. Original upstream SKILL.md files are preserved in .agents/skills/.

- frontend-design: apply before coding; create a visual direction, typography, layout, responsive and accessibility plan.
- web-design-engineer: use to critique implemented pages and iterate towards polished, intentional UI.
- web-artifacts-builder: source workflow targets Claude artifacts, not Wasp. Adapt its React/TypeScript/Tailwind/shadcn guidance to the existing Wasp app; do not run Claude artifact init/bundle scripts against this repo or replace Wasp routing.

For the current site, inspect template/app/main.wasp.ts and template/app/src/landing-page, preserve existing payment/auth functionality, and work on draft branches. Do not merge or deploy without owner approval.

Sources:
https://github.com/anthropics/skills/tree/main/skills/frontend-design
https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer
https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder

Check upstream licenses and supplementary references before redistribution or use outside this repository.
