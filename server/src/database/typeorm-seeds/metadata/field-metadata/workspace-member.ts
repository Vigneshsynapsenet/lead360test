import { DataSource } from 'typeorm';

import { SeedObjectMetadataIds } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { SeedWorkspaceId } from 'src/database/seeds/metadata';

const fieldMetadataTableName = 'fieldMetadata';

export enum SeedWorkspaceMemberFieldMetadataIds {
  FirstName = '20202020-1fa8-4d38-9fa4-0cf696909298',
  LastName = '20202020-8c37-4163-ba06-1dada334ce3e',
  Locale = '20202020-10f6-4df9-8d6f-a760b65bd800',
  ColorScheme = '20202020-83f2-4c5f-96b0-0c51ecc160e3',
  AllowImpersonation = '20202020-bb19-44a1-8156-8866f87a5f42',
  UserId = '20202020-f2c1-4ca1-9ca5-7b9d5cc87eb0',
  AuthoredActivities = '20202020-37a0-4db4-9c9f-fd3e3f4e47fc',
  AssignedActivities = '20202020-ac05-44b9-9526-764dd5ce14e2',
  AuthoredAttachments = '20202020-7e0c-4dc4-be49-37de4396349e',
  Favorites = '20202020-5ecb-405b-8712-171bb8916b96',
  Settings = '20202020-50ed-46ed-8198-65e237b83eb9',
  AccountOwnerForCompanies = '20202020-41bb-4c17-8979-40fa915df9e1',
  AuthoredComments = '20202020-7238-4e2a-9ccf-d2c8f604933a',
}

export const seedWorkspaceMemberFieldMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${fieldMetadataTableName}`, [
      'id',
      'objectMetadataId',
      'isCustom',
      'workspaceId',
      'isActive',
      'type',
      'name',
      'label',
      'targetColumnMap',
      'description',
      'icon',
      'isNullable',
    ])
    .orIgnore()
    .values([
      // Scalar fields
      {
        id: SeedWorkspaceMemberFieldMetadataIds.FirstName,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'firstName',
        label: 'First name',
        targetColumnMap: {
          value: 'firstName',
        },
        description: 'Workspace member first name',
        icon: 'IconCircleUser',
        isNullable: false,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.LastName,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'lastName',
        label: 'Last name',
        targetColumnMap: {
          value: 'lastName',
        },
        description: 'Workspace member last name',
        icon: 'IconCircleUser',
        isNullable: false,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.UserId,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'UUID',
        name: 'userId',
        label: 'User Id',
        targetColumnMap: {
          value: 'userId',
        },
        description: 'Associated User Id',
        icon: 'IconCircleUsers',
        isNullable: false,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AllowImpersonation,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'BOOLEAN',
        name: 'allowImpersonation',
        label: 'Admin Access',
        targetColumnMap: {
          value: 'allowImpersonation',
        },
        description: 'Allow Admin Access',
        icon: 'IconEye',
        isNullable: false,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.ColorScheme,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'colorScheme',
        label: 'Color Scheme',
        targetColumnMap: {
          value: 'colorScheme',
        },
        description: 'Preferred color scheme',
        icon: 'IconColorSwatch',
        isNullable: false,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Locale,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'locale',
        label: 'Language',
        targetColumnMap: {
          value: 'locale',
        },
        description: 'Preferred language',
        icon: 'IconLanguage',
        isNullable: false,
      },

      // Relationships
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredActivities,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'authoredActivities',
        label: 'Authored activities',
        targetColumnMap: {},
        description: 'Activities created by the workspace member',
        icon: 'IconCheckbox',
        isNullable: true,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AssignedActivities,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'assignedActivities',
        label: 'Assigned activities',
        targetColumnMap: {},
        description: 'Activities assigned to the workspace member',
        icon: 'IconCheckbox',
        isNullable: true,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.Favorites,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'favorites',
        label: 'Favorites',
        targetColumnMap: {},
        description: 'Favorites linked to the workspace member',
        icon: 'IconHeart',
        isNullable: true,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AccountOwnerForCompanies,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'accountOwnerForCompanies',
        label: 'Account Owner For Companies',
        targetColumnMap: {},
        description: 'Account owner for companies',
        icon: 'IconBriefcase',
        isNullable: true,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredAttachments,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'authoredAttachments',
        label: 'Authored attachments',
        targetColumnMap: {},
        description: 'Attachments created by the workspace member',
        icon: 'IconFileImport',
        isNullable: true,
      },
      {
        id: SeedWorkspaceMemberFieldMetadataIds.AuthoredComments,
        objectMetadataId: SeedObjectMetadataIds.WorkspaceMember,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'authoredComments',
        label: 'Authored comments',
        targetColumnMap: {},
        description: 'Authored comments',
        icon: 'IconComment',
        isNullable: true,
      },
    ])
    .execute();
};