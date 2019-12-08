import { IResolvers } from 'graphql-tools';
import query from './query';
import mutations from './mutation';

const resolvers : IResolvers = {
    ...query,
    ...mutations
}

export default resolvers;