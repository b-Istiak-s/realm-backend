import { RelationPaginatedOutput } from '../dto/relation-paginated.output';
import { RelationOutput } from '../dto/relation.output';

export function toRelationOutput(relation: any): RelationOutput {
  return Object.assign(new RelationOutput(), relation);
}

export function toRelationPaginatedOutput(data: {
  relationships: any[];
  total: number;
}): RelationPaginatedOutput {
  return {
    relationships: data.relationships.map(toRelationOutput),
    total: data.total,
  };
}
