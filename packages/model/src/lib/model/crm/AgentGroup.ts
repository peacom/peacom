export enum ASSIGN_METHOD {
  ROUND_ROBIN = 1
}

/** agent_group.setting.mode. Cannot be changed after the team is created */
export enum TEAM_MODE {
  SINGLE = 1, // Only owner and invited supporters see a ticket that already has an owner
  COLLABORATION = 2, // Every member of the team sees the team's tickets
}
