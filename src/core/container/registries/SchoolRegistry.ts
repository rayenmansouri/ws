import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";

export type OrganizationRegistry = {
  // Repositories
  OrganizationRepository: OrganizationRepository;
  SchoolRepo: OrganizationRepository; // Legacy compatibility
}; 