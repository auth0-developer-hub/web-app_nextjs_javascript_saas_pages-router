import { ManagementClient } from "auth0";

const baseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const domain = new URL(baseUrl).hostname;

const managementClient = new ManagementClient({
  domain: domain,
  clientId: process.env.AUTH0_M2M_CLIENT_ID,
  clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET,
  scope: process.env.AUTH0_M2M_SCOPES,
});

/** Membership / Invitation **/
export async function inviteMembers(
  sender_name,
  orgId,
  email,
  roleList,
  connectionId
) {
  const sender = sender_name;
  const params = { id: orgId };
  const data = {
    client_id: process.env.AUTH0_CLIENT_ID,
    invitee: { email: email },
    inviter: { name: sender },
    roles: roleList,
    connection_id: connectionId,
    send_invitation_email: true,
  };

  const invitation = await managementClient.organizations.createInvitation(
    params,
    data
  );
  return invitation;
}

export async function deleteInvitation(orgId, invitationId) {
  var params = { id: orgId, invitation_id: invitationId };

  await managementClient.organizations.deleteInvitation(params);
}

export async function getInvitations(orgId) {
  const params = {
    id: orgId,
  };
  return await managementClient.organizations.getInvitations(params);
}

/*******      Organizations       *********/

export async function createOrganization(organization) {
  //scopes: create:organizations, create:organization_connections
  const new_org = await managementClient.organizations.create(organization);
  return new_org;
}

export async function getOrganizationByName(orgName) {
  const params = { name: orgName };
  const org = await managementClient.organizations.getByName(params);
  return org;
}

export async function getEnabledConnections(orgId) {
  const params = {
    id: orgId,
  };
  const connections =
    await managementClient.organizations.getEnabledConnections(params);
  return connections;
}

export async function addEnabledConnectionToOrg(
  connectionId,
  orgId,
  autoMembership
) {
  var params = { id: orgId };
  var data = {
    connection_id: connectionId,
    assign_membership_on_login: autoMembership,
  };

  const enabledConn = await managementClient.organizations.addEnabledConnection(
    params,
    data
  );
  return enabledConn;
}

export async function getMembers(orgId) {
  const params = {
    id: orgId,
  };
  const members = await managementClient.organizations.getMembers(params);
  return members;
}

export async function addMembers(org_id, user_ids) {
  //scope: create:organization_members
  //Add user as member of the organization
  await managementClient.organizations.addMembers(
    { id: org_id },
    { members: user_ids }
  );
}

export async function getMemberRoles(orgId, userId) {
  const roles_params = { id: orgId, user_id: userId };
  const roles = await managementClient.organizations.getMemberRoles(
    roles_params
  );
  return roles;
}

export async function addMemberRoles(orgId, userId, roleIds) {
  const params = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  //scope: create:organization_member_roles
  //Add user as Administrator of the organization
  const member_roles = await managementClient.organizations.addMemberRoles(
    params,
    data
  );
  return member_roles;
}

export async function removeMemberRoles(orgId, userId, roleIds) {
  const params = { id: orgId, user_id: userId };
  const data = { roles: roleIds };
  const member_roles = await managementClient.organizations.removeMemberRoles(
    params,
    data
  );
  return member_roles;
}

export async function removeMembers(orgId, userIds) {
  const params = { id: orgId };
  const data = { members: userIds };
  await managementClient.organizations.removeMembers(params, data);
}

/*******      Roles       *********/

export async function getAllRoles() {
  const params = {};
  let roles = await managementClient.roles.getAll(params);

  return roles;
}

export async function getRole(roleId) {
  let roles_params = { id: roleId };
  let role = await managementClient.roles.get(roles_params);
  return role;
}

/***** Users *******/

export async function getUser(userId) {
  const params = {
    id: userId,
  };
  const user = await managementClient.getUser(params);
  return user;
}

export async function updateAppMetadata(user_id, app_metadata) {
  const user = await managementClient.users.updateAppMetadata(
    { id: user_id },
    app_metadata
  );
  return user;
}

/*****   Connections ********/

export async function createConnection(connections_data) {
  const connection = await managementClient.connections.create(
    connections_data
  );
  return connection;
}

export async function getAllConnections(connection_meta) {
  //scope > read:connections
  const connections = await managementClient.connections.getAll(
    connection_meta
  );
  return connections;
}

export async function deleteConnection(connectionId) {
  var data = {
    id: connectionId,
  };

  const enabledConn = await managementClient.connections.delete(data);
  return enabledConn;
}
