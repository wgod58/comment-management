import { commentModel, organizationModel } from 'models';
import commentService from 'services/comment';

describe('comment service', () => {
  const responses = 'responses';
  const mockOrg = {
    id: 'id',
    addComment: jest.fn().mockResolvedValue(),
    getComments: jest.fn().mockResolvedValue(),
  };
  const orgFindOrCreateMock = jest
    .spyOn(organizationModel, 'findOrCreate')
    .mockResolvedValue([mockOrg, true]);
  const orgFindOneMock = jest
    .spyOn(organizationModel, 'findOne')
    .mockResolvedValue(mockOrg);
  const commentCreateMock = jest
    .spyOn(commentModel, 'create')
    .mockResolvedValue(responses);
  const commentUpdateMock = jest
    .spyOn(commentModel, 'update')
    .mockResolvedValue([responses]);

  test('comment  updatePostAndOrganization', async () => {
    const comment = 'test';
    const orgName = 'org';

    await commentService.updatePostAndOrganization({
      comment,
      orgName,
    });

    expect(orgFindOrCreateMock).toBeCalled();
    expect(orgFindOrCreateMock).toBeCalledWith({
      where: { orgName },
    });
    expect(commentCreateMock).toBeCalled();
    expect(commentCreateMock).toBeCalledWith({ comment });
    expect(mockOrg.addComment).toBeCalled();
    expect(mockOrg.addComment).toBeCalledWith(responses);
  });
  test('comment  getCommentsByOrganization', async () => {
    const orgName = 'org';

    await commentService.getCommentsByOrganization({
      orgName,
    });

    expect(orgFindOneMock).toBeCalled();
    expect(orgFindOneMock).toBeCalledWith({
      where: { orgName },
    });

    expect(mockOrg.getComments).toBeCalled();
    expect(mockOrg.getComments).toBeCalledWith({
      where: { deleteMark: false },
      raw: true,
    });
  });
  test('comment  deleteComments', async () => {
    const orgName = 'org';

    await commentService.deleteComments({
      orgName,
    });

    expect(orgFindOneMock).toBeCalled();
    expect(orgFindOneMock).toBeCalledWith({
      where: { orgName },
    });

    expect(commentUpdateMock).toBeCalled();
    expect(commentUpdateMock).toBeCalledWith(
      { deleteMark: true },
      { where: { organizationId: mockOrg.id } },
    );
  });
});
