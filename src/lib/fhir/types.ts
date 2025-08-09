
/**
 * FHIR Resource Types
 * Based on FHIR R4 standard
 */

// Basic FHIR Resource interface
export interface FHIRResource {
  resourceType: string;
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
  };
}

// FHIR Task Resource
export interface FHIRTask extends FHIRResource {
  resourceType: "Task";
  status: "draft" | "requested" | "received" | "accepted" | "rejected" | "ready" | "cancelled" | "in-progress" | "on-hold" | "failed" | "completed" | "entered-in-error";
  intent: "unknown" | "proposal" | "plan" | "order" | "original-order" | "reflex-order" | "filler-order" | "instance-order" | "option";
  priority?: "routine" | "urgent" | "asap" | "stat";
  description?: string;
  focus?: Reference;
  for?: Reference;
  authoredOn?: string;
  executionPeriod?: {
    start?: string;
    end?: string;
  };
  requester?: Reference;
  owner?: Reference;
}

// FHIR Patient Resource
export interface FHIRPatient extends FHIRResource {
  resourceType: "Patient";
  name?: {
    use?: string;
    text?: string;
    family?: string;
    given?: string[];
  }[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  identifier?: {
    system?: string;
    value?: string;
  }[];
}

// FHIR Reference type
export interface Reference {
  reference?: string;
  type?: string;
  display?: string;
}

// Convert app Task to FHIR Task
export function toFHIRTask(appTask: any): FHIRTask {
  // Map the application status to FHIR status
  let fhirStatus: FHIRTask["status"];
  switch (appTask.status) {
    case "open": fhirStatus = "accepted"; break;
    case "in-progress": fhirStatus = "in-progress"; break;
    case "completed": fhirStatus = "completed"; break;
    default: fhirStatus = "requested";
  }

  // Map priority
  let fhirPriority: FHIRTask["priority"];
  switch (appTask.priority) {
    case "high": fhirPriority = "urgent"; break;
    case "medium": fhirPriority = "asap"; break;
    case "low": fhirPriority = "routine"; break;
    default: fhirPriority = "routine";
  }

  return {
    resourceType: "Task",
    id: appTask.id,
    status: fhirStatus,
    intent: "order",
    priority: fhirPriority,
    description: appTask.title,
    focus: appTask.caseId ? {
      reference: `Case/${appTask.caseId}`,
      display: `Case #${appTask.caseId}`
    } : undefined,
    for: appTask.patientId ? {
      reference: `Patient/${appTask.patientId}`,
      display: appTask.patientName
    } : undefined,
    authoredOn: appTask.createdAt,
    executionPeriod: {
      end: appTask.dueDate
    },
    owner: appTask.assigneeId ? {
      reference: `Practitioner/${appTask.assigneeId}`,
      display: appTask.assigneeName
    } : undefined
  };
}

// Convert FHIR Task to app Task
export function fromFHIRTask(fhirTask: FHIRTask): any {
  // Map FHIR status to app status
  let appStatus;
  switch (fhirTask.status) {
    case "in-progress": appStatus = "in-progress"; break;
    case "completed": appStatus = "completed"; break;
    default: appStatus = "open";
  }

  // Map priority
  let appPriority;
  switch (fhirTask.priority) {
    case "urgent": appPriority = "high"; break;
    case "asap": appPriority = "medium"; break;
    case "routine": appPriority = "low"; break;
    default: appPriority = "medium";
  }

  // Extract patient info
  let patientId;
  let patientName;
  if (fhirTask.for?.reference) {
    const parts = fhirTask.for.reference.split('/');
    patientId = parts[1];
    patientName = fhirTask.for.display;
  }

  // Extract case info
  let caseId;
  if (fhirTask.focus?.reference) {
    const parts = fhirTask.focus.reference.split('/');
    caseId = parts[1];
  }

  // Extract assignee info
  let assigneeId;
  let assigneeName;
  if (fhirTask.owner?.reference) {
    const parts = fhirTask.owner.reference.split('/');
    assigneeId = parts[1];
    assigneeName = fhirTask.owner.display;
  }

  return {
    id: fhirTask.id,
    title: fhirTask.description,
    status: appStatus,
    priority: appPriority,
    dueDate: fhirTask.executionPeriod?.end,
    createdAt: fhirTask.authoredOn,
    patientId,
    caseId,
    assigneeId,
    patient: patientName ? { id: patientId, name: patientName } : undefined,
    assignee: assigneeName ? { id: assigneeId, name: assigneeName } : undefined
  };
}
