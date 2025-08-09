CREATE TABLE "claim_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"claim_id" integer,
	"event_type" varchar(64),
	"event_data" jsonb,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer,
	"insurance_provider_id" integer,
	"claim_number" varchar(120),
	"claim_data" jsonb,
	"status" text,
	"service_dates" jsonb,
	"billed_amount" integer,
	"allowed_amount" integer,
	"paid_amount" integer,
	"denied_amount" integer,
	"primary_denial_code" varchar(80),
	"primary_denial_text" text,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "uq_claims_claim_number" UNIQUE("claim_number")
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer,
	"claim_id" integer,
	"doc_type" varchar(64),
	"metadata" jsonb,
	"file_name" varchar(255),
	"file_path" text,
	"sha256" varchar(128),
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insurance_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"payer_id" varchar(80),
	"contact_info" jsonb,
	"plan_info" jsonb,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "insurance_providers_payer_id_unique" UNIQUE("payer_id")
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer,
	"claim_id" integer,
	"type" varchar(64),
	"metadata" jsonb,
	"content" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(120),
	"last_name" varchar(120),
	"dob" varchar(10),
	"contact_info" jsonb,
	"insurance_info" jsonb,
	"mrns" jsonb,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "claim_events" ADD CONSTRAINT "claim_events_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "claims" ADD CONSTRAINT "claims_insurance_provider_id_insurance_providers_id_fk" FOREIGN KEY ("insurance_provider_id") REFERENCES "public"."insurance_providers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_claim_id_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_claim_events_claim" ON "claim_events" USING btree ("claim_id");--> statement-breakpoint
CREATE INDEX "idx_claims_patient" ON "claims" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_claims_status" ON "claims" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_claims_insurance" ON "claims" USING btree ("insurance_provider_id");--> statement-breakpoint
CREATE INDEX "idx_documents_patient" ON "documents" USING btree ("patient_id");--> statement-breakpoint
CREATE INDEX "idx_documents_claim" ON "documents" USING btree ("claim_id");--> statement-breakpoint
CREATE INDEX "idx_notes_patient" ON "notes" USING btree ("patient_id");