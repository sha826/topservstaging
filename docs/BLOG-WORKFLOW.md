# Blog Workflow: Agency Titan to the Website

How a blog post travels from idea to live article on topservdigital.com.
Written for the content team. The automation plumbing is invisible; the
whole workflow happens inside Titan tasks plus 1 review click on the site.

## One-time setup (already done unless noted)

1. The client record must have its website/domain set. The AI topic
   research crawls it. For our own site the client is "TopServ Digital"
   and the domain is topservdigital.com.
2. The automation "Blog Post to New Agentic Site" (under Settings,
   Processes, New Blog Post, Automations) must be Active. It is published
   and currently switched off until go-live.
3. Whoever reviews articles needs the website admin login.

## The recurring process

### Step 1: Create the task
Create a "New Blog Post" task and pick the client. That is all the input
the system needs. Creating the task automatically starts Titan's AI
writing pipeline (the team's existing "Auto Generate Blog on Creation"
automation).

### Step 2: The AI drafts the article (a few minutes)
Titan researches a topic using Semrush and the client's website, then
fills the task fields: title, meta description, full article, slug,
featured image, and alt text. If the client record is missing its domain,
the title field shows an error message instead. Fix the client record and
re-run the "Blog Writing" button on the task.

### Step 3: Human pass
The task sits in the Content Writing stage. Edit the article directly in
the task's rich text field. Fix the title, description, or slug if
needed. Move through the Quality Assurance stage and its checklist the
same way as today.

### Step 4: Mark the task Complete
This is the handoff moment. Completing the task is the publish action
from Titan's side. Within seconds the automation reads the task fields
and sends the article to the website. Nobody fills in any extra form.
Only complete a blog task when it is genuinely ready.

### Step 5: The article appears in the website review queue
At /admin/blog on the website, the article shows up as a Draft. The
Preview link renders it exactly as it will look live: site theme, fonts,
layout. Nothing is public yet.

### Step 6: Publish
Tick Published in the website admin. The article goes live immediately
with SEO schema, sitemap entry, and social share image handled
automatically. Covers can be attached or AI generated during this review
step (Titan's own generated images live on private storage and do not
transfer yet).

## Who does what

- Steps 1 to 4: the content team (Alejandro), entirely inside Titan.
- Steps 5 and 6: whoever owns website review (Alex today; can be
  delegated with an admin login).
- Later option: once the pipeline has earned trust, the automation can be
  switched to publish immediately on task completion, removing steps 5
  and 6. One-word change, team decision.

## Scaling to client sites

The identical loop works for any client site running our blog module:
same task type, same stages, same completion trigger. Per client site the
setup is a copy of the automation pointed at that site's ingest URL and
key. About 30 seconds of setup per site.

## Alternate doors into the same queue

- Content Studio (content-studio-plum-five.vercel.app): hand-written
  posts with live site preview, for articles outside Titan.
- The website admin editor: write or edit directly on the site.
All three doors land in the same review queue and the same blog.
