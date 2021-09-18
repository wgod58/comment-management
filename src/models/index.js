import commentModel from './schemas/comment';
import organizationModel from './schemas/organization';

organizationModel.hasMany(commentModel);

export { commentModel, organizationModel };
