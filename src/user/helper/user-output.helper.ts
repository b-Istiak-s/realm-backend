import { UserPaginatedOutput } from '../dto/user-paginated.output';
import { UserOutput } from '../dto/user.output';

export function toUserOutput(user: any): UserOutput {
  return Object.assign(new UserOutput(), user);
}

export function toUserPaginatedOutput(data: {
  users: any[];
  total: number;
}): UserPaginatedOutput {
  return {
    users: data.users.map(toUserOutput),
    total: data.total,
  };
}
