# construction_site_management_system
Core Requirements : ABC Construction has multiple sites (houses). 
> Each site has multiple tasks (foundation, plumbing, painting, etc.).
>  Each task :  Span multiple days
>  Use materials (tracked daily)
>  Involve labour (tracked daily)
> Daily work is recorded by site engineers
> Management needs to review the reports before they are finalized

#$System Diagram (Architecture Overview)
            +-------------------------+
            |     construction_site  |
            |      (WebApps)
            +------------+------------+
                         |
                         v
            +-------------------------+
            |      Backend API        |
            | Node.js / Express       |
            +------------+------------+
                         |
              +----------+----------+
              |  Authentication     |
              |  (JWT / OAuth)      |
              +----------+----------+
                         |
              +----------+----------+
              |   Database (Mongodb)|
              +----------+----------+
                         |
              +----------+----------+
              |  Admin Dashboard     |
              | (Reports & Approvals)|
              +----------------------+

#$$Database Entity Diagram (ERD)
Site (site_id, name, location, start_date, end_date)

Task (task_id, site_id, name, description, start_date, end_date, status)

Material (material_id, name, unit_type)

TaskMaterialUsage (usage_id, task_id, material_id, date, quantity_used)

LabourEntry (entry_id, task_id, date, labour_count, hours_worked)

MaterialReceived (receipt_id, site_id, material_id, date, quantity_received)

DailyReport (report_id, site_id, date, submitted_by, status)

ReportReview (review_id, report_id, reviewed_by, approval_status, comments)

****Key Relationships:

> A Site has many Tasks

>A Task has many LabourEntry and TaskMaterialUsage

>A Site receives MaterialReceived

> A DailyReport aggregates daily Task updates and can be Reviewed
