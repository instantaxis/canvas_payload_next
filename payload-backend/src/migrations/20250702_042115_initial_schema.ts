import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * @description Migrates the database schema up.
 * @param {MigrateUpArgs} { db, payload, req }
 * @returns {Promise<void>}
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'store_manager', 'shift_manager', 'foh_employee', 'boh_employee', 'user');
  CREATE TYPE "public"."enum_users_status" AS ENUM('active', 'inactive', 'on_leave', 'terminated');
  CREATE TYPE "public"."enum_users_employment_details_employment_type" AS ENUM('full_time', 'part_time', 'seasonal', 'contract');
  CREATE TYPE "public"."enum_contacts_contact_type" AS ENUM('customer', 'vendor', 'contractor', 'other');
  CREATE TYPE "public"."enum_contacts_visit_frequency" AS ENUM('first_time', 'occasional', 'regular', 'vip');
  CREATE TYPE "public"."enum_incidents_status" AS ENUM('open', 'in_progress', 'closed');
  CREATE TYPE "public"."enum_messages_status" AS ENUM('new', 'in_progress', 'resolved', 'archived');
  CREATE TYPE "public"."enum_messages_priority" AS ENUM('low', 'normal', 'high', 'urgent');
  CREATE TYPE "public"."enum_questions_shift_selection" AS ENUM('bartender', 'server', 'foh_support', 'shift_manager', 'store_manager');
  CREATE TYPE "public"."enum_questions_status" AS ENUM('active', 'inactive', 'archived');
  CREATE TYPE "public"."enum_questions_shift_timing" AS ENUM('am', 'pm', 'any');
  CREATE TYPE "public"."enum_upgrades_status" AS ENUM('planned', 'in_progress', 'completed', 'on_hold', 'cancelled');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"phone" varchar,
  	"employee_id" varchar,
  	"status" "enum_users_status" DEFAULT 'active',
  	"primary_location_id" integer,
  	"employment_details_hire_date" timestamp(3) with time zone,
  	"employment_details_termination_date" timestamp(3) with time zone,
  	"employment_details_employment_type" "enum_users_employment_details_employment_type",
  	"employment_details_hourly_rate" numeric,
  	"profile_photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"jobs_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"uploaded_by_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar
  );
  
  CREATE TABLE "contacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"company" varchar,
  	"contact_type" "enum_contacts_contact_type" DEFAULT 'customer' NOT NULL,
  	"toast_id" varchar,
  	"brevo_id" varchar,
  	"vip_id" numeric,
  	"visit_frequency" "enum_contacts_visit_frequency",
  	"last_visit" timestamp(3) with time zone,
  	"total_visits" numeric DEFAULT 0,
  	"average_spend" numeric,
  	"preferred_location_id" integer,
  	"notes" varchar,
  	"marketing_consent" boolean DEFAULT false,
  	"birthday" timestamp(3) with time zone,
  	"anniversary" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contacts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"messages_id" integer
  );
  
  CREATE TABLE "dietary_restrictions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "drink_menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"price" numeric NOT NULL,
  	"category_id" integer NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "drink_subcategories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "employee_ratings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"employee_id_id" integer NOT NULL,
  	"location_id_id" integer NOT NULL,
  	"data_date" timestamp(3) with time zone NOT NULL,
  	"rating" numeric NOT NULL,
  	"manager_report_id_id" integer,
  	"employee_notes" jsonb,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hotspot_logins" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_id" integer NOT NULL,
  	"customer_name" varchar,
  	"customer_email" varchar,
  	"marketing_consent" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "incidents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"date" timestamp(3) with time zone NOT NULL,
  	"location_id" integer NOT NULL,
  	"reported_by_id" integer NOT NULL,
  	"status" "enum_incidents_status" DEFAULT 'open',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar NOT NULL,
  	"zip" varchar NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "manager_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"manager_id" integer NOT NULL,
  	"location_id" integer NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_messages_status" DEFAULT 'new',
  	"priority" "enum_messages_priority" DEFAULT 'normal',
  	"subject" varchar NOT NULL,
  	"from_name" varchar NOT NULL,
  	"from_email" varchar NOT NULL,
  	"from_phone" varchar,
  	"location_id" integer,
  	"message_type_id" integer NOT NULL,
  	"message" jsonb NOT NULL,
  	"internal_notes" jsonb,
  	"assigned_to_id" integer,
  	"response_sent" boolean DEFAULT false,
  	"response_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "messages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "message_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "qr_feedback" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"rating" numeric NOT NULL,
  	"comment" varchar,
  	"location_id" integer NOT NULL,
  	"user_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "questions_shift_selection" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_questions_shift_selection",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_questions_status" DEFAULT 'active',
  	"sort" numeric,
  	"question" varchar NOT NULL,
  	"shift_timing" "enum_questions_shift_timing" DEFAULT 'any',
  	"min_characters" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "questions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer
  );
  
  CREATE TABLE "review_keywords" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"comment" varchar,
  	"user_id" integer NOT NULL,
  	"location_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"review_keywords_id" integer
  );
  
  CREATE TABLE "server_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"server_id" integer NOT NULL,
  	"location_id" integer NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "shift_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "upgrades" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location_id" integer,
  	"upgrade_type_id" integer NOT NULL,
  	"status" "enum_upgrades_status" DEFAULT 'planned',
  	"description" jsonb,
  	"cost" numeric,
  	"vendor_id" integer,
  	"scheduled_date" timestamp(3) with time zone,
  	"completion_date" timestamp(3) with time zone,
  	"notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "upgrades_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "upgrade_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"contacts_id" integer,
  	"dietary_restrictions_id" integer,
  	"drink_menu_items_id" integer,
  	"drink_subcategories_id" integer,
  	"employee_ratings_id" integer,
  	"features_id" integer,
  	"hotspot_logins_id" integer,
  	"incidents_id" integer,
  	"jobs_id" integer,
  	"locations_id" integer,
  	"manager_reports_id" integer,
  	"messages_id" integer,
  	"message_types_id" integer,
  	"qr_feedback_id" integer,
  	"questions_id" integer,
  	"review_keywords_id" integer,
  	"reviews_id" integer,
  	"server_reports_id" integer,
  	"shift_types_id" integer,
  	"upgrades_id" integer,
  	"upgrade_types_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_primary_location_id_locations_id_fk" FOREIGN KEY ("primary_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_profile_photo_id_media_id_fk" FOREIGN KEY ("profile_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_id_users_id_fk" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contacts" ADD CONSTRAINT "contacts_preferred_location_id_locations_id_fk" FOREIGN KEY ("preferred_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contacts_rels" ADD CONSTRAINT "contacts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_rels" ADD CONSTRAINT "contacts_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_rels" ADD CONSTRAINT "contacts_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drink_menu_items" ADD CONSTRAINT "drink_menu_items_category_id_drink_subcategories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."drink_subcategories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employee_ratings" ADD CONSTRAINT "employee_ratings_employee_id_id_users_id_fk" FOREIGN KEY ("employee_id_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employee_ratings" ADD CONSTRAINT "employee_ratings_location_id_id_locations_id_fk" FOREIGN KEY ("location_id_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "employee_ratings" ADD CONSTRAINT "employee_ratings_manager_report_id_id_manager_reports_id_fk" FOREIGN KEY ("manager_report_id_id") REFERENCES "public"."manager_reports"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotspot_logins" ADD CONSTRAINT "hotspot_logins_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_reported_by_id_users_id_fk" FOREIGN KEY ("reported_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manager_reports" ADD CONSTRAINT "manager_reports_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "manager_reports" ADD CONSTRAINT "manager_reports_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "messages" ADD CONSTRAINT "messages_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "messages" ADD CONSTRAINT "messages_message_type_id_message_types_id_fk" FOREIGN KEY ("message_type_id") REFERENCES "public"."message_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "messages" ADD CONSTRAINT "messages_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "messages_rels" ADD CONSTRAINT "messages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "messages_rels" ADD CONSTRAINT "messages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "qr_feedback" ADD CONSTRAINT "qr_feedback_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "qr_feedback" ADD CONSTRAINT "qr_feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "questions_shift_selection" ADD CONSTRAINT "questions_shift_selection_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_rels" ADD CONSTRAINT "questions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_rels" ADD CONSTRAINT "questions_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_review_keywords_fk" FOREIGN KEY ("review_keywords_id") REFERENCES "public"."review_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "server_reports" ADD CONSTRAINT "server_reports_server_id_users_id_fk" FOREIGN KEY ("server_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "server_reports" ADD CONSTRAINT "server_reports_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "upgrades" ADD CONSTRAINT "upgrades_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "upgrades" ADD CONSTRAINT "upgrades_upgrade_type_id_upgrade_types_id_fk" FOREIGN KEY ("upgrade_type_id") REFERENCES "public"."upgrade_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "upgrades" ADD CONSTRAINT "upgrades_vendor_id_contacts_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."contacts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "upgrades_rels" ADD CONSTRAINT "upgrades_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."upgrades"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "upgrades_rels" ADD CONSTRAINT "upgrades_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contacts_fk" FOREIGN KEY ("contacts_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dietary_restrictions_fk" FOREIGN KEY ("dietary_restrictions_id") REFERENCES "public"."dietary_restrictions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_drink_menu_items_fk" FOREIGN KEY ("drink_menu_items_id") REFERENCES "public"."drink_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_drink_subcategories_fk" FOREIGN KEY ("drink_subcategories_id") REFERENCES "public"."drink_subcategories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_employee_ratings_fk" FOREIGN KEY ("employee_ratings_id") REFERENCES "public"."employee_ratings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hotspot_logins_fk" FOREIGN KEY ("hotspot_logins_id") REFERENCES "public"."hotspot_logins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_manager_reports_fk" FOREIGN KEY ("manager_reports_id") REFERENCES "public"."manager_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_message_types_fk" FOREIGN KEY ("message_types_id") REFERENCES "public"."message_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_qr_feedback_fk" FOREIGN KEY ("qr_feedback_id") REFERENCES "public"."qr_feedback"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_review_keywords_fk" FOREIGN KEY ("review_keywords_id") REFERENCES "public"."review_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_server_reports_fk" FOREIGN KEY ("server_reports_id") REFERENCES "public"."server_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_shift_types_fk" FOREIGN KEY ("shift_types_id") REFERENCES "public"."shift_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_upgrades_fk" FOREIGN KEY ("upgrades_id") REFERENCES "public"."upgrades"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_upgrade_types_fk" FOREIGN KEY ("upgrade_types_id") REFERENCES "public"."upgrade_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "users_employee_id_idx" ON "users" USING btree ("employee_id");
  CREATE INDEX "users_primary_location_idx" ON "users" USING btree ("primary_location_id");
  CREATE INDEX "users_profile_photo_idx" ON "users" USING btree ("profile_photo_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_locations_id_idx" ON "users_rels" USING btree ("locations_id");
  CREATE INDEX "users_rels_jobs_id_idx" ON "users_rels" USING btree ("jobs_id");
  CREATE INDEX "media_uploaded_by_idx" ON "media" USING btree ("uploaded_by_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE UNIQUE INDEX "contacts_email_idx" ON "contacts" USING btree ("email");
  CREATE UNIQUE INDEX "contacts_vip_id_idx" ON "contacts" USING btree ("vip_id");
  CREATE INDEX "contacts_preferred_location_idx" ON "contacts" USING btree ("preferred_location_id");
  CREATE INDEX "contacts_updated_at_idx" ON "contacts" USING btree ("updated_at");
  CREATE INDEX "contacts_created_at_idx" ON "contacts" USING btree ("created_at");
  CREATE INDEX "contacts_rels_order_idx" ON "contacts_rels" USING btree ("order");
  CREATE INDEX "contacts_rels_parent_idx" ON "contacts_rels" USING btree ("parent_id");
  CREATE INDEX "contacts_rels_path_idx" ON "contacts_rels" USING btree ("path");
  CREATE INDEX "contacts_rels_locations_id_idx" ON "contacts_rels" USING btree ("locations_id");
  CREATE INDEX "contacts_rels_messages_id_idx" ON "contacts_rels" USING btree ("messages_id");
  CREATE UNIQUE INDEX "dietary_restrictions_name_idx" ON "dietary_restrictions" USING btree ("name");
  CREATE INDEX "dietary_restrictions_updated_at_idx" ON "dietary_restrictions" USING btree ("updated_at");
  CREATE INDEX "dietary_restrictions_created_at_idx" ON "dietary_restrictions" USING btree ("created_at");
  CREATE INDEX "drink_menu_items_category_idx" ON "drink_menu_items" USING btree ("category_id");
  CREATE INDEX "drink_menu_items_updated_at_idx" ON "drink_menu_items" USING btree ("updated_at");
  CREATE INDEX "drink_menu_items_created_at_idx" ON "drink_menu_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "drink_subcategories_name_idx" ON "drink_subcategories" USING btree ("name");
  CREATE INDEX "drink_subcategories_updated_at_idx" ON "drink_subcategories" USING btree ("updated_at");
  CREATE INDEX "drink_subcategories_created_at_idx" ON "drink_subcategories" USING btree ("created_at");
  CREATE INDEX "employee_ratings_employee_id_idx" ON "employee_ratings" USING btree ("employee_id_id");
  CREATE INDEX "employee_ratings_location_id_idx" ON "employee_ratings" USING btree ("location_id_id");
  CREATE INDEX "employee_ratings_manager_report_id_idx" ON "employee_ratings" USING btree ("manager_report_id_id");
  CREATE INDEX "employee_ratings_updated_at_idx" ON "employee_ratings" USING btree ("updated_at");
  CREATE INDEX "employee_ratings_created_at_idx" ON "employee_ratings" USING btree ("created_at");
  CREATE UNIQUE INDEX "features_name_idx" ON "features" USING btree ("name");
  CREATE INDEX "features_updated_at_idx" ON "features" USING btree ("updated_at");
  CREATE INDEX "features_created_at_idx" ON "features" USING btree ("created_at");
  CREATE INDEX "hotspot_logins_location_idx" ON "hotspot_logins" USING btree ("location_id");
  CREATE INDEX "hotspot_logins_updated_at_idx" ON "hotspot_logins" USING btree ("updated_at");
  CREATE INDEX "hotspot_logins_created_at_idx" ON "hotspot_logins" USING btree ("created_at");
  CREATE INDEX "incidents_location_idx" ON "incidents" USING btree ("location_id");
  CREATE INDEX "incidents_reported_by_idx" ON "incidents" USING btree ("reported_by_id");
  CREATE INDEX "incidents_updated_at_idx" ON "incidents" USING btree ("updated_at");
  CREATE INDEX "incidents_created_at_idx" ON "incidents" USING btree ("created_at");
  CREATE UNIQUE INDEX "jobs_name_idx" ON "jobs" USING btree ("name");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE UNIQUE INDEX "locations_name_idx" ON "locations" USING btree ("name");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "manager_reports_manager_idx" ON "manager_reports" USING btree ("manager_id");
  CREATE INDEX "manager_reports_location_idx" ON "manager_reports" USING btree ("location_id");
  CREATE INDEX "manager_reports_updated_at_idx" ON "manager_reports" USING btree ("updated_at");
  CREATE INDEX "manager_reports_created_at_idx" ON "manager_reports" USING btree ("created_at");
  CREATE INDEX "messages_location_idx" ON "messages" USING btree ("location_id");
  CREATE INDEX "messages_message_type_idx" ON "messages" USING btree ("message_type_id");
  CREATE INDEX "messages_assigned_to_idx" ON "messages" USING btree ("assigned_to_id");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE INDEX "messages_rels_order_idx" ON "messages_rels" USING btree ("order");
  CREATE INDEX "messages_rels_parent_idx" ON "messages_rels" USING btree ("parent_id");
  CREATE INDEX "messages_rels_path_idx" ON "messages_rels" USING btree ("path");
  CREATE INDEX "messages_rels_media_id_idx" ON "messages_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "message_types_name_idx" ON "message_types" USING btree ("name");
  CREATE INDEX "message_types_updated_at_idx" ON "message_types" USING btree ("updated_at");
  CREATE INDEX "message_types_created_at_idx" ON "message_types" USING btree ("created_at");
  CREATE INDEX "qr_feedback_location_idx" ON "qr_feedback" USING btree ("location_id");
  CREATE INDEX "qr_feedback_user_idx" ON "qr_feedback" USING btree ("user_id");
  CREATE INDEX "qr_feedback_updated_at_idx" ON "qr_feedback" USING btree ("updated_at");
  CREATE INDEX "qr_feedback_created_at_idx" ON "qr_feedback" USING btree ("created_at");
  CREATE INDEX "questions_shift_selection_order_idx" ON "questions_shift_selection" USING btree ("order");
  CREATE INDEX "questions_shift_selection_parent_idx" ON "questions_shift_selection" USING btree ("parent_id");
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  CREATE INDEX "questions_rels_order_idx" ON "questions_rels" USING btree ("order");
  CREATE INDEX "questions_rels_parent_idx" ON "questions_rels" USING btree ("parent_id");
  CREATE INDEX "questions_rels_path_idx" ON "questions_rels" USING btree ("path");
  CREATE INDEX "questions_rels_locations_id_idx" ON "questions_rels" USING btree ("locations_id");
  CREATE UNIQUE INDEX "review_keywords_keyword_idx" ON "review_keywords" USING btree ("keyword");
  CREATE INDEX "review_keywords_updated_at_idx" ON "review_keywords" USING btree ("updated_at");
  CREATE INDEX "review_keywords_created_at_idx" ON "review_keywords" USING btree ("created_at");
  CREATE INDEX "reviews_user_idx" ON "reviews" USING btree ("user_id");
  CREATE INDEX "reviews_location_idx" ON "reviews" USING btree ("location_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "reviews_rels_order_idx" ON "reviews_rels" USING btree ("order");
  CREATE INDEX "reviews_rels_parent_idx" ON "reviews_rels" USING btree ("parent_id");
  CREATE INDEX "reviews_rels_path_idx" ON "reviews_rels" USING btree ("path");
  CREATE INDEX "reviews_rels_review_keywords_id_idx" ON "reviews_rels" USING btree ("review_keywords_id");
  CREATE INDEX "server_reports_server_idx" ON "server_reports" USING btree ("server_id");
  CREATE INDEX "server_reports_location_idx" ON "server_reports" USING btree ("location_id");
  CREATE INDEX "server_reports_updated_at_idx" ON "server_reports" USING btree ("updated_at");
  CREATE INDEX "server_reports_created_at_idx" ON "server_reports" USING btree ("created_at");
  CREATE UNIQUE INDEX "shift_types_name_idx" ON "shift_types" USING btree ("name");
  CREATE INDEX "shift_types_updated_at_idx" ON "shift_types" USING btree ("updated_at");
  CREATE INDEX "shift_types_created_at_idx" ON "shift_types" USING btree ("created_at");
  CREATE INDEX "upgrades_location_idx" ON "upgrades" USING btree ("location_id");
  CREATE INDEX "upgrades_upgrade_type_idx" ON "upgrades" USING btree ("upgrade_type_id");
  CREATE INDEX "upgrades_vendor_idx" ON "upgrades" USING btree ("vendor_id");
  CREATE INDEX "upgrades_updated_at_idx" ON "upgrades" USING btree ("updated_at");
  CREATE INDEX "upgrades_created_at_idx" ON "upgrades" USING btree ("created_at");
  CREATE INDEX "upgrades_rels_order_idx" ON "upgrades_rels" USING btree ("order");
  CREATE INDEX "upgrades_rels_parent_idx" ON "upgrades_rels" USING btree ("parent_id");
  CREATE INDEX "upgrades_rels_path_idx" ON "upgrades_rels" USING btree ("path");
  CREATE INDEX "upgrades_rels_media_id_idx" ON "upgrades_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "upgrade_types_name_idx" ON "upgrade_types" USING btree ("name");
  CREATE INDEX "upgrade_types_updated_at_idx" ON "upgrade_types" USING btree ("updated_at");
  CREATE INDEX "upgrade_types_created_at_idx" ON "upgrade_types" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_contacts_id_idx" ON "payload_locked_documents_rels" USING btree ("contacts_id");
  CREATE INDEX "payload_locked_documents_rels_dietary_restrictions_id_idx" ON "payload_locked_documents_rels" USING btree ("dietary_restrictions_id");
  CREATE INDEX "payload_locked_documents_rels_drink_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("drink_menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_drink_subcategories_id_idx" ON "payload_locked_documents_rels" USING btree ("drink_subcategories_id");
  CREATE INDEX "payload_locked_documents_rels_employee_ratings_id_idx" ON "payload_locked_documents_rels" USING btree ("employee_ratings_id");
  CREATE INDEX "payload_locked_documents_rels_features_id_idx" ON "payload_locked_documents_rels" USING btree ("features_id");
  CREATE INDEX "payload_locked_documents_rels_hotspot_logins_id_idx" ON "payload_locked_documents_rels" USING btree ("hotspot_logins_id");
  CREATE INDEX "payload_locked_documents_rels_incidents_id_idx" ON "payload_locked_documents_rels" USING btree ("incidents_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_manager_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("manager_reports_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_locked_documents_rels_message_types_id_idx" ON "payload_locked_documents_rels" USING btree ("message_types_id");
  CREATE INDEX "payload_locked_documents_rels_qr_feedback_id_idx" ON "payload_locked_documents_rels" USING btree ("qr_feedback_id");
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");
  CREATE INDEX "payload_locked_documents_rels_review_keywords_id_idx" ON "payload_locked_documents_rels" USING btree ("review_keywords_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_server_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("server_reports_id");
  CREATE INDEX "payload_locked_documents_rels_shift_types_id_idx" ON "payload_locked_documents_rels" USING btree ("shift_types_id");
  CREATE INDEX "payload_locked_documents_rels_upgrades_id_idx" ON "payload_locked_documents_rels" USING btree ("upgrades_id");
  CREATE INDEX "payload_locked_documents_rels_upgrade_types_id_idx" ON "payload_locked_documents_rels" USING btree ("upgrade_types_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

/**
 * @description Migrates the database schema down.
 * @param {MigrateDownArgs} { db, payload, req }
 * @returns {Promise<void>}
 */
/**
 * @description Migrates the database schema down.
 * @param {MigrateDownArgs} { db, payload, req }
 * @returns {Promise<void>}
 */
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "contacts" CASCADE;
  DROP TABLE "contacts_rels" CASCADE;
  DROP TABLE "dietary_restrictions" CASCADE;
  DROP TABLE "drink_menu_items" CASCADE;
  DROP TABLE "drink_subcategories" CASCADE;
  DROP TABLE "employee_ratings" CASCADE;
  DROP TABLE "features" CASCADE;
  DROP TABLE "hotspot_logins" CASCADE;
  DROP TABLE "incidents" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "manager_reports" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "messages_rels" CASCADE;
  DROP TABLE "message_types" CASCADE;
  DROP TABLE "qr_feedback" CASCADE;
  DROP TABLE "questions_shift_selection" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "questions_rels" CASCADE;
  DROP TABLE "review_keywords" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_rels" CASCADE;
  DROP TABLE "server_reports" CASCADE;
  DROP TABLE "shift_types" CASCADE;
  DROP TABLE "upgrades" CASCADE;
  DROP TABLE "upgrades_rels" CASCADE;
  DROP TABLE "upgrade_types" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_users_status";
  DROP TYPE "public"."enum_users_employment_details_employment_type";
  DROP TYPE "public"."enum_contacts_contact_type";
  DROP TYPE "public"."enum_contacts_visit_frequency";
  DROP TYPE "public"."enum_incidents_status";
  DROP TYPE "public"."enum_messages_status";
  DROP TYPE "public"."enum_messages_priority";
  DROP TYPE "public"."enum_questions_shift_selection";
  DROP TYPE "public"."enum_questions_status";
  DROP TYPE "public"."enum_questions_shift_timing";
  DROP TYPE "public"."enum_upgrades_status";`)
}
