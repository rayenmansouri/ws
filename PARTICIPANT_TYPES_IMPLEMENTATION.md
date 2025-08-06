# Participant Types and Roles Implementation

## Overview

This implementation adds participant type and role classification to the user management system, allowing for better categorization and management of participants in various programs.

## What Was Added

### 1. Participant Type Enum (`ParticipantTypeEnum`)

Located: `src/feature/user-management/participant/enums/participant-type.enum.ts`

Defines different categories of participants:
- **YOUTH**: Young participants typically aged 8-18 in youth programs
- **ADULT_LEARNER**: Adult participants in learning and development programs  
- **TRAINEE**: Participants in vocational or skills training programs
- **INTERN**: Participants in internship or work experience programs
- **VOLUNTEER**: Volunteer participants contributing to programs
- **BENEFICIARY**: Direct beneficiaries of support programs
- **REGULAR**: Regular program participants with standard engagement

### 2. Participant Role Enum (`ParticipantRoleEnum`)

Located: `src/feature/user-management/participant/enums/participant-role.enum.ts`

Defines different roles participants can have within their type:
- **LEARNER**: Primary learning role for skill development
- **PEER_MENTOR**: Supports and guides fellow participants
- **TEAM_LEADER**: Takes leadership responsibilities in group activities
- **REPRESENTATIVE**: Represents participant group in meetings
- **ASSISTANT**: Provides assistance to coaches and facilitators
- **OBSERVER**: Observes activities for learning or evaluation
- **ACTIVE_MEMBER**: Actively participates in all program activities

### 3. Database Schema Updates

**Participant Entity** (`src/feature/user-management/participant/participant.entity.ts`):
- Added `participantType: ParticipantTypeEnum` (required)
- Added `participantRole: ParticipantRoleEnum` (required)

**Participant Schema** (`src/feature/user-management/participant/participant.schema.ts`):
- Added database fields with proper enum validation
- Both fields are required for all participants

### 4. Global Enums Update

Updated `src/constants/globalEnums.ts`:
- Added `PARTICIPANT: "participant"` to `END_USER_ENUM`

### 5. Roles Seed Update

Updated `seeders/seeds/seed-roles-1753094425381.ts`:
- Added participant role configuration with proper translations (Arabic/English)

### 6. New Participant Types Seed

Created `seeders/seeds/seed-participant-types-1754490702000.ts`:
- Comprehensive configuration for all participant types
- Defines available roles for each participant type
- Includes default roles and descriptions
- Ready for database seeding

## Usage Examples

### Creating Participants with Types and Roles

```typescript
import { ParticipantTypeEnum, ParticipantRoleEnum } from "./enums";

// Youth participant who is learning
const youthLearner = {
  participantType: ParticipantTypeEnum.YOUTH,
  participantRole: ParticipantRoleEnum.LEARNER,
  // ... other participant fields
};

// Adult learner who mentors others
const adultMentor = {
  participantType: ParticipantTypeEnum.ADULT_LEARNER,
  participantRole: ParticipantRoleEnum.PEER_MENTOR,
  // ... other participant fields
};

// Volunteer who actively participates
const activeVolunteer = {
  participantType: ParticipantTypeEnum.VOLUNTEER,
  participantRole: ParticipantRoleEnum.ACTIVE_MEMBER,
  // ... other participant fields
};
```

### Role Progression

Participants can be promoted to different roles over time:

```typescript
// Promote a learner to team leader
participant.participantRole = ParticipantRoleEnum.TEAM_LEADER;

// Or promote to peer mentor
participant.participantRole = ParticipantRoleEnum.PEER_MENTOR;
```

## Available Role Combinations

Each participant type has specific roles that make sense for that category:

- **Youth**: Learner, Peer Mentor, Team Leader, Representative
- **Adult Learner**: Learner, Peer Mentor, Active Member  
- **Trainee**: Learner, Assistant, Active Member
- **Intern**: Learner, Assistant, Observer
- **Volunteer**: Active Member, Assistant, Peer Mentor
- **Beneficiary**: Learner, Active Member
- **Regular**: Learner, Active Member, Peer Mentor, Team Leader

## Database Migration

When implementing this in production:

1. Run the participant types seed: `npm run seed seed-participant-types-1754490702000`
2. Update existing participant records to include the new required fields
3. Ensure all new participants have both `participantType` and `participantRole` specified

## Benefits

1. **Better Organization**: Clear categorization of participants by type and role
2. **Flexible Roles**: Participants can have different responsibilities within their type
3. **Role Progression**: Easy to track and update participant roles over time
4. **Reporting**: Better analytics and reporting capabilities
5. **Permissions**: Can be used for role-based access control in the future
6. **Internationalization**: Full Arabic and English translations included

## Files Modified/Created

- `src/feature/user-management/participant/enums/participant-type.enum.ts` (new)
- `src/feature/user-management/participant/enums/participant-role.enum.ts` (new) 
- `src/feature/user-management/participant/enums/index.ts` (new)
- `src/feature/user-management/participant/participant.entity.ts` (modified)
- `src/feature/user-management/participant/participant.schema.ts` (modified)
- `src/constants/globalEnums.ts` (modified)
- `seeders/seeds/seed-roles-1753094425381.ts` (modified)
- `seeders/seeds/seed-participant-types-1754490702000.ts` (new)
- `src/feature/user-management/participant/examples/participant-usage.example.ts` (new)