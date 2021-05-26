export interface Term {
  id: string;
  name: string;
  discipline: string;
  definition: string;
  attributes?: {attribute: string, value: string}[];
  applicationMode?: boolean;
  subjectArea?: {area: string, termDefinition: string}[];
  userId?: string;
}
