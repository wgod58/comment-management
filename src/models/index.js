import Comment from './schemas/comment';
import Organization from './schemas/organization';

Organization.hasMany(Comment);

export { Comment, Organization };
