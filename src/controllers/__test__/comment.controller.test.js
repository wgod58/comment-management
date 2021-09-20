import responses from 'constants/responses';
import commentController from 'controllers/comment';
import commentService from 'services/comment';

describe('comment controller', () => {
  const comment = 'comment';
  const orgName = 'orgName';
  const mockRequest = {
    body: {},
    query: {},
    params: { comment, orgName },
  };
  const mockEmptyRequest = {
    body: {},
    query: {},
    params: {},
  };
  const mockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockResponse();

  const updatePostAndOrganizationMock = jest
    .spyOn(commentService, 'updatePostAndOrganization')
    .mockResolvedValue();
  const deleteCommentsMock = jest
    .spyOn(commentService, 'deleteComments')
    .mockResolvedValue();
  const getCommentsByOrganizationMock = jest
    .spyOn(commentService, 'getCommentsByOrganization')
    .mockResolvedValue();

  test('comment updatePostAndOrganization', async () => {
    await commentController.updatePostAndOrganization(mockRequest, res);

    expect(updatePostAndOrganizationMock).toBeCalledWith({ comment, orgName });
    expect(res.status).toBeCalledWith(responses.UPDATE_SUCCESS.status);
    expect(res.json).toBeCalled();
  });

  test('comment empty req updatePostAndOrganization', async () => {
    await commentController.updatePostAndOrganization(mockEmptyRequest, res);

    expect(updatePostAndOrganizationMock).not.toBeCalled();
    expect(res.status).toBeCalledWith(responses.MISS_PARAMETERS.status);
    expect(res.json).toBeCalled();
  });
  test('comment throw error updatePostAndOrganization', async () => {
    updatePostAndOrganizationMock.mockRejectedValueOnce(
      new Error('error happen'),
    );

    await commentController.updatePostAndOrganization(mockRequest, res);

    expect(updatePostAndOrganizationMock).toBeCalledWith({ comment, orgName });
    expect(res.status).toBeCalledWith(responses.SERVER_ERROR.status);
    expect(res.json).toBeCalledWith('error happen');
  });

  test('comment deleteCommentsMock', async () => {
    await commentController.deleteComments(mockRequest, res);

    expect(deleteCommentsMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.UPDATE_SUCCESS.status);
    expect(res.json).toBeCalled();
  });

  test('comment empty req deleteCommentsMock', async () => {
    await commentController.deleteComments(mockEmptyRequest, res);

    expect(deleteCommentsMock).not.toBeCalled();
    expect(res.status).toBeCalledWith(responses.MISS_PARAMETERS.status);
    expect(res.json).toBeCalled();
  });
  test('comment throw error deleteCommentsMock', async () => {
    deleteCommentsMock.mockRejectedValueOnce(new Error('error happen'));

    await commentController.deleteComments(mockRequest, res);

    expect(deleteCommentsMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.SERVER_ERROR.status);
    expect(res.json).toBeCalledWith('error happen');
  });

  test('comment getCommentsByOrganization', async () => {
    await commentController.getCommentsByOrganization(mockRequest, res);

    expect(getCommentsByOrganizationMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.OK.status);
    expect(res.json).toBeCalled();
  });

  test('comment empty req getCommentsByOrganization', async () => {
    await commentController.getCommentsByOrganization(mockEmptyRequest, res);

    expect(getCommentsByOrganizationMock).not.toBeCalled();
    expect(res.status).toBeCalledWith(responses.MISS_PARAMETERS.status);
    expect(res.json).toBeCalled();
  });
  test('comment throw error getCommentsByOrganization', async () => {
    getCommentsByOrganizationMock.mockRejectedValueOnce(
      new Error('error happen'),
    );

    await commentController.getCommentsByOrganization(mockRequest, res);

    expect(getCommentsByOrganizationMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.SERVER_ERROR.status);
    expect(res.json).toBeCalledWith('error happen');
  });
});
