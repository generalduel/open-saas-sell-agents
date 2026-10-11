export const agents = [
  ["ai-lead-generation","AI Lead Generation","Find and qualify potential customers."],
  ["full-sales-teams","Full Sales Teams","Coordinate sales workflows across the pipeline."],
  ["reputation-management-threat-intelligence","Reputation Management & Threat Intelligence","Monitor reputation signals and relevant threats."],
  ["hr-services","HR Services","Support repeatable people-operations workflows."],
  ["ai-recruitment-ecosystem","AI Recruitment Ecosystem","Coordinate recruiting stages and candidate communication."],
  ["ai-resume-screening","AI Resume Screening","Assist review of applications against defined criteria."],
  ["custom-ai-agents","Custom AI Agents","Design agents around approved business workflows."],
  ["crm-sales-automation","CRM & Sales Automation","Connect customer records and sales follow-up workflows."],
  ["ai-workshops","AI Workshops","Help teams understand practical AI adoption."]
] as const;
export const agentHref = (slug: string) => "/agents/" + slug;
