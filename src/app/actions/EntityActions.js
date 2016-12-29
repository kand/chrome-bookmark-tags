import uuid from 'uuid';

export const ENTITY_CREATE_SUCCESS = 'ENTITY_CREATE_SUCCESS';
export const ENTITY_DELETE_SUCCESS = 'ENTITY_DELETE_SUCCESS';
export const ENTITY_LIST_HYDRATE_SUCCESS = 'ENTITY_LIST_FETCH_SUCCESS';
export const ENTITY_OPERATION_FAIL = 'ENTITY_OPERATION_FAIL';
export const ENTITY_OPERATION_START = 'ENTITY_OPERATION_START';
export const ENTITY_UPDATE_SUCCESS = 'ENTITY_CREATE_SUCCESS';

function entityOperationFail (error) {

  return {
    type: ENTITY_OPERATION_FAIL,
    error
  };
}

function entityOperationStart () {

  return {
    type: ENTITY_OPERATION_START
  };
}

function entityCreateSuccess (newEntity) {

  return {
    type: ENTITY_CREATE_SUCCESS,
    payload: { ...newEntity }
  };
}

function entityDeleteSuccess (deletedEntity) {

  return {
    type: ENTITY_DELETE_SUCCESS,
    payload: { ...deletedEntity }
  };
}

function entityListHydrateSuccess (entities) {

  return {
    type: ENTITY_LIST_HYDRATE_SUCCESS,
    entities
  };
}

function entityUpdateSuccess (entityData) {

  return {
    type: UPDATE_TAG_SUCCESS,
    payload: { ...entityData }
  };
}

export function fetchEntities () {

  return dispatch => {

    dispatch(entityOperationStart());

    return new Promise(resolve => {

      chrome.storage.local.get(null, entities => {
        resolve(
          Object.keys(entities)
            .reduce((result, id) => ({ ...result, [id]: entities[id] }), {})
        );
      });
    })
      .then(entities => dispatch(entityListHydrateSuccess(entities)));
  };
}

export function createEntity (entityData, entityType, entityCreateValidate = () => false) {

  return (dispatch, getState) => {

    dispatch(entityOperationStart());

    let error = entityCreateValidate(entityData, getState());
    if (error) {
      return dispatch(entityOperationFail(error));
    }

    let newEntity = {
      ...entityData,
      ...{
        id: uuid.v4(),
        entityType
      }
    };

    return new Promise(resolve => {
      chrome.storage.local.set({ [newEntity.id]: newEntity }, () => resolve(newEntity));
    })
      .then(entity => dispatch(entityCreateSuccess(entity)));
  };
}

export function updateEntity (entityData, entityUpdateValidate = () => false) {

  return (dispatch, getState) => {

    dispatch(entityOperationStart());

    let error = entityUpdateValidate(entityData, getState());
    if (error) {
      return dispatch(entityOperationFail(error));
    }

    return new Promise(resolve => {
      chrome.storage.local.get(entityData.id, existingEntity => {

        let updatedEntity = {
          ...existingEntity,
          ...entityData
        };

        chrome.storage.local.set({ [entityData.id]: updatedEntity }, () => resolve(updatedEntity));
      });
    })
      .then(entity => dispatch(entityUpdateSuccess(entity)));
  };
}

export function deleteEntity (entityData) {

  return dispatch => {

    dispatch(entityOperationStart());

    return new Promise(resolve => {
      chrome.storage.local.remove(entityData.id, () => resolve());
    })
      .then(() => dispatch(entityDeleteSuccess(entityData)));
  };
}

